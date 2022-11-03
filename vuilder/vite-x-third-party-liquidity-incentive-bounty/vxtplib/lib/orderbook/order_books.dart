import 'dart:convert';

import 'package:crypto/crypto.dart';
import 'package:fast_immutable_collections/fast_immutable_collections.dart';

import '../types.dart';
import '../vitex/vitex_service.dart';
import 'block_event_handler.dart';
import 'order_book.dart';
import 'order_event_handle_observer.dart';

class OrderBooks implements BlockEventHandler {
  final _tradePairs = <TradePair>[];
  List<TradePair> get tradePairs => List.of(_tradePairs);
  final _books = <String, OrderBook>{};

  Map<String, OrderBook> get books => Map.of(_books);
  final VitexService vitex;

  int _currentHeight = 0;
  int get currentHeight => _currentHeight;

  OrderBooks({
    required this.vitex,
    required List<TradePair> tradePairs,
    int? currentHeight,
  }) {
    _tradePairs.addAll(tradePairs);
    if (currentHeight != null) {
      _currentHeight = currentHeight;
    }
  }

  void initFrom({
    required Map<TradePair, List<OrderModel>> orders,
    required int currentHeight,
  }) {
    _currentHeight = currentHeight;
    for (final entry in orders.entries) {
      final orderBook = OrderBook(
        orders: entry.value,
        blockHeight: _currentHeight,
      );
      _books[entry.key.tradePairId] = orderBook;
    }
  }

  Future<void> initRemote() async {
    for (final tradePair in _tradePairs) {
      final book = await vitex.getOrdersFromMarket(
        tradeToken: tradePair.tradeToken,
        quoteToken: tradePair.quoteToken,
      );
      if (book.orders.isEmpty || book.blockHeight == 0) {
        continue;
      }
      if (_currentHeight < book.blockHeight) {
        _currentHeight = book.blockHeight;
      }
      final orderBook = OrderBook(
        orders: book.orders,
        blockHeight: book.blockHeight,
      );
      _books[tradePair.tradePairId] = orderBook;
    }
  }

  @override
  void revertBlockEvent(BlockEvent event) {
    final book = _books[event.tradePair];
    if (book == null) {
      return;
    }
    book.revertBlockEvent(event);
    _currentHeight = event.height;
  }

  @override
  void onwardBlockEvent(BlockEvent event) {
    final book = _books[event.tradePair];
    if (book == null) {
      return;
    }
    book.onwardBlockEvent(event);
  }

  void setOrderObserver(OrderEventHandleObserver? observer) {
    for (final book in _books.values) {
      book.setOrderObserver(observer);
    }
  }

  String hash() {
    final books = IList(_books.entries)
        .sortOrdered((e1, e2) => e1.key.compareTo(e2.key))
        .map((e) => e.value);
    final result = books.map((e) => e.hash()).join('-');
    return md5.convert(utf8.encode(result)).toString();
  }
}
