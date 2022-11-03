// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'types.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$OrderStatus {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() pending,
    required TResult Function() partiallyExecuted,
    required TResult Function() fullyExecuted,
    required TResult Function() cancelled,
    required TResult Function() orderFailure,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? pending,
    TResult? Function()? partiallyExecuted,
    TResult? Function()? fullyExecuted,
    TResult? Function()? cancelled,
    TResult? Function()? orderFailure,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? pending,
    TResult Function()? partiallyExecuted,
    TResult Function()? fullyExecuted,
    TResult Function()? cancelled,
    TResult Function()? orderFailure,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_OrderStatusPending value) pending,
    required TResult Function(_OrderStatusPartiallyExecuted value)
        partiallyExecuted,
    required TResult Function(_OrderStatusFullyExecuted value) fullyExecuted,
    required TResult Function(_OrderStatusCancelled value) cancelled,
    required TResult Function(_OrderStatusOrderFailure value) orderFailure,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_OrderStatusPending value)? pending,
    TResult? Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult? Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult? Function(_OrderStatusCancelled value)? cancelled,
    TResult? Function(_OrderStatusOrderFailure value)? orderFailure,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_OrderStatusPending value)? pending,
    TResult Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult Function(_OrderStatusCancelled value)? cancelled,
    TResult Function(_OrderStatusOrderFailure value)? orderFailure,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderStatusCopyWith<$Res> {
  factory $OrderStatusCopyWith(
          OrderStatus value, $Res Function(OrderStatus) then) =
      _$OrderStatusCopyWithImpl<$Res, OrderStatus>;
}

/// @nodoc
class _$OrderStatusCopyWithImpl<$Res, $Val extends OrderStatus>
    implements $OrderStatusCopyWith<$Res> {
  _$OrderStatusCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;
}

/// @nodoc
abstract class _$$_OrderStatusPendingCopyWith<$Res> {
  factory _$$_OrderStatusPendingCopyWith(_$_OrderStatusPending value,
          $Res Function(_$_OrderStatusPending) then) =
      __$$_OrderStatusPendingCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_OrderStatusPendingCopyWithImpl<$Res>
    extends _$OrderStatusCopyWithImpl<$Res, _$_OrderStatusPending>
    implements _$$_OrderStatusPendingCopyWith<$Res> {
  __$$_OrderStatusPendingCopyWithImpl(
      _$_OrderStatusPending _value, $Res Function(_$_OrderStatusPending) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_OrderStatusPending implements _OrderStatusPending {
  const _$_OrderStatusPending();

  @override
  String toString() {
    return 'OrderStatus.pending()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$_OrderStatusPending);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() pending,
    required TResult Function() partiallyExecuted,
    required TResult Function() fullyExecuted,
    required TResult Function() cancelled,
    required TResult Function() orderFailure,
  }) {
    return pending();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? pending,
    TResult? Function()? partiallyExecuted,
    TResult? Function()? fullyExecuted,
    TResult? Function()? cancelled,
    TResult? Function()? orderFailure,
  }) {
    return pending?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? pending,
    TResult Function()? partiallyExecuted,
    TResult Function()? fullyExecuted,
    TResult Function()? cancelled,
    TResult Function()? orderFailure,
    required TResult orElse(),
  }) {
    if (pending != null) {
      return pending();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_OrderStatusPending value) pending,
    required TResult Function(_OrderStatusPartiallyExecuted value)
        partiallyExecuted,
    required TResult Function(_OrderStatusFullyExecuted value) fullyExecuted,
    required TResult Function(_OrderStatusCancelled value) cancelled,
    required TResult Function(_OrderStatusOrderFailure value) orderFailure,
  }) {
    return pending(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_OrderStatusPending value)? pending,
    TResult? Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult? Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult? Function(_OrderStatusCancelled value)? cancelled,
    TResult? Function(_OrderStatusOrderFailure value)? orderFailure,
  }) {
    return pending?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_OrderStatusPending value)? pending,
    TResult Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult Function(_OrderStatusCancelled value)? cancelled,
    TResult Function(_OrderStatusOrderFailure value)? orderFailure,
    required TResult orElse(),
  }) {
    if (pending != null) {
      return pending(this);
    }
    return orElse();
  }
}

abstract class _OrderStatusPending implements OrderStatus {
  const factory _OrderStatusPending() = _$_OrderStatusPending;
}

/// @nodoc
abstract class _$$_OrderStatusPartiallyExecutedCopyWith<$Res> {
  factory _$$_OrderStatusPartiallyExecutedCopyWith(
          _$_OrderStatusPartiallyExecuted value,
          $Res Function(_$_OrderStatusPartiallyExecuted) then) =
      __$$_OrderStatusPartiallyExecutedCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_OrderStatusPartiallyExecutedCopyWithImpl<$Res>
    extends _$OrderStatusCopyWithImpl<$Res, _$_OrderStatusPartiallyExecuted>
    implements _$$_OrderStatusPartiallyExecutedCopyWith<$Res> {
  __$$_OrderStatusPartiallyExecutedCopyWithImpl(
      _$_OrderStatusPartiallyExecuted _value,
      $Res Function(_$_OrderStatusPartiallyExecuted) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_OrderStatusPartiallyExecuted implements _OrderStatusPartiallyExecuted {
  const _$_OrderStatusPartiallyExecuted();

  @override
  String toString() {
    return 'OrderStatus.partiallyExecuted()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_OrderStatusPartiallyExecuted);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() pending,
    required TResult Function() partiallyExecuted,
    required TResult Function() fullyExecuted,
    required TResult Function() cancelled,
    required TResult Function() orderFailure,
  }) {
    return partiallyExecuted();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? pending,
    TResult? Function()? partiallyExecuted,
    TResult? Function()? fullyExecuted,
    TResult? Function()? cancelled,
    TResult? Function()? orderFailure,
  }) {
    return partiallyExecuted?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? pending,
    TResult Function()? partiallyExecuted,
    TResult Function()? fullyExecuted,
    TResult Function()? cancelled,
    TResult Function()? orderFailure,
    required TResult orElse(),
  }) {
    if (partiallyExecuted != null) {
      return partiallyExecuted();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_OrderStatusPending value) pending,
    required TResult Function(_OrderStatusPartiallyExecuted value)
        partiallyExecuted,
    required TResult Function(_OrderStatusFullyExecuted value) fullyExecuted,
    required TResult Function(_OrderStatusCancelled value) cancelled,
    required TResult Function(_OrderStatusOrderFailure value) orderFailure,
  }) {
    return partiallyExecuted(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_OrderStatusPending value)? pending,
    TResult? Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult? Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult? Function(_OrderStatusCancelled value)? cancelled,
    TResult? Function(_OrderStatusOrderFailure value)? orderFailure,
  }) {
    return partiallyExecuted?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_OrderStatusPending value)? pending,
    TResult Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult Function(_OrderStatusCancelled value)? cancelled,
    TResult Function(_OrderStatusOrderFailure value)? orderFailure,
    required TResult orElse(),
  }) {
    if (partiallyExecuted != null) {
      return partiallyExecuted(this);
    }
    return orElse();
  }
}

abstract class _OrderStatusPartiallyExecuted implements OrderStatus {
  const factory _OrderStatusPartiallyExecuted() =
      _$_OrderStatusPartiallyExecuted;
}

/// @nodoc
abstract class _$$_OrderStatusFullyExecutedCopyWith<$Res> {
  factory _$$_OrderStatusFullyExecutedCopyWith(
          _$_OrderStatusFullyExecuted value,
          $Res Function(_$_OrderStatusFullyExecuted) then) =
      __$$_OrderStatusFullyExecutedCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_OrderStatusFullyExecutedCopyWithImpl<$Res>
    extends _$OrderStatusCopyWithImpl<$Res, _$_OrderStatusFullyExecuted>
    implements _$$_OrderStatusFullyExecutedCopyWith<$Res> {
  __$$_OrderStatusFullyExecutedCopyWithImpl(_$_OrderStatusFullyExecuted _value,
      $Res Function(_$_OrderStatusFullyExecuted) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_OrderStatusFullyExecuted implements _OrderStatusFullyExecuted {
  const _$_OrderStatusFullyExecuted();

  @override
  String toString() {
    return 'OrderStatus.fullyExecuted()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_OrderStatusFullyExecuted);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() pending,
    required TResult Function() partiallyExecuted,
    required TResult Function() fullyExecuted,
    required TResult Function() cancelled,
    required TResult Function() orderFailure,
  }) {
    return fullyExecuted();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? pending,
    TResult? Function()? partiallyExecuted,
    TResult? Function()? fullyExecuted,
    TResult? Function()? cancelled,
    TResult? Function()? orderFailure,
  }) {
    return fullyExecuted?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? pending,
    TResult Function()? partiallyExecuted,
    TResult Function()? fullyExecuted,
    TResult Function()? cancelled,
    TResult Function()? orderFailure,
    required TResult orElse(),
  }) {
    if (fullyExecuted != null) {
      return fullyExecuted();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_OrderStatusPending value) pending,
    required TResult Function(_OrderStatusPartiallyExecuted value)
        partiallyExecuted,
    required TResult Function(_OrderStatusFullyExecuted value) fullyExecuted,
    required TResult Function(_OrderStatusCancelled value) cancelled,
    required TResult Function(_OrderStatusOrderFailure value) orderFailure,
  }) {
    return fullyExecuted(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_OrderStatusPending value)? pending,
    TResult? Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult? Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult? Function(_OrderStatusCancelled value)? cancelled,
    TResult? Function(_OrderStatusOrderFailure value)? orderFailure,
  }) {
    return fullyExecuted?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_OrderStatusPending value)? pending,
    TResult Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult Function(_OrderStatusCancelled value)? cancelled,
    TResult Function(_OrderStatusOrderFailure value)? orderFailure,
    required TResult orElse(),
  }) {
    if (fullyExecuted != null) {
      return fullyExecuted(this);
    }
    return orElse();
  }
}

abstract class _OrderStatusFullyExecuted implements OrderStatus {
  const factory _OrderStatusFullyExecuted() = _$_OrderStatusFullyExecuted;
}

/// @nodoc
abstract class _$$_OrderStatusCancelledCopyWith<$Res> {
  factory _$$_OrderStatusCancelledCopyWith(_$_OrderStatusCancelled value,
          $Res Function(_$_OrderStatusCancelled) then) =
      __$$_OrderStatusCancelledCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_OrderStatusCancelledCopyWithImpl<$Res>
    extends _$OrderStatusCopyWithImpl<$Res, _$_OrderStatusCancelled>
    implements _$$_OrderStatusCancelledCopyWith<$Res> {
  __$$_OrderStatusCancelledCopyWithImpl(_$_OrderStatusCancelled _value,
      $Res Function(_$_OrderStatusCancelled) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_OrderStatusCancelled implements _OrderStatusCancelled {
  const _$_OrderStatusCancelled();

  @override
  String toString() {
    return 'OrderStatus.cancelled()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$_OrderStatusCancelled);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() pending,
    required TResult Function() partiallyExecuted,
    required TResult Function() fullyExecuted,
    required TResult Function() cancelled,
    required TResult Function() orderFailure,
  }) {
    return cancelled();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? pending,
    TResult? Function()? partiallyExecuted,
    TResult? Function()? fullyExecuted,
    TResult? Function()? cancelled,
    TResult? Function()? orderFailure,
  }) {
    return cancelled?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? pending,
    TResult Function()? partiallyExecuted,
    TResult Function()? fullyExecuted,
    TResult Function()? cancelled,
    TResult Function()? orderFailure,
    required TResult orElse(),
  }) {
    if (cancelled != null) {
      return cancelled();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_OrderStatusPending value) pending,
    required TResult Function(_OrderStatusPartiallyExecuted value)
        partiallyExecuted,
    required TResult Function(_OrderStatusFullyExecuted value) fullyExecuted,
    required TResult Function(_OrderStatusCancelled value) cancelled,
    required TResult Function(_OrderStatusOrderFailure value) orderFailure,
  }) {
    return cancelled(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_OrderStatusPending value)? pending,
    TResult? Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult? Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult? Function(_OrderStatusCancelled value)? cancelled,
    TResult? Function(_OrderStatusOrderFailure value)? orderFailure,
  }) {
    return cancelled?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_OrderStatusPending value)? pending,
    TResult Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult Function(_OrderStatusCancelled value)? cancelled,
    TResult Function(_OrderStatusOrderFailure value)? orderFailure,
    required TResult orElse(),
  }) {
    if (cancelled != null) {
      return cancelled(this);
    }
    return orElse();
  }
}

abstract class _OrderStatusCancelled implements OrderStatus {
  const factory _OrderStatusCancelled() = _$_OrderStatusCancelled;
}

/// @nodoc
abstract class _$$_OrderStatusOrderFailureCopyWith<$Res> {
  factory _$$_OrderStatusOrderFailureCopyWith(_$_OrderStatusOrderFailure value,
          $Res Function(_$_OrderStatusOrderFailure) then) =
      __$$_OrderStatusOrderFailureCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_OrderStatusOrderFailureCopyWithImpl<$Res>
    extends _$OrderStatusCopyWithImpl<$Res, _$_OrderStatusOrderFailure>
    implements _$$_OrderStatusOrderFailureCopyWith<$Res> {
  __$$_OrderStatusOrderFailureCopyWithImpl(_$_OrderStatusOrderFailure _value,
      $Res Function(_$_OrderStatusOrderFailure) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_OrderStatusOrderFailure implements _OrderStatusOrderFailure {
  const _$_OrderStatusOrderFailure();

  @override
  String toString() {
    return 'OrderStatus.orderFailure()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_OrderStatusOrderFailure);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() pending,
    required TResult Function() partiallyExecuted,
    required TResult Function() fullyExecuted,
    required TResult Function() cancelled,
    required TResult Function() orderFailure,
  }) {
    return orderFailure();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? pending,
    TResult? Function()? partiallyExecuted,
    TResult? Function()? fullyExecuted,
    TResult? Function()? cancelled,
    TResult? Function()? orderFailure,
  }) {
    return orderFailure?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? pending,
    TResult Function()? partiallyExecuted,
    TResult Function()? fullyExecuted,
    TResult Function()? cancelled,
    TResult Function()? orderFailure,
    required TResult orElse(),
  }) {
    if (orderFailure != null) {
      return orderFailure();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_OrderStatusPending value) pending,
    required TResult Function(_OrderStatusPartiallyExecuted value)
        partiallyExecuted,
    required TResult Function(_OrderStatusFullyExecuted value) fullyExecuted,
    required TResult Function(_OrderStatusCancelled value) cancelled,
    required TResult Function(_OrderStatusOrderFailure value) orderFailure,
  }) {
    return orderFailure(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_OrderStatusPending value)? pending,
    TResult? Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult? Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult? Function(_OrderStatusCancelled value)? cancelled,
    TResult? Function(_OrderStatusOrderFailure value)? orderFailure,
  }) {
    return orderFailure?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_OrderStatusPending value)? pending,
    TResult Function(_OrderStatusPartiallyExecuted value)? partiallyExecuted,
    TResult Function(_OrderStatusFullyExecuted value)? fullyExecuted,
    TResult Function(_OrderStatusCancelled value)? cancelled,
    TResult Function(_OrderStatusOrderFailure value)? orderFailure,
    required TResult orElse(),
  }) {
    if (orderFailure != null) {
      return orderFailure(this);
    }
    return orElse();
  }
}

abstract class _OrderStatusOrderFailure implements OrderStatus {
  const factory _OrderStatusOrderFailure() = _$_OrderStatusOrderFailure;
}

/// @nodoc
mixin _$OrderType {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() limitOrder,
    required TResult Function() marketOrder,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? limitOrder,
    TResult? Function()? marketOrder,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? limitOrder,
    TResult Function()? marketOrder,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_OrderTypeLimitOrder value) limitOrder,
    required TResult Function(_OrderTypeMarketOrder value) marketOrder,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_OrderTypeLimitOrder value)? limitOrder,
    TResult? Function(_OrderTypeMarketOrder value)? marketOrder,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_OrderTypeLimitOrder value)? limitOrder,
    TResult Function(_OrderTypeMarketOrder value)? marketOrder,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderTypeCopyWith<$Res> {
  factory $OrderTypeCopyWith(OrderType value, $Res Function(OrderType) then) =
      _$OrderTypeCopyWithImpl<$Res, OrderType>;
}

/// @nodoc
class _$OrderTypeCopyWithImpl<$Res, $Val extends OrderType>
    implements $OrderTypeCopyWith<$Res> {
  _$OrderTypeCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;
}

/// @nodoc
abstract class _$$_OrderTypeLimitOrderCopyWith<$Res> {
  factory _$$_OrderTypeLimitOrderCopyWith(_$_OrderTypeLimitOrder value,
          $Res Function(_$_OrderTypeLimitOrder) then) =
      __$$_OrderTypeLimitOrderCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_OrderTypeLimitOrderCopyWithImpl<$Res>
    extends _$OrderTypeCopyWithImpl<$Res, _$_OrderTypeLimitOrder>
    implements _$$_OrderTypeLimitOrderCopyWith<$Res> {
  __$$_OrderTypeLimitOrderCopyWithImpl(_$_OrderTypeLimitOrder _value,
      $Res Function(_$_OrderTypeLimitOrder) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_OrderTypeLimitOrder implements _OrderTypeLimitOrder {
  const _$_OrderTypeLimitOrder();

  @override
  String toString() {
    return 'OrderType.limitOrder()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$_OrderTypeLimitOrder);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() limitOrder,
    required TResult Function() marketOrder,
  }) {
    return limitOrder();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? limitOrder,
    TResult? Function()? marketOrder,
  }) {
    return limitOrder?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? limitOrder,
    TResult Function()? marketOrder,
    required TResult orElse(),
  }) {
    if (limitOrder != null) {
      return limitOrder();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_OrderTypeLimitOrder value) limitOrder,
    required TResult Function(_OrderTypeMarketOrder value) marketOrder,
  }) {
    return limitOrder(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_OrderTypeLimitOrder value)? limitOrder,
    TResult? Function(_OrderTypeMarketOrder value)? marketOrder,
  }) {
    return limitOrder?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_OrderTypeLimitOrder value)? limitOrder,
    TResult Function(_OrderTypeMarketOrder value)? marketOrder,
    required TResult orElse(),
  }) {
    if (limitOrder != null) {
      return limitOrder(this);
    }
    return orElse();
  }
}

abstract class _OrderTypeLimitOrder implements OrderType {
  const factory _OrderTypeLimitOrder() = _$_OrderTypeLimitOrder;
}

/// @nodoc
abstract class _$$_OrderTypeMarketOrderCopyWith<$Res> {
  factory _$$_OrderTypeMarketOrderCopyWith(_$_OrderTypeMarketOrder value,
          $Res Function(_$_OrderTypeMarketOrder) then) =
      __$$_OrderTypeMarketOrderCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_OrderTypeMarketOrderCopyWithImpl<$Res>
    extends _$OrderTypeCopyWithImpl<$Res, _$_OrderTypeMarketOrder>
    implements _$$_OrderTypeMarketOrderCopyWith<$Res> {
  __$$_OrderTypeMarketOrderCopyWithImpl(_$_OrderTypeMarketOrder _value,
      $Res Function(_$_OrderTypeMarketOrder) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_OrderTypeMarketOrder implements _OrderTypeMarketOrder {
  const _$_OrderTypeMarketOrder();

  @override
  String toString() {
    return 'OrderType.marketOrder()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$_OrderTypeMarketOrder);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() limitOrder,
    required TResult Function() marketOrder,
  }) {
    return marketOrder();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? limitOrder,
    TResult? Function()? marketOrder,
  }) {
    return marketOrder?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? limitOrder,
    TResult Function()? marketOrder,
    required TResult orElse(),
  }) {
    if (marketOrder != null) {
      return marketOrder();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_OrderTypeLimitOrder value) limitOrder,
    required TResult Function(_OrderTypeMarketOrder value) marketOrder,
  }) {
    return marketOrder(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_OrderTypeLimitOrder value)? limitOrder,
    TResult? Function(_OrderTypeMarketOrder value)? marketOrder,
  }) {
    return marketOrder?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_OrderTypeLimitOrder value)? limitOrder,
    TResult Function(_OrderTypeMarketOrder value)? marketOrder,
    required TResult orElse(),
  }) {
    if (marketOrder != null) {
      return marketOrder(this);
    }
    return orElse();
  }
}

abstract class _OrderTypeMarketOrder implements OrderType {
  const factory _OrderTypeMarketOrder() = _$_OrderTypeMarketOrder;
}

/// @nodoc
mixin _$QuoteMarketType {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() vite,
    required TResult Function() eth,
    required TResult Function() btc,
    required TResult Function() usdt,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? vite,
    TResult? Function()? eth,
    TResult? Function()? btc,
    TResult? Function()? usdt,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? vite,
    TResult Function()? eth,
    TResult Function()? btc,
    TResult Function()? usdt,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_QuoteMarketTypeVite value) vite,
    required TResult Function(_QuoteMarketTypeEth value) eth,
    required TResult Function(_QuoteMarketTypeBtc value) btc,
    required TResult Function(_QuoteMarketTypeUsdt value) usdt,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_QuoteMarketTypeVite value)? vite,
    TResult? Function(_QuoteMarketTypeEth value)? eth,
    TResult? Function(_QuoteMarketTypeBtc value)? btc,
    TResult? Function(_QuoteMarketTypeUsdt value)? usdt,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_QuoteMarketTypeVite value)? vite,
    TResult Function(_QuoteMarketTypeEth value)? eth,
    TResult Function(_QuoteMarketTypeBtc value)? btc,
    TResult Function(_QuoteMarketTypeUsdt value)? usdt,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $QuoteMarketTypeCopyWith<$Res> {
  factory $QuoteMarketTypeCopyWith(
          QuoteMarketType value, $Res Function(QuoteMarketType) then) =
      _$QuoteMarketTypeCopyWithImpl<$Res, QuoteMarketType>;
}

