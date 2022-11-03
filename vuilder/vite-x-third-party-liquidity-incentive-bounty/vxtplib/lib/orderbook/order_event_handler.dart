import '../types.dart';

abstract class OrderEventHandler {
  void revertOrderEvent(OrderEvent event);
  void onwardOrderEvent(OrderEvent event);
}