import 'dart:convert';
import 'dart:io';

import 'types.dart';

Future<void> writeToFile({
  required String path,
  required String contents,
}) async {
  final file = File(path);
  await file.create(recursive: true);
  await file.writeAsString(contents, flush: true);
}

String csvForUserTrades(List<UserTrade> trades) {
  final buffer = StringBuffer();
  final header = [
    'Timestamp',
    'Address',
    'Amount',
    'Quantity',
    'Price',
    'OrderId',
    'OrderSide',
    'TraderSide',
    'BlockHash',
  ].join(',');

  buffer.writeln(header);
  for (final trade in trades) {
    final items = [
      trade.timestamp,
      trade.address,
      trade.amount,
      trade.quantity,
      trade.price,
      trade.orderId,
      trade.orderSide.name,
      trade.traderSide.name,
      trade.blockHash,
    ];
    buffer.writeln(items.join(','));
  }
  return buffer.toString();
}

String csvForRestingOrders(List<RestingOrder> orders) {
  final buffer = StringBuffer();
  final header = [
    'StartTimestamp',
    'EndTimestamp',
    'Address',
    'Amount',
    'Quantity',
    'Price',
    'OrderId',
    'OrderSide',
  ].join(',');

  buffer.writeln(header);
  for (final order in orders) {
    final items = [
      order.startTimestamp,
      order.endTimestamp,
      order.address,
      order.amount,
      order.quantity,
      order.price,
      order.orderId,
      order.side.name,
    ];
    buffer.writeln(items.join(','));
  }

  return buffer.toString();
}

String prettyPrintJson(Map<String, dynamic> json) {
  final encoder = JsonEncoder.withIndent('  ');
  return encoder.convert(json);
}
