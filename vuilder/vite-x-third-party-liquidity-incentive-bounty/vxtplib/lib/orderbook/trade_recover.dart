import 'dart:math';
import 'dart:typed_data';

import 'package:vite/utils.dart';

import '../constants.dart';
import '../types.dart';
import '../util.dart';
import '../vitex/proto/dex_order.pb.dart';
import '../vitex/vitex_service.dart';
import 'block_event_stream.dart';
import 'order_book.dart';
import 'order_books.dart';

class TradeRecover {
  Future<RecoverResults> recoverInTime({
    required OrderBooks orderBooks,
    required int time,
    required Tokens tokens,
    required VitexService vitex,
  }) async {
    final startHeight = await vitex.getSnapshotHeightFor(
          address: kDexTradeContractAddress,
          timestamp: time,
        ) +
        1;
    final endHeight = orderBooks.currentHeight - 1;
    final stream = BlockEventStream(
      startHeight: startHeight,
      endHeight: endHeight,
    );
    await stream.init(vitex: vitex, tokens: tokens);

    return recoverInTimeWithStream(
      orderBooks: orderBooks,
      stream: stream,
      tokens: tokens,
      vitex: vitex,
    );
  }

  RecoverResults recoverInTimeWithStream({
    required OrderBooks orderBooks,
    required BlockEventStream stream,
    required Tokens tokens,
    required VitexService vitex,
  }) {
    stream.travel(orderBooks, inReverse: true);
    final result = RecoverResults(orderBooks: orderBooks, stream: stream);
    return result;
  }

  Future<void> fillAddressForOrdersGroupByTimeUnit({
    required Map<String, OrderBook> books,
    required VitexService vitex,
  }) async {
    final allOrders = <OrderModel>[];

    for (final book in books.values) {
      allOrders.addAll(book.orders.values);
    }

    final orders = List.of(allOrders);
    orders.removeWhere((element) => !element.addressIsEmpty);

    final orderGroups = <int, List<OrderModel>>{};
    final delta = Duration(minutes: 10).inSeconds;
    for (final order in orders) {
      final key = order.timestamp ~/ delta;
      final list = orderGroups.putIfAbsent(key, () => <OrderModel>[]);
      list.add(order);
    }

    for (final group in orderGroups.values) {
      await fillAddressForOrders(orders: group, vitex: vitex);
    }

    for (final order in orders) {
      if (order.addressIsEmpty) {
        throw Exception('Missing address for Order $order');
      }
    }
  }

  Future<void> fillAddressForOrders({
    required List<OrderModel> orders,
    required VitexService vitex,
  }) async {
    int start = DateTime.now().millisecondsSinceEpoch ~/ 1000;
    int end = 0;
    var orderMap = Map.fromEntries(orders.map((e) {
      start = min(start, e.timestamp);
      end = max(end, e.timestamp);
      return MapEntry(e.orderId, e);
    }));

    final delta = Duration(minutes: 5).inSeconds;
    start -= delta;
    end += delta;

    orderMap = await fillAddressForOrdersWithRange(
      orderMap: orderMap,
      startTime: start,
      endTime: end,
      vitex: vitex,
    );

    if (orderMap.isEmpty) {
      return;
    }

    int count = 1;
    while (true) {
      final start0 = start - delta;
      orderMap = await fillAddressForOrdersWithRange(
        orderMap: orderMap,
        startTime: start0,
        endTime: start,
        vitex: vitex,
      );
      if (orderMap.isEmpty) {
        return;
      }

      final end1 = end + delta;
      orderMap = await fillAddressForOrdersWithRange(
        orderMap: orderMap,
        startTime: end,
        endTime: end1,
        vitex: vitex,
      );
      if (orderMap.isEmpty) {
        return;
      }

      start = start0;
      end = end1;

      count += 1;
      if (count >= 100) {
        throw Exception('The address for one of the orders was not found');
      }
    }
  }

  Future<Map<String, OrderModel>> fillAddressForOrdersWithRange({
    required Map<String, OrderModel> orderMap,
    required int startTime,
    required int endTime,
    required VitexService vitex,
  }) async {
    final startHeight = await vitex.getSnapshotHeightFor(
      address: kDexTradeContractAddress,
      timestamp: startTime,
    );
    final endHeight = await vitex.getSnapshotHeightFor(
      address: kDexTradeContractAddress,
      timestamp: endTime,
    );
    final vmLogMessages = await vitex.getChainEventsByHeightRange(
      address: kDexTradeContractAddress,
      startHeight: startHeight,
      endHeight: endHeight,
    );

    for (final message in vmLogMessages) {
      final vmLog = message.vmLog;
      final event = vmLog.data;
      if (event == null) {
        continue;
      }

      final eventType = getEventType(vmLog.topics);

      if (eventType != EventType.newOrder) {
        continue;
      }

      final dexOrder = NewOrderInfo.fromBuffer(event);
      final newOrderId = bytesToHex(Uint8List.fromList(dexOrder.order.id));
      final order = orderMap[newOrderId];
      if (order != null && order.addressIsEmpty) {
        final address =
            getShowAddress(Uint8List.fromList(dexOrder.order.address));
        order.updateAddress(address);
      }
    }

    final result = Map.of(orderMap);
    result.removeWhere((key, value) => !value.addressIsEmpty);
    return result;
  }
}
