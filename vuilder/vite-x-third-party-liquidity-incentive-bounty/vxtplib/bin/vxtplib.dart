import 'dart:io';

import 'package:args/command_runner.dart';
import 'package:vxtplib/commands/config_command.dart';
import 'package:vxtplib/commands/distribute_command.dart';
import 'package:vxtplib/commands/scan_command.dart';

Future<void> main(List<String> arguments) async {
  final runner = CommandRunner(
    'vxtplib',
    'ViteX Third-Party Liquidity Incentive Bounty',
  );
  runner
    ..addCommand(ConfigCommand())
    ..addCommand(ScanCommand())
    ..addCommand(DistributeCommand());

  return runner.run(arguments).catchError((error) {
    print(error);
    exit(64);
  });
}
