import 'constants.dart';
import 'orderbook/trade_recover.dart';
import 'orderbook/traveller.dart';
import 'types.dart';
import 'vitex/vitex_service.dart';

Future<RecoverResults> recover({
  required VitexService vitex,
  required Tokens tokens,
  required List<TradePair> tradePairs,
  required Cycle cycle,
}) async {
  final snapshotTimestamp = cycle.end + Duration(seconds: 60).inSeconds;
  final snapshotTime = DateTime.fromMillisecondsSinceEpoch(
    snapshotTimestamp * 1000,
    isUtc: true,
  );

  final nowTimestamp = DateTime.now().millisecondsSinceEpoch ~/ 1000;
  if (nowTimestamp - snapshotTimestamp < 0) {
    throw Exception('End time should be at least one minute in the past');
  }

  if (tradePairs.isEmpty) {
    throw Exception('No valid trade pairs found');
  }

  final traveller = Traveller();
  final tradeRecover = TradeRecover();

  print('Travelling to snapshot timestamp $snapshotTimestamp ($snapshotTime)');
  final snapshotOrderBooks = await traveller.travelInTime(
    prevTimestamp: snapshotTimestamp,
    tokens: tokens,
    vitex: vitex,
    tradePairs: tradePairs,
  );

  print('Recovering to start timestamp ${cycle.start} (${cycle.startTime})');
  final recoverResult = await tradeRecover.recoverInTime(
    orderBooks: snapshotOrderBooks,
    time: cycle.start,
    tokens: tokens,
    vitex: vitex,
  );

  final orderBooks = recoverResult.orderBooks;
  final recoveredStream = recoverResult.stream;

  print('Patching timestamps');
  await recoveredStream.patchOrderEventsTimestamp(vitex: vitex);

  print('Patching missing addresses');
  await tradeRecover.fillAddressForOrdersGroupByTimeUnit(
    books: orderBooks.books,
    vitex: vitex,
  );

  print('Computing height range');
  final startHeight = await vitex.getSnapshotHeightFor(
        address: kDexTradeContractAddress,
        timestamp: cycle.start,
      ) +
      1;
  final endHeight = await vitex.getSnapshotHeightFor(
    address: kDexTradeContractAddress,
    timestamp: cycle.end,
  );

  final stream = recoveredStream.subStream(startHeight, endHeight);

  return RecoverResults(
    orderBooks: orderBooks,
    stream: stream,
  );
}
