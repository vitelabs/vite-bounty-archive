import { IVitexToken, AccountBalance, tokenPrices, ITxs } from '@/types'
import { getTokens } from '@/api/tokens.api'
import { getExchangeRate } from '@/api/exchange-rate.api'

export interface AccountState {
  balance: number
  prices: Array<tokenPrices>
  accountBalance: Array<AccountBalance>
  vitexTokens: Array<IVitexToken>
  selectedTokens: Array<IVitexToken>
  selectedAsset: IVitexToken
  fullTokenInfo: Array<IVitexToken>
  txs: Array<ITxs>
  uTxs: Array<ITxs>
  txsList: Array<ITxs>
}

const state: AccountState = {
  balance: 0,
  prices: [],
  accountBalance: [],
  vitexTokens: [],
  selectedTokens: [],
  selectedAsset: null,
  fullTokenInfo: [],
  txs: [],
  uTxs: [],
  txsList: []
}
const mutations = {
  setBalance(state: AccountState, balance: number) {
    state.balance = balance
  },
  setPrices(state: AccountState, prices: Array<tokenPrices>) {
    state.prices = prices
  },
  setAccountBalance(
    state: AccountState,
    accountBalance: Array<AccountBalance>
  ) {
    state.accountBalance = accountBalance
  },
  setVitexTokens(state: AccountState, vitexTokens: Array<IVitexToken>) {
    state.vitexTokens = vitexTokens
  },
  setSelectedTokens(state: AccountState, selectedTokens: Array<IVitexToken>) {
    state.selectedTokens = selectedTokens
  },
  setSelectedAsset(state: AccountState, selectedAsset: IVitexToken) {
    state.selectedAsset = selectedAsset
  },
  addSelectedTokens(state: AccountState, selectedToken: IVitexToken) {
    state.selectedTokens.push(selectedToken)
  },
  removeSelectedTokens(state: AccountState, selectedToken: IVitexToken) {
    state.selectedTokens = state.selectedTokens.filter(
      (el) => el.tokenId !== selectedToken.tokenId
    )
  },
  setFullTokenInfo(state: AccountState, fullTokenInfo: Array<IVitexToken>) {
    state.fullTokenInfo = fullTokenInfo
  },
  setTxs(state: AccountState, txs: Array<ITxs>) {
    state.txs = txs
  },
  setUtxs(state: AccountState, uTxs: Array<ITxs>) {
    state.uTxs = uTxs
  },
  setTxsList(state: AccountState, txsList: Array<ITxs>) {
    state.txsList = txsList
  }
}
const actions = {
  async fetchVitexTokens({ commit }) {
    try {
      const vitexTokens = await getTokens()
      commit('setVitexTokens', vitexTokens)
    } catch (e) {
      return e
    }
  },
  async fetchPrices({ commit, state }) {
    try {
      const tokenIds = state.vitexTokens.map((el) => el.tokenId)
      const pricesData = await getExchangeRate(tokenIds.join())
      //@ts-ignore
      const priceList = pricesData.data.data
      commit('setPrices', priceList)
    } catch (e) {
      return e
    }
  }
}
const getters = {
  balance: (s: AccountState) => s.balance,
  prices: (s: AccountState) => s.prices,
  accountBalance: (s: AccountState) => s.accountBalance,
  vitexTokens: (s: AccountState) => s.vitexTokens,
  selectedTokens: (s: AccountState) => s.selectedTokens,
  selectedAsset: (s: AccountState) => s.selectedAsset,
  fullTokenInfo: (s: AccountState) => s.fullTokenInfo,
  txs: (s: AccountState) => s.txs,
  uTxs: (s: AccountState) => s.uTxs,
  txsList: (s: AccountState) => s.txsList
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
