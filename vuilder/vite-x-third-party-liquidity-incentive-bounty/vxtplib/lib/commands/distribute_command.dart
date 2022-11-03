import 'package:args/command_runner.dart';
import 'package:path/path.dart' as path;

import '../run_distribute.dart';

class DistributeCommand extends Command {
  @override
  final name = 'distribute';

  @override
  final description = 'Distribute rewards for a given cycle';

  DistributeCommand() {
    final parser = argParser;
    parser.addOption(
      'node',
      abbr: 'n',
      help: 'URI of Vite node to connect to',
    );
    parser.addOption(
      'pow',
      abbr: 'p',
      help: 'URI of Pow Server if different from Vite node URI',
    );
    parser.addOption(
      'cycle',
      abbr: 'i',
      help: 'Cycle index for which rewards are distributed',
    );
    parser.addOption(
      'config',
      abbr: 'c',
      help:
          'Path to config file (Defaults to ${path.join('config', 'config.json')})',
    );
    parser.addFlag(
      'simulate',
      abbr: 's',
      help: 'Simulate command, do not actually send rewards',
    );
  }

  @override
  Future<void> run() async {
    final args = argResults;
    if (args == null) {
      print('Missing command arguments');
      return;
    }

    final cycle = args['cycle'];
    int? cycleIndex;
    if (cycle != null) {
      cycleIndex = int.tryParse(args['cycle']);
      if (cycleIndex == null) {
        throw Exception('Failed to parse cycle index');
      }
    }

    return runDistribute(
      node: args['node'] ?? 'http://localhost:48132',
      pow: args['pow'],
      cycleIndex: cycleIndex,
      configPath: args['config'] ?? path.join('config', 'config.json'),
      isDryRun: args['simulate'] ?? false,
    );
  }
}
