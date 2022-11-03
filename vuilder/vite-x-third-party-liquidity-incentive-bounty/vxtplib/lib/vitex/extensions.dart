import 'package:vite/vite.dart';

import '../types.dart';

abstract class DextradeApi {
  Future<T> getMarketOrders<T>(Map<String, dynamic> params);
}

abstract class RpcDextradeApi implements RpcApiBase, DextradeApi {
  @override
  Future<T> getMarketOrders<T>(Map<String, dynamic> params) =>
      makeTypedRpcCall('dextrade_getMarketOrders', [params]);
}

extension DextradeExt on RpcApi {
  Future<T> getMarketOrders<T>(Map<String, dynamic> params) =>
      makeTypedRpcCall('dextrade_getMarketOrders', [params]);
}

extension LedgerApiExt on RpcApi {
  Future<List<T>> getAccountBlocksByHeightRange<T>(
          String address, int from, int to) =>
      makeTypedListRpcCall(
          'ledger_getAccountBlocksByHeightRange', [address, from, to]);

  Future<T> getSnapshotBlockBeforeTime<T>(int time) =>
      makeTypedRpcCall('ledger_getSnapshotBlockBeforeTime', [time]);
}

extension Dextrade on ViteClient {
  Future<OrdersResponse> getMarketOrders(MarketOrderParam param) {
    typeMapping[OrdersResponse] = OrdersResponse.fromJson;
    return api.getMarketOrders(param.toJson());
  }
}

extension LedgerExt on ViteClient {
  Future<List<AccountBlock>> getAccountBlocksByHeightRange(
          Address address, int from, int to) =>
      api.getAccountBlocksByHeightRange(address.viteAddress, from, to);

  Future<SnapshotBlock> getSnapshotBlockBeforeTime(int time) =>
      api.getSnapshotBlockBeforeTime(time);
}

extension SbpStatsExt on ViteClient {
  Future<int> getCurrentCycle() =>
      api.makeTypedRpcCall('sbpstats_time2Index', [null, 2]);

  Future<TimeRange> getTimeRangeForCycle(int cycle) {
    typeMapping[TimeRange] = TimeRange.fromJson;
    return api.makeTypedRpcCall('sbpstats_index2Time', [cycle, 2]);
  }
}
