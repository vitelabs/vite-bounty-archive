import '../constants.dart';
import '../types.dart';
import '../vitex/vitex_service.dart';
import 'block_event_stream.dart';
import 'order_books.dart';

class Traveller {
  Future<OrderBooks> travelInTime({
    required int prevTimestamp,
    required Tokens tokens,
    required VitexService vitex,
    required List<TradePair> tradePairs,
  }) async {
    final candidates = <OrderBooks>[];

    final n = 5;
    for (int i = 0; i < n; ++i) {
      final orderBooks = OrderBooks(vitex: vitex, tradePairs: tradePairs);
      await orderBooks.initRemote();
      candidates.add(orderBooks);
    }

    final startHeight = await vitex.getSnapshotHeightFor(
      address: kDexTradeContractAddress,
      timestamp: prevTimestamp,
    );
    final endHeight =
        await vitex.getLatestAccountBlockHeight(kDexTradeContractAddress);
    final stream = BlockEventStream(
      startHeight: startHeight,
      endHeight: endHeight,
    );
    await stream.init(vitex: vitex, tokens: tokens);

    for (final candidate in candidates) {
      stream.travel(candidate, inReverse: true);
    }

    return elect(candidates);
  }

  OrderBooks elect(List<OrderBooks> candidates) {
    final candidateMap = <String, OrderBooks>{};
    final countMap = <String, int>{};

    for (final candidate in candidates) {
      final hash = candidate.hash();
      candidateMap[hash] = candidate;
      countMap.update(hash, (value) => value + 1, ifAbsent: () => 1);
    }

    String? max;
    int maxCount = 0;

    for (final entry in countMap.entries) {
      if (entry.value > maxCount) {
        maxCount = entry.value;
        max = entry.key;
      }
    }
    return candidateMap[max] ?? candidates.first;
  }
}
