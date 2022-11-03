import '../types.dart';
import 'order_book.dart';

abstract class Runnable {
  void run();
}

abstract class OrderEventHandleObserver {
  void beforeRevert(OrderBook book, OrderEvent event) {}

  void afterRevert(OrderBook book, OrderEvent event) {}

  void beforeOnward(OrderBook book, OrderEvent event) {}

  void aferOnward(OrderBook book, OrderEvent event) {}

  void revert(Runnable run, OrderBook book, OrderEvent event) {
    beforeRevert(book, event);
    run.run();
    afterRevert(book, event);
  }

  void onward(Runnable run, OrderBook book, OrderEvent event) {
    beforeOnward(book, event);
    run.run();
    aferOnward(book, event);
  }
}
