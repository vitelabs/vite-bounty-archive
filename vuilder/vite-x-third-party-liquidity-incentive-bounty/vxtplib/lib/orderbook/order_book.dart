import 'dart:convert';

import 'package:crypto/crypto.dart';
import 'package:decimal/decimal.dart';
import 'package:fast_immutable_collections/fast_immutable_collections.dart';

import '../types.dart';
import 'order_book_base.dart';
import 'order_event_handle_observer.dart';

enum Action {
  onward,
  revert,
}

class OrderBook extends OrderBookBase {
  @override
  final buys = <OrderModel>[];

  @override
  final sells = <OrderModel>[];

  @override
  final orders = <String, OrderModel>{};

  int _currentBlockHeight = 0;
  Action _lastAction = Action.onward;
  OrderEventHandleObserver? _observer;
  int _addCount = 0;
  int _removeCount = 0;

  @override
  int get currentBlockHeight => _currentBlockHeight;

  @override
  int get addCount => _addCount;

  @override
  int get removeCount => _removeCount;

  OrderBook({
    required List<OrderModel> orders,
    required int blockHeight,
  }) {
    final orderMap = Map.fromEntries(orders.map((e) => MapEntry(e.orderId, e)));

    buys.addAll(orderMap.values.where((order) => !order.side));
    sells.addAll(orderMap.values.where((order) => order.side));

    _currentBlockHeight = blockHeight;

    this.orders.addAll(orderMap);
  }

  bool validAction(Action action, int height) {
    switch (action) {
      case Action.onward:
        switch (_lastAction) {
          case Action.onward:
            return height > _currentBlockHeight;
          case Action.revert:
            return height >= _currentBlockHeight;
        }
      case Action.revert:
        switch (_lastAction) {
          case Action.onward:
            return height <= _currentBlockHeight;
          case Action.revert:
            return height < _currentBlockHeight;
        }
    }
  }

  @override
  void revertBlockEvent(BlockEvent event) {
    if (!validAction(Action.revert, event.height)) {
      throw Exception('Invalid action REVERT for event $event');
    }
    event.travel(this, inReverse: true);
    _currentBlockHeight = event.height;
    _lastAction = Action.revert;
  }

  @override
  void onwardBlockEvent(BlockEvent event) {
    if (!validAction(Action.onward, event.height)) {
      throw Exception('Invalid action ONWARD for event $event');
    }
    event.travel(this, inReverse: false);
    _currentBlockHeight = event.height;
    _lastAction = Action.onward;
  }

  void _addOrder(OrderModel order) {
    _addCount += 1;
    final orderId = order.orderId;
    if (orders.containsKey(orderId)) {
      throw Exception('Order $orderId exists');
    }

    orders[orderId] = order;
    if (order.side) {
      sells.add(order);
    } else {
      buys.add(order);
    }
  }

  void _removeOrder(OrderModel order) {
    _removeCount += 1;
    final orderId = order.orderId;
    if (!orders.containsKey(orderId)) {
      throw Exception('Order $orderId does not exist');
    }

    orders.remove(orderId);
    if (order.side) {
      sells.remove(order);
    } else {
      buys.remove(order);
    }
  }

  void _onwardOrderEvent(OrderEvent event) {
    final type = event.type;

    switch (type) {
      case EventType.newOrder:
        final log = event.orderLog;
        if (log == null) {
          throw Exception('Missing order log');
        }
        if (!log.finished) {
          final order = OrderModel.fromOrderLog(log);
          _addOrder(order);
        }
        break;
      case EventType.updateOrder:
        final log = event.orderLog;
        if (log == null) {
          throw Exception('Missing order log');
        }
        final orderId = log.orderId;
        if (log.finished) {
          final order = orders[orderId];
          if (order != null) {
            _removeOrder(order);
          }
        } else if (log.status == OrderStatus.partiallyExecuted()) {
          final order = orders[orderId];
          if (order == null) {
            throw Exception('Missing order with id $orderId');
          }
          orders[orderId] = order.onward(log);
        }
        break;
      case EventType.tx:
        break;
      case EventType.unknown:
        break;
    }
  }

  void _revertOrderEvent(OrderEvent event) {
    final type = event.type;

    switch (type) {
      case EventType.newOrder:
        final log = event.orderLog;
        if (log == null) {
          throw Exception('Missing order log');
        }
        final orderId = log.orderId;
        if (log.finished) {
          return;
        }
        final order = orders[orderId];
        if (order != null) {
          _removeOrder(order);
          return;
        }

        print(
            'Error - [new order] not found while reverted, orderId ${event.orderId}, orderStatus ${log.status}, blockHash ${event.blockHash}');
        throw Exception('[new order] not found order: ${log.orderId}');

      case EventType.updateOrder:
        final log = event.orderLog;
        if (log == null) {
          throw Exception('Missing order log');
        }
        if (log.finished) {
          final order = OrderModel.fromOrderLog(log);
          _addOrder(order);
          return;
        }

        if (log.status == OrderStatus.partiallyExecuted()) {
          final orderId = log.orderId;
          final order = orders[orderId];
          if (order == null) {
            print(
                'Error - [update] could not find order while revert, orderId ${event.orderId}, orderStatus ${log.status}, blockHash ${event.blockHash}');
            throw Exception('[update order] not found order: ${log.orderId}');
          }
          orders[orderId] = order.revert(log);
        }
        break;
      case EventType.tx:
        break;
      case EventType.unknown:
        break;
    }
  }

  @override
  void onwardOrderEvent(OrderEvent event) {
    _observer?.beforeOnward(this, event);

    _onwardOrderEvent(event);

    _observer?.aferOnward(this, event);
  }

  @override
  void revertOrderEvent(OrderEvent event) {
    _observer?.beforeRevert(this, event);

    _revertOrderEvent(event);

    _observer?.afterRevert(this, event);
  }

  @override
  Decimal? getBuy1Price() {
    if (buys.isEmpty) {
      return null;
    }
    final maxBuy = buys.reduce(
      (value, element) => value.price > element.price ? value : element,
    );
    return maxBuy.price;
  }

  @override
  Decimal? getSell1Price() {
    if (sells.isEmpty) {
      return null;
    }
    final minSell = sells.reduce(
      (value, element) => value.price < element.price ? value : element,
    );
    return minSell.price;
  }

  @override
  Decimal getAmountSum() {
    return orders.values
        .map((e) => e.amount)
        .reduce((value, element) => value + element);
  }

  @override
  void setOrderObserver(OrderEventHandleObserver? observer) {
    _observer = observer;
  }

  @override
  String hash() {
    final result = IList(orders.values)
        .sortOrdered((o1, o2) => o1.orderId.compareTo(o2.orderId))
        .map((element) => element.hash)
        .join('-');
    return md5.convert(utf8.encode(result)).toString();
  }
}
