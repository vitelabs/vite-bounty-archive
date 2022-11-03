import 'observers/trade_observer.dart';
import 'orderbook/block_event_stream.dart';
import 'orderbook/order_books.dart';
import 'types.dart';

Future<ScanResults> scan({
  required OrderBooks orderBooks,
  required BlockEventStream stream,
  required List<TradePair> tradePairs,
  required Cycle cycle,
}) async {
  final tradeObserver = TradeObserver(
    startTimestamp: cycle.start,
    endTimestamp: cycle.end,
  );
  orderBooks.setOrderObserver(tradeObserver);
  stream.travel(orderBooks, inReverse: false);
  orderBooks.setOrderObserver(null);

  orderBooks.books.forEach((tradePair, book) {
    tradeObserver.end(book, tradePair);
  });

  final markets = Map.fromEntries(tradePairs.map((e) {
    final userTrades = List.of(
      tradeObserver.userTradesForTradePair(e.tradePairId),
    );
    userTrades.sort((t1, t2) => t1.timestamp.compareTo(t2.timestamp));

    final restingOrders = List.of(
      tradeObserver.restingOrdersForTradePair(e.tradePairId),
    );
    restingOrders.sort((o1, o2) {
      final result = o1.startTimestamp.compareTo(o2.startTimestamp);
      if (result == 0) {
        return o1.endTimestamp.compareTo(o2.endTimestamp);
      }
      return result;
    });

    final market = MarketResults(
      tradePair: e,
      restingOrders: restingOrders,
      userTrades: userTrades,
    );

    return MapEntry(e.tradePairSymbols, market);
  }));

  return ScanResults(cycle: cycle, markets: markets);
}
