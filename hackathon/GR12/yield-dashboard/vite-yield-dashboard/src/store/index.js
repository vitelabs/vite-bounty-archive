import Vue from 'vue'
import Vuex from 'vuex'
import {
  bookkeepingStore,
  bookkeepingDocID,
  rewardHistoryStore,
  rewardHistoryDocID,
  getDataById,
} from '@/firebase/firebase'
import eventBus from '@/utils/events/eventBus'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {

    // General
    prevDatesObj: {
      thirtyDayCategories: null,
      sevenDayCategories: null,
      movingAvgDates: null,
    },
    currDate: null,
    prevDatesLoaded: false,
    rewardsLoadedCallbackHandle: 'reward-history-loaded',

    // Rewards History
    viteRewardHistory: null,
    vxRewardHistory: null,
    rewardsLoaded: false,

  },

  getters: {

    getPrevDatesObj(state) {
      return state.prevDatesObj
    },

    getCurrDate(state) {
      return state.currDate
    },

    getPrevDatesLoaded(state) {
      return state.prevDatesLoaded
    },

    getViteRewardHistory(state) {
      return state.viteRewardHistory
    },

    getVxRewardHistory(state) {
      return state.vxRewardHistory
    },

    getRewardsLoaded(state) {
      return state.rewardsLoaded
    },

    getRewardsLoadedCallbackHandle(state) {
      return state.rewardsLoadedCallbackHandle
    },

  },

  mutations: {

    async initializeStore(state) {
      console.log('[LOG] initializeStore')

      // Get stored bookkeeping data
      getDataById(bookkeepingStore, bookkeepingDocID).then(dataRes => {
        // console.log('[STORE] Get Bookkeeping Store')
        if (dataRes) {
          const bookkeepingData = dataRes.data()
          state.prevDatesObj = {
            thirtyDayCategories: bookkeepingData.thirtyDayCategories,
            sevenDayCategories: bookkeepingData.sevenDayCategories,
            movingAvgDates: bookkeepingData.movingAvgDates,
          }
          state.prevDatesLoaded = true
          // console.log('[STORE] prevDatesLoaded = true')
        }
      })

      // Get stored rewards history data
      getDataById(rewardHistoryStore, rewardHistoryDocID).then(dataRes => {
        // console.log('[STORE] Get Reward History Store')
        if (dataRes) {
          const rewardsHistory = dataRes.data()
          // state.sbpRewardHistory = rewardsHistory.sbp
          state.viteRewardHistory = rewardsHistory.vite
          state.vxRewardHistory = rewardsHistory.vx
          state.rewardsLoaded = true
          if (state.prevDatesLoaded) {
            eventBus.$emit('reward-history-loaded')
          }
        }
      })
    },
  },

  actions: {

  },

  modules: {

  },

})
