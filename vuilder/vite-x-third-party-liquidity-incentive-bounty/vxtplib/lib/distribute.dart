import 'package:decimal/decimal.dart';
import 'package:vite/vite.dart';

import 'observers/qualifying_order_observer.dart';
import 'orderbook/block_event_stream.dart';
import 'orderbook/order_books.dart';
import 'types.dart';

List<QualifyingOrder> getThresholdQualifyingOrders({
  required OrderBooks orderBooks,
  required BlockEventStream stream,
  required List<RestingOrder> orders,
  required RewardsConfig config,
  required Cycle cycle,
}) {
  final observer = QualifyingOrderObserver(
    config: config,
    restingOrders: orders,
  );

  orderBooks.setOrderObserver(observer);
  stream.travel(orderBooks, inReverse: false);
  orderBooks.setOrderObserver(null);

  orderBooks.books.forEach((tradePair, book) {
    observer.end(book, cycle.end);
  });

  return observer.getQualifyingRestingOrders();
}

RewardsTotal getRewardsTotal({
  required List<UserReward> rewards,
  required TokenInfo rewardTokenInfo,
}) {
  var tradingRewardsValue = Decimal.zero;
  var limitOrderRewardsValue = Decimal.zero;
  var totalRewardsValue = Decimal.zero;
  for (final reward in rewards) {
    tradingRewardsValue += reward.tradingReward;
    limitOrderRewardsValue += reward.limitOrdersReward;
    totalRewardsValue += reward.totalReward;
  }

  final tradingRewards = Amount.value(
    tradingRewardsValue,
    tokenInfo: rewardTokenInfo,
  ).value;
  final limitOrderRewards = Amount.value(
    limitOrderRewardsValue,
    tokenInfo: rewardTokenInfo,
  ).value;
  final totalRewards = Amount.value(
    totalRewardsValue,
    tokenInfo: rewardTokenInfo,
  ).value;

  return RewardsTotal(
    tradingReward: tradingRewards,
    limitOrderReward: limitOrderRewards,
    totalReward: totalRewards,
  );
}

Future<CycleRewards> computeRewards({
  required Cycle cycle,
  required RewardsConfig config,
  required TokenInfo rewardTokenInfo,
  required List<UserTrade> userTrades,
  required List<QualifyingOrder> restingOrders,
}) async {
  // Increase number of decimal for computing rewards
  final decimals = rewardTokenInfo.decimals + 10;

  final tradeRewardsMapping = <String, Decimal>{};
  final restingRewardsMapping = <String, Decimal>{};
  final addresses = <String>{};

  final totalTraded = userTrades.fold<Decimal>(
    Decimal.zero,
    (total, trade) => total + trade.amount,
  );

  for (final trade in userTrades) {
    final reward = (trade.amount * config.tradingReward / totalTraded)
        .toDecimal(scaleOnInfinitePrecision: decimals);
    tradeRewardsMapping.update(
      trade.address,
      (value) => value + reward,
      ifAbsent: () => reward,
    );
    addresses.add(trade.address);
  }

  final totalResting = restingOrders.fold<Decimal>(
    Decimal.zero,
    (total, order) {
      return total + order.weight;
    },
  );

  for (final order in restingOrders) {
    final reward = ((order.weight * config.limitOrderReward) / totalResting)
        .toDecimal(scaleOnInfinitePrecision: decimals);
    restingRewardsMapping.update(
      order.address,
      (value) => value + reward,
      ifAbsent: () => reward,
    );
    addresses.add(order.address);
  }

  final rewards = addresses.map((address) {
    final tradeReward = tradeRewardsMapping[address] ?? Decimal.zero;
    final tradeRewardAmount = Amount.value(
      tradeReward,
      tokenInfo: rewardTokenInfo,
    );
    final restingReward = restingRewardsMapping[address] ?? Decimal.zero;
    final restingRewardAmount = Amount.value(
      restingReward,
      tokenInfo: rewardTokenInfo,
    );

    return UserReward.create(
      address: address,
      trading: tradeRewardAmount.value,
      limitOrders: restingRewardAmount.value,
    );
  }).toList()
    ..sort((r1, r2) => r2.totalReward.compareTo(r1.totalReward));

  final rewardsTotal = getRewardsTotal(
    rewards: rewards,
    rewardTokenInfo: rewardTokenInfo,
  );

  return CycleRewards(
    cycle: cycle,
    config: config,
    totalRewards: rewardsTotal,
    rewards: rewards,
  );
}

Future<DistributionLog> distributeRewards({
  required CycleRewards rewards,
  required Address account,
  required AccountService service,
}) async {
  final canSign = await service.signer.canSignForAddress(account);
  if (!canSign) {
    throw Exception('Can\'t sign for $account');
  }

  final client = service.client;
  final tokenId = rewards.config.rewardToken.tokenId;
  final tokenInfo = await client.getTokenInfo(tokenId);

  // Check account has enough balance
  final totalRewards = rewards.totalRewards.totalReward;
  final accountInfo = await client.getAccountInfo(account);
  final balanceInfo = accountInfo.balances[tokenId];
  if (balanceInfo == null || balanceInfo.value < totalRewards) {
    throw Exception('Account balance does not cover total rewards');
  }

  final logs = <String, SendLog>{};
  for (final reward in rewards.rewards) {
    final amount = Amount.value(reward.totalReward, tokenInfo: tokenInfo);
    try {
      final toAddress = Address.parse(reward.address);
      final hash = await service.transferAmount(
        amount,
        address: account,
        toAddress: toAddress,
      );
      AccountBlock? tx;
      int count = 0;
      do {
        await Future.delayed(const Duration(seconds: 1));
        tx = await client.getAccountBlockByHash(hash);
        count += 1;
      } while (tx.firstSnapshotHash == null && count < 60);
      logs[reward.address] = SendLog.succeeded(hash);
      print(
          'Sent ${amount.value} ${tokenInfo.symbolLabel} to ${reward.address}');
    } catch (e) {
      logs[reward.address] = SendLog.failed('$e');
      print('Failed to send ${amount.value} to ${reward.address}');
    }
  }

  return DistributionLog(rewards: rewards, logs: logs);
}
