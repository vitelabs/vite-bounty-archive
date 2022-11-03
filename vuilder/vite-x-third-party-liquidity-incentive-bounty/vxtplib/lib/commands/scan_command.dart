import 'package:args/command_runner.dart';

import '../run_scan.dart';
import '../types.dart';
import '../util.dart';

class ScanCommand extends Command {
  @override
  final name = 'scan';

  @override
  final description = 'Scan ViteX activity over a period of time';

  ScanCommand() {
    final parser = argParser;
    parser.addOption(
      'node',
      abbr: 'n',
      help: 'URI of Vite node to connect to',
    );
    parser.addOption(
      'tradePairs',
      abbr: 't',
      help:
          'List of ViteX trading pairs separated by comma. Example VITE_BTC-000,VITC-000_VITE',
    );
    parser.addOption(
      'startTime',
      abbr: 's',
      help: 'The start time in unix timestamp format',
    );
    parser.addOption(
      'endTime',
      abbr: 'e',
      help: 'The end time in unix timestamp format',
    );
  }

  @override
  Future<void> run() async {
    final args = argResults;
    if (args == null) {
      print('Missing command arguments');
      return;
    }

    final start = tryParseTime(args['startTime']);
    final end = tryParseTime(args['endTime']);

    if (start == null) {
      throw Exception('Failed to parse start time');
    }
    if (end == null) {
      throw Exception('Failed to parse end time');
    }

    final cycle = Cycle.period(start: start, end: end);

    return runScan(
      node: args['node'],
      tradeSymbolPairs: (args['tradePairs'] as String).split(','),
      cycle: cycle,
    );
  }
}
