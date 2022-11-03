import 'package:decimal/decimal.dart';

import '../types.dart';
import 'block_event_handler.dart';
import 'order_event_handle_observer.dart';
import 'order_event_handler.dart';

abstract class OrderBookBase implements OrderEventHandler, BlockEventHandler {
  List<OrderModel> get buys;

  List<OrderModel> get sells;

  Map<String, OrderModel> get orders; // <OrderId,OrderModel>

  Decimal? getBuy1Price();

  Decimal? getSell1Price();

  int get currentBlockHeight;

  Decimal getAmountSum();

  int get addCount;

  int get removeCount;

  String hash();

  void setOrderObserver(OrderEventHandleObserver? observer);

  @override
  void revertBlockEvent(BlockEvent event);
  @override
  void onwardBlockEvent(BlockEvent event);

  @override
  void revertOrderEvent(OrderEvent event);
  @override
  void onwardOrderEvent(OrderEvent event);
}
