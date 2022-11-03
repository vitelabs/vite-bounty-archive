import 'package:fast_immutable_collections/fast_immutable_collections.dart';
import 'package:vite/vite.dart';

import '../constants.dart';
import '../types.dart';
import '../vitex/vitex_service.dart';
import 'block_event_handler.dart';

class BlockEventStream {
  var _events = IList<BlockEvent>();
  final int startHeight;
  final int endHeight;

  IList<BlockEvent> get events => _events;

  BlockEventStream({
    required this.startHeight,
    required this.endHeight,
    IList<BlockEvent> events = const IListConst([]),
  }) {
    addBlockEvents(events);
  }

  void addBlockEvents(Iterable<BlockEvent> events) {
    _events = _events
        .addAll(events)
        .sortOrdered((e1, e2) => e1.height.compareTo(e1.height));
  }

  Future<void> init({
    required VitexService vitex,
    required Tokens tokens,
  }) async {
    final accBlockVmLogsList = await vitex.getAccBlockVmLogsByHeightRange(
      address: kDexTradeContractAddress,
      startHeight: startHeight,
      endHeight: endHeight,
    );
    addBlockEvents(
      accBlockVmLogsList.map((e) => BlockEvent.fromAccBlockVmLogs(e, tokens)),
    );
  }

  void _patchOrderEventsTimestamp({
    required Map<String, AccountBlock> accountBlockMap,
  }) {
    for (final event in _events) {
      for (final orderEvent in event.orderEvents) {
        if (orderEvent.ignore) {
          continue;
        }
        final accountBlock = accountBlockMap[orderEvent.blockHash];
        if (accountBlock != null) {
          orderEvent.timestamp = accountBlock.timestamp;
        }
      }
    }
  }

  Future<void> patchOrderEventsTimestamp({
    required VitexService vitex,
  }) async {
    final accountBlockMap = await vitex.getTradeContractAccBlockMap(
      startHeight: startHeight,
      endHeight: endHeight,
    );

    _patchOrderEventsTimestamp(accountBlockMap: accountBlockMap);
  }

  void travel(BlockEventHandler handler, {required bool inReverse}) {
    if (inReverse) {
      for (final event in events.reversed) {
        handler.revertBlockEvent(event);
      }
      return;
    }
    for (final event in events) {
      handler.onwardBlockEvent(event);
    }
  }

  BlockEventStream subStream(int start, int end) {
    final subEvents = events.removeWhere(
      (event) => event.height < start || event.height > end,
    );
    return BlockEventStream(
      startHeight: start,
      endHeight: end,
      events: subEvents,
    );
  }
}
