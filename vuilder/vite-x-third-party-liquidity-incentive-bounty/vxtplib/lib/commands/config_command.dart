import 'package:args/command_runner.dart';
import 'package:path/path.dart' as path;

import '../run_config.dart';
import '../util.dart';

class ConfigCommand extends Command {
  @override
  final name = 'config';

  @override
  final description = 'Generate config file';

  ConfigCommand() {
    final parser = argParser;
    parser.addOption(
      'rewardToken',
      abbr: 'r',
      help: 'Reward token id (Defaults to VITE)',
      valueHelp: 'tti_5649544520544f4b454e6e40',
    );
    parser.addOption(
      'tradingReward',
      help: 'Total trading rewards amount (Decimal format)',
      valueHelp: '100.00',
    );
    parser.addOption(
      'limitOrderReward',
      help: 'Total limit order rewards amount (Decimal format)',
      valueHelp: '50.00',
    );
    parser.addOption(
      'orderDistanceThreshold',
      help: 'Limit order distance threshold (Decimal format)',
      valueHelp: '0.1',
    );
    parser.addOption(
      'tradingPair',
      abbr: 't',
      help: 'ViteX trading pair. Example VITE_BTC-000',
      valueHelp: 'VITE_BTC-000',
    );
    parser.addOption(
      'output',
      abbr: 'o',
      help: 'Path for config file (Defaults to config/config.json)',
      valueHelp: 'config/config.json',
    );
  }

  @override
  Future<void> run() async {
    final args = argResults;
    if (args == null) {
      print('Missing command arguments');
      return;
    }

    final rewardToken =
        tryParseTokenId(args['rewardToken'] ?? 'tti_5649544520544f4b454e6e40');
    if (rewardToken == null) {
      throw Exception('Failed to parse reward token');
    }

    final tradingReward = tryParseDecimal(args['tradingReward'] ?? '100.00');
    if (tradingReward == null) {
      throw Exception('Failed to parse total trading reward');
    }

    final limitOrderReward =
        tryParseDecimal(args['limitOrderReward'] ?? '50.00');
    if (limitOrderReward == null) {
      throw Exception('Failed to parse total limit order reward');
    }

    final orderDistanceThreshold =
        tryParseDecimal(args['orderDistanceThreshold'] ?? '0.1');
    if (orderDistanceThreshold == null) {
      throw Exception('Failed to parse order distance threshold');
    }

    final output = args['output'] ?? path.join('config', 'config.json');
    final tradingPair = (args['tradingPair'] as String?) ?? 'VITE_BTC-000';

    return runConfig(
      rewardToken: rewardToken,
      tradingReward: tradingReward,
      limitOrderReward: limitOrderReward,
      orderDistanceThreshold: orderDistanceThreshold,
      tradingPair: tradingPair,
      output: output,
    );
  }
}
