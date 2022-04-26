import { last } from 'lodash-es'
import {Account} from '@/types'

export interface WalletsState {
  active: Account | undefined
  accounts: Array<Account>
}

const state = {
  active: {},
  accounts: []
}
const mutations = {
  addAccount(state: WalletsState, account: Account): void {
    state.accounts = [...state.accounts, account]
    state.active = account
  },
  addImportedAccount(state: WalletsState, account: Account): void {
    state.accounts = [...state.accounts, { ...account, imported: true }]
    state.active = account
  },
  deleteAccount(state: WalletsState, address: string): void {
    state.accounts = state.accounts.filter((el) => el.address !== address)
    state.active = last(state.accounts)
  },
  setActive(state: WalletsState, address: string): void {
    state.active = state.accounts.find((el) => el.address === address)
  }
}

const getters = {
  active: (s: WalletsState) => s.active,
  accounts: (s: WalletsState) => s.accounts,
  createdAccounts: (s: WalletsState) => s.accounts.filter((el) => !el.imported),
  accountsNum: (s: WalletsState) => s.accounts.length
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
