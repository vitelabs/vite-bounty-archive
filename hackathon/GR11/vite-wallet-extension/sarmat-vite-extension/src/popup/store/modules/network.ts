import { Network } from '@/types'
import config from '@/config'

export interface NetworkState {
  network: Network
}

const state = {
  network: config.networks[0] as Network
}

const mutations = {
  setNetwork(state: NetworkState, network: Network) {
    state.network = network
  }
}

const actions = {}
const getters = {
  network: (s: NetworkState) => s.network
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
