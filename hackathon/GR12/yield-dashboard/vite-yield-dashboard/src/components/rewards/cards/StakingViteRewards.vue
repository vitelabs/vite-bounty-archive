<template>
  <v-card
    outlined
  >
    <v-card-title
      class="text-decoration-underline font-weight-bold reward-card-title"
    >
      <p class="text-center">
        Staking VITE for VX
      </p>
    </v-card-title><br>

    <v-divider class="mb-5"></v-divider>

    <!-- APR -->
    <v-card-subtitle
      class="font-weight-bold reward-apr-subtitle"
    >
      Staking APR: {{ currAPR || '--' }}
      <!--<span
        :class="$vuetify.theme.dark ? 'yd-text-dark' : 'yd-text-light'"
      >
        Staking APR: {{ currAPR || '--' }}
      </span>-->
    </v-card-subtitle>

    <!-- Reward Calc -->
    <reward-calc
      :rewardInputCallback="inputCallbackHandle"
    ></reward-calc>

    <!-- Staking Vite Reward Value -->
    <v-card-subtitle class="mb-4">
      {{ `Staking ${ inputStakeAmount } Vite, you will receive: $${ currRewardAmount || '--' } per day` }}
    </v-card-subtitle>

    <v-card-subtitle>
      <v-card-text>
        {{ `VX: $${ currRewardAmount || '--' }` }}
      </v-card-text>
    </v-card-subtitle>

    <v-spacer
      class="vite-card-spacer"
    ></v-spacer>

    <v-divider></v-divider><br>

    <!-- Reward Charts -->
    <reward-charts
      v-if="chartDataLoaded && thirtyDayData && movingAverageData"
      thirtyChartID="vite-rewards-thirty-day-chart"
      :thirtyDayData="thirtyDayData"
      sevenChartID="vite-rewards-seven-day-chart"
      :sevenDayData="movingAverageData"
    ></reward-charts>

    <v-divider></v-divider>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          How-To:
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <br>
          <p
            class="text-decoration-underline font-weight-bold"
          >
            How do I stake VITE?
          </p>
          <p>A user can stake VITE at ViteX and get daily rewards in VX, find more info about VX: <a href="https://vitex.net/faq/">https://vitex.net/faq/</a>.</p><br>
          <p
            class="text-decoration-underline font-weight-bold"
          >
            How do I retrieve my staking rewards?
          </p>
          <p>
            Staking VITE rewards distribution daily at 12 pm UTC+8, distribution is made by a smart contract. You can retrieve your staking VITE after 3 days of staking.<br>
            After retrieving rewards, there is a 7 day waiting period for your funds to arrive at your ViteX account. No rewards are distributed during the waiting period.<br>
          </p><br>
          <p
            class="text-decoration-underline font-weight-bold"
          >
            How do I calculate my VITE staking reward amount?
          </p>
          <p>
            VITE staking rewards depends on daily VX release for staking and total VITE staking amount, which can be seen at ViteX.net.<br>
            Reward amount = (Your staking amount * Daily VX release for staking) / Total staking amount. The minimum amount that you can stake is 134 VITE.
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import numeral from 'numeral'
import { mapState, mapGetters } from 'vuex'
import RewardCharts from '@/components/rewards/RewardCharts.vue'
import RewardCalc from '@/components/rewards/RewardCalc.vue'
import eventBus from '@/utils/events/eventBus'
import bigNumber from '@/utils/math/bigNumber'
import { calcSevenDayMovingAverages } from '@/utils/vite/rewardCalculations'

const axios = require('axios')

export default {

  components: {
    RewardCharts,
    RewardCalc,
  },

  data() {
    return {
      thirtyDayData: [],
      movingAverageData: [],
      chartDataLoaded: false,
      inputCallbackHandle: 'vite-input-amount-update',
      inputStakeAmount: 1000,
      defaultRewardAmount: 0,
      currRewardAmount: 0,
      currAPR: '',
    }
  },

  computed: {
    ...mapState([
      'viteRewardHistory',
      'rewardsLoaded',
      'prevDatesObj',
      'prevDatesLoaded',
      'rewardsLoadedCallbackHandle',
    ]),
    ...mapGetters([
      'getViteRewardHistory',
      'getRewardsLoaded',
      'getPrevDatesObj',
      'getPrevDatesLoaded',
      'getRewardsLoadedCallbackHandle',
    ]),
  },

  created() {
    eventBus.$on(this.rewardsLoadedCallbackHandle, () => {
      this.onRewardHistoryLoaded()
    })

    eventBus.$on(this.inputCallbackHandle, eventData => {
      if (eventData) {
        this.onInputAmountUpdate(eventData.inputAmount)
      }
    })
  },

  beforeDestroy() {
    // removing eventBus listeners
    eventBus.$off(this.inputCallbackHandle)
    eventBus.$off(this.rewardsLoadedCallbackHandle)
  },

  methods: {

    async onRewardHistoryLoaded() {
      // console.log('[Vite] onMounted()', this.prevDatesLoaded, this.rewardsLoaded)
      if (this.prevDatesLoaded && this.rewardsLoaded) {
        // console.log('[Vite] prevDatesLoaded && rewardsLoaded = TRUE, Reward History: ', this.viteRewardHistory)
        const vxPriceInUsd = (await axios.get('https://api.vitex.net/api/v2/exchange-rate?tokenSymbols=VX')).data['data'][0].usdRate
        // const yearlyRewardPerVite = bigNumber.multi(this.viteRewardHistory[29].dailyRewardPerVite, 365, 18)
        // const viteAPR = bigNumber.dividedToNumber(yearlyRewardPerVite, vxPriceInUsd, 8)
        this.currRewardAmount = bigNumber.multi(this.viteRewardHistory[29].viteMiningInfo.rewardAmount, vxPriceInUsd, 8)
        this.defaultRewardAmount = this.currRewardAmount
        this.currAPR = numeral(Number(this.viteRewardHistory[29].viteAPR)).format('0%')
        const movingAvgTempArr = []
        for (let index = 0; index < 30; ++index) {
          const apr = this.viteRewardHistory[index].viteAPR
          this.thirtyDayData.push(apr)
          if (index > 15) {
            movingAvgTempArr.push(apr)
          }
        }
        this.movingAverageData = calcSevenDayMovingAverages(movingAvgTempArr)
        this.chartDataLoaded = true
      }
    },

    onInputAmountUpdate(inputAmount) {
      this.currRewardAmount = (inputAmount / 1000) * this.defaultRewardAmount
    },
  },
}
</script>

<style lang="scss" scoped>

.vite-card-spacer {
  padding-bottom: 98px;
}

</style>
