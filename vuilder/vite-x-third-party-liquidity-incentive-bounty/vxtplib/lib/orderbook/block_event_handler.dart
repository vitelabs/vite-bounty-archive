import '../types.dart';

abstract class BlockEventHandler {
  void revertBlockEvent(BlockEvent event);
  void onwardBlockEvent(BlockEvent event);
}