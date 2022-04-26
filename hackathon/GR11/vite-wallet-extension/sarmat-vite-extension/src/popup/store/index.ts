import { createStore, createLogger } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import modules from './modules'
import * as getters from './getters'

export default createStore({
  modules,
  getters,
  plugins: [
    createPersistedState({
      paths: Object.keys(modules)
    }),
    createLogger()
  ]
})
