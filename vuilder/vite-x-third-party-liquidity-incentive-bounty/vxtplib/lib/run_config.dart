import 'dart:io';

import 'package:decimal/decimal.dart';
import 'package:vite/vite.dart';

import 'output.dart';
import 'types.dart';

void runConfig({
  required Token rewardToken,
  required Decimal tradingReward,
  required Decimal limitOrderReward,
  required Decimal orderDistanceThreshold,
  required String tradingPair,
  required String output,
}) {
  final config = RewardsConfig(
    rewardToken: rewardToken,
    tradingReward: tradingReward,
    limitOrderReward: limitOrderReward,
    orderDistanceThreshold: orderDistanceThreshold,
    tradingPair: tradingPair,
  );

  final file = File(output);
  final json = prettyPrintJson(config.toJson());
  file.createSync(recursive: true);
  file.writeAsStringSync(json, flush: true);
  print('Created config file at path: $file');
}