/// @nodoc
class _$QuoteMarketTypeCopyWithImpl<$Res, $Val extends QuoteMarketType>
    implements $QuoteMarketTypeCopyWith<$Res> {
  _$QuoteMarketTypeCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;
}

/// @nodoc
abstract class _$$_QuoteMarketTypeViteCopyWith<$Res> {
  factory _$$_QuoteMarketTypeViteCopyWith(_$_QuoteMarketTypeVite value,
          $Res Function(_$_QuoteMarketTypeVite) then) =
      __$$_QuoteMarketTypeViteCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_QuoteMarketTypeViteCopyWithImpl<$Res>
    extends _$QuoteMarketTypeCopyWithImpl<$Res, _$_QuoteMarketTypeVite>
    implements _$$_QuoteMarketTypeViteCopyWith<$Res> {
  __$$_QuoteMarketTypeViteCopyWithImpl(_$_QuoteMarketTypeVite _value,
      $Res Function(_$_QuoteMarketTypeVite) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_QuoteMarketTypeVite implements _QuoteMarketTypeVite {
  const _$_QuoteMarketTypeVite();

  @override
  String toString() {
    return 'QuoteMarketType.vite()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$_QuoteMarketTypeVite);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() vite,
    required TResult Function() eth,
    required TResult Function() btc,
    required TResult Function() usdt,
  }) {
    return vite();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? vite,
    TResult? Function()? eth,
    TResult? Function()? btc,
    TResult? Function()? usdt,
  }) {
    return vite?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? vite,
    TResult Function()? eth,
    TResult Function()? btc,
    TResult Function()? usdt,
    required TResult orElse(),
  }) {
    if (vite != null) {
      return vite();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_QuoteMarketTypeVite value) vite,
    required TResult Function(_QuoteMarketTypeEth value) eth,
    required TResult Function(_QuoteMarketTypeBtc value) btc,
    required TResult Function(_QuoteMarketTypeUsdt value) usdt,
  }) {
    return vite(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_QuoteMarketTypeVite value)? vite,
    TResult? Function(_QuoteMarketTypeEth value)? eth,
    TResult? Function(_QuoteMarketTypeBtc value)? btc,
    TResult? Function(_QuoteMarketTypeUsdt value)? usdt,
  }) {
    return vite?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_QuoteMarketTypeVite value)? vite,
    TResult Function(_QuoteMarketTypeEth value)? eth,
    TResult Function(_QuoteMarketTypeBtc value)? btc,
    TResult Function(_QuoteMarketTypeUsdt value)? usdt,
    required TResult orElse(),
  }) {
    if (vite != null) {
      return vite(this);
    }
    return orElse();
  }
}

abstract class _QuoteMarketTypeVite implements QuoteMarketType {
  const factory _QuoteMarketTypeVite() = _$_QuoteMarketTypeVite;
}

/// @nodoc
abstract class _$$_QuoteMarketTypeEthCopyWith<$Res> {
  factory _$$_QuoteMarketTypeEthCopyWith(_$_QuoteMarketTypeEth value,
          $Res Function(_$_QuoteMarketTypeEth) then) =
      __$$_QuoteMarketTypeEthCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_QuoteMarketTypeEthCopyWithImpl<$Res>
    extends _$QuoteMarketTypeCopyWithImpl<$Res, _$_QuoteMarketTypeEth>
    implements _$$_QuoteMarketTypeEthCopyWith<$Res> {
  __$$_QuoteMarketTypeEthCopyWithImpl(
      _$_QuoteMarketTypeEth _value, $Res Function(_$_QuoteMarketTypeEth) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_QuoteMarketTypeEth implements _QuoteMarketTypeEth {
  const _$_QuoteMarketTypeEth();

  @override
  String toString() {
    return 'QuoteMarketType.eth()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$_QuoteMarketTypeEth);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() vite,
    required TResult Function() eth,
    required TResult Function() btc,
    required TResult Function() usdt,
  }) {
    return eth();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? vite,
    TResult? Function()? eth,
    TResult? Function()? btc,
    TResult? Function()? usdt,
  }) {
    return eth?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? vite,
    TResult Function()? eth,
    TResult Function()? btc,
    TResult Function()? usdt,
    required TResult orElse(),
  }) {
    if (eth != null) {
      return eth();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_QuoteMarketTypeVite value) vite,
    required TResult Function(_QuoteMarketTypeEth value) eth,
    required TResult Function(_QuoteMarketTypeBtc value) btc,
    required TResult Function(_QuoteMarketTypeUsdt value) usdt,
  }) {
    return eth(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_QuoteMarketTypeVite value)? vite,
    TResult? Function(_QuoteMarketTypeEth value)? eth,
    TResult? Function(_QuoteMarketTypeBtc value)? btc,
    TResult? Function(_QuoteMarketTypeUsdt value)? usdt,
  }) {
    return eth?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_QuoteMarketTypeVite value)? vite,
    TResult Function(_QuoteMarketTypeEth value)? eth,
    TResult Function(_QuoteMarketTypeBtc value)? btc,
    TResult Function(_QuoteMarketTypeUsdt value)? usdt,
    required TResult orElse(),
  }) {
    if (eth != null) {
      return eth(this);
    }
    return orElse();
  }
}

abstract class _QuoteMarketTypeEth implements QuoteMarketType {
  const factory _QuoteMarketTypeEth() = _$_QuoteMarketTypeEth;
}

/// @nodoc
abstract class _$$_QuoteMarketTypeBtcCopyWith<$Res> {
  factory _$$_QuoteMarketTypeBtcCopyWith(_$_QuoteMarketTypeBtc value,
          $Res Function(_$_QuoteMarketTypeBtc) then) =
      __$$_QuoteMarketTypeBtcCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_QuoteMarketTypeBtcCopyWithImpl<$Res>
    extends _$QuoteMarketTypeCopyWithImpl<$Res, _$_QuoteMarketTypeBtc>
    implements _$$_QuoteMarketTypeBtcCopyWith<$Res> {
  __$$_QuoteMarketTypeBtcCopyWithImpl(
      _$_QuoteMarketTypeBtc _value, $Res Function(_$_QuoteMarketTypeBtc) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_QuoteMarketTypeBtc implements _QuoteMarketTypeBtc {
  const _$_QuoteMarketTypeBtc();

  @override
  String toString() {
    return 'QuoteMarketType.btc()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$_QuoteMarketTypeBtc);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() vite,
    required TResult Function() eth,
    required TResult Function() btc,
    required TResult Function() usdt,
  }) {
    return btc();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? vite,
    TResult? Function()? eth,
    TResult? Function()? btc,
    TResult? Function()? usdt,
  }) {
    return btc?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? vite,
    TResult Function()? eth,
    TResult Function()? btc,
    TResult Function()? usdt,
    required TResult orElse(),
  }) {
    if (btc != null) {
      return btc();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_QuoteMarketTypeVite value) vite,
    required TResult Function(_QuoteMarketTypeEth value) eth,
    required TResult Function(_QuoteMarketTypeBtc value) btc,
    required TResult Function(_QuoteMarketTypeUsdt value) usdt,
  }) {
    return btc(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_QuoteMarketTypeVite value)? vite,
    TResult? Function(_QuoteMarketTypeEth value)? eth,
    TResult? Function(_QuoteMarketTypeBtc value)? btc,
    TResult? Function(_QuoteMarketTypeUsdt value)? usdt,
  }) {
    return btc?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_QuoteMarketTypeVite value)? vite,
    TResult Function(_QuoteMarketTypeEth value)? eth,
    TResult Function(_QuoteMarketTypeBtc value)? btc,
    TResult Function(_QuoteMarketTypeUsdt value)? usdt,
    required TResult orElse(),
  }) {
    if (btc != null) {
      return btc(this);
    }
    return orElse();
  }
}

abstract class _QuoteMarketTypeBtc implements QuoteMarketType {
  const factory _QuoteMarketTypeBtc() = _$_QuoteMarketTypeBtc;
}

/// @nodoc
abstract class _$$_QuoteMarketTypeUsdtCopyWith<$Res> {
  factory _$$_QuoteMarketTypeUsdtCopyWith(_$_QuoteMarketTypeUsdt value,
          $Res Function(_$_QuoteMarketTypeUsdt) then) =
      __$$_QuoteMarketTypeUsdtCopyWithImpl<$Res>;
}

/// @nodoc
class __$$_QuoteMarketTypeUsdtCopyWithImpl<$Res>
    extends _$QuoteMarketTypeCopyWithImpl<$Res, _$_QuoteMarketTypeUsdt>
    implements _$$_QuoteMarketTypeUsdtCopyWith<$Res> {
  __$$_QuoteMarketTypeUsdtCopyWithImpl(_$_QuoteMarketTypeUsdt _value,
      $Res Function(_$_QuoteMarketTypeUsdt) _then)
      : super(_value, _then);
}

/// @nodoc

class _$_QuoteMarketTypeUsdt implements _QuoteMarketTypeUsdt {
  const _$_QuoteMarketTypeUsdt();

  @override
  String toString() {
    return 'QuoteMarketType.usdt()';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$_QuoteMarketTypeUsdt);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() vite,
    required TResult Function() eth,
    required TResult Function() btc,
    required TResult Function() usdt,
  }) {
    return usdt();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? vite,
    TResult? Function()? eth,
    TResult? Function()? btc,
    TResult? Function()? usdt,
  }) {
    return usdt?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? vite,
    TResult Function()? eth,
    TResult Function()? btc,
    TResult Function()? usdt,
    required TResult orElse(),
  }) {
    if (usdt != null) {
      return usdt();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_QuoteMarketTypeVite value) vite,
    required TResult Function(_QuoteMarketTypeEth value) eth,
    required TResult Function(_QuoteMarketTypeBtc value) btc,
    required TResult Function(_QuoteMarketTypeUsdt value) usdt,
  }) {
    return usdt(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_QuoteMarketTypeVite value)? vite,
    TResult? Function(_QuoteMarketTypeEth value)? eth,
    TResult? Function(_QuoteMarketTypeBtc value)? btc,
    TResult? Function(_QuoteMarketTypeUsdt value)? usdt,
  }) {
    return usdt?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_QuoteMarketTypeVite value)? vite,
    TResult Function(_QuoteMarketTypeEth value)? eth,
    TResult Function(_QuoteMarketTypeBtc value)? btc,
    TResult Function(_QuoteMarketTypeUsdt value)? usdt,
    required TResult orElse(),
  }) {
    if (usdt != null) {
      return usdt(this);
    }
    return orElse();
  }
}

abstract class _QuoteMarketTypeUsdt implements QuoteMarketType {
  const factory _QuoteMarketTypeUsdt() = _$_QuoteMarketTypeUsdt;
}

/// @nodoc
mixin _$AccBlockVmLogs {
  String get hash => throw _privateConstructorUsedError;
  int get height => throw _privateConstructorUsedError;
  List<VmLogMessage> get vmLogs => throw _privateConstructorUsedError;
  List<OrderTx> get transactions => throw _privateConstructorUsedError;
  set transactions(List<OrderTx> value) => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $AccBlockVmLogsCopyWith<AccBlockVmLogs> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $AccBlockVmLogsCopyWith<$Res> {
  factory $AccBlockVmLogsCopyWith(
          AccBlockVmLogs value, $Res Function(AccBlockVmLogs) then) =
      _$AccBlockVmLogsCopyWithImpl<$Res, AccBlockVmLogs>;
  @useResult
  $Res call(
      {String hash,
      int height,
      List<VmLogMessage> vmLogs,
      List<OrderTx> transactions});
}

/// @nodoc
class _$AccBlockVmLogsCopyWithImpl<$Res, $Val extends AccBlockVmLogs>
    implements $AccBlockVmLogsCopyWith<$Res> {
  _$AccBlockVmLogsCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? hash = null,
    Object? height = null,
    Object? vmLogs = null,
    Object? transactions = null,
  }) {
    return _then(_value.copyWith(
      hash: null == hash
          ? _value.hash
          : hash // ignore: cast_nullable_to_non_nullable
              as String,
      height: null == height
          ? _value.height
          : height // ignore: cast_nullable_to_non_nullable
              as int,
      vmLogs: null == vmLogs
          ? _value.vmLogs
          : vmLogs // ignore: cast_nullable_to_non_nullable
              as List<VmLogMessage>,
      transactions: null == transactions
          ? _value.transactions
          : transactions // ignore: cast_nullable_to_non_nullable
              as List<OrderTx>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_AccBlockVmLogsCopyWith<$Res>
    implements $AccBlockVmLogsCopyWith<$Res> {
  factory _$$_AccBlockVmLogsCopyWith(
          _$_AccBlockVmLogs value, $Res Function(_$_AccBlockVmLogs) then) =
      __$$_AccBlockVmLogsCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String hash,
      int height,
      List<VmLogMessage> vmLogs,
      List<OrderTx> transactions});
}

/// @nodoc
class __$$_AccBlockVmLogsCopyWithImpl<$Res>
    extends _$AccBlockVmLogsCopyWithImpl<$Res, _$_AccBlockVmLogs>
    implements _$$_AccBlockVmLogsCopyWith<$Res> {
  __$$_AccBlockVmLogsCopyWithImpl(
      _$_AccBlockVmLogs _value, $Res Function(_$_AccBlockVmLogs) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? hash = null,
    Object? height = null,
    Object? vmLogs = null,
    Object? transactions = null,
  }) {
    return _then(_$_AccBlockVmLogs(
      hash: null == hash
          ? _value.hash
          : hash // ignore: cast_nullable_to_non_nullable
              as String,
      height: null == height
          ? _value.height
          : height // ignore: cast_nullable_to_non_nullable
              as int,
      vmLogs: null == vmLogs
          ? _value.vmLogs
          : vmLogs // ignore: cast_nullable_to_non_nullable
              as List<VmLogMessage>,
      transactions: null == transactions
          ? _value.transactions
          : transactions // ignore: cast_nullable_to_non_nullable
              as List<OrderTx>,
    ));
  }
}

/// @nodoc

class _$_AccBlockVmLogs extends _AccBlockVmLogs {
  _$_AccBlockVmLogs(
      {required this.hash,
      required this.height,
      required this.vmLogs,
      required this.transactions})
      : super._();

  @override
  final String hash;
  @override
  final int height;
  @override
  final List<VmLogMessage> vmLogs;
  @override
  List<OrderTx> transactions;

  @override
  String toString() {
    return 'AccBlockVmLogs(hash: $hash, height: $height, vmLogs: $vmLogs, transactions: $transactions)';
  }

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_AccBlockVmLogsCopyWith<_$_AccBlockVmLogs> get copyWith =>
      __$$_AccBlockVmLogsCopyWithImpl<_$_AccBlockVmLogs>(this, _$identity);
}

abstract class _AccBlockVmLogs extends AccBlockVmLogs {
  factory _AccBlockVmLogs(
      {required final String hash,
      required final int height,
      required final List<VmLogMessage> vmLogs,
      required List<OrderTx> transactions}) = _$_AccBlockVmLogs;
  _AccBlockVmLogs._() : super._();

  @override
  String get hash;
  @override
  int get height;
  @override
  List<VmLogMessage> get vmLogs;
  @override
  List<OrderTx> get transactions;
  set transactions(List<OrderTx> value);
  @override
  @JsonKey(ignore: true)
  _$$_AccBlockVmLogsCopyWith<_$_AccBlockVmLogs> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$OrderTx {
  String get txId => throw _privateConstructorUsedError;
  String get takerOrderId => throw _privateConstructorUsedError;
  String get makerOrderId => throw _privateConstructorUsedError;
  Decimal get price => throw _privateConstructorUsedError;
  Decimal get amount => throw _privateConstructorUsedError;
  Decimal get quantity => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $OrderTxCopyWith<OrderTx> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderTxCopyWith<$Res> {
  factory $OrderTxCopyWith(OrderTx value, $Res Function(OrderTx) then) =
      _$OrderTxCopyWithImpl<$Res, OrderTx>;
  @useResult
  $Res call(
      {String txId,
      String takerOrderId,
      String makerOrderId,
      Decimal price,
      Decimal amount,
      Decimal quantity});
}

/// @nodoc
class _$OrderTxCopyWithImpl<$Res, $Val extends OrderTx>
    implements $OrderTxCopyWith<$Res> {
  _$OrderTxCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? txId = null,
    Object? takerOrderId = null,
    Object? makerOrderId = null,
    Object? price = null,
    Object? amount = null,
    Object? quantity = null,
  }) {
    return _then(_value.copyWith(
      txId: null == txId
          ? _value.txId
          : txId // ignore: cast_nullable_to_non_nullable
              as String,
      takerOrderId: null == takerOrderId
          ? _value.takerOrderId
          : takerOrderId // ignore: cast_nullable_to_non_nullable
              as String,
      makerOrderId: null == makerOrderId
          ? _value.makerOrderId
          : makerOrderId // ignore: cast_nullable_to_non_nullable
              as String,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_OrderTxCopyWith<$Res> implements $OrderTxCopyWith<$Res> {
  factory _$$_OrderTxCopyWith(
          _$_OrderTx value, $Res Function(_$_OrderTx) then) =
      __$$_OrderTxCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String txId,
      String takerOrderId,
      String makerOrderId,
      Decimal price,
      Decimal amount,
      Decimal quantity});
}

/// @nodoc
class __$$_OrderTxCopyWithImpl<$Res>
    extends _$OrderTxCopyWithImpl<$Res, _$_OrderTx>
    implements _$$_OrderTxCopyWith<$Res> {
  __$$_OrderTxCopyWithImpl(_$_OrderTx _value, $Res Function(_$_OrderTx) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? txId = null,
    Object? takerOrderId = null,
    Object? makerOrderId = null,
    Object? price = null,
    Object? amount = null,
    Object? quantity = null,
  }) {
    return _then(_$_OrderTx(
      txId: null == txId
          ? _value.txId
          : txId // ignore: cast_nullable_to_non_nullable
              as String,
      takerOrderId: null == takerOrderId
          ? _value.takerOrderId
          : takerOrderId // ignore: cast_nullable_to_non_nullable
              as String,
      makerOrderId: null == makerOrderId
          ? _value.makerOrderId
          : makerOrderId // ignore: cast_nullable_to_non_nullable
              as String,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
    ));
  }
}

/// @nodoc

class _$_OrderTx implements _OrderTx {
  const _$_OrderTx(
      {required this.txId,
      required this.takerOrderId,
      required this.makerOrderId,
      required this.price,
      required this.amount,
      required this.quantity});

  @override
  final String txId;
  @override
  final String takerOrderId;
  @override
  final String makerOrderId;
  @override
  final Decimal price;
  @override
  final Decimal amount;
  @override
  final Decimal quantity;

  @override
  String toString() {
    return 'OrderTx(txId: $txId, takerOrderId: $takerOrderId, makerOrderId: $makerOrderId, price: $price, amount: $amount, quantity: $quantity)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_OrderTx &&
            (identical(other.txId, txId) || other.txId == txId) &&
            (identical(other.takerOrderId, takerOrderId) ||
                other.takerOrderId == takerOrderId) &&
            (identical(other.makerOrderId, makerOrderId) ||
                other.makerOrderId == makerOrderId) &&
            (identical(other.price, price) || other.price == price) &&
            (identical(other.amount, amount) || other.amount == amount) &&
            (identical(other.quantity, quantity) ||
                other.quantity == quantity));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType, txId, takerOrderId, makerOrderId, price, amount, quantity);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_OrderTxCopyWith<_$_OrderTx> get copyWith =>
      __$$_OrderTxCopyWithImpl<_$_OrderTx>(this, _$identity);
}

abstract class _OrderTx implements OrderTx {
  const factory _OrderTx(
      {required final String txId,
      required final String takerOrderId,
      required final String makerOrderId,
      required final Decimal price,
      required final Decimal amount,
      required final Decimal quantity}) = _$_OrderTx;

  @override
  String get txId;
  @override
  String get takerOrderId;
  @override
  String get makerOrderId;
  @override
  Decimal get price;
  @override
  Decimal get amount;
  @override
  Decimal get quantity;
  @override
  @JsonKey(ignore: true)
  _$$_OrderTxCopyWith<_$_OrderTx> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$Tokens {
  Map<String, TokenInfo> get tokenMap => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $TokensCopyWith<Tokens> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TokensCopyWith<$Res> {
  factory $TokensCopyWith(Tokens value, $Res Function(Tokens) then) =
      _$TokensCopyWithImpl<$Res, Tokens>;
  @useResult
  $Res call({Map<String, TokenInfo> tokenMap});
}

/// @nodoc
class _$TokensCopyWithImpl<$Res, $Val extends Tokens>
    implements $TokensCopyWith<$Res> {
  _$TokensCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tokenMap = null,
  }) {
    return _then(_value.copyWith(
      tokenMap: null == tokenMap
          ? _value.tokenMap
          : tokenMap // ignore: cast_nullable_to_non_nullable
              as Map<String, TokenInfo>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_TokensCopyWith<$Res> implements $TokensCopyWith<$Res> {
  factory _$$_TokensCopyWith(_$_Tokens value, $Res Function(_$_Tokens) then) =
      __$$_TokensCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({Map<String, TokenInfo> tokenMap});
}

/// @nodoc
class __$$_TokensCopyWithImpl<$Res>
    extends _$TokensCopyWithImpl<$Res, _$_Tokens>
    implements _$$_TokensCopyWith<$Res> {
  __$$_TokensCopyWithImpl(_$_Tokens _value, $Res Function(_$_Tokens) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tokenMap = null,
  }) {
    return _then(_$_Tokens(
      tokenMap: null == tokenMap
          ? _value._tokenMap
          : tokenMap // ignore: cast_nullable_to_non_nullable
              as Map<String, TokenInfo>,
    ));
  }
}

/// @nodoc

class _$_Tokens extends _Tokens {
  const _$_Tokens({required final Map<String, TokenInfo> tokenMap})
      : _tokenMap = tokenMap,
        super._();

  final Map<String, TokenInfo> _tokenMap;
  @override
  Map<String, TokenInfo> get tokenMap {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_tokenMap);
  }

  @override
  String toString() {
    return 'Tokens(tokenMap: $tokenMap)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Tokens &&
            const DeepCollectionEquality().equals(other._tokenMap, _tokenMap));
  }

  @override
  int get hashCode =>
      Object.hash(runtimeType, const DeepCollectionEquality().hash(_tokenMap));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_TokensCopyWith<_$_Tokens> get copyWith =>
      __$$_TokensCopyWithImpl<_$_Tokens>(this, _$identity);
}

abstract class _Tokens extends Tokens {
  const factory _Tokens({required final Map<String, TokenInfo> tokenMap}) =
      _$_Tokens;
  const _Tokens._() : super._();

