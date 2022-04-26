import { Account } from '@/store/modules/wallets'
import { wallet, utils, accountBlock } from '@vite/vitejs'
import { encryptString, encryptKeyStore, decryptString } from './CryptoService'
import { nanoid } from 'nanoid'

export function isValidAddress(address: string) {
  return wallet.isValidAddress(address)
}

export function validateMnemonic(mnemonic) {
  return wallet.validateMnemonics(mnemonic)
}

export function createFromMnemonic(mnemonic: string): any {
  try {
    return wallet.getWallet(mnemonic).deriveAddress(0)
  } catch (error) {
    return error
  }
}

export function createFromPrivateKey(privateKey: string) {
  try {
    return wallet.createAddressByPrivateKey(privateKey)
  } catch (error) {
    return error
  }
}

export function createRandom() {
  return wallet.createSeed(128)
}

export function validatePrivateKey(privateKey) {
  try {
    const account = createFromPrivateKey(privateKey)
    const address = account.address
    return isValidAddress(address)
  } catch (e) {
    return false
  }
}

export async function createAccountFromMnemonic(
  name: string,
  mnemonic: string
) {
  const account = {
    mnemonic: wallet.getWallet(mnemonic).mnemonics,
    ...wallet.getWallet(mnemonic).deriveAddress(0)
  }
  const salt = nanoid(24)
  const mnemonicStore = { payload: encryptString(mnemonic, salt), salt }
  return {
    name,
    address: account.address,
    mnemonicStore
  }
}

export function deriveNewAccount(
  nextAccountIndex: number,
  mnemonicStore: { payload: string; salt: string },
  password: string
) {
  console.log(decryptString(mnemonicStore.payload, mnemonicStore.salt))
  const path = wallet.getPath(nextAccountIndex)
  const mnemonic = decryptString(mnemonicStore.payload, mnemonicStore.salt)
  const keyPair = wallet.deriveKeyPairByPath(mnemonic, path)
  const account = createFromPrivateKey(keyPair.privateKey)
  const keystore = encryptKeyStore(account.privateKey, password)

  return {
    address: account.address,
    keystore
  }
}

export function createAccount(
  name: string,
  privateKey: string,
  password: string,
  mnemonic?: string
) {
  const account = createFromPrivateKey(privateKey)
  const keystore = encryptKeyStore(account.privateKey, password)
  let mnemonicStore = null
  if (mnemonic) {
    const salt = nanoid(24)
    mnemonicStore = { payload: encryptString(mnemonic, salt), salt }
  }

  return {
    name,
    address: account.address,
    keystore,
    mnemonicStore: mnemonicStore
  }
}

export function sign(hex, privateKey: string) {
  const hexPaylod = utils._Buffer.from(hex).toString('hex')
  const sign = utils.ed25519.sign(hexPaylod, privateKey)

  return sign
}

export async function signAccountBlock(tx, provider, privateKey) {
  const myAccountBlock = accountBlock
    .createAccountBlock('send', {
      address: tx.address,
      toAddress: tx.toAddress,
      tokenId: tx.tokenId,
      amount: tx.amount
    })
    .setProvider(provider)
    .setPrivateKey(privateKey)

  await myAccountBlock.autoSetPreviousAccountBlock()

  const result = await myAccountBlock.sign()

  return result
}
