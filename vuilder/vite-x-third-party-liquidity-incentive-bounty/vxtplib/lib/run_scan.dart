import 'package:intl/intl.dart';
import 'package:path/path.dart' as path;
import 'package:vite/vite.dart';

import 'output.dart';
import 'recover.dart';
import 'scan.dart';
import 'types.dart';
import 'util.dart';
import 'vitex/vitex_service.dart';

Future<void> runScan({
  required String node,
  required List<String> tradeSymbolPairs,
  required Cycle cycle,
}) async {
  final service = getServiceForNodeUri(node);
  final client = ViteClient(service);
  final vitex = VitexService(client: client);
  final tokens = await vitex.getAllTokenInfos();
  final tradePairs = getTradePairs(tradeSymbolPairs, tokens);

  Future<void> cleanup() async {
    await client.close();
  }

  try {
    print('Recovering order books');
    final recoverResults = await recover(
      vitex: vitex,
      tokens: tokens,
      tradePairs: tradePairs,
      cycle: cycle,
    );

    final orderBooks = recoverResults.orderBooks;
    final stream = recoverResults.stream;
    final startHeight = stream.startHeight;
    final endHeight = stream.endHeight;

    print('Scanning height range $startHeight - $endHeight');
    final scanResults = await scan(
      orderBooks: orderBooks,
      stream: stream,
      tradePairs: tradePairs,
      cycle: cycle,
    );

    print('Generating reports');
    final formatter = DateFormat('yyyy-MM-dd_hh-mm-ss');
    final now = DateTime.now().toUtc();
    final nowStr = '${formatter.format(now)}Z';
    final nowTimestamp = now.microsecondsSinceEpoch ~/ 1000;
    final outputPath = 'results';
    final runPath = '$nowTimestamp($nowStr)';

    final scanResultsPath = path.join(
      outputPath,
      runPath,
      'scan_results_${cycle.start}_${cycle.end}.json',
    );
    print('Exporting scan results to $scanResultsPath');
    final scanResultsContents = prettyPrintJson(scanResults.toJson());
    await writeToFile(path: scanResultsPath, contents: scanResultsContents);

    for (final market in scanResults.markets.values) {
      final tradePair = market.tradePair;
      final restingOrders = market.restingOrders;
      final trades = market.userTrades;

      final restingOrdersPath = path.join(
        outputPath,
        runPath,
        'resting_orders_${cycle.start}_${cycle.end}_${tradePair.tradePairSymbols}.csv',
      );
      print(
          'Exporting resting orders CSV for ${tradePair.tradePairSymbols} to $restingOrdersPath');
      final restingOrdersCsv = csvForRestingOrders(restingOrders);
      await writeToFile(path: restingOrdersPath, contents: restingOrdersCsv);

      final userTradesPath = path.join(
        outputPath,
        runPath,
        'user_trades_${cycle.start}_${cycle.end}_${tradePair.tradePairSymbols}.csv',
      );
      print(
          'Exporting user trades CSV for ${tradePair.tradePairSymbols} to $userTradesPath');
      final userTradesCsv = csvForUserTrades(trades);
      await writeToFile(path: userTradesPath, contents: userTradesCsv);
    }
  } catch (e) {
    print(e);
    return cleanup();
  }

  await cleanup();
  print('Done!');
}
