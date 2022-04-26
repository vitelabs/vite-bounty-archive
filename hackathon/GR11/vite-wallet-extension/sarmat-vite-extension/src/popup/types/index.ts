export interface Account {
  name: string
  address: string
  keystore: string
  salt: string
  imported?: boolean
  mnemonic?: string
}

export interface IVitexToken {
  tokenId: string
  name: string
  symbol: string
  originalSymbol: string
  totalSupply: string
  owner: string
  tokenDecimals: number
  urlIcon: string
  price?: string | number
  balance?: string | number
}

export interface tokenPrices {
  tokenId: string
  tokenSymbol: string
  usdRate: string | number
  cnyRate: string | number
  rubRate: string | number
  krwRate: string | number
  tryRate: string | number
  vndRate: string | number
  eurRate: string | number
  gbpRate: string | number
  btcRate: string | number
}

export interface AccountBalance {
  tokenId: {
    balance: string
    tokenInfo: {
      decimals: number
      index: number
      isOwnerBurnOnly: boolean
      isReIssuable: boolean
      maxSupply: string
      owner: string
      ownerBurnOnly: boolean
      tokenId: string
      tokenName: string
      tokenSymbol: string
      tokenSymbolView: string
      totalSupply: string
    }
  }
}

export interface ITxs {
  accountAddress: string
  address: string
  amount: string
  blockType: number
  confirmations: string
  confirmedHash: string
  confirmedTimes: string
  data: string
  difficulty: string
  fee: string
  firstSnapshotHash: string
  firstSnapshotHeight: string
  fromAddress: string
  fromBlockHash: string
  hash: string
  height: string
  logHash: null | any
  nonce: string
  prevHash: string
  previousHash: string
  producer: string
  publicKey: string
  quota: string
  quotaByStake: string
  quotaUsed: string
  receiveBlockHash: string
  receiveBlockHeight: string
  sendBlockHash: string
  sendBlockList: null | any
  signature: string
  timestamp: number
  toAddress: string
  tokenId: string
  tokenInfo: {
    decimals: number
    index: number
    isOwnerBurnOnly: false
    isReIssuable: boolean
    maxSupply: string
    owner: string
    ownerBurnOnly: boolean
    tokenId: string
    tokenName: string
    tokenSymbol: string
    totalSupply: string
  }
  totalQuota: string
  triggeredSendBlockList: null | any
  utUsed: string
  vmLogHash: null | any
}

export interface Network {
  id: number
  name: string
  httpUrl: string
  wsUrl: string
  httpVitex: string
}

export interface confirmTx {
  token: IVitexToken
  toAddress: string
  amount: string | number
}
