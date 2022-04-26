import * as aesjs from 'aes-js'
import * as crypto from 'crypto-js'

export function encryptString(data, salt) {
  const textBytes = aesjs.utils.utf8.toBytes(data)
  const aesCtr = new aesjs.ModeOfOperation.ctr(aesjs.utils.utf8.toBytes(salt))
  const encrypted = aesCtr.encrypt(textBytes)

  return aesjs.utils.hex.fromBytes(encrypted)
}

export function decryptString(data, salt) {
  const encryptedBytes = aesjs.utils.hex.toBytes(data)
  const aesCtr = new aesjs.ModeOfOperation.ctr(aesjs.utils.utf8.toBytes(salt))
  const decryptedBytes = aesCtr.decrypt(encryptedBytes)

  return aesjs.utils.utf8.fromBytes(decryptedBytes)
}

export function encryptKeyStore(data: string, password: string) {
  return crypto.AES.encrypt(data, password).toString()
}

export function decryptKeyStore(cipher, password: string) {
  return crypto.AES.decrypt(cipher, password).toString(crypto.enc.Utf8)
}
