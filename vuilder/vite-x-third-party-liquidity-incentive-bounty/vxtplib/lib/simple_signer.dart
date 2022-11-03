import 'dart:typed_data';

import 'package:vite/utils.dart' as utils;
import 'package:vite/vite.dart';

class SimpleSigner extends SignerBase {
  final Wallet wallet;
  final int addressCount;
  final addresses = <Address>[];
  final addressMapping = <Address, KeyPair>{};

  SimpleSigner(this.wallet, this.addressCount) {
    for (int i = 0; i < addressCount; ++i) {
      final keyPair = wallet.deriveKeyPair(i);
      final address = Address.fromPublicKey(keyPair.publicKey);
      addressMapping[address] = keyPair;
      addresses.add(address);
    }
  }

  @override
  Future<bool> canSignForAddress(Address address) async {
    return addressMapping[address] != null;
  }

  @override
  Future<Uint8List> publicKeyOfAddress(Address address) async {
    final keyPair = addressMapping[address];
    if (keyPair == null) {
      throw Exception('Unknown address');
    }

    return keyPair.publicKey;
  }

  @override
  Future<Uint8List> sign(Uint8List data, Address address) async {
    final keyPair = addressMapping[address];
    if (keyPair == null) {
      throw Exception('Unknown address');
    }

    return utils.sign(message: data, privateKey: keyPair.privateKey);
  }
}
