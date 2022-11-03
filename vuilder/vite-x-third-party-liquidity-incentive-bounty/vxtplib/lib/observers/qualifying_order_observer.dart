import 'package:decimal/decimal.dart';

import '../orderbook/order_book.dart';
import '../orderbook/order_event_handle_observer.dart';
import '../types.dart';

class QualifyingOrderObserver extends OrderEventHandleObserver {
  final RewardsConfig config;
  final List<RestingOrderStats> stats = [];

  QualifyingOrderObserver({
    required this.config,
    required List<RestingOrder> restingOrders,
  }) {
    for (final order in restingOrders) {
      final stat = RestingOrderStats(
        restingOrder: order,
        deltaTimestamp: order.startTimestamp,
        qualifyingTimeLength: 0,
      );
      stats.add(stat);
    }
  }

  void _updateStats({
    required int timestamp,
    required Decimal buy1Price,
    required Decimal sell1Price,
  }) {
    for (final stat in stats) {
      if (stat.restingOrder.startTimestamp >= timestamp ||
          stat.restingOrder.endTimestamp < timestamp ||
          stat.deltaTimestamp >= timestamp) {
        continue;
      }

      final orderPrice = stat.restingOrder.price;
      final side = stat.restingOrder.side;
      if (side == OrderSide.buy) {
        final orderDistance = ((sell1Price - orderPrice) / sell1Price)
            .toDecimal(scaleOnInfinitePrecision: 8);
        if (orderDistance < config.orderDistanceThreshold) {
          stat.qualifyingTimeLength += (timestamp - stat.deltaTimestamp);
        }
        stat.deltaTimestamp = timestamp;
      } else {
        final orderDistance = ((orderPrice - buy1Price) / buy1Price)
            .toDecimal(scaleOnInfinitePrecision: 8);
        if (orderDistance < config.orderDistanceThreshold) {
          stat.qualifyingTimeLength += (timestamp - stat.deltaTimestamp);
        }
        stat.deltaTimestamp = timestamp;
      }
    }
  }

  List<QualifyingOrder> getQualifyingRestingOrders() {
    return stats.where((element) => element.qualifyingTimeLength > 0).map((e) {
      final weight =
          e.restingOrder.amount * Decimal.fromInt(e.qualifyingTimeLength);
      return QualifyingOrder(
        order: e.restingOrder,
        weight: weight,
      );
    }).toList(growable: false);
  }

  void end(OrderBook book, int timestamp) {
    final buy1Price = book.getBuy1Price();
    final sell1Price = book.getSell1Price();
    if (buy1Price == null || sell1Price == null) {
      return;
    }

    _updateStats(
      timestamp: timestamp,
      buy1Price: buy1Price,
      sell1Price: sell1Price,
    );
  }

  @override
  void beforeOnward(OrderBook book, OrderEvent event) {
    if (event.type == EventType.tx || event.type == EventType.unknown) {
      return;
    }
    if (config.tradingPair != event.tradePair) {
      return;
    }

    final timestamp = event.timestamp;
    if (timestamp == null) {
      throw Exception('Event timestamp is null - $event');
    }

    final buy1Price = book.getBuy1Price();
    final sell1Price = book.getSell1Price();

    if (buy1Price == null || sell1Price == null) {
      return;
    }

    _updateStats(
      timestamp: timestamp,
      buy1Price: buy1Price,
      sell1Price: sell1Price,
    );
  }
}