  @override
  Map<String, TokenInfo> get tokenMap;
  @override
  @JsonKey(ignore: true)
  _$$_TokensCopyWith<_$_Tokens> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$BlockEvent {
  List<OrderEvent> get orderEvents => throw _privateConstructorUsedError;
  int get height => throw _privateConstructorUsedError;
  String get hash => throw _privateConstructorUsedError;
  String get tradePair => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $BlockEventCopyWith<BlockEvent> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $BlockEventCopyWith<$Res> {
  factory $BlockEventCopyWith(
          BlockEvent value, $Res Function(BlockEvent) then) =
      _$BlockEventCopyWithImpl<$Res, BlockEvent>;
  @useResult
  $Res call(
      {List<OrderEvent> orderEvents,
      int height,
      String hash,
      String tradePair});
}

/// @nodoc
class _$BlockEventCopyWithImpl<$Res, $Val extends BlockEvent>
    implements $BlockEventCopyWith<$Res> {
  _$BlockEventCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderEvents = null,
    Object? height = null,
    Object? hash = null,
    Object? tradePair = null,
  }) {
    return _then(_value.copyWith(
      orderEvents: null == orderEvents
          ? _value.orderEvents
          : orderEvents // ignore: cast_nullable_to_non_nullable
              as List<OrderEvent>,
      height: null == height
          ? _value.height
          : height // ignore: cast_nullable_to_non_nullable
              as int,
      hash: null == hash
          ? _value.hash
          : hash // ignore: cast_nullable_to_non_nullable
              as String,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_BlockEventCopyWith<$Res>
    implements $BlockEventCopyWith<$Res> {
  factory _$$_BlockEventCopyWith(
          _$_BlockEvent value, $Res Function(_$_BlockEvent) then) =
      __$$_BlockEventCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {List<OrderEvent> orderEvents,
      int height,
      String hash,
      String tradePair});
}

/// @nodoc
class __$$_BlockEventCopyWithImpl<$Res>
    extends _$BlockEventCopyWithImpl<$Res, _$_BlockEvent>
    implements _$$_BlockEventCopyWith<$Res> {
  __$$_BlockEventCopyWithImpl(
      _$_BlockEvent _value, $Res Function(_$_BlockEvent) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderEvents = null,
    Object? height = null,
    Object? hash = null,
    Object? tradePair = null,
  }) {
    return _then(_$_BlockEvent(
      orderEvents: null == orderEvents
          ? _value._orderEvents
          : orderEvents // ignore: cast_nullable_to_non_nullable
              as List<OrderEvent>,
      height: null == height
          ? _value.height
          : height // ignore: cast_nullable_to_non_nullable
              as int,
      hash: null == hash
          ? _value.hash
          : hash // ignore: cast_nullable_to_non_nullable
              as String,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$_BlockEvent extends _BlockEvent {
  const _$_BlockEvent(
      {required final List<OrderEvent> orderEvents,
      required this.height,
      required this.hash,
      required this.tradePair})
      : _orderEvents = orderEvents,
        super._();

  final List<OrderEvent> _orderEvents;
  @override
  List<OrderEvent> get orderEvents {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_orderEvents);
  }

  @override
  final int height;
  @override
  final String hash;
  @override
  final String tradePair;

  @override
  String toString() {
    return 'BlockEvent(orderEvents: $orderEvents, height: $height, hash: $hash, tradePair: $tradePair)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_BlockEvent &&
            const DeepCollectionEquality()
                .equals(other._orderEvents, _orderEvents) &&
            (identical(other.height, height) || other.height == height) &&
            (identical(other.hash, hash) || other.hash == hash) &&
            (identical(other.tradePair, tradePair) ||
                other.tradePair == tradePair));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      const DeepCollectionEquality().hash(_orderEvents),
      height,
      hash,
      tradePair);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_BlockEventCopyWith<_$_BlockEvent> get copyWith =>
      __$$_BlockEventCopyWithImpl<_$_BlockEvent>(this, _$identity);
}

abstract class _BlockEvent extends BlockEvent {
  const factory _BlockEvent(
      {required final List<OrderEvent> orderEvents,
      required final int height,
      required final String hash,
      required final String tradePair}) = _$_BlockEvent;
  const _BlockEvent._() : super._();

  @override
  List<OrderEvent> get orderEvents;
  @override
  int get height;
  @override
  String get hash;
  @override
  String get tradePair;
  @override
  @JsonKey(ignore: true)
  _$$_BlockEventCopyWith<_$_BlockEvent> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$OrderEvent {
  EventType get type => throw _privateConstructorUsedError;
  OrderLog? get orderLog => throw _privateConstructorUsedError;
  OrderTx? get orderTx => throw _privateConstructorUsedError;
  int? get timestamp => throw _privateConstructorUsedError;
  set timestamp(int? value) => throw _privateConstructorUsedError;
  String get blockHash => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $OrderEventCopyWith<OrderEvent> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderEventCopyWith<$Res> {
  factory $OrderEventCopyWith(
          OrderEvent value, $Res Function(OrderEvent) then) =
      _$OrderEventCopyWithImpl<$Res, OrderEvent>;
  @useResult
  $Res call(
      {EventType type,
      OrderLog? orderLog,
      OrderTx? orderTx,
      int? timestamp,
      String blockHash});

  $OrderLogCopyWith<$Res>? get orderLog;
  $OrderTxCopyWith<$Res>? get orderTx;
}

/// @nodoc
class _$OrderEventCopyWithImpl<$Res, $Val extends OrderEvent>
    implements $OrderEventCopyWith<$Res> {
  _$OrderEventCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? orderLog = freezed,
    Object? orderTx = freezed,
    Object? timestamp = freezed,
    Object? blockHash = null,
  }) {
    return _then(_value.copyWith(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as EventType,
      orderLog: freezed == orderLog
          ? _value.orderLog
          : orderLog // ignore: cast_nullable_to_non_nullable
              as OrderLog?,
      orderTx: freezed == orderTx
          ? _value.orderTx
          : orderTx // ignore: cast_nullable_to_non_nullable
              as OrderTx?,
      timestamp: freezed == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int?,
      blockHash: null == blockHash
          ? _value.blockHash
          : blockHash // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $OrderLogCopyWith<$Res>? get orderLog {
    if (_value.orderLog == null) {
      return null;
    }

    return $OrderLogCopyWith<$Res>(_value.orderLog!, (value) {
      return _then(_value.copyWith(orderLog: value) as $Val);
    });
  }

  @override
  @pragma('vm:prefer-inline')
  $OrderTxCopyWith<$Res>? get orderTx {
    if (_value.orderTx == null) {
      return null;
    }

    return $OrderTxCopyWith<$Res>(_value.orderTx!, (value) {
      return _then(_value.copyWith(orderTx: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_OrderEventCopyWith<$Res>
    implements $OrderEventCopyWith<$Res> {
  factory _$$_OrderEventCopyWith(
          _$_OrderEvent value, $Res Function(_$_OrderEvent) then) =
      __$$_OrderEventCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {EventType type,
      OrderLog? orderLog,
      OrderTx? orderTx,
      int? timestamp,
      String blockHash});

  @override
  $OrderLogCopyWith<$Res>? get orderLog;
  @override
  $OrderTxCopyWith<$Res>? get orderTx;
}

/// @nodoc
class __$$_OrderEventCopyWithImpl<$Res>
    extends _$OrderEventCopyWithImpl<$Res, _$_OrderEvent>
    implements _$$_OrderEventCopyWith<$Res> {
  __$$_OrderEventCopyWithImpl(
      _$_OrderEvent _value, $Res Function(_$_OrderEvent) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? orderLog = freezed,
    Object? orderTx = freezed,
    Object? timestamp = freezed,
    Object? blockHash = null,
  }) {
    return _then(_$_OrderEvent(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as EventType,
      orderLog: freezed == orderLog
          ? _value.orderLog
          : orderLog // ignore: cast_nullable_to_non_nullable
              as OrderLog?,
      orderTx: freezed == orderTx
          ? _value.orderTx
          : orderTx // ignore: cast_nullable_to_non_nullable
              as OrderTx?,
      timestamp: freezed == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int?,
      blockHash: null == blockHash
          ? _value.blockHash
          : blockHash // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$_OrderEvent extends _OrderEvent {
  _$_OrderEvent(
      {required this.type,
      required this.orderLog,
      required this.orderTx,
      required this.timestamp,
      required this.blockHash})
      : super._();

  @override
  final EventType type;
  @override
  final OrderLog? orderLog;
  @override
  final OrderTx? orderTx;
  @override
  int? timestamp;
  @override
  final String blockHash;

  @override
  String toString() {
    return 'OrderEvent(type: $type, orderLog: $orderLog, orderTx: $orderTx, timestamp: $timestamp, blockHash: $blockHash)';
  }

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_OrderEventCopyWith<_$_OrderEvent> get copyWith =>
      __$$_OrderEventCopyWithImpl<_$_OrderEvent>(this, _$identity);
}

abstract class _OrderEvent extends OrderEvent {
  factory _OrderEvent(
      {required final EventType type,
      required final OrderLog? orderLog,
      required final OrderTx? orderTx,
      required int? timestamp,
      required final String blockHash}) = _$_OrderEvent;
  _OrderEvent._() : super._();

  @override
  EventType get type;
  @override
  OrderLog? get orderLog;
  @override
  OrderTx? get orderTx;
  @override
  int? get timestamp;
  set timestamp(int? value);
  @override
  String get blockHash;
  @override
  @JsonKey(ignore: true)
  _$$_OrderEventCopyWith<_$_OrderEvent> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$OrderLog {
  String get orderId => throw _privateConstructorUsedError;
  int get orderCreateTime => throw _privateConstructorUsedError;
  Decimal get price => throw _privateConstructorUsedError;
  Decimal get changeQuantity => throw _privateConstructorUsedError;
  Decimal get changeAmount => throw _privateConstructorUsedError;
  bool get side => throw _privateConstructorUsedError;
  String get tradePair => throw _privateConstructorUsedError;
  String get address => throw _privateConstructorUsedError;
  OrderStatus get status => throw _privateConstructorUsedError;
  VmLog get rawLog => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $OrderLogCopyWith<OrderLog> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderLogCopyWith<$Res> {
  factory $OrderLogCopyWith(OrderLog value, $Res Function(OrderLog) then) =
      _$OrderLogCopyWithImpl<$Res, OrderLog>;
  @useResult
  $Res call(
      {String orderId,
      int orderCreateTime,
      Decimal price,
      Decimal changeQuantity,
      Decimal changeAmount,
      bool side,
      String tradePair,
      String address,
      OrderStatus status,
      VmLog rawLog});

  $OrderStatusCopyWith<$Res> get status;
  $VmLogCopyWith<$Res> get rawLog;
}

/// @nodoc
class _$OrderLogCopyWithImpl<$Res, $Val extends OrderLog>
    implements $OrderLogCopyWith<$Res> {
  _$OrderLogCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderId = null,
    Object? orderCreateTime = null,
    Object? price = null,
    Object? changeQuantity = null,
    Object? changeAmount = null,
    Object? side = null,
    Object? tradePair = null,
    Object? address = null,
    Object? status = null,
    Object? rawLog = null,
  }) {
    return _then(_value.copyWith(
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      orderCreateTime: null == orderCreateTime
          ? _value.orderCreateTime
          : orderCreateTime // ignore: cast_nullable_to_non_nullable
              as int,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      changeQuantity: null == changeQuantity
          ? _value.changeQuantity
          : changeQuantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      changeAmount: null == changeAmount
          ? _value.changeAmount
          : changeAmount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      side: null == side
          ? _value.side
          : side // ignore: cast_nullable_to_non_nullable
              as bool,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as OrderStatus,
      rawLog: null == rawLog
          ? _value.rawLog
          : rawLog // ignore: cast_nullable_to_non_nullable
              as VmLog,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $OrderStatusCopyWith<$Res> get status {
    return $OrderStatusCopyWith<$Res>(_value.status, (value) {
      return _then(_value.copyWith(status: value) as $Val);
    });
  }

  @override
  @pragma('vm:prefer-inline')
  $VmLogCopyWith<$Res> get rawLog {
    return $VmLogCopyWith<$Res>(_value.rawLog, (value) {
      return _then(_value.copyWith(rawLog: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_OrderLogCopyWith<$Res> implements $OrderLogCopyWith<$Res> {
  factory _$$_OrderLogCopyWith(
          _$_OrderLog value, $Res Function(_$_OrderLog) then) =
      __$$_OrderLogCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String orderId,
      int orderCreateTime,
      Decimal price,
      Decimal changeQuantity,
      Decimal changeAmount,
      bool side,
      String tradePair,
      String address,
      OrderStatus status,
      VmLog rawLog});

  @override
  $OrderStatusCopyWith<$Res> get status;
  @override
  $VmLogCopyWith<$Res> get rawLog;
}

/// @nodoc
class __$$_OrderLogCopyWithImpl<$Res>
    extends _$OrderLogCopyWithImpl<$Res, _$_OrderLog>
    implements _$$_OrderLogCopyWith<$Res> {
  __$$_OrderLogCopyWithImpl(
      _$_OrderLog _value, $Res Function(_$_OrderLog) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderId = null,
    Object? orderCreateTime = null,
    Object? price = null,
    Object? changeQuantity = null,
    Object? changeAmount = null,
    Object? side = null,
    Object? tradePair = null,
    Object? address = null,
    Object? status = null,
    Object? rawLog = null,
  }) {
    return _then(_$_OrderLog(
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      orderCreateTime: null == orderCreateTime
          ? _value.orderCreateTime
          : orderCreateTime // ignore: cast_nullable_to_non_nullable
              as int,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      changeQuantity: null == changeQuantity
          ? _value.changeQuantity
          : changeQuantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      changeAmount: null == changeAmount
          ? _value.changeAmount
          : changeAmount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      side: null == side
          ? _value.side
          : side // ignore: cast_nullable_to_non_nullable
              as bool,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as OrderStatus,
      rawLog: null == rawLog
          ? _value.rawLog
          : rawLog // ignore: cast_nullable_to_non_nullable
              as VmLog,
    ));
  }
}

/// @nodoc

class _$_OrderLog extends _OrderLog {
  const _$_OrderLog(
      {required this.orderId,
      required this.orderCreateTime,
      required this.price,
      required this.changeQuantity,
      required this.changeAmount,
      required this.side,
      required this.tradePair,
      required this.address,
      required this.status,
      required this.rawLog})
      : super._();

  @override
  final String orderId;
  @override
  final int orderCreateTime;
  @override
  final Decimal price;
  @override
  final Decimal changeQuantity;
  @override
  final Decimal changeAmount;
  @override
  final bool side;
  @override
  final String tradePair;
  @override
  final String address;
  @override
  final OrderStatus status;
  @override
  final VmLog rawLog;

  @override
  String toString() {
    return 'OrderLog(orderId: $orderId, orderCreateTime: $orderCreateTime, price: $price, changeQuantity: $changeQuantity, changeAmount: $changeAmount, side: $side, tradePair: $tradePair, address: $address, status: $status, rawLog: $rawLog)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_OrderLog &&
            (identical(other.orderId, orderId) || other.orderId == orderId) &&
            (identical(other.orderCreateTime, orderCreateTime) ||
                other.orderCreateTime == orderCreateTime) &&
            (identical(other.price, price) || other.price == price) &&
            (identical(other.changeQuantity, changeQuantity) ||
                other.changeQuantity == changeQuantity) &&
            (identical(other.changeAmount, changeAmount) ||
                other.changeAmount == changeAmount) &&
            (identical(other.side, side) || other.side == side) &&
            (identical(other.tradePair, tradePair) ||
                other.tradePair == tradePair) &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.rawLog, rawLog) || other.rawLog == rawLog));
  }

  @override
  int get hashCode => Object.hash(runtimeType, orderId, orderCreateTime, price,
      changeQuantity, changeAmount, side, tradePair, address, status, rawLog);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_OrderLogCopyWith<_$_OrderLog> get copyWith =>
      __$$_OrderLogCopyWithImpl<_$_OrderLog>(this, _$identity);
}

abstract class _OrderLog extends OrderLog {
  const factory _OrderLog(
      {required final String orderId,
      required final int orderCreateTime,
      required final Decimal price,
      required final Decimal changeQuantity,
      required final Decimal changeAmount,
      required final bool side,
      required final String tradePair,
      required final String address,
      required final OrderStatus status,
      required final VmLog rawLog}) = _$_OrderLog;
  const _OrderLog._() : super._();

  @override
  String get orderId;
  @override
  int get orderCreateTime;
  @override
  Decimal get price;
  @override
  Decimal get changeQuantity;
  @override
  Decimal get changeAmount;
  @override
  bool get side;
  @override
  String get tradePair;
  @override
  String get address;
  @override
  OrderStatus get status;
  @override
  VmLog get rawLog;
  @override
  @JsonKey(ignore: true)
  _$$_OrderLogCopyWith<_$_OrderLog> get copyWith =>
      throw _privateConstructorUsedError;
}

CurrentOrder _$CurrentOrderFromJson(Map<String, dynamic> json) {
  return _CurrentOrder.fromJson(json);
}

/// @nodoc
mixin _$CurrentOrder {
  @JsonKey(name: 'Id')
  String get orderId => throw _privateConstructorUsedError;
  Decimal get price => throw _privateConstructorUsedError;
  Decimal get quantity => throw _privateConstructorUsedError;
  Decimal get amount => throw _privateConstructorUsedError;
  Decimal? get executedQuantity => throw _privateConstructorUsedError;
  Decimal? get executedAmount => throw _privateConstructorUsedError;
  String get address => throw _privateConstructorUsedError;
  bool get side => throw _privateConstructorUsedError;
  int get timestamp => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $CurrentOrderCopyWith<CurrentOrder> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CurrentOrderCopyWith<$Res> {
  factory $CurrentOrderCopyWith(
          CurrentOrder value, $Res Function(CurrentOrder) then) =
      _$CurrentOrderCopyWithImpl<$Res, CurrentOrder>;
  @useResult
  $Res call(
      {@JsonKey(name: 'Id') String orderId,
      Decimal price,
      Decimal quantity,
      Decimal amount,
      Decimal? executedQuantity,
      Decimal? executedAmount,
      String address,
      bool side,
      int timestamp});
}

/// @nodoc
class _$CurrentOrderCopyWithImpl<$Res, $Val extends CurrentOrder>
    implements $CurrentOrderCopyWith<$Res> {
  _$CurrentOrderCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderId = null,
    Object? price = null,
    Object? quantity = null,
    Object? amount = null,
    Object? executedQuantity = freezed,
    Object? executedAmount = freezed,
    Object? address = null,
    Object? side = null,
    Object? timestamp = null,
  }) {
    return _then(_value.copyWith(
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      executedQuantity: freezed == executedQuantity
          ? _value.executedQuantity
          : executedQuantity // ignore: cast_nullable_to_non_nullable
              as Decimal?,
      executedAmount: freezed == executedAmount
          ? _value.executedAmount
          : executedAmount // ignore: cast_nullable_to_non_nullable
              as Decimal?,
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      side: null == side
          ? _value.side
          : side // ignore: cast_nullable_to_non_nullable
              as bool,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_CurrentOrderCopyWith<$Res>
    implements $CurrentOrderCopyWith<$Res> {
  factory _$$_CurrentOrderCopyWith(
          _$_CurrentOrder value, $Res Function(_$_CurrentOrder) then) =
      __$$_CurrentOrderCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {@JsonKey(name: 'Id') String orderId,
      Decimal price,
      Decimal quantity,
      Decimal amount,
      Decimal? executedQuantity,
      Decimal? executedAmount,
      String address,
      bool side,
      int timestamp});
}

/// @nodoc
class __$$_CurrentOrderCopyWithImpl<$Res>
    extends _$CurrentOrderCopyWithImpl<$Res, _$_CurrentOrder>
    implements _$$_CurrentOrderCopyWith<$Res> {
  __$$_CurrentOrderCopyWithImpl(
      _$_CurrentOrder _value, $Res Function(_$_CurrentOrder) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderId = null,
    Object? price = null,
    Object? quantity = null,
    Object? amount = null,
    Object? executedQuantity = freezed,
    Object? executedAmount = freezed,
    Object? address = null,
    Object? side = null,
    Object? timestamp = null,
  }) {
    return _then(_$_CurrentOrder(
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      executedQuantity: freezed == executedQuantity
          ? _value.executedQuantity
          : executedQuantity // ignore: cast_nullable_to_non_nullable
              as Decimal?,
      executedAmount: freezed == executedAmount
          ? _value.executedAmount
          : executedAmount // ignore: cast_nullable_to_non_nullable
              as Decimal?,
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      side: null == side
          ? _value.side
          : side // ignore: cast_nullable_to_non_nullable
              as bool,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc

@JsonSerializable(fieldRename: FieldRename.pascal)
class _$_CurrentOrder implements _CurrentOrder {
  const _$_CurrentOrder(
      {@JsonKey(name: 'Id') required this.orderId,
      required this.price,
      required this.quantity,
      required this.amount,
      required this.executedQuantity,
      required this.executedAmount,
      required this.address,
      required this.side,
      required this.timestamp});

  factory _$_CurrentOrder.fromJson(Map<String, dynamic> json) =>
      _$$_CurrentOrderFromJson(json);

  @override
  @JsonKey(name: 'Id')
  final String orderId;
  @override
  final Decimal price;
  @override
  final Decimal quantity;
  @override
  final Decimal amount;
  @override
  final Decimal? executedQuantity;
  @override
  final Decimal? executedAmount;
  @override
  final String address;
  @override
  final bool side;
  @override
  final int timestamp;

  @override
  String toString() {
    return 'CurrentOrder(orderId: $orderId, price: $price, quantity: $quantity, amount: $amount, executedQuantity: $executedQuantity, executedAmount: $executedAmount, address: $address, side: $side, timestamp: $timestamp)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_CurrentOrder &&
            (identical(other.orderId, orderId) || other.orderId == orderId) &&
            (identical(other.price, price) || other.price == price) &&
            (identical(other.quantity, quantity) ||
                other.quantity == quantity) &&
            (identical(other.amount, amount) || other.amount == amount) &&
            (identical(other.executedQuantity, executedQuantity) ||
                other.executedQuantity == executedQuantity) &&
            (identical(other.executedAmount, executedAmount) ||
                other.executedAmount == executedAmount) &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.side, side) || other.side == side) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, orderId, price, quantity, amount,
      executedQuantity, executedAmount, address, side, timestamp);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_CurrentOrderCopyWith<_$_CurrentOrder> get copyWith =>
      __$$_CurrentOrderCopyWithImpl<_$_CurrentOrder>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_CurrentOrderToJson(
      this,
    );
  }
}

abstract class _CurrentOrder implements CurrentOrder {
  const factory _CurrentOrder(
      {@JsonKey(name: 'Id') required final String orderId,
      required final Decimal price,
      required final Decimal quantity,
      required final Decimal amount,
      required final Decimal? executedQuantity,
      required final Decimal? executedAmount,
      required final String address,
      required final bool side,
      required final int timestamp}) = _$_CurrentOrder;

  factory _CurrentOrder.fromJson(Map<String, dynamic> json) =
      _$_CurrentOrder.fromJson;

  @override
  @JsonKey(name: 'Id')
  String get orderId;
  @override
  Decimal get price;
  @override
  Decimal get quantity;
  @override
  Decimal get amount;
  @override
  Decimal? get executedQuantity;
  @override
  Decimal? get executedAmount;
  @override
  String get address;
  @override
  bool get side;
  @override
  int get timestamp;
  @override
  @JsonKey(ignore: true)
  _$$_CurrentOrderCopyWith<_$_CurrentOrder> get copyWith =>
      throw _privateConstructorUsedError;
}

OrderModel _$OrderModelFromJson(Map<String, dynamic> json) {
  return _OrderModel.fromJson(json);
}

/// @nodoc
mixin _$OrderModel {
  @JsonKey(name: 'Id')
  String get orderId => throw _privateConstructorUsedError;
  @JsonKey(name: 'Id')
  set orderId(String value) => throw _privateConstructorUsedError;
  Decimal get price => throw _privateConstructorUsedError;
  Decimal get quantity => throw _privateConstructorUsedError;
  Decimal get amount => throw _privateConstructorUsedError;
  String get address => throw _privateConstructorUsedError;
  set address(String value) => throw _privateConstructorUsedError;
  bool get side => throw _privateConstructorUsedError;
  String get tradePair => throw _privateConstructorUsedError;
  int get timestamp => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $OrderModelCopyWith<OrderModel> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderModelCopyWith<$Res> {
  factory $OrderModelCopyWith(
          OrderModel value, $Res Function(OrderModel) then) =
      _$OrderModelCopyWithImpl<$Res, OrderModel>;
  @useResult
  $Res call(
      {@JsonKey(name: 'Id') String orderId,
      Decimal price,
      Decimal quantity,
      Decimal amount,
      String address,
      bool side,
      String tradePair,
      int timestamp});
}

/// @nodoc
class _$OrderModelCopyWithImpl<$Res, $Val extends OrderModel>
    implements $OrderModelCopyWith<$Res> {
  _$OrderModelCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderId = null,
    Object? price = null,
    Object? quantity = null,
    Object? amount = null,
    Object? address = null,
    Object? side = null,
    Object? tradePair = null,
    Object? timestamp = null,
  }) {
    return _then(_value.copyWith(
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      side: null == side
          ? _value.side
          : side // ignore: cast_nullable_to_non_nullable
              as bool,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_OrderModelCopyWith<$Res>
    implements $OrderModelCopyWith<$Res> {
  factory _$$_OrderModelCopyWith(
          _$_OrderModel value, $Res Function(_$_OrderModel) then) =
      __$$_OrderModelCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {@JsonKey(name: 'Id') String orderId,
      Decimal price,
      Decimal quantity,
      Decimal amount,
      String address,
      bool side,
      String tradePair,
      int timestamp});
}

/// @nodoc
class __$$_OrderModelCopyWithImpl<$Res>
    extends _$OrderModelCopyWithImpl<$Res, _$_OrderModel>
    implements _$$_OrderModelCopyWith<$Res> {
  __$$_OrderModelCopyWithImpl(
      _$_OrderModel _value, $Res Function(_$_OrderModel) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderId = null,
    Object? price = null,
    Object? quantity = null,
    Object? amount = null,
    Object? address = null,
    Object? side = null,
    Object? tradePair = null,
    Object? timestamp = null,
  }) {
    return _then(_$_OrderModel(
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      side: null == side
          ? _value.side
          : side // ignore: cast_nullable_to_non_nullable
              as bool,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_OrderModel extends _OrderModel {
  _$_OrderModel(
      {@JsonKey(name: 'Id') required this.orderId,
      required this.price,
      required this.quantity,
      required this.amount,
      required this.address,
      required this.side,
      required this.tradePair,
      required this.timestamp})
      : super._();

  factory _$_OrderModel.fromJson(Map<String, dynamic> json) =>
      _$$_OrderModelFromJson(json);

  @override
  @JsonKey(name: 'Id')
  String orderId;
  @override
  final Decimal price;
  @override
  final Decimal quantity;
  @override
  final Decimal amount;
  @override
  String address;
  @override
  final bool side;
  @override
  final String tradePair;
  @override
  final int timestamp;

  @override
  String toString() {
    return 'OrderModel(orderId: $orderId, price: $price, quantity: $quantity, amount: $amount, address: $address, side: $side, tradePair: $tradePair, timestamp: $timestamp)';
  }

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_OrderModelCopyWith<_$_OrderModel> get copyWith =>
      __$$_OrderModelCopyWithImpl<_$_OrderModel>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_OrderModelToJson(
      this,
    );
  }
}

abstract class _OrderModel extends OrderModel {
  factory _OrderModel(
      {@JsonKey(name: 'Id') required String orderId,
      required final Decimal price,
      required final Decimal quantity,
      required final Decimal amount,
      required String address,
      required final bool side,
      required final String tradePair,
      required final int timestamp}) = _$_OrderModel;
  _OrderModel._() : super._();

  factory _OrderModel.fromJson(Map<String, dynamic> json) =
      _$_OrderModel.fromJson;

  @override
  @JsonKey(name: 'Id')
  String get orderId;
  @JsonKey(name: 'Id')
  set orderId(String value);
  @override
  Decimal get price;
  @override
  Decimal get quantity;
  @override
  Decimal get amount;
  @override
  String get address;
  set address(String value);
  @override
  bool get side;
  @override
  String get tradePair;
  @override
  int get timestamp;
  @override
  @JsonKey(ignore: true)
  _$$_OrderModelCopyWith<_$_OrderModel> get copyWith =>
      throw _privateConstructorUsedError;
}

TradePair _$TradePairFromJson(Map<String, dynamic> json) {
  return _TradePair.fromJson(json);
}

/// @nodoc
mixin _$TradePair {
  TokenInfo get tradeTokenInfo => throw _privateConstructorUsedError;
  TokenInfo get quoteTokenInfo => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $TradePairCopyWith<TradePair> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TradePairCopyWith<$Res> {
  factory $TradePairCopyWith(TradePair value, $Res Function(TradePair) then) =
      _$TradePairCopyWithImpl<$Res, TradePair>;
  @useResult
  $Res call({TokenInfo tradeTokenInfo, TokenInfo quoteTokenInfo});

  $TokenInfoCopyWith<$Res> get tradeTokenInfo;
  $TokenInfoCopyWith<$Res> get quoteTokenInfo;
}

/// @nodoc
class _$TradePairCopyWithImpl<$Res, $Val extends TradePair>
    implements $TradePairCopyWith<$Res> {
  _$TradePairCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tradeTokenInfo = null,
    Object? quoteTokenInfo = null,
  }) {
    return _then(_value.copyWith(
      tradeTokenInfo: null == tradeTokenInfo
          ? _value.tradeTokenInfo
          : tradeTokenInfo // ignore: cast_nullable_to_non_nullable
              as TokenInfo,
      quoteTokenInfo: null == quoteTokenInfo
          ? _value.quoteTokenInfo
          : quoteTokenInfo // ignore: cast_nullable_to_non_nullable
              as TokenInfo,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $TokenInfoCopyWith<$Res> get tradeTokenInfo {
    return $TokenInfoCopyWith<$Res>(_value.tradeTokenInfo, (value) {
      return _then(_value.copyWith(tradeTokenInfo: value) as $Val);
    });
  }

  @override
  @pragma('vm:prefer-inline')
  $TokenInfoCopyWith<$Res> get quoteTokenInfo {
    return $TokenInfoCopyWith<$Res>(_value.quoteTokenInfo, (value) {
      return _then(_value.copyWith(quoteTokenInfo: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_TradePairCopyWith<$Res> implements $TradePairCopyWith<$Res> {
  factory _$$_TradePairCopyWith(
          _$_TradePair value, $Res Function(_$_TradePair) then) =
      __$$_TradePairCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({TokenInfo tradeTokenInfo, TokenInfo quoteTokenInfo});

  @override
  $TokenInfoCopyWith<$Res> get tradeTokenInfo;
  @override
  $TokenInfoCopyWith<$Res> get quoteTokenInfo;
}

/// @nodoc
class __$$_TradePairCopyWithImpl<$Res>
    extends _$TradePairCopyWithImpl<$Res, _$_TradePair>
    implements _$$_TradePairCopyWith<$Res> {
  __$$_TradePairCopyWithImpl(
      _$_TradePair _value, $Res Function(_$_TradePair) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tradeTokenInfo = null,
    Object? quoteTokenInfo = null,
  }) {
    return _then(_$_TradePair(
      tradeTokenInfo: null == tradeTokenInfo
          ? _value.tradeTokenInfo
          : tradeTokenInfo // ignore: cast_nullable_to_non_nullable
              as TokenInfo,
      quoteTokenInfo: null == quoteTokenInfo
          ? _value.quoteTokenInfo
          : quoteTokenInfo // ignore: cast_nullable_to_non_nullable
              as TokenInfo,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_TradePair extends _TradePair {
  const _$_TradePair(
      {required this.tradeTokenInfo, required this.quoteTokenInfo})
      : super._();

  factory _$_TradePair.fromJson(Map<String, dynamic> json) =>
      _$$_TradePairFromJson(json);

  @override
  final TokenInfo tradeTokenInfo;
  @override
  final TokenInfo quoteTokenInfo;

  @override
  String toString() {
    return 'TradePair(tradeTokenInfo: $tradeTokenInfo, quoteTokenInfo: $quoteTokenInfo)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_TradePair &&
            (identical(other.tradeTokenInfo, tradeTokenInfo) ||
                other.tradeTokenInfo == tradeTokenInfo) &&
            (identical(other.quoteTokenInfo, quoteTokenInfo) ||
                other.quoteTokenInfo == quoteTokenInfo));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, tradeTokenInfo, quoteTokenInfo);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_TradePairCopyWith<_$_TradePair> get copyWith =>
      __$$_TradePairCopyWithImpl<_$_TradePair>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_TradePairToJson(
      this,
    );
  }
}

abstract class _TradePair extends TradePair {
  const factory _TradePair(
      {required final TokenInfo tradeTokenInfo,
      required final TokenInfo quoteTokenInfo}) = _$_TradePair;
  const _TradePair._() : super._();

  factory _TradePair.fromJson(Map<String, dynamic> json) =
      _$_TradePair.fromJson;

  @override
  TokenInfo get tradeTokenInfo;
  @override
  TokenInfo get quoteTokenInfo;
  @override
  @JsonKey(ignore: true)
  _$$_TradePairCopyWith<_$_TradePair> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$CurrentOrderBookInfo {
  List<CurrentOrder> get orders => throw _privateConstructorUsedError;
  int get blockHeight => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $CurrentOrderBookInfoCopyWith<CurrentOrderBookInfo> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CurrentOrderBookInfoCopyWith<$Res> {
  factory $CurrentOrderBookInfoCopyWith(CurrentOrderBookInfo value,
          $Res Function(CurrentOrderBookInfo) then) =
      _$CurrentOrderBookInfoCopyWithImpl<$Res, CurrentOrderBookInfo>;
  @useResult
  $Res call({List<CurrentOrder> orders, int blockHeight});
}

/// @nodoc
class _$CurrentOrderBookInfoCopyWithImpl<$Res,
        $Val extends CurrentOrderBookInfo>
    implements $CurrentOrderBookInfoCopyWith<$Res> {
  _$CurrentOrderBookInfoCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orders = null,
    Object? blockHeight = null,
  }) {
    return _then(_value.copyWith(
      orders: null == orders
          ? _value.orders
          : orders // ignore: cast_nullable_to_non_nullable
              as List<CurrentOrder>,
      blockHeight: null == blockHeight
          ? _value.blockHeight
          : blockHeight // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_CurrentOrderBookInfoCopyWith<$Res>
    implements $CurrentOrderBookInfoCopyWith<$Res> {
  factory _$$_CurrentOrderBookInfoCopyWith(_$_CurrentOrderBookInfo value,
          $Res Function(_$_CurrentOrderBookInfo) then) =
      __$$_CurrentOrderBookInfoCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({List<CurrentOrder> orders, int blockHeight});
}

/// @nodoc
class __$$_CurrentOrderBookInfoCopyWithImpl<$Res>
    extends _$CurrentOrderBookInfoCopyWithImpl<$Res, _$_CurrentOrderBookInfo>
    implements _$$_CurrentOrderBookInfoCopyWith<$Res> {
  __$$_CurrentOrderBookInfoCopyWithImpl(_$_CurrentOrderBookInfo _value,
      $Res Function(_$_CurrentOrderBookInfo) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orders = null,
    Object? blockHeight = null,
  }) {
    return _then(_$_CurrentOrderBookInfo(
      orders: null == orders
          ? _value._orders
          : orders // ignore: cast_nullable_to_non_nullable
              as List<CurrentOrder>,
      blockHeight: null == blockHeight
          ? _value.blockHeight
          : blockHeight // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc

class _$_CurrentOrderBookInfo implements _CurrentOrderBookInfo {
  const _$_CurrentOrderBookInfo(
      {final List<CurrentOrder> orders = const [], required this.blockHeight})
      : _orders = orders;

  final List<CurrentOrder> _orders;
  @override
  @JsonKey()
  List<CurrentOrder> get orders {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_orders);
  }

  @override
  final int blockHeight;

  @override
  String toString() {
    return 'CurrentOrderBookInfo(orders: $orders, blockHeight: $blockHeight)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_CurrentOrderBookInfo &&
            const DeepCollectionEquality().equals(other._orders, _orders) &&
            (identical(other.blockHeight, blockHeight) ||
                other.blockHeight == blockHeight));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType, const DeepCollectionEquality().hash(_orders), blockHeight);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_CurrentOrderBookInfoCopyWith<_$_CurrentOrderBookInfo> get copyWith =>
      __$$_CurrentOrderBookInfoCopyWithImpl<_$_CurrentOrderBookInfo>(
          this, _$identity);
}

abstract class _CurrentOrderBookInfo implements CurrentOrderBookInfo {
  const factory _CurrentOrderBookInfo(
      {final List<CurrentOrder> orders,
      required final int blockHeight}) = _$_CurrentOrderBookInfo;

  @override
  List<CurrentOrder> get orders;
  @override
  int get blockHeight;
  @override
  @JsonKey(ignore: true)
  _$$_CurrentOrderBookInfoCopyWith<_$_CurrentOrderBookInfo> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$OrderBookInfo {
  List<OrderModel> get orders => throw _privateConstructorUsedError;
  int get blockHeight => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $OrderBookInfoCopyWith<OrderBookInfo> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrderBookInfoCopyWith<$Res> {
  factory $OrderBookInfoCopyWith(
          OrderBookInfo value, $Res Function(OrderBookInfo) then) =
      _$OrderBookInfoCopyWithImpl<$Res, OrderBookInfo>;
  @useResult
  $Res call({List<OrderModel> orders, int blockHeight});
}

/// @nodoc
class _$OrderBookInfoCopyWithImpl<$Res, $Val extends OrderBookInfo>
    implements $OrderBookInfoCopyWith<$Res> {
  _$OrderBookInfoCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orders = null,
    Object? blockHeight = null,
  }) {
    return _then(_value.copyWith(
      orders: null == orders
          ? _value.orders
          : orders // ignore: cast_nullable_to_non_nullable
              as List<OrderModel>,
      blockHeight: null == blockHeight
          ? _value.blockHeight
          : blockHeight // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_OrderBookInfoCopyWith<$Res>
    implements $OrderBookInfoCopyWith<$Res> {
  factory _$$_OrderBookInfoCopyWith(
          _$_OrderBookInfo value, $Res Function(_$_OrderBookInfo) then) =
      __$$_OrderBookInfoCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({List<OrderModel> orders, int blockHeight});
}

/// @nodoc
class __$$_OrderBookInfoCopyWithImpl<$Res>
    extends _$OrderBookInfoCopyWithImpl<$Res, _$_OrderBookInfo>
    implements _$$_OrderBookInfoCopyWith<$Res> {
  __$$_OrderBookInfoCopyWithImpl(
      _$_OrderBookInfo _value, $Res Function(_$_OrderBookInfo) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orders = null,
    Object? blockHeight = null,
  }) {
    return _then(_$_OrderBookInfo(
      orders: null == orders
          ? _value._orders
          : orders // ignore: cast_nullable_to_non_nullable
              as List<OrderModel>,
      blockHeight: null == blockHeight
          ? _value.blockHeight
          : blockHeight // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc

class _$_OrderBookInfo implements _OrderBookInfo {
  const _$_OrderBookInfo(
      {final List<OrderModel> orders = const [], required this.blockHeight})
      : _orders = orders;

  final List<OrderModel> _orders;
  @override
  @JsonKey()
  List<OrderModel> get orders {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_orders);
  }

  @override
  final int blockHeight;

  @override
  String toString() {
    return 'OrderBookInfo(orders: $orders, blockHeight: $blockHeight)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_OrderBookInfo &&
            const DeepCollectionEquality().equals(other._orders, _orders) &&
            (identical(other.blockHeight, blockHeight) ||
                other.blockHeight == blockHeight));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType, const DeepCollectionEquality().hash(_orders), blockHeight);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_OrderBookInfoCopyWith<_$_OrderBookInfo> get copyWith =>
      __$$_OrderBookInfoCopyWithImpl<_$_OrderBookInfo>(this, _$identity);
}

abstract class _OrderBookInfo implements OrderBookInfo {
  const factory _OrderBookInfo(
      {final List<OrderModel> orders,
      required final int blockHeight}) = _$_OrderBookInfo;

  @override
  List<OrderModel> get orders;
  @override
  int get blockHeight;
  @override
  @JsonKey(ignore: true)
  _$$_OrderBookInfoCopyWith<_$_OrderBookInfo> get copyWith =>
      throw _privateConstructorUsedError;
}

OrdersResponse _$OrdersResponseFromJson(Map<String, dynamic> json) {
  return _OrdersResponse.fromJson(json);
}

/// @nodoc
mixin _$OrdersResponse {
  List<CurrentOrder> get orders => throw _privateConstructorUsedError;
  int get size => throw _privateConstructorUsedError;
  HashHeight get queryStart => throw _privateConstructorUsedError;
  HashHeight get queryEnd => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $OrdersResponseCopyWith<OrdersResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $OrdersResponseCopyWith<$Res> {
  factory $OrdersResponseCopyWith(
          OrdersResponse value, $Res Function(OrdersResponse) then) =
      _$OrdersResponseCopyWithImpl<$Res, OrdersResponse>;
  @useResult
  $Res call(
      {List<CurrentOrder> orders,
      int size,
      HashHeight queryStart,
      HashHeight queryEnd});

  $HashHeightCopyWith<$Res> get queryStart;
  $HashHeightCopyWith<$Res> get queryEnd;
}

/// @nodoc
class _$OrdersResponseCopyWithImpl<$Res, $Val extends OrdersResponse>
    implements $OrdersResponseCopyWith<$Res> {
  _$OrdersResponseCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orders = null,
    Object? size = null,
    Object? queryStart = null,
    Object? queryEnd = null,
  }) {
    return _then(_value.copyWith(
      orders: null == orders
          ? _value.orders
          : orders // ignore: cast_nullable_to_non_nullable
              as List<CurrentOrder>,
      size: null == size
          ? _value.size
          : size // ignore: cast_nullable_to_non_nullable
              as int,
      queryStart: null == queryStart
          ? _value.queryStart
          : queryStart // ignore: cast_nullable_to_non_nullable
              as HashHeight,
      queryEnd: null == queryEnd
          ? _value.queryEnd
          : queryEnd // ignore: cast_nullable_to_non_nullable
              as HashHeight,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $HashHeightCopyWith<$Res> get queryStart {
    return $HashHeightCopyWith<$Res>(_value.queryStart, (value) {
      return _then(_value.copyWith(queryStart: value) as $Val);
    });
  }

  @override
  @pragma('vm:prefer-inline')
  $HashHeightCopyWith<$Res> get queryEnd {
    return $HashHeightCopyWith<$Res>(_value.queryEnd, (value) {
      return _then(_value.copyWith(queryEnd: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_OrdersResponseCopyWith<$Res>
    implements $OrdersResponseCopyWith<$Res> {
  factory _$$_OrdersResponseCopyWith(
          _$_OrdersResponse value, $Res Function(_$_OrdersResponse) then) =
      __$$_OrdersResponseCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {List<CurrentOrder> orders,
      int size,
      HashHeight queryStart,
      HashHeight queryEnd});

  @override
  $HashHeightCopyWith<$Res> get queryStart;
  @override
  $HashHeightCopyWith<$Res> get queryEnd;
}

/// @nodoc
class __$$_OrdersResponseCopyWithImpl<$Res>
    extends _$OrdersResponseCopyWithImpl<$Res, _$_OrdersResponse>
    implements _$$_OrdersResponseCopyWith<$Res> {
  __$$_OrdersResponseCopyWithImpl(
      _$_OrdersResponse _value, $Res Function(_$_OrdersResponse) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orders = null,
    Object? size = null,
    Object? queryStart = null,
    Object? queryEnd = null,
  }) {
    return _then(_$_OrdersResponse(
      orders: null == orders
          ? _value._orders
          : orders // ignore: cast_nullable_to_non_nullable
              as List<CurrentOrder>,
      size: null == size
          ? _value.size
          : size // ignore: cast_nullable_to_non_nullable
              as int,
      queryStart: null == queryStart
          ? _value.queryStart
          : queryStart // ignore: cast_nullable_to_non_nullable
              as HashHeight,
      queryEnd: null == queryEnd
          ? _value.queryEnd
          : queryEnd // ignore: cast_nullable_to_non_nullable
              as HashHeight,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_OrdersResponse implements _OrdersResponse {
  const _$_OrdersResponse(
      {final List<CurrentOrder> orders = const [],
      required this.size,
      required this.queryStart,
      required this.queryEnd})
      : _orders = orders;

  factory _$_OrdersResponse.fromJson(Map<String, dynamic> json) =>
      _$$_OrdersResponseFromJson(json);

  final List<CurrentOrder> _orders;
  @override
  @JsonKey()
  List<CurrentOrder> get orders {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_orders);
  }

  @override
  final int size;
  @override
  final HashHeight queryStart;
  @override
  final HashHeight queryEnd;

  @override
  String toString() {
    return 'OrdersResponse(orders: $orders, size: $size, queryStart: $queryStart, queryEnd: $queryEnd)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_OrdersResponse &&
            const DeepCollectionEquality().equals(other._orders, _orders) &&
            (identical(other.size, size) || other.size == size) &&
            (identical(other.queryStart, queryStart) ||
                other.queryStart == queryStart) &&
            (identical(other.queryEnd, queryEnd) ||
                other.queryEnd == queryEnd));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType,
      const DeepCollectionEquality().hash(_orders), size, queryStart, queryEnd);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_OrdersResponseCopyWith<_$_OrdersResponse> get copyWith =>
      __$$_OrdersResponseCopyWithImpl<_$_OrdersResponse>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_OrdersResponseToJson(
      this,
    );
  }
}

abstract class _OrdersResponse implements OrdersResponse {
  const factory _OrdersResponse(
      {final List<CurrentOrder> orders,
      required final int size,
      required final HashHeight queryStart,
      required final HashHeight queryEnd}) = _$_OrdersResponse;

  factory _OrdersResponse.fromJson(Map<String, dynamic> json) =
      _$_OrdersResponse.fromJson;

  @override
  List<CurrentOrder> get orders;
  @override
  int get size;
  @override
  HashHeight get queryStart;
  @override
  HashHeight get queryEnd;
  @override
  @JsonKey(ignore: true)
  _$$_OrdersResponseCopyWith<_$_OrdersResponse> get copyWith =>
      throw _privateConstructorUsedError;
}

MarketOrderParam _$MarketOrderParamFromJson(Map<String, dynamic> json) {
  return _MarketOrderParams.fromJson(json);
}

/// @nodoc
mixin _$MarketOrderParam {
  Token get tradeToken => throw _privateConstructorUsedError;
  Token get quoteToken => throw _privateConstructorUsedError;
  int get sellBegin => throw _privateConstructorUsedError;
  int get sellEnd => throw _privateConstructorUsedError;
  int get buyBegin => throw _privateConstructorUsedError;
  int get buyEnd => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $MarketOrderParamCopyWith<MarketOrderParam> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $MarketOrderParamCopyWith<$Res> {
  factory $MarketOrderParamCopyWith(
          MarketOrderParam value, $Res Function(MarketOrderParam) then) =
      _$MarketOrderParamCopyWithImpl<$Res, MarketOrderParam>;
  @useResult
  $Res call(
      {Token tradeToken,
      Token quoteToken,
      int sellBegin,
      int sellEnd,
      int buyBegin,
      int buyEnd});

  $TokenCopyWith<$Res> get tradeToken;
  $TokenCopyWith<$Res> get quoteToken;
}

/// @nodoc
class _$MarketOrderParamCopyWithImpl<$Res, $Val extends MarketOrderParam>
    implements $MarketOrderParamCopyWith<$Res> {
  _$MarketOrderParamCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tradeToken = null,
    Object? quoteToken = null,
    Object? sellBegin = null,
    Object? sellEnd = null,
    Object? buyBegin = null,
    Object? buyEnd = null,
  }) {
    return _then(_value.copyWith(
      tradeToken: null == tradeToken
          ? _value.tradeToken
          : tradeToken // ignore: cast_nullable_to_non_nullable
              as Token,
      quoteToken: null == quoteToken
          ? _value.quoteToken
          : quoteToken // ignore: cast_nullable_to_non_nullable
              as Token,
      sellBegin: null == sellBegin
          ? _value.sellBegin
          : sellBegin // ignore: cast_nullable_to_non_nullable
              as int,
      sellEnd: null == sellEnd
          ? _value.sellEnd
          : sellEnd // ignore: cast_nullable_to_non_nullable
              as int,
      buyBegin: null == buyBegin
          ? _value.buyBegin
          : buyBegin // ignore: cast_nullable_to_non_nullable
              as int,
      buyEnd: null == buyEnd
          ? _value.buyEnd
          : buyEnd // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $TokenCopyWith<$Res> get tradeToken {
    return $TokenCopyWith<$Res>(_value.tradeToken, (value) {
      return _then(_value.copyWith(tradeToken: value) as $Val);
    });
  }

  @override
  @pragma('vm:prefer-inline')
  $TokenCopyWith<$Res> get quoteToken {
    return $TokenCopyWith<$Res>(_value.quoteToken, (value) {
      return _then(_value.copyWith(quoteToken: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_MarketOrderParamsCopyWith<$Res>
    implements $MarketOrderParamCopyWith<$Res> {
  factory _$$_MarketOrderParamsCopyWith(_$_MarketOrderParams value,
          $Res Function(_$_MarketOrderParams) then) =
      __$$_MarketOrderParamsCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {Token tradeToken,
      Token quoteToken,
      int sellBegin,
      int sellEnd,
      int buyBegin,
      int buyEnd});

  @override
  $TokenCopyWith<$Res> get tradeToken;
  @override
  $TokenCopyWith<$Res> get quoteToken;
}

/// @nodoc
class __$$_MarketOrderParamsCopyWithImpl<$Res>
    extends _$MarketOrderParamCopyWithImpl<$Res, _$_MarketOrderParams>
    implements _$$_MarketOrderParamsCopyWith<$Res> {
  __$$_MarketOrderParamsCopyWithImpl(
      _$_MarketOrderParams _value, $Res Function(_$_MarketOrderParams) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tradeToken = null,
    Object? quoteToken = null,
    Object? sellBegin = null,
    Object? sellEnd = null,
    Object? buyBegin = null,
    Object? buyEnd = null,
  }) {
    return _then(_$_MarketOrderParams(
      tradeToken: null == tradeToken
          ? _value.tradeToken
          : tradeToken // ignore: cast_nullable_to_non_nullable
              as Token,
      quoteToken: null == quoteToken
          ? _value.quoteToken
          : quoteToken // ignore: cast_nullable_to_non_nullable
              as Token,
      sellBegin: null == sellBegin
          ? _value.sellBegin
          : sellBegin // ignore: cast_nullable_to_non_nullable
              as int,
      sellEnd: null == sellEnd
          ? _value.sellEnd
          : sellEnd // ignore: cast_nullable_to_non_nullable
              as int,
      buyBegin: null == buyBegin
          ? _value.buyBegin
          : buyBegin // ignore: cast_nullable_to_non_nullable
              as int,
      buyEnd: null == buyEnd
          ? _value.buyEnd
          : buyEnd // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_MarketOrderParams implements _MarketOrderParams {
  const _$_MarketOrderParams(
      {required this.tradeToken,
      required this.quoteToken,
      required this.sellBegin,
      required this.sellEnd,
      required this.buyBegin,
      required this.buyEnd});

  factory _$_MarketOrderParams.fromJson(Map<String, dynamic> json) =>
      _$$_MarketOrderParamsFromJson(json);

  @override
  final Token tradeToken;
  @override
  final Token quoteToken;
  @override
  final int sellBegin;
  @override
  final int sellEnd;
  @override
  final int buyBegin;
  @override
  final int buyEnd;

  @override
  String toString() {
    return 'MarketOrderParam(tradeToken: $tradeToken, quoteToken: $quoteToken, sellBegin: $sellBegin, sellEnd: $sellEnd, buyBegin: $buyBegin, buyEnd: $buyEnd)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_MarketOrderParams &&
            (identical(other.tradeToken, tradeToken) ||
                other.tradeToken == tradeToken) &&
            (identical(other.quoteToken, quoteToken) ||
                other.quoteToken == quoteToken) &&
            (identical(other.sellBegin, sellBegin) ||
                other.sellBegin == sellBegin) &&
            (identical(other.sellEnd, sellEnd) || other.sellEnd == sellEnd) &&
            (identical(other.buyBegin, buyBegin) ||
                other.buyBegin == buyBegin) &&
            (identical(other.buyEnd, buyEnd) || other.buyEnd == buyEnd));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, tradeToken, quoteToken,
      sellBegin, sellEnd, buyBegin, buyEnd);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_MarketOrderParamsCopyWith<_$_MarketOrderParams> get copyWith =>
      __$$_MarketOrderParamsCopyWithImpl<_$_MarketOrderParams>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_MarketOrderParamsToJson(
      this,
    );
  }
}

abstract class _MarketOrderParams implements MarketOrderParam {
  const factory _MarketOrderParams(
      {required final Token tradeToken,
      required final Token quoteToken,
      required final int sellBegin,
      required final int sellEnd,
      required final int buyBegin,
      required final int buyEnd}) = _$_MarketOrderParams;

  factory _MarketOrderParams.fromJson(Map<String, dynamic> json) =
      _$_MarketOrderParams.fromJson;

  @override
  Token get tradeToken;
  @override
  Token get quoteToken;
  @override
  int get sellBegin;
  @override
  int get sellEnd;
  @override
  int get buyBegin;
  @override
  int get buyEnd;
  @override
  @JsonKey(ignore: true)
  _$$_MarketOrderParamsCopyWith<_$_MarketOrderParams> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$RecoverResults {
  OrderBooks get orderBooks => throw _privateConstructorUsedError;
  BlockEventStream get stream => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $RecoverResultsCopyWith<RecoverResults> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RecoverResultsCopyWith<$Res> {
  factory $RecoverResultsCopyWith(
          RecoverResults value, $Res Function(RecoverResults) then) =
      _$RecoverResultsCopyWithImpl<$Res, RecoverResults>;
  @useResult
  $Res call({OrderBooks orderBooks, BlockEventStream stream});
}

/// @nodoc
class _$RecoverResultsCopyWithImpl<$Res, $Val extends RecoverResults>
    implements $RecoverResultsCopyWith<$Res> {
  _$RecoverResultsCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderBooks = null,
    Object? stream = null,
  }) {
    return _then(_value.copyWith(
      orderBooks: null == orderBooks
          ? _value.orderBooks
          : orderBooks // ignore: cast_nullable_to_non_nullable
              as OrderBooks,
      stream: null == stream
          ? _value.stream
          : stream // ignore: cast_nullable_to_non_nullable
              as BlockEventStream,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_RecoverResultsCopyWith<$Res>
    implements $RecoverResultsCopyWith<$Res> {
  factory _$$_RecoverResultsCopyWith(
          _$_RecoverResults value, $Res Function(_$_RecoverResults) then) =
      __$$_RecoverResultsCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({OrderBooks orderBooks, BlockEventStream stream});
}

/// @nodoc
class __$$_RecoverResultsCopyWithImpl<$Res>
    extends _$RecoverResultsCopyWithImpl<$Res, _$_RecoverResults>
    implements _$$_RecoverResultsCopyWith<$Res> {
  __$$_RecoverResultsCopyWithImpl(
      _$_RecoverResults _value, $Res Function(_$_RecoverResults) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? orderBooks = null,
    Object? stream = null,
  }) {
    return _then(_$_RecoverResults(
      orderBooks: null == orderBooks
          ? _value.orderBooks
          : orderBooks // ignore: cast_nullable_to_non_nullable
              as OrderBooks,
      stream: null == stream
          ? _value.stream
          : stream // ignore: cast_nullable_to_non_nullable
              as BlockEventStream,
    ));
  }
}

/// @nodoc

class _$_RecoverResults implements _RecoverResults {
  const _$_RecoverResults({required this.orderBooks, required this.stream});

  @override
  final OrderBooks orderBooks;
  @override
  final BlockEventStream stream;

  @override
  String toString() {
    return 'RecoverResults(orderBooks: $orderBooks, stream: $stream)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_RecoverResults &&
            (identical(other.orderBooks, orderBooks) ||
                other.orderBooks == orderBooks) &&
            (identical(other.stream, stream) || other.stream == stream));
  }

  @override
  int get hashCode => Object.hash(runtimeType, orderBooks, stream);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_RecoverResultsCopyWith<_$_RecoverResults> get copyWith =>
      __$$_RecoverResultsCopyWithImpl<_$_RecoverResults>(this, _$identity);
}

abstract class _RecoverResults implements RecoverResults {
  const factory _RecoverResults(
      {required final OrderBooks orderBooks,
      required final BlockEventStream stream}) = _$_RecoverResults;

  @override
  OrderBooks get orderBooks;
  @override
  BlockEventStream get stream;
  @override
  @JsonKey(ignore: true)
  _$$_RecoverResultsCopyWith<_$_RecoverResults> get copyWith =>
      throw _privateConstructorUsedError;
}

RestingOrder _$RestingOrderFromJson(Map<String, dynamic> json) {
  return _RestingOrder.fromJson(json);
}

/// @nodoc
mixin _$RestingOrder {
  String get address => throw _privateConstructorUsedError;
  String get orderId => throw _privateConstructorUsedError;
  String get tradePair => throw _privateConstructorUsedError;
  Decimal get amount => throw _privateConstructorUsedError;
  Decimal get quantity => throw _privateConstructorUsedError;
  Decimal get price => throw _privateConstructorUsedError;
  OrderSide get side => throw _privateConstructorUsedError;
  int get startTimestamp => throw _privateConstructorUsedError;
  int get endTimestamp => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $RestingOrderCopyWith<RestingOrder> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RestingOrderCopyWith<$Res> {
  factory $RestingOrderCopyWith(
          RestingOrder value, $Res Function(RestingOrder) then) =
      _$RestingOrderCopyWithImpl<$Res, RestingOrder>;
  @useResult
  $Res call(
      {String address,
      String orderId,
      String tradePair,
      Decimal amount,
      Decimal quantity,
      Decimal price,
      OrderSide side,
      int startTimestamp,
      int endTimestamp});
}

/// @nodoc
class _$RestingOrderCopyWithImpl<$Res, $Val extends RestingOrder>
    implements $RestingOrderCopyWith<$Res> {
  _$RestingOrderCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? address = null,
    Object? orderId = null,
    Object? tradePair = null,
    Object? amount = null,
    Object? quantity = null,
    Object? price = null,
    Object? side = null,
    Object? startTimestamp = null,
    Object? endTimestamp = null,
  }) {
    return _then(_value.copyWith(
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      side: null == side
          ? _value.side
          : side // ignore: cast_nullable_to_non_nullable
              as OrderSide,
      startTimestamp: null == startTimestamp
          ? _value.startTimestamp
          : startTimestamp // ignore: cast_nullable_to_non_nullable
              as int,
      endTimestamp: null == endTimestamp
          ? _value.endTimestamp
          : endTimestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_RestingOrderCopyWith<$Res>
    implements $RestingOrderCopyWith<$Res> {
  factory _$$_RestingOrderCopyWith(
          _$_RestingOrder value, $Res Function(_$_RestingOrder) then) =
      __$$_RestingOrderCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String address,
      String orderId,
      String tradePair,
      Decimal amount,
      Decimal quantity,
      Decimal price,
      OrderSide side,
      int startTimestamp,
      int endTimestamp});
}

/// @nodoc
class __$$_RestingOrderCopyWithImpl<$Res>
    extends _$RestingOrderCopyWithImpl<$Res, _$_RestingOrder>
    implements _$$_RestingOrderCopyWith<$Res> {
  __$$_RestingOrderCopyWithImpl(
      _$_RestingOrder _value, $Res Function(_$_RestingOrder) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? address = null,
    Object? orderId = null,
    Object? tradePair = null,
    Object? amount = null,
    Object? quantity = null,
    Object? price = null,
    Object? side = null,
    Object? startTimestamp = null,
    Object? endTimestamp = null,
  }) {
    return _then(_$_RestingOrder(
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      side: null == side
          ? _value.side
          : side // ignore: cast_nullable_to_non_nullable
              as OrderSide,
      startTimestamp: null == startTimestamp
          ? _value.startTimestamp
          : startTimestamp // ignore: cast_nullable_to_non_nullable
              as int,
      endTimestamp: null == endTimestamp
          ? _value.endTimestamp
          : endTimestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_RestingOrder implements _RestingOrder {
  const _$_RestingOrder(
      {required this.address,
      required this.orderId,
      required this.tradePair,
      required this.amount,
      required this.quantity,
      required this.price,
      required this.side,
      required this.startTimestamp,
      required this.endTimestamp});

  factory _$_RestingOrder.fromJson(Map<String, dynamic> json) =>
      _$$_RestingOrderFromJson(json);

  @override
  final String address;
  @override
  final String orderId;
  @override
  final String tradePair;
  @override
  final Decimal amount;
  @override
  final Decimal quantity;
  @override
  final Decimal price;
  @override
  final OrderSide side;
  @override
  final int startTimestamp;
  @override
  final int endTimestamp;

  @override
  String toString() {
    return 'RestingOrder(address: $address, orderId: $orderId, tradePair: $tradePair, amount: $amount, quantity: $quantity, price: $price, side: $side, startTimestamp: $startTimestamp, endTimestamp: $endTimestamp)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_RestingOrder &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.orderId, orderId) || other.orderId == orderId) &&
            (identical(other.tradePair, tradePair) ||
                other.tradePair == tradePair) &&
            (identical(other.amount, amount) || other.amount == amount) &&
            (identical(other.quantity, quantity) ||
                other.quantity == quantity) &&
            (identical(other.price, price) || other.price == price) &&
            (identical(other.side, side) || other.side == side) &&
            (identical(other.startTimestamp, startTimestamp) ||
                other.startTimestamp == startTimestamp) &&
            (identical(other.endTimestamp, endTimestamp) ||
                other.endTimestamp == endTimestamp));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, address, orderId, tradePair,
      amount, quantity, price, side, startTimestamp, endTimestamp);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_RestingOrderCopyWith<_$_RestingOrder> get copyWith =>
      __$$_RestingOrderCopyWithImpl<_$_RestingOrder>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_RestingOrderToJson(
      this,
    );
  }
}

abstract class _RestingOrder implements RestingOrder {
  const factory _RestingOrder(
      {required final String address,
      required final String orderId,
      required final String tradePair,
      required final Decimal amount,
      required final Decimal quantity,
      required final Decimal price,
      required final OrderSide side,
      required final int startTimestamp,
      required final int endTimestamp}) = _$_RestingOrder;

  factory _RestingOrder.fromJson(Map<String, dynamic> json) =
      _$_RestingOrder.fromJson;

  @override
  String get address;
  @override
  String get orderId;
  @override
  String get tradePair;
  @override
  Decimal get amount;
  @override
  Decimal get quantity;
  @override
  Decimal get price;
  @override
  OrderSide get side;
  @override
  int get startTimestamp;
  @override
  int get endTimestamp;
  @override
  @JsonKey(ignore: true)
  _$$_RestingOrderCopyWith<_$_RestingOrder> get copyWith =>
      throw _privateConstructorUsedError;
}

UserTrade _$UserTradeFromJson(Map<String, dynamic> json) {
  return _UserTrade.fromJson(json);
}

/// @nodoc
mixin _$UserTrade {
  String get address => throw _privateConstructorUsedError;
  String get orderId => throw _privateConstructorUsedError;
  String get blockHash => throw _privateConstructorUsedError;
  String get tradePair => throw _privateConstructorUsedError;
  Decimal get amount => throw _privateConstructorUsedError;
  Decimal get quantity => throw _privateConstructorUsedError;
  Decimal get price => throw _privateConstructorUsedError;
  OrderSide get orderSide => throw _privateConstructorUsedError;
  TraderSide get traderSide => throw _privateConstructorUsedError;
  int get timestamp => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UserTradeCopyWith<UserTrade> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UserTradeCopyWith<$Res> {
  factory $UserTradeCopyWith(UserTrade value, $Res Function(UserTrade) then) =
      _$UserTradeCopyWithImpl<$Res, UserTrade>;
  @useResult
  $Res call(
      {String address,
      String orderId,
      String blockHash,
      String tradePair,
      Decimal amount,
      Decimal quantity,
      Decimal price,
      OrderSide orderSide,
      TraderSide traderSide,
      int timestamp});
}

/// @nodoc
class _$UserTradeCopyWithImpl<$Res, $Val extends UserTrade>
    implements $UserTradeCopyWith<$Res> {
  _$UserTradeCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? address = null,
    Object? orderId = null,
    Object? blockHash = null,
    Object? tradePair = null,
    Object? amount = null,
    Object? quantity = null,
    Object? price = null,
    Object? orderSide = null,
    Object? traderSide = null,
    Object? timestamp = null,
  }) {
    return _then(_value.copyWith(
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      blockHash: null == blockHash
          ? _value.blockHash
          : blockHash // ignore: cast_nullable_to_non_nullable
              as String,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      orderSide: null == orderSide
          ? _value.orderSide
          : orderSide // ignore: cast_nullable_to_non_nullable
              as OrderSide,
      traderSide: null == traderSide
          ? _value.traderSide
          : traderSide // ignore: cast_nullable_to_non_nullable
              as TraderSide,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_UserTradeCopyWith<$Res> implements $UserTradeCopyWith<$Res> {
  factory _$$_UserTradeCopyWith(
          _$_UserTrade value, $Res Function(_$_UserTrade) then) =
      __$$_UserTradeCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String address,
      String orderId,
      String blockHash,
      String tradePair,
      Decimal amount,
      Decimal quantity,
      Decimal price,
      OrderSide orderSide,
      TraderSide traderSide,
      int timestamp});
}

/// @nodoc
class __$$_UserTradeCopyWithImpl<$Res>
    extends _$UserTradeCopyWithImpl<$Res, _$_UserTrade>
    implements _$$_UserTradeCopyWith<$Res> {
  __$$_UserTradeCopyWithImpl(
      _$_UserTrade _value, $Res Function(_$_UserTrade) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? address = null,
    Object? orderId = null,
    Object? blockHash = null,
    Object? tradePair = null,
    Object? amount = null,
    Object? quantity = null,
    Object? price = null,
    Object? orderSide = null,
    Object? traderSide = null,
    Object? timestamp = null,
  }) {
    return _then(_$_UserTrade(
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      orderId: null == orderId
          ? _value.orderId
          : orderId // ignore: cast_nullable_to_non_nullable
              as String,
      blockHash: null == blockHash
          ? _value.blockHash
          : blockHash // ignore: cast_nullable_to_non_nullable
              as String,
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as String,
      amount: null == amount
          ? _value.amount
          : amount // ignore: cast_nullable_to_non_nullable
              as Decimal,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as Decimal,
      price: null == price
          ? _value.price
          : price // ignore: cast_nullable_to_non_nullable
              as Decimal,
      orderSide: null == orderSide
          ? _value.orderSide
          : orderSide // ignore: cast_nullable_to_non_nullable
              as OrderSide,
      traderSide: null == traderSide
          ? _value.traderSide
          : traderSide // ignore: cast_nullable_to_non_nullable
              as TraderSide,
      timestamp: null == timestamp
          ? _value.timestamp
          : timestamp // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_UserTrade implements _UserTrade {
  const _$_UserTrade(
      {required this.address,
      required this.orderId,
      required this.blockHash,
      required this.tradePair,
      required this.amount,
      required this.quantity,
      required this.price,
      required this.orderSide,
      required this.traderSide,
      required this.timestamp});

  factory _$_UserTrade.fromJson(Map<String, dynamic> json) =>
      _$$_UserTradeFromJson(json);

  @override
  final String address;
  @override
  final String orderId;
  @override
  final String blockHash;
  @override
  final String tradePair;
  @override
  final Decimal amount;
  @override
  final Decimal quantity;
  @override
  final Decimal price;
  @override
  final OrderSide orderSide;
  @override
  final TraderSide traderSide;
  @override
  final int timestamp;

  @override
  String toString() {
    return 'UserTrade(address: $address, orderId: $orderId, blockHash: $blockHash, tradePair: $tradePair, amount: $amount, quantity: $quantity, price: $price, orderSide: $orderSide, traderSide: $traderSide, timestamp: $timestamp)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_UserTrade &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.orderId, orderId) || other.orderId == orderId) &&
            (identical(other.blockHash, blockHash) ||
                other.blockHash == blockHash) &&
            (identical(other.tradePair, tradePair) ||
                other.tradePair == tradePair) &&
            (identical(other.amount, amount) || other.amount == amount) &&
            (identical(other.quantity, quantity) ||
                other.quantity == quantity) &&
            (identical(other.price, price) || other.price == price) &&
            (identical(other.orderSide, orderSide) ||
                other.orderSide == orderSide) &&
            (identical(other.traderSide, traderSide) ||
                other.traderSide == traderSide) &&
            (identical(other.timestamp, timestamp) ||
                other.timestamp == timestamp));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, address, orderId, blockHash,
      tradePair, amount, quantity, price, orderSide, traderSide, timestamp);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_UserTradeCopyWith<_$_UserTrade> get copyWith =>
      __$$_UserTradeCopyWithImpl<_$_UserTrade>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_UserTradeToJson(
      this,
    );
  }
}

abstract class _UserTrade implements UserTrade {
  const factory _UserTrade(
      {required final String address,
      required final String orderId,
      required final String blockHash,
      required final String tradePair,
      required final Decimal amount,
      required final Decimal quantity,
      required final Decimal price,
      required final OrderSide orderSide,
      required final TraderSide traderSide,
      required final int timestamp}) = _$_UserTrade;

  factory _UserTrade.fromJson(Map<String, dynamic> json) =
      _$_UserTrade.fromJson;

  @override
  String get address;
  @override
  String get orderId;
  @override
  String get blockHash;
  @override
  String get tradePair;
  @override
  Decimal get amount;
  @override
  Decimal get quantity;
  @override
  Decimal get price;
  @override
  OrderSide get orderSide;
  @override
  TraderSide get traderSide;
  @override
  int get timestamp;
  @override
  @JsonKey(ignore: true)
  _$$_UserTradeCopyWith<_$_UserTrade> get copyWith =>
      throw _privateConstructorUsedError;
}

RewardsConfig _$RewardsConfigFromJson(Map<String, dynamic> json) {
  return _RewardsConfig.fromJson(json);
}

/// @nodoc
mixin _$RewardsConfig {
  String? get seedPhrase => throw _privateConstructorUsedError;
  Token get rewardToken => throw _privateConstructorUsedError;
  Decimal get tradingReward => throw _privateConstructorUsedError;
  Decimal get limitOrderReward => throw _privateConstructorUsedError;
  Decimal get orderDistanceThreshold => throw _privateConstructorUsedError;
  String get tradingPair => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $RewardsConfigCopyWith<RewardsConfig> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RewardsConfigCopyWith<$Res> {
  factory $RewardsConfigCopyWith(
          RewardsConfig value, $Res Function(RewardsConfig) then) =
      _$RewardsConfigCopyWithImpl<$Res, RewardsConfig>;
  @useResult
  $Res call(
      {String? seedPhrase,
      Token rewardToken,
      Decimal tradingReward,
      Decimal limitOrderReward,
      Decimal orderDistanceThreshold,
      String tradingPair});

  $TokenCopyWith<$Res> get rewardToken;
}

/// @nodoc
class _$RewardsConfigCopyWithImpl<$Res, $Val extends RewardsConfig>
    implements $RewardsConfigCopyWith<$Res> {
  _$RewardsConfigCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? seedPhrase = freezed,
    Object? rewardToken = null,
    Object? tradingReward = null,
    Object? limitOrderReward = null,
    Object? orderDistanceThreshold = null,
    Object? tradingPair = null,
  }) {
    return _then(_value.copyWith(
      seedPhrase: freezed == seedPhrase
          ? _value.seedPhrase
          : seedPhrase // ignore: cast_nullable_to_non_nullable
              as String?,
      rewardToken: null == rewardToken
          ? _value.rewardToken
          : rewardToken // ignore: cast_nullable_to_non_nullable
              as Token,
      tradingReward: null == tradingReward
          ? _value.tradingReward
          : tradingReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      limitOrderReward: null == limitOrderReward
          ? _value.limitOrderReward
          : limitOrderReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      orderDistanceThreshold: null == orderDistanceThreshold
          ? _value.orderDistanceThreshold
          : orderDistanceThreshold // ignore: cast_nullable_to_non_nullable
              as Decimal,
      tradingPair: null == tradingPair
          ? _value.tradingPair
          : tradingPair // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $TokenCopyWith<$Res> get rewardToken {
    return $TokenCopyWith<$Res>(_value.rewardToken, (value) {
      return _then(_value.copyWith(rewardToken: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_RewardsConfigCopyWith<$Res>
    implements $RewardsConfigCopyWith<$Res> {
  factory _$$_RewardsConfigCopyWith(
          _$_RewardsConfig value, $Res Function(_$_RewardsConfig) then) =
      __$$_RewardsConfigCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String? seedPhrase,
      Token rewardToken,
      Decimal tradingReward,
      Decimal limitOrderReward,
      Decimal orderDistanceThreshold,
      String tradingPair});

  @override
  $TokenCopyWith<$Res> get rewardToken;
}

/// @nodoc
class __$$_RewardsConfigCopyWithImpl<$Res>
    extends _$RewardsConfigCopyWithImpl<$Res, _$_RewardsConfig>
    implements _$$_RewardsConfigCopyWith<$Res> {
  __$$_RewardsConfigCopyWithImpl(
      _$_RewardsConfig _value, $Res Function(_$_RewardsConfig) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? seedPhrase = freezed,
    Object? rewardToken = null,
    Object? tradingReward = null,
    Object? limitOrderReward = null,
    Object? orderDistanceThreshold = null,
    Object? tradingPair = null,
  }) {
    return _then(_$_RewardsConfig(
      seedPhrase: freezed == seedPhrase
          ? _value.seedPhrase
          : seedPhrase // ignore: cast_nullable_to_non_nullable
              as String?,
      rewardToken: null == rewardToken
          ? _value.rewardToken
          : rewardToken // ignore: cast_nullable_to_non_nullable
              as Token,
      tradingReward: null == tradingReward
          ? _value.tradingReward
          : tradingReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      limitOrderReward: null == limitOrderReward
          ? _value.limitOrderReward
          : limitOrderReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      orderDistanceThreshold: null == orderDistanceThreshold
          ? _value.orderDistanceThreshold
          : orderDistanceThreshold // ignore: cast_nullable_to_non_nullable
              as Decimal,
      tradingPair: null == tradingPair
          ? _value.tradingPair
          : tradingPair // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

@JsonSerializable(includeIfNull: true)
class _$_RewardsConfig implements _RewardsConfig {
  const _$_RewardsConfig(
      {this.seedPhrase,
      required this.rewardToken,
      required this.tradingReward,
      required this.limitOrderReward,
      required this.orderDistanceThreshold,
      required this.tradingPair});

  factory _$_RewardsConfig.fromJson(Map<String, dynamic> json) =>
      _$$_RewardsConfigFromJson(json);

  @override
  final String? seedPhrase;
  @override
  final Token rewardToken;
  @override
  final Decimal tradingReward;
  @override
  final Decimal limitOrderReward;
  @override
  final Decimal orderDistanceThreshold;
  @override
  final String tradingPair;

  @override
  String toString() {
    return 'RewardsConfig(seedPhrase: $seedPhrase, rewardToken: $rewardToken, tradingReward: $tradingReward, limitOrderReward: $limitOrderReward, orderDistanceThreshold: $orderDistanceThreshold, tradingPair: $tradingPair)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_RewardsConfig &&
            (identical(other.seedPhrase, seedPhrase) ||
                other.seedPhrase == seedPhrase) &&
            (identical(other.rewardToken, rewardToken) ||
                other.rewardToken == rewardToken) &&
            (identical(other.tradingReward, tradingReward) ||
                other.tradingReward == tradingReward) &&
            (identical(other.limitOrderReward, limitOrderReward) ||
                other.limitOrderReward == limitOrderReward) &&
            (identical(other.orderDistanceThreshold, orderDistanceThreshold) ||
                other.orderDistanceThreshold == orderDistanceThreshold) &&
            (identical(other.tradingPair, tradingPair) ||
                other.tradingPair == tradingPair));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, seedPhrase, rewardToken,
      tradingReward, limitOrderReward, orderDistanceThreshold, tradingPair);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_RewardsConfigCopyWith<_$_RewardsConfig> get copyWith =>
      __$$_RewardsConfigCopyWithImpl<_$_RewardsConfig>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_RewardsConfigToJson(
      this,
    );
  }
}

abstract class _RewardsConfig implements RewardsConfig {
  const factory _RewardsConfig(
      {final String? seedPhrase,
      required final Token rewardToken,
      required final Decimal tradingReward,
      required final Decimal limitOrderReward,
      required final Decimal orderDistanceThreshold,
      required final String tradingPair}) = _$_RewardsConfig;

  factory _RewardsConfig.fromJson(Map<String, dynamic> json) =
      _$_RewardsConfig.fromJson;

  @override
  String? get seedPhrase;
  @override
  Token get rewardToken;
  @override
  Decimal get tradingReward;
  @override
  Decimal get limitOrderReward;
  @override
  Decimal get orderDistanceThreshold;
  @override
  String get tradingPair;
  @override
  @JsonKey(ignore: true)
  _$$_RewardsConfigCopyWith<_$_RewardsConfig> get copyWith =>
      throw _privateConstructorUsedError;
}

RewardsTotal _$RewardsTotalFromJson(Map<String, dynamic> json) {
  return _RewardsTotal.fromJson(json);
}

/// @nodoc
mixin _$RewardsTotal {
  Decimal get tradingReward => throw _privateConstructorUsedError;
  Decimal get limitOrderReward => throw _privateConstructorUsedError;
  Decimal get totalReward => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $RewardsTotalCopyWith<RewardsTotal> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RewardsTotalCopyWith<$Res> {
  factory $RewardsTotalCopyWith(
          RewardsTotal value, $Res Function(RewardsTotal) then) =
      _$RewardsTotalCopyWithImpl<$Res, RewardsTotal>;
  @useResult
  $Res call(
      {Decimal tradingReward, Decimal limitOrderReward, Decimal totalReward});
}

/// @nodoc
class _$RewardsTotalCopyWithImpl<$Res, $Val extends RewardsTotal>
    implements $RewardsTotalCopyWith<$Res> {
  _$RewardsTotalCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tradingReward = null,
    Object? limitOrderReward = null,
    Object? totalReward = null,
  }) {
    return _then(_value.copyWith(
      tradingReward: null == tradingReward
          ? _value.tradingReward
          : tradingReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      limitOrderReward: null == limitOrderReward
          ? _value.limitOrderReward
          : limitOrderReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      totalReward: null == totalReward
          ? _value.totalReward
          : totalReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_RewardsTotalCopyWith<$Res>
    implements $RewardsTotalCopyWith<$Res> {
  factory _$$_RewardsTotalCopyWith(
          _$_RewardsTotal value, $Res Function(_$_RewardsTotal) then) =
      __$$_RewardsTotalCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {Decimal tradingReward, Decimal limitOrderReward, Decimal totalReward});
}

/// @nodoc
class __$$_RewardsTotalCopyWithImpl<$Res>
    extends _$RewardsTotalCopyWithImpl<$Res, _$_RewardsTotal>
    implements _$$_RewardsTotalCopyWith<$Res> {
  __$$_RewardsTotalCopyWithImpl(
      _$_RewardsTotal _value, $Res Function(_$_RewardsTotal) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tradingReward = null,
    Object? limitOrderReward = null,
    Object? totalReward = null,
  }) {
    return _then(_$_RewardsTotal(
      tradingReward: null == tradingReward
          ? _value.tradingReward
          : tradingReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      limitOrderReward: null == limitOrderReward
          ? _value.limitOrderReward
          : limitOrderReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      totalReward: null == totalReward
          ? _value.totalReward
          : totalReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_RewardsTotal implements _RewardsTotal {
  const _$_RewardsTotal(
      {required this.tradingReward,
      required this.limitOrderReward,
      required this.totalReward});

  factory _$_RewardsTotal.fromJson(Map<String, dynamic> json) =>
      _$$_RewardsTotalFromJson(json);

  @override
  final Decimal tradingReward;
  @override
  final Decimal limitOrderReward;
  @override
  final Decimal totalReward;

  @override
  String toString() {
    return 'RewardsTotal(tradingReward: $tradingReward, limitOrderReward: $limitOrderReward, totalReward: $totalReward)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_RewardsTotal &&
            (identical(other.tradingReward, tradingReward) ||
                other.tradingReward == tradingReward) &&
            (identical(other.limitOrderReward, limitOrderReward) ||
                other.limitOrderReward == limitOrderReward) &&
            (identical(other.totalReward, totalReward) ||
                other.totalReward == totalReward));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode =>
      Object.hash(runtimeType, tradingReward, limitOrderReward, totalReward);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_RewardsTotalCopyWith<_$_RewardsTotal> get copyWith =>
      __$$_RewardsTotalCopyWithImpl<_$_RewardsTotal>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_RewardsTotalToJson(
      this,
    );
  }
}

abstract class _RewardsTotal implements RewardsTotal {
  const factory _RewardsTotal(
      {required final Decimal tradingReward,
      required final Decimal limitOrderReward,
      required final Decimal totalReward}) = _$_RewardsTotal;

  factory _RewardsTotal.fromJson(Map<String, dynamic> json) =
      _$_RewardsTotal.fromJson;

  @override
  Decimal get tradingReward;
  @override
  Decimal get limitOrderReward;
  @override
  Decimal get totalReward;
  @override
  @JsonKey(ignore: true)
  _$$_RewardsTotalCopyWith<_$_RewardsTotal> get copyWith =>
      throw _privateConstructorUsedError;
}

TimeRange _$TimeRangeFromJson(Map<String, dynamic> json) {
  return _TimeRange.fromJson(json);
}

/// @nodoc
mixin _$TimeRange {
  @JsonKey(name: 'stime')
  DateTime get startTime => throw _privateConstructorUsedError;
  @JsonKey(name: 'etime')
  DateTime get endTime => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $TimeRangeCopyWith<TimeRange> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $TimeRangeCopyWith<$Res> {
  factory $TimeRangeCopyWith(TimeRange value, $Res Function(TimeRange) then) =
      _$TimeRangeCopyWithImpl<$Res, TimeRange>;
  @useResult
  $Res call(
      {@JsonKey(name: 'stime') DateTime startTime,
      @JsonKey(name: 'etime') DateTime endTime});
}

/// @nodoc
class _$TimeRangeCopyWithImpl<$Res, $Val extends TimeRange>
    implements $TimeRangeCopyWith<$Res> {
  _$TimeRangeCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? startTime = null,
    Object? endTime = null,
  }) {
    return _then(_value.copyWith(
      startTime: null == startTime
          ? _value.startTime
          : startTime // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endTime: null == endTime
          ? _value.endTime
          : endTime // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_TimeRangeCopyWith<$Res> implements $TimeRangeCopyWith<$Res> {
  factory _$$_TimeRangeCopyWith(
          _$_TimeRange value, $Res Function(_$_TimeRange) then) =
      __$$_TimeRangeCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {@JsonKey(name: 'stime') DateTime startTime,
      @JsonKey(name: 'etime') DateTime endTime});
}

/// @nodoc
class __$$_TimeRangeCopyWithImpl<$Res>
    extends _$TimeRangeCopyWithImpl<$Res, _$_TimeRange>
    implements _$$_TimeRangeCopyWith<$Res> {
  __$$_TimeRangeCopyWithImpl(
      _$_TimeRange _value, $Res Function(_$_TimeRange) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? startTime = null,
    Object? endTime = null,
  }) {
    return _then(_$_TimeRange(
      startTime: null == startTime
          ? _value.startTime
          : startTime // ignore: cast_nullable_to_non_nullable
              as DateTime,
      endTime: null == endTime
          ? _value.endTime
          : endTime // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_TimeRange extends _TimeRange {
  const _$_TimeRange(
      {@JsonKey(name: 'stime') required this.startTime,
      @JsonKey(name: 'etime') required this.endTime})
      : super._();

  factory _$_TimeRange.fromJson(Map<String, dynamic> json) =>
      _$$_TimeRangeFromJson(json);

  @override
  @JsonKey(name: 'stime')
  final DateTime startTime;
  @override
  @JsonKey(name: 'etime')
  final DateTime endTime;

  @override
  String toString() {
    return 'TimeRange(startTime: $startTime, endTime: $endTime)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_TimeRange &&
            (identical(other.startTime, startTime) ||
                other.startTime == startTime) &&
            (identical(other.endTime, endTime) || other.endTime == endTime));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, startTime, endTime);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_TimeRangeCopyWith<_$_TimeRange> get copyWith =>
      __$$_TimeRangeCopyWithImpl<_$_TimeRange>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_TimeRangeToJson(
      this,
    );
  }
}

abstract class _TimeRange extends TimeRange {
  const factory _TimeRange(
      {@JsonKey(name: 'stime') required final DateTime startTime,
      @JsonKey(name: 'etime') required final DateTime endTime}) = _$_TimeRange;
  const _TimeRange._() : super._();

  factory _TimeRange.fromJson(Map<String, dynamic> json) =
      _$_TimeRange.fromJson;

  @override
  @JsonKey(name: 'stime')
  DateTime get startTime;
  @override
  @JsonKey(name: 'etime')
  DateTime get endTime;
  @override
  @JsonKey(ignore: true)
  _$$_TimeRangeCopyWith<_$_TimeRange> get copyWith =>
      throw _privateConstructorUsedError;
}

Cycle _$CycleFromJson(Map<String, dynamic> json) {
  return _Cycle.fromJson(json);
}

/// @nodoc
mixin _$Cycle {
  int get index => throw _privateConstructorUsedError;
  CycleType get type => throw _privateConstructorUsedError;
  TimeRange get timeRange => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $CycleCopyWith<Cycle> get copyWith => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CycleCopyWith<$Res> {
  factory $CycleCopyWith(Cycle value, $Res Function(Cycle) then) =
      _$CycleCopyWithImpl<$Res, Cycle>;
  @useResult
  $Res call({int index, CycleType type, TimeRange timeRange});

  $TimeRangeCopyWith<$Res> get timeRange;
}

/// @nodoc
class _$CycleCopyWithImpl<$Res, $Val extends Cycle>
    implements $CycleCopyWith<$Res> {
  _$CycleCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? index = null,
    Object? type = null,
    Object? timeRange = null,
  }) {
    return _then(_value.copyWith(
      index: null == index
          ? _value.index
          : index // ignore: cast_nullable_to_non_nullable
              as int,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as CycleType,
      timeRange: null == timeRange
          ? _value.timeRange
          : timeRange // ignore: cast_nullable_to_non_nullable
              as TimeRange,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $TimeRangeCopyWith<$Res> get timeRange {
    return $TimeRangeCopyWith<$Res>(_value.timeRange, (value) {
      return _then(_value.copyWith(timeRange: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_CycleCopyWith<$Res> implements $CycleCopyWith<$Res> {
  factory _$$_CycleCopyWith(_$_Cycle value, $Res Function(_$_Cycle) then) =
      __$$_CycleCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({int index, CycleType type, TimeRange timeRange});

  @override
  $TimeRangeCopyWith<$Res> get timeRange;
}

/// @nodoc
class __$$_CycleCopyWithImpl<$Res> extends _$CycleCopyWithImpl<$Res, _$_Cycle>
    implements _$$_CycleCopyWith<$Res> {
  __$$_CycleCopyWithImpl(_$_Cycle _value, $Res Function(_$_Cycle) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? index = null,
    Object? type = null,
    Object? timeRange = null,
  }) {
    return _then(_$_Cycle(
      index: null == index
          ? _value.index
          : index // ignore: cast_nullable_to_non_nullable
              as int,
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as CycleType,
      timeRange: null == timeRange
          ? _value.timeRange
          : timeRange // ignore: cast_nullable_to_non_nullable
              as TimeRange,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_Cycle extends _Cycle {
  const _$_Cycle(
      {required this.index, required this.type, required this.timeRange})
      : super._();

  factory _$_Cycle.fromJson(Map<String, dynamic> json) =>
      _$$_CycleFromJson(json);

  @override
  final int index;
  @override
  final CycleType type;
  @override
  final TimeRange timeRange;

  @override
  String toString() {
    return 'Cycle(index: $index, type: $type, timeRange: $timeRange)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_Cycle &&
            (identical(other.index, index) || other.index == index) &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.timeRange, timeRange) ||
                other.timeRange == timeRange));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, index, type, timeRange);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_CycleCopyWith<_$_Cycle> get copyWith =>
      __$$_CycleCopyWithImpl<_$_Cycle>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_CycleToJson(
      this,
    );
  }
}

abstract class _Cycle extends Cycle {
  const factory _Cycle(
      {required final int index,
      required final CycleType type,
      required final TimeRange timeRange}) = _$_Cycle;
  const _Cycle._() : super._();

  factory _Cycle.fromJson(Map<String, dynamic> json) = _$_Cycle.fromJson;

  @override
  int get index;
  @override
  CycleType get type;
  @override
  TimeRange get timeRange;
  @override
  @JsonKey(ignore: true)
  _$$_CycleCopyWith<_$_Cycle> get copyWith =>
      throw _privateConstructorUsedError;
}

MarketResults _$MarketResultsFromJson(Map<String, dynamic> json) {
  return _MarketResults.fromJson(json);
}

/// @nodoc
mixin _$MarketResults {
  TradePair get tradePair => throw _privateConstructorUsedError;
  List<UserTrade> get userTrades => throw _privateConstructorUsedError;
  List<RestingOrder> get restingOrders => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $MarketResultsCopyWith<MarketResults> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $MarketResultsCopyWith<$Res> {
  factory $MarketResultsCopyWith(
          MarketResults value, $Res Function(MarketResults) then) =
      _$MarketResultsCopyWithImpl<$Res, MarketResults>;
  @useResult
  $Res call(
      {TradePair tradePair,
      List<UserTrade> userTrades,
      List<RestingOrder> restingOrders});

  $TradePairCopyWith<$Res> get tradePair;
}

/// @nodoc
class _$MarketResultsCopyWithImpl<$Res, $Val extends MarketResults>
    implements $MarketResultsCopyWith<$Res> {
  _$MarketResultsCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tradePair = null,
    Object? userTrades = null,
    Object? restingOrders = null,
  }) {
    return _then(_value.copyWith(
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as TradePair,
      userTrades: null == userTrades
          ? _value.userTrades
          : userTrades // ignore: cast_nullable_to_non_nullable
              as List<UserTrade>,
      restingOrders: null == restingOrders
          ? _value.restingOrders
          : restingOrders // ignore: cast_nullable_to_non_nullable
              as List<RestingOrder>,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $TradePairCopyWith<$Res> get tradePair {
    return $TradePairCopyWith<$Res>(_value.tradePair, (value) {
      return _then(_value.copyWith(tradePair: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_MarketResultsCopyWith<$Res>
    implements $MarketResultsCopyWith<$Res> {
  factory _$$_MarketResultsCopyWith(
          _$_MarketResults value, $Res Function(_$_MarketResults) then) =
      __$$_MarketResultsCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {TradePair tradePair,
      List<UserTrade> userTrades,
      List<RestingOrder> restingOrders});

  @override
  $TradePairCopyWith<$Res> get tradePair;
}

/// @nodoc
class __$$_MarketResultsCopyWithImpl<$Res>
    extends _$MarketResultsCopyWithImpl<$Res, _$_MarketResults>
    implements _$$_MarketResultsCopyWith<$Res> {
  __$$_MarketResultsCopyWithImpl(
      _$_MarketResults _value, $Res Function(_$_MarketResults) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? tradePair = null,
    Object? userTrades = null,
    Object? restingOrders = null,
  }) {
    return _then(_$_MarketResults(
      tradePair: null == tradePair
          ? _value.tradePair
          : tradePair // ignore: cast_nullable_to_non_nullable
              as TradePair,
      userTrades: null == userTrades
          ? _value._userTrades
          : userTrades // ignore: cast_nullable_to_non_nullable
              as List<UserTrade>,
      restingOrders: null == restingOrders
          ? _value._restingOrders
          : restingOrders // ignore: cast_nullable_to_non_nullable
              as List<RestingOrder>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_MarketResults implements _MarketResults {
  const _$_MarketResults(
      {required this.tradePair,
      required final List<UserTrade> userTrades,
      required final List<RestingOrder> restingOrders})
      : _userTrades = userTrades,
        _restingOrders = restingOrders;

  factory _$_MarketResults.fromJson(Map<String, dynamic> json) =>
      _$$_MarketResultsFromJson(json);

  @override
  final TradePair tradePair;
  final List<UserTrade> _userTrades;
  @override
  List<UserTrade> get userTrades {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_userTrades);
  }

  final List<RestingOrder> _restingOrders;
  @override
  List<RestingOrder> get restingOrders {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_restingOrders);
  }

  @override
  String toString() {
    return 'MarketResults(tradePair: $tradePair, userTrades: $userTrades, restingOrders: $restingOrders)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_MarketResults &&
            (identical(other.tradePair, tradePair) ||
                other.tradePair == tradePair) &&
            const DeepCollectionEquality()
                .equals(other._userTrades, _userTrades) &&
            const DeepCollectionEquality()
                .equals(other._restingOrders, _restingOrders));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      tradePair,
      const DeepCollectionEquality().hash(_userTrades),
      const DeepCollectionEquality().hash(_restingOrders));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_MarketResultsCopyWith<_$_MarketResults> get copyWith =>
      __$$_MarketResultsCopyWithImpl<_$_MarketResults>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_MarketResultsToJson(
      this,
    );
  }
}

abstract class _MarketResults implements MarketResults {
  const factory _MarketResults(
      {required final TradePair tradePair,
      required final List<UserTrade> userTrades,
      required final List<RestingOrder> restingOrders}) = _$_MarketResults;

  factory _MarketResults.fromJson(Map<String, dynamic> json) =
      _$_MarketResults.fromJson;

  @override
  TradePair get tradePair;
  @override
  List<UserTrade> get userTrades;
  @override
  List<RestingOrder> get restingOrders;
  @override
  @JsonKey(ignore: true)
  _$$_MarketResultsCopyWith<_$_MarketResults> get copyWith =>
      throw _privateConstructorUsedError;
}

ScanResults _$ScanResultsFromJson(Map<String, dynamic> json) {
  return _ScanResults.fromJson(json);
}

/// @nodoc
mixin _$ScanResults {
  Cycle get cycle => throw _privateConstructorUsedError;
  Map<String, MarketResults> get markets => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ScanResultsCopyWith<ScanResults> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ScanResultsCopyWith<$Res> {
  factory $ScanResultsCopyWith(
          ScanResults value, $Res Function(ScanResults) then) =
      _$ScanResultsCopyWithImpl<$Res, ScanResults>;
  @useResult
  $Res call({Cycle cycle, Map<String, MarketResults> markets});

  $CycleCopyWith<$Res> get cycle;
}

/// @nodoc
class _$ScanResultsCopyWithImpl<$Res, $Val extends ScanResults>
    implements $ScanResultsCopyWith<$Res> {
  _$ScanResultsCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? cycle = null,
    Object? markets = null,
  }) {
    return _then(_value.copyWith(
      cycle: null == cycle
          ? _value.cycle
          : cycle // ignore: cast_nullable_to_non_nullable
              as Cycle,
      markets: null == markets
          ? _value.markets
          : markets // ignore: cast_nullable_to_non_nullable
              as Map<String, MarketResults>,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $CycleCopyWith<$Res> get cycle {
    return $CycleCopyWith<$Res>(_value.cycle, (value) {
      return _then(_value.copyWith(cycle: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_ScanResultsCopyWith<$Res>
    implements $ScanResultsCopyWith<$Res> {
  factory _$$_ScanResultsCopyWith(
          _$_ScanResults value, $Res Function(_$_ScanResults) then) =
      __$$_ScanResultsCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({Cycle cycle, Map<String, MarketResults> markets});

  @override
  $CycleCopyWith<$Res> get cycle;
}

/// @nodoc
class __$$_ScanResultsCopyWithImpl<$Res>
    extends _$ScanResultsCopyWithImpl<$Res, _$_ScanResults>
    implements _$$_ScanResultsCopyWith<$Res> {
  __$$_ScanResultsCopyWithImpl(
      _$_ScanResults _value, $Res Function(_$_ScanResults) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? cycle = null,
    Object? markets = null,
  }) {
    return _then(_$_ScanResults(
      cycle: null == cycle
          ? _value.cycle
          : cycle // ignore: cast_nullable_to_non_nullable
              as Cycle,
      markets: null == markets
          ? _value._markets
          : markets // ignore: cast_nullable_to_non_nullable
              as Map<String, MarketResults>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_ScanResults implements _ScanResults {
  const _$_ScanResults(
      {required this.cycle, required final Map<String, MarketResults> markets})
      : _markets = markets;

  factory _$_ScanResults.fromJson(Map<String, dynamic> json) =>
      _$$_ScanResultsFromJson(json);

  @override
  final Cycle cycle;
  final Map<String, MarketResults> _markets;
  @override
  Map<String, MarketResults> get markets {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_markets);
  }

  @override
  String toString() {
    return 'ScanResults(cycle: $cycle, markets: $markets)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_ScanResults &&
            (identical(other.cycle, cycle) || other.cycle == cycle) &&
            const DeepCollectionEquality().equals(other._markets, _markets));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType, cycle, const DeepCollectionEquality().hash(_markets));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_ScanResultsCopyWith<_$_ScanResults> get copyWith =>
      __$$_ScanResultsCopyWithImpl<_$_ScanResults>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_ScanResultsToJson(
      this,
    );
  }
}

abstract class _ScanResults implements ScanResults {
  const factory _ScanResults(
      {required final Cycle cycle,
      required final Map<String, MarketResults> markets}) = _$_ScanResults;

  factory _ScanResults.fromJson(Map<String, dynamic> json) =
      _$_ScanResults.fromJson;

  @override
  Cycle get cycle;
  @override
  Map<String, MarketResults> get markets;
  @override
  @JsonKey(ignore: true)
  _$$_ScanResultsCopyWith<_$_ScanResults> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$RestingOrderStats {
  RestingOrder get restingOrder => throw _privateConstructorUsedError;
  int get deltaTimestamp => throw _privateConstructorUsedError;
  set deltaTimestamp(int value) => throw _privateConstructorUsedError;
  int get qualifyingTimeLength => throw _privateConstructorUsedError;
  set qualifyingTimeLength(int value) => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $RestingOrderStatsCopyWith<RestingOrderStats> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $RestingOrderStatsCopyWith<$Res> {
  factory $RestingOrderStatsCopyWith(
          RestingOrderStats value, $Res Function(RestingOrderStats) then) =
      _$RestingOrderStatsCopyWithImpl<$Res, RestingOrderStats>;
  @useResult
  $Res call(
      {RestingOrder restingOrder,
      int deltaTimestamp,
      int qualifyingTimeLength});

  $RestingOrderCopyWith<$Res> get restingOrder;
}

/// @nodoc
class _$RestingOrderStatsCopyWithImpl<$Res, $Val extends RestingOrderStats>
    implements $RestingOrderStatsCopyWith<$Res> {
  _$RestingOrderStatsCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? restingOrder = null,
    Object? deltaTimestamp = null,
    Object? qualifyingTimeLength = null,
  }) {
    return _then(_value.copyWith(
      restingOrder: null == restingOrder
          ? _value.restingOrder
          : restingOrder // ignore: cast_nullable_to_non_nullable
              as RestingOrder,
      deltaTimestamp: null == deltaTimestamp
          ? _value.deltaTimestamp
          : deltaTimestamp // ignore: cast_nullable_to_non_nullable
              as int,
      qualifyingTimeLength: null == qualifyingTimeLength
          ? _value.qualifyingTimeLength
          : qualifyingTimeLength // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $RestingOrderCopyWith<$Res> get restingOrder {
    return $RestingOrderCopyWith<$Res>(_value.restingOrder, (value) {
      return _then(_value.copyWith(restingOrder: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_RestingOrderStatsCopyWith<$Res>
    implements $RestingOrderStatsCopyWith<$Res> {
  factory _$$_RestingOrderStatsCopyWith(_$_RestingOrderStats value,
          $Res Function(_$_RestingOrderStats) then) =
      __$$_RestingOrderStatsCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {RestingOrder restingOrder,
      int deltaTimestamp,
      int qualifyingTimeLength});

  @override
  $RestingOrderCopyWith<$Res> get restingOrder;
}

/// @nodoc
class __$$_RestingOrderStatsCopyWithImpl<$Res>
    extends _$RestingOrderStatsCopyWithImpl<$Res, _$_RestingOrderStats>
    implements _$$_RestingOrderStatsCopyWith<$Res> {
  __$$_RestingOrderStatsCopyWithImpl(
      _$_RestingOrderStats _value, $Res Function(_$_RestingOrderStats) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? restingOrder = null,
    Object? deltaTimestamp = null,
    Object? qualifyingTimeLength = null,
  }) {
    return _then(_$_RestingOrderStats(
      restingOrder: null == restingOrder
          ? _value.restingOrder
          : restingOrder // ignore: cast_nullable_to_non_nullable
              as RestingOrder,
      deltaTimestamp: null == deltaTimestamp
          ? _value.deltaTimestamp
          : deltaTimestamp // ignore: cast_nullable_to_non_nullable
              as int,
      qualifyingTimeLength: null == qualifyingTimeLength
          ? _value.qualifyingTimeLength
          : qualifyingTimeLength // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc

class _$_RestingOrderStats implements _RestingOrderStats {
  _$_RestingOrderStats(
      {required this.restingOrder,
      required this.deltaTimestamp,
      required this.qualifyingTimeLength});

  @override
  final RestingOrder restingOrder;
  @override
  int deltaTimestamp;
  @override
  int qualifyingTimeLength;

  @override
  String toString() {
    return 'RestingOrderStats(restingOrder: $restingOrder, deltaTimestamp: $deltaTimestamp, qualifyingTimeLength: $qualifyingTimeLength)';
  }

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_RestingOrderStatsCopyWith<_$_RestingOrderStats> get copyWith =>
      __$$_RestingOrderStatsCopyWithImpl<_$_RestingOrderStats>(
          this, _$identity);
}

abstract class _RestingOrderStats implements RestingOrderStats {
  factory _RestingOrderStats(
      {required final RestingOrder restingOrder,
      required int deltaTimestamp,
      required int qualifyingTimeLength}) = _$_RestingOrderStats;

  @override
  RestingOrder get restingOrder;
  @override
  int get deltaTimestamp;
  set deltaTimestamp(int value);
  @override
  int get qualifyingTimeLength;
  set qualifyingTimeLength(int value);
  @override
  @JsonKey(ignore: true)
  _$$_RestingOrderStatsCopyWith<_$_RestingOrderStats> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$QualifyingOrder {
  RestingOrder get order => throw _privateConstructorUsedError;
  Decimal get weight => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $QualifyingOrderCopyWith<QualifyingOrder> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $QualifyingOrderCopyWith<$Res> {
  factory $QualifyingOrderCopyWith(
          QualifyingOrder value, $Res Function(QualifyingOrder) then) =
      _$QualifyingOrderCopyWithImpl<$Res, QualifyingOrder>;
  @useResult
  $Res call({RestingOrder order, Decimal weight});

  $RestingOrderCopyWith<$Res> get order;
}

/// @nodoc
class _$QualifyingOrderCopyWithImpl<$Res, $Val extends QualifyingOrder>
    implements $QualifyingOrderCopyWith<$Res> {
  _$QualifyingOrderCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? order = null,
    Object? weight = null,
  }) {
    return _then(_value.copyWith(
      order: null == order
          ? _value.order
          : order // ignore: cast_nullable_to_non_nullable
              as RestingOrder,
      weight: null == weight
          ? _value.weight
          : weight // ignore: cast_nullable_to_non_nullable
              as Decimal,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $RestingOrderCopyWith<$Res> get order {
    return $RestingOrderCopyWith<$Res>(_value.order, (value) {
      return _then(_value.copyWith(order: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_QualifyingOrderCopyWith<$Res>
    implements $QualifyingOrderCopyWith<$Res> {
  factory _$$_QualifyingOrderCopyWith(
          _$_QualifyingOrder value, $Res Function(_$_QualifyingOrder) then) =
      __$$_QualifyingOrderCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({RestingOrder order, Decimal weight});

  @override
  $RestingOrderCopyWith<$Res> get order;
}

/// @nodoc
class __$$_QualifyingOrderCopyWithImpl<$Res>
    extends _$QualifyingOrderCopyWithImpl<$Res, _$_QualifyingOrder>
    implements _$$_QualifyingOrderCopyWith<$Res> {
  __$$_QualifyingOrderCopyWithImpl(
      _$_QualifyingOrder _value, $Res Function(_$_QualifyingOrder) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? order = null,
    Object? weight = null,
  }) {
    return _then(_$_QualifyingOrder(
      order: null == order
          ? _value.order
          : order // ignore: cast_nullable_to_non_nullable
              as RestingOrder,
      weight: null == weight
          ? _value.weight
          : weight // ignore: cast_nullable_to_non_nullable
              as Decimal,
    ));
  }
}

/// @nodoc

class _$_QualifyingOrder extends _QualifyingOrder {
  const _$_QualifyingOrder({required this.order, required this.weight})
      : super._();

  @override
  final RestingOrder order;
  @override
  final Decimal weight;

  @override
  String toString() {
    return 'QualifyingOrder(order: $order, weight: $weight)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_QualifyingOrder &&
            (identical(other.order, order) || other.order == order) &&
            (identical(other.weight, weight) || other.weight == weight));
  }

  @override
  int get hashCode => Object.hash(runtimeType, order, weight);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_QualifyingOrderCopyWith<_$_QualifyingOrder> get copyWith =>
      __$$_QualifyingOrderCopyWithImpl<_$_QualifyingOrder>(this, _$identity);
}

abstract class _QualifyingOrder extends QualifyingOrder {
  const factory _QualifyingOrder(
      {required final RestingOrder order,
      required final Decimal weight}) = _$_QualifyingOrder;
  const _QualifyingOrder._() : super._();

  @override
  RestingOrder get order;
  @override
  Decimal get weight;
  @override
  @JsonKey(ignore: true)
  _$$_QualifyingOrderCopyWith<_$_QualifyingOrder> get copyWith =>
      throw _privateConstructorUsedError;
}

UserReward _$UserRewardFromJson(Map<String, dynamic> json) {
  return _UserReward.fromJson(json);
}

/// @nodoc
mixin _$UserReward {
  String get address => throw _privateConstructorUsedError;
  Decimal get tradingReward => throw _privateConstructorUsedError;
  Decimal get limitOrdersReward => throw _privateConstructorUsedError;
  Decimal get totalReward => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $UserRewardCopyWith<UserReward> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $UserRewardCopyWith<$Res> {
  factory $UserRewardCopyWith(
          UserReward value, $Res Function(UserReward) then) =
      _$UserRewardCopyWithImpl<$Res, UserReward>;
  @useResult
  $Res call(
      {String address,
      Decimal tradingReward,
      Decimal limitOrdersReward,
      Decimal totalReward});
}

/// @nodoc
class _$UserRewardCopyWithImpl<$Res, $Val extends UserReward>
    implements $UserRewardCopyWith<$Res> {
  _$UserRewardCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? address = null,
    Object? tradingReward = null,
    Object? limitOrdersReward = null,
    Object? totalReward = null,
  }) {
    return _then(_value.copyWith(
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      tradingReward: null == tradingReward
          ? _value.tradingReward
          : tradingReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      limitOrdersReward: null == limitOrdersReward
          ? _value.limitOrdersReward
          : limitOrdersReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      totalReward: null == totalReward
          ? _value.totalReward
          : totalReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$_UserRewardCopyWith<$Res>
    implements $UserRewardCopyWith<$Res> {
  factory _$$_UserRewardCopyWith(
          _$_UserReward value, $Res Function(_$_UserReward) then) =
      __$$_UserRewardCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String address,
      Decimal tradingReward,
      Decimal limitOrdersReward,
      Decimal totalReward});
}

/// @nodoc
class __$$_UserRewardCopyWithImpl<$Res>
    extends _$UserRewardCopyWithImpl<$Res, _$_UserReward>
    implements _$$_UserRewardCopyWith<$Res> {
  __$$_UserRewardCopyWithImpl(
      _$_UserReward _value, $Res Function(_$_UserReward) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? address = null,
    Object? tradingReward = null,
    Object? limitOrdersReward = null,
    Object? totalReward = null,
  }) {
    return _then(_$_UserReward(
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as String,
      tradingReward: null == tradingReward
          ? _value.tradingReward
          : tradingReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      limitOrdersReward: null == limitOrdersReward
          ? _value.limitOrdersReward
          : limitOrdersReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
      totalReward: null == totalReward
          ? _value.totalReward
          : totalReward // ignore: cast_nullable_to_non_nullable
              as Decimal,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_UserReward implements _UserReward {
  const _$_UserReward(
      {required this.address,
      required this.tradingReward,
      required this.limitOrdersReward,
      required this.totalReward});

  factory _$_UserReward.fromJson(Map<String, dynamic> json) =>
      _$$_UserRewardFromJson(json);

  @override
  final String address;
  @override
  final Decimal tradingReward;
  @override
  final Decimal limitOrdersReward;
  @override
  final Decimal totalReward;

  @override
  String toString() {
    return 'UserReward(address: $address, tradingReward: $tradingReward, limitOrdersReward: $limitOrdersReward, totalReward: $totalReward)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_UserReward &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.tradingReward, tradingReward) ||
                other.tradingReward == tradingReward) &&
            (identical(other.limitOrdersReward, limitOrdersReward) ||
                other.limitOrdersReward == limitOrdersReward) &&
            (identical(other.totalReward, totalReward) ||
                other.totalReward == totalReward));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType, address, tradingReward, limitOrdersReward, totalReward);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_UserRewardCopyWith<_$_UserReward> get copyWith =>
      __$$_UserRewardCopyWithImpl<_$_UserReward>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_UserRewardToJson(
      this,
    );
  }
}

abstract class _UserReward implements UserReward {
  const factory _UserReward(
      {required final String address,
      required final Decimal tradingReward,
      required final Decimal limitOrdersReward,
      required final Decimal totalReward}) = _$_UserReward;

  factory _UserReward.fromJson(Map<String, dynamic> json) =
      _$_UserReward.fromJson;

  @override
  String get address;
  @override
  Decimal get tradingReward;
  @override
  Decimal get limitOrdersReward;
  @override
  Decimal get totalReward;
  @override
  @JsonKey(ignore: true)
  _$$_UserRewardCopyWith<_$_UserReward> get copyWith =>
      throw _privateConstructorUsedError;
}

CycleRewards _$CycleRewardsFromJson(Map<String, dynamic> json) {
  return _CycleRewards.fromJson(json);
}

/// @nodoc
mixin _$CycleRewards {
  Cycle get cycle => throw _privateConstructorUsedError;
  RewardsConfig get config => throw _privateConstructorUsedError;
  RewardsTotal get totalRewards => throw _privateConstructorUsedError;
  List<UserReward> get rewards => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $CycleRewardsCopyWith<CycleRewards> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CycleRewardsCopyWith<$Res> {
  factory $CycleRewardsCopyWith(
          CycleRewards value, $Res Function(CycleRewards) then) =
      _$CycleRewardsCopyWithImpl<$Res, CycleRewards>;
  @useResult
  $Res call(
      {Cycle cycle,
      RewardsConfig config,
      RewardsTotal totalRewards,
      List<UserReward> rewards});

  $CycleCopyWith<$Res> get cycle;
  $RewardsConfigCopyWith<$Res> get config;
  $RewardsTotalCopyWith<$Res> get totalRewards;
}

/// @nodoc
class _$CycleRewardsCopyWithImpl<$Res, $Val extends CycleRewards>
    implements $CycleRewardsCopyWith<$Res> {
  _$CycleRewardsCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? cycle = null,
    Object? config = null,
    Object? totalRewards = null,
    Object? rewards = null,
  }) {
    return _then(_value.copyWith(
      cycle: null == cycle
          ? _value.cycle
          : cycle // ignore: cast_nullable_to_non_nullable
              as Cycle,
      config: null == config
          ? _value.config
          : config // ignore: cast_nullable_to_non_nullable
              as RewardsConfig,
      totalRewards: null == totalRewards
          ? _value.totalRewards
          : totalRewards // ignore: cast_nullable_to_non_nullable
              as RewardsTotal,
      rewards: null == rewards
          ? _value.rewards
          : rewards // ignore: cast_nullable_to_non_nullable
              as List<UserReward>,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $CycleCopyWith<$Res> get cycle {
    return $CycleCopyWith<$Res>(_value.cycle, (value) {
      return _then(_value.copyWith(cycle: value) as $Val);
    });
  }

  @override
  @pragma('vm:prefer-inline')
  $RewardsConfigCopyWith<$Res> get config {
    return $RewardsConfigCopyWith<$Res>(_value.config, (value) {
      return _then(_value.copyWith(config: value) as $Val);
    });
  }

  @override
  @pragma('vm:prefer-inline')
  $RewardsTotalCopyWith<$Res> get totalRewards {
    return $RewardsTotalCopyWith<$Res>(_value.totalRewards, (value) {
      return _then(_value.copyWith(totalRewards: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_CycleRewardsCopyWith<$Res>
    implements $CycleRewardsCopyWith<$Res> {
  factory _$$_CycleRewardsCopyWith(
          _$_CycleRewards value, $Res Function(_$_CycleRewards) then) =
      __$$_CycleRewardsCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {Cycle cycle,
      RewardsConfig config,
      RewardsTotal totalRewards,
      List<UserReward> rewards});

  @override
  $CycleCopyWith<$Res> get cycle;
  @override
  $RewardsConfigCopyWith<$Res> get config;
  @override
  $RewardsTotalCopyWith<$Res> get totalRewards;
}

/// @nodoc
class __$$_CycleRewardsCopyWithImpl<$Res>
    extends _$CycleRewardsCopyWithImpl<$Res, _$_CycleRewards>
    implements _$$_CycleRewardsCopyWith<$Res> {
  __$$_CycleRewardsCopyWithImpl(
      _$_CycleRewards _value, $Res Function(_$_CycleRewards) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? cycle = null,
    Object? config = null,
    Object? totalRewards = null,
    Object? rewards = null,
  }) {
    return _then(_$_CycleRewards(
      cycle: null == cycle
          ? _value.cycle
          : cycle // ignore: cast_nullable_to_non_nullable
              as Cycle,
      config: null == config
          ? _value.config
          : config // ignore: cast_nullable_to_non_nullable
              as RewardsConfig,
      totalRewards: null == totalRewards
          ? _value.totalRewards
          : totalRewards // ignore: cast_nullable_to_non_nullable
              as RewardsTotal,
      rewards: null == rewards
          ? _value._rewards
          : rewards // ignore: cast_nullable_to_non_nullable
              as List<UserReward>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_CycleRewards implements _CycleRewards {
  const _$_CycleRewards(
      {required this.cycle,
      required this.config,
      required this.totalRewards,
      required final List<UserReward> rewards})
      : _rewards = rewards;

  factory _$_CycleRewards.fromJson(Map<String, dynamic> json) =>
      _$$_CycleRewardsFromJson(json);

  @override
  final Cycle cycle;
  @override
  final RewardsConfig config;
  @override
  final RewardsTotal totalRewards;
  final List<UserReward> _rewards;
  @override
  List<UserReward> get rewards {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_rewards);
  }

  @override
  String toString() {
    return 'CycleRewards(cycle: $cycle, config: $config, totalRewards: $totalRewards, rewards: $rewards)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_CycleRewards &&
            (identical(other.cycle, cycle) || other.cycle == cycle) &&
            (identical(other.config, config) || other.config == config) &&
            (identical(other.totalRewards, totalRewards) ||
                other.totalRewards == totalRewards) &&
            const DeepCollectionEquality().equals(other._rewards, _rewards));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, cycle, config, totalRewards,
      const DeepCollectionEquality().hash(_rewards));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_CycleRewardsCopyWith<_$_CycleRewards> get copyWith =>
      __$$_CycleRewardsCopyWithImpl<_$_CycleRewards>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_CycleRewardsToJson(
      this,
    );
  }
}

abstract class _CycleRewards implements CycleRewards {
  const factory _CycleRewards(
      {required final Cycle cycle,
      required final RewardsConfig config,
      required final RewardsTotal totalRewards,
      required final List<UserReward> rewards}) = _$_CycleRewards;

  factory _CycleRewards.fromJson(Map<String, dynamic> json) =
      _$_CycleRewards.fromJson;

  @override
  Cycle get cycle;
  @override
  RewardsConfig get config;
  @override
  RewardsTotal get totalRewards;
  @override
  List<UserReward> get rewards;
  @override
  @JsonKey(ignore: true)
  _$$_CycleRewardsCopyWith<_$_CycleRewards> get copyWith =>
      throw _privateConstructorUsedError;
}

SendLog _$SendLogFromJson(Map<String, dynamic> json) {
  switch (json['runtimeType']) {
    case 'succeeded':
      return _SendLogSucceeded.fromJson(json);
    case 'failed':
      return _SendLogFailed.fromJson(json);

    default:
      throw CheckedFromJsonException(json, 'runtimeType', 'SendLog',
          'Invalid union type "${json['runtimeType']}"!');
  }
}

/// @nodoc
mixin _$SendLog {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(Hash hash) succeeded,
    required TResult Function(String error) failed,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(Hash hash)? succeeded,
    TResult? Function(String error)? failed,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(Hash hash)? succeeded,
    TResult Function(String error)? failed,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_SendLogSucceeded value) succeeded,
    required TResult Function(_SendLogFailed value) failed,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_SendLogSucceeded value)? succeeded,
    TResult? Function(_SendLogFailed value)? failed,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_SendLogSucceeded value)? succeeded,
    TResult Function(_SendLogFailed value)? failed,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $SendLogCopyWith<$Res> {
  factory $SendLogCopyWith(SendLog value, $Res Function(SendLog) then) =
      _$SendLogCopyWithImpl<$Res, SendLog>;
}

/// @nodoc
class _$SendLogCopyWithImpl<$Res, $Val extends SendLog>
    implements $SendLogCopyWith<$Res> {
  _$SendLogCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;
}

/// @nodoc
abstract class _$$_SendLogSucceededCopyWith<$Res> {
  factory _$$_SendLogSucceededCopyWith(
          _$_SendLogSucceeded value, $Res Function(_$_SendLogSucceeded) then) =
      __$$_SendLogSucceededCopyWithImpl<$Res>;
  @useResult
  $Res call({Hash hash});

  $HashCopyWith<$Res> get hash;
}

/// @nodoc
class __$$_SendLogSucceededCopyWithImpl<$Res>
    extends _$SendLogCopyWithImpl<$Res, _$_SendLogSucceeded>
    implements _$$_SendLogSucceededCopyWith<$Res> {
  __$$_SendLogSucceededCopyWithImpl(
      _$_SendLogSucceeded _value, $Res Function(_$_SendLogSucceeded) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? hash = null,
  }) {
    return _then(_$_SendLogSucceeded(
      null == hash
          ? _value.hash
          : hash // ignore: cast_nullable_to_non_nullable
              as Hash,
    ));
  }

  @override
  @pragma('vm:prefer-inline')
  $HashCopyWith<$Res> get hash {
    return $HashCopyWith<$Res>(_value.hash, (value) {
      return _then(_value.copyWith(hash: value));
    });
  }
}

/// @nodoc
@JsonSerializable()
class _$_SendLogSucceeded implements _SendLogSucceeded {
  const _$_SendLogSucceeded(this.hash, {final String? $type})
      : $type = $type ?? 'succeeded';

  factory _$_SendLogSucceeded.fromJson(Map<String, dynamic> json) =>
      _$$_SendLogSucceededFromJson(json);

  @override
  final Hash hash;

  @JsonKey(name: 'runtimeType')
  final String $type;

  @override
  String toString() {
    return 'SendLog.succeeded(hash: $hash)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_SendLogSucceeded &&
            (identical(other.hash, hash) || other.hash == hash));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, hash);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_SendLogSucceededCopyWith<_$_SendLogSucceeded> get copyWith =>
      __$$_SendLogSucceededCopyWithImpl<_$_SendLogSucceeded>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(Hash hash) succeeded,
    required TResult Function(String error) failed,
  }) {
    return succeeded(hash);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(Hash hash)? succeeded,
    TResult? Function(String error)? failed,
  }) {
    return succeeded?.call(hash);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(Hash hash)? succeeded,
    TResult Function(String error)? failed,
    required TResult orElse(),
  }) {
    if (succeeded != null) {
      return succeeded(hash);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_SendLogSucceeded value) succeeded,
    required TResult Function(_SendLogFailed value) failed,
  }) {
    return succeeded(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_SendLogSucceeded value)? succeeded,
    TResult? Function(_SendLogFailed value)? failed,
  }) {
    return succeeded?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_SendLogSucceeded value)? succeeded,
    TResult Function(_SendLogFailed value)? failed,
    required TResult orElse(),
  }) {
    if (succeeded != null) {
      return succeeded(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$_SendLogSucceededToJson(
      this,
    );
  }
}

abstract class _SendLogSucceeded implements SendLog {
  const factory _SendLogSucceeded(final Hash hash) = _$_SendLogSucceeded;

  factory _SendLogSucceeded.fromJson(Map<String, dynamic> json) =
      _$_SendLogSucceeded.fromJson;

  Hash get hash;
  @JsonKey(ignore: true)
  _$$_SendLogSucceededCopyWith<_$_SendLogSucceeded> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class _$$_SendLogFailedCopyWith<$Res> {
  factory _$$_SendLogFailedCopyWith(
          _$_SendLogFailed value, $Res Function(_$_SendLogFailed) then) =
      __$$_SendLogFailedCopyWithImpl<$Res>;
  @useResult
  $Res call({String error});
}

/// @nodoc
class __$$_SendLogFailedCopyWithImpl<$Res>
    extends _$SendLogCopyWithImpl<$Res, _$_SendLogFailed>
    implements _$$_SendLogFailedCopyWith<$Res> {
  __$$_SendLogFailedCopyWithImpl(
      _$_SendLogFailed _value, $Res Function(_$_SendLogFailed) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? error = null,
  }) {
    return _then(_$_SendLogFailed(
      null == error
          ? _value.error
          : error // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_SendLogFailed implements _SendLogFailed {
  const _$_SendLogFailed(this.error, {final String? $type})
      : $type = $type ?? 'failed';

  factory _$_SendLogFailed.fromJson(Map<String, dynamic> json) =>
      _$$_SendLogFailedFromJson(json);

  @override
  final String error;

  @JsonKey(name: 'runtimeType')
  final String $type;

  @override
  String toString() {
    return 'SendLog.failed(error: $error)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_SendLogFailed &&
            (identical(other.error, error) || other.error == error));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, error);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_SendLogFailedCopyWith<_$_SendLogFailed> get copyWith =>
      __$$_SendLogFailedCopyWithImpl<_$_SendLogFailed>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(Hash hash) succeeded,
    required TResult Function(String error) failed,
  }) {
    return failed(error);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function(Hash hash)? succeeded,
    TResult? Function(String error)? failed,
  }) {
    return failed?.call(error);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(Hash hash)? succeeded,
    TResult Function(String error)? failed,
    required TResult orElse(),
  }) {
    if (failed != null) {
      return failed(error);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_SendLogSucceeded value) succeeded,
    required TResult Function(_SendLogFailed value) failed,
  }) {
    return failed(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(_SendLogSucceeded value)? succeeded,
    TResult? Function(_SendLogFailed value)? failed,
  }) {
    return failed?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_SendLogSucceeded value)? succeeded,
    TResult Function(_SendLogFailed value)? failed,
    required TResult orElse(),
  }) {
    if (failed != null) {
      return failed(this);
    }
    return orElse();
  }

  @override
  Map<String, dynamic> toJson() {
    return _$$_SendLogFailedToJson(
      this,
    );
  }
}

abstract class _SendLogFailed implements SendLog {
  const factory _SendLogFailed(final String error) = _$_SendLogFailed;

  factory _SendLogFailed.fromJson(Map<String, dynamic> json) =
      _$_SendLogFailed.fromJson;

  String get error;
  @JsonKey(ignore: true)
  _$$_SendLogFailedCopyWith<_$_SendLogFailed> get copyWith =>
      throw _privateConstructorUsedError;
}

DistributionLog _$DistributionLogFromJson(Map<String, dynamic> json) {
  return _DistributionLog.fromJson(json);
}

/// @nodoc
mixin _$DistributionLog {
  CycleRewards get rewards => throw _privateConstructorUsedError;
  Map<String, SendLog> get logs => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $DistributionLogCopyWith<DistributionLog> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DistributionLogCopyWith<$Res> {
  factory $DistributionLogCopyWith(
          DistributionLog value, $Res Function(DistributionLog) then) =
      _$DistributionLogCopyWithImpl<$Res, DistributionLog>;
  @useResult
  $Res call({CycleRewards rewards, Map<String, SendLog> logs});

  $CycleRewardsCopyWith<$Res> get rewards;
}

/// @nodoc
class _$DistributionLogCopyWithImpl<$Res, $Val extends DistributionLog>
    implements $DistributionLogCopyWith<$Res> {
  _$DistributionLogCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? rewards = null,
    Object? logs = null,
  }) {
    return _then(_value.copyWith(
      rewards: null == rewards
          ? _value.rewards
          : rewards // ignore: cast_nullable_to_non_nullable
              as CycleRewards,
      logs: null == logs
          ? _value.logs
          : logs // ignore: cast_nullable_to_non_nullable
              as Map<String, SendLog>,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $CycleRewardsCopyWith<$Res> get rewards {
    return $CycleRewardsCopyWith<$Res>(_value.rewards, (value) {
      return _then(_value.copyWith(rewards: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$_DistributionLogCopyWith<$Res>
    implements $DistributionLogCopyWith<$Res> {
  factory _$$_DistributionLogCopyWith(
          _$_DistributionLog value, $Res Function(_$_DistributionLog) then) =
      __$$_DistributionLogCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({CycleRewards rewards, Map<String, SendLog> logs});

  @override
  $CycleRewardsCopyWith<$Res> get rewards;
}

/// @nodoc
class __$$_DistributionLogCopyWithImpl<$Res>
    extends _$DistributionLogCopyWithImpl<$Res, _$_DistributionLog>
    implements _$$_DistributionLogCopyWith<$Res> {
  __$$_DistributionLogCopyWithImpl(
      _$_DistributionLog _value, $Res Function(_$_DistributionLog) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? rewards = null,
    Object? logs = null,
  }) {
    return _then(_$_DistributionLog(
      rewards: null == rewards
          ? _value.rewards
          : rewards // ignore: cast_nullable_to_non_nullable
              as CycleRewards,
      logs: null == logs
          ? _value._logs
          : logs // ignore: cast_nullable_to_non_nullable
              as Map<String, SendLog>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$_DistributionLog implements _DistributionLog {
  const _$_DistributionLog(
      {required this.rewards, required final Map<String, SendLog> logs})
      : _logs = logs;

  factory _$_DistributionLog.fromJson(Map<String, dynamic> json) =>
      _$$_DistributionLogFromJson(json);

  @override
  final CycleRewards rewards;
  final Map<String, SendLog> _logs;
  @override
  Map<String, SendLog> get logs {
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableMapView(_logs);
  }

  @override
  String toString() {
    return 'DistributionLog(rewards: $rewards, logs: $logs)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$_DistributionLog &&
            (identical(other.rewards, rewards) || other.rewards == rewards) &&
            const DeepCollectionEquality().equals(other._logs, _logs));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType, rewards, const DeepCollectionEquality().hash(_logs));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$_DistributionLogCopyWith<_$_DistributionLog> get copyWith =>
      __$$_DistributionLogCopyWithImpl<_$_DistributionLog>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$_DistributionLogToJson(
      this,
    );
  }
}

abstract class _DistributionLog implements DistributionLog {
  const factory _DistributionLog(
      {required final CycleRewards rewards,
      required final Map<String, SendLog> logs}) = _$_DistributionLog;

  factory _DistributionLog.fromJson(Map<String, dynamic> json) =
      _$_DistributionLog.fromJson;

  @override
  CycleRewards get rewards;
  @override
  Map<String, SendLog> get logs;
  @override
  @JsonKey(ignore: true)
  _$$_DistributionLogCopyWith<_$_DistributionLog> get copyWith =>
      throw _privateConstructorUsedError;
}
