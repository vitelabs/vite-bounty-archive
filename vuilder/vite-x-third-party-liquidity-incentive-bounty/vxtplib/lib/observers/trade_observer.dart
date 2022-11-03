import 'dart:math';

import '../orderbook/order_book.dart';
import '../orderbook/order_event_handle_observer.dart';
import '../types.dart';

class TradeObserver extends OrderEventHandleObserver {
  final int startTimestamp;
  final int endTimestamp;

  final restingOrdersMap = <String, List<RestingOrder>>{};
  final userTradesMap = <String, List<UserTrade>>{};
  final newOrderEvents = <String, OrderEvent>{};

  List<RestingOrder> restingOrdersForTradePair(String tradePair) =>
      restingOrdersMap.putIfAbsent(tradePair, () => <RestingOrder>[]);
  List<UserTrade> userTradesForTradePair(String tradePair) =>
      userTradesMap.putIfAbsent(tradePair, () => <UserTrade>[]);

  TradeObserver({
    required this.startTimestamp,
    required this.endTimestamp,
  });

  void _logRestingOrder(RestingOrder order) =>
      restingOrdersForTradePair(order.tradePair).add(order);

  void _logUserTrade(UserTrade trade) =>
      userTradesForTradePair(trade.tradePair).add(trade);

  // handle open orders at endTime
  void end(OrderBook book, String tradePair) {
    for (final order in book.orders.values) {
      final resting = RestingOrder.atEnd(
        order: order,
        startTimestamp: max(startTimestamp, order.timestamp),
        endTimestamp: endTimestamp,
      );
      _logRestingOrder(resting);
    }
  }

  @override
  void beforeOnward(OrderBook book, OrderEvent event) {
    if (event.type == EventType.unknown) {
      return;
    }

    final timestamp = event.timestamp;
    if (timestamp == null) {
      throw Exception('Event timestamp is null - $event');
    }

    if (timestamp > endTimestamp) {
      throw Exception('Event timestamp is greater than end time');
    }

    switch (event.type) {
      case EventType.tx:
        final orderTx = event.orderTx;
        if (orderTx == null) {
          throw Exception('OrderTx missing from tx event $event');
        }

        final takerOrderEvent = newOrderEvents[orderTx.takerOrderId];
        if (takerOrderEvent == null) {
          throw Exception(
              'Missing order event for taker order id ${orderTx.takerOrderId}');
        }

        final log = takerOrderEvent.orderLog;
        if (log == null) {
          throw Exception('Missing order log for event $takerOrderEvent');
        }

        final trade = UserTrade.taker(
          orderTx: orderTx,
          log: log,
          blockHash: event.blockHash,
          timestamp: timestamp,
        );
        _logUserTrade(trade);
        break;
      case EventType.newOrder:
        final log = event.orderLog;
        if (log == null) {
          throw Exception('Missing order log');
        }

        if (log.address.isEmpty) {
          throw Exception('Missing address for event $event');
        }

        newOrderEvents[log.orderId] = event;
        break;
      case EventType.updateOrder:
        final eventLog = event.orderLog;
        if (eventLog == null) {
          throw Exception('Missing orderLog for event $event');
        }

        final orderId = eventLog.orderId;
        final order = book.orders[orderId];
        if (order == null) {
          throw Exception('Missing order with id $orderId');
        }

        final log = eventLog.copyWith(address: order.address);
        log.status.maybeWhen(
          partiallyExecuted: () {
            final trade = UserTrade.maker(
              order: order,
              log: log,
              blockHash: event.blockHash,
              timestamp: timestamp,
            );
            _logUserTrade(trade);

            final resting = RestingOrder.atEvent(
              order: order,
              log: log,
              startTimestamp: max(startTimestamp, order.timestamp),
              eventTimestamp: timestamp,
            );
            _logRestingOrder(resting);
          },
          fullyExecuted: () {
            final trade = UserTrade.maker(
              order: order,
              log: log,
              blockHash: event.blockHash,
              timestamp: timestamp,
            );
            _logUserTrade(trade);

            final resting = RestingOrder.atEvent(
              order: order,
              log: log,
              startTimestamp: max(startTimestamp, order.timestamp),
              eventTimestamp: timestamp,
            );
            _logRestingOrder(resting);
          },
          cancelled: () {
            final resting = RestingOrder.atEvent(
              order: order,
              log: log,
              startTimestamp: max(startTimestamp, order.timestamp),
              eventTimestamp: timestamp,
            );
            _logRestingOrder(resting);
          },
          orElse: () {
            // do nothing
          },
        );
        break;
      default:
        break;
    }
  }

  Future<bool> validateRestingOrders() async {
    return true;
  }

  Future<bool> validateUserTrades() async {
    return true;
  }
}
