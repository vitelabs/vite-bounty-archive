<template>
  <v-card
    outlined
  >
    <v-card-title
      class="text-decoration-underline font-weight-bold reward-card-title"
    >
      <p class="text-center">
        Staking VX for Dividends from ViteX
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

    <!-- Staking VX Reward Value -->
    <v-card-subtitle>
      <p>
        {{ `Staking ${ inputStakeAmount } VX, you will receive:` }}
        {{ `$${ currRewardAmount || '--' } per day` }}
      </p>
    </v-card-subtitle>
    <v-card-subtitle
      v-if="currRewardList"
    >
      <v-card-text
        v-for="listItem in currRewardList"
        :key="listItem.name"
      >
        {{ `${listItem.name}: $${listItem.value.usd}` }}
      </v-card-text>
    </v-card-subtitle><br>

    <v-divider></v-divider><br>

    <!-- Reward Charts -->
    <reward-charts
      v-if="chartDataLoaded && thirtyDayData && movingAverageData"
      thirtyChartID="vx-rewards-thirty-day-chart"
      :thirtyDayData="thirtyDayData"
      sevenChartID="vx-rewards-seven-day-chart"
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
            How do I receive dividends?
          </p>

          <p>
            A minimum of 10 VX must be staked in the exchange account. Please note that VX held in a wallet or exchange account will
            not make you eligible for dividends; Participant is entitled to receive dividends starting with the next distribution
            immediately after submission of staking request; Staked VX will be released after the 7-day (7 complete cycles) waiting
            period once retrieved. No dividend will be received during this waiting period. Users can enable automatic staking.
            Mined VX will be automatically staked once enabled, purchased VX is not subject to this function.
          </p>

          <br>
          <p
            class="text-decoration-underline font-weight-bold"
          >
            How do I get VX dividends?
          </p>

          <p>
            You will only receive dividends after staking your VX<br>

            1. A minimum 10 VX must be staked in the exchange account to receive dividends.<br>

            2. Once a staking request is submitted, the user will receive dividend payments starting the same day at 12 pm (UTC+8), or the next day at 12 pm (UTC+8) if the staking request is submitted after 12 pm (UTC+8) on that particular day.<br>

            3. Once an unstaking request for VX is submitted, that VX will be released after seven days.<br>No dividends will be distributed during that period.<br>
          </p>

          <p>
            Users can enable automatic staking. After enabling, the VX obtained from mining will be automatically staked, whereas purchased VX will not be automatically staked.<br>
          </p>

          <br>
          <p
            class="text-decoration-underline font-weight-bold"
          >
            How much is paid out in dividends each day?
          </p>

          <p>
            The system distributes 1% of the total pool to all VX stakers proportional to the VX they have staked in the exchange.
            The initial dividend pool starts at 0 and will increase with fees collected by ViteX. Dividends are paid out in BTC, ETH,
            and USDT only.  For any given day, the total fees collected during that day will be fully distributed by the 100th day.
          </p>

          <p>
            BTC dividend:<br>
            a = 1% BTC dividends => BTC pool / 100<br>
            b = Then dividends => (a) / total VX staking<br>
            Your dividends in BTC = your VX staking amount * (b)<br>
          </p>

          <p>
            ETH dividend:<br>
            a = 1% ETH dividends => ETH pool / 100<br>
            b = Then dividends => (a) / total VX staking<br>
            Your dividends in ETH = your VX staking amount * (b)<br>
          </p>

          <p>
            USDT dividend:<br>
            a = 1% USDT dividends => USDT pool / 100<br>
            b = Then dividends => (a) / total VX staking<br>
            Your dividends in USDT = your VX staking amount * (b)<br>
          </p>

          <br>
          <p
            class="text-decoration-underline font-weight-bold"
          >
            How are VX dividends generated?
          </p>

          <p>
            All trading fees charged by the ViteX platform will be put into a shared dividend pool and distributed at a rate of 1% daily.
            For any given day, the fees collected of the day will be distributed completely in the next 100 days. Trading fees charged
            by operator (Operator Fee) are excluded from dividends.
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
      inputCallbackHandle: 'vx-input-amount-update',
      inputStakeAmount: 1000,
      defaultRewardAmount: 0,
      currRewardAmount: 0,
      defaultRewardList: null,
      currRewardList: null,
      currAPR: null,
    }
  },

  computed: {
    ...mapState([
      'vxRewardHistory',
      'rewardsLoaded',
      'prevDatesObj',
      'prevDatesLoaded',
      'rewardsLoadedCallbackHandle',
    ]),
    ...mapGetters([
      'getVxRewardHistory',
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
      if (this.prevDatesLoaded && this.rewardsLoaded) {
        // console.log('[VX] prevDatesLoaded && rewardsLoaded = TRUE, Reward History: ', this.vxRewardHistory)
        this.currRewardAmount = this.vxRewardHistory[29].vxMiningInfo.rewardAmount
        this.defaultRewardAmount = this.currRewardAmount
        const vxPriceInUsd = (await axios.get('https://api.vitex.net/api/v2/exchange-rate?tokenSymbols=VX')).data['data'][0].usdRate
        const yearlyRewardPerVx = bigNumber.multi(this.vxRewardHistory[29].dailyRewardPerVx, 365, 18)
        const vxAPR = bigNumber.dividedToNumber(yearlyRewardPerVx, vxPriceInUsd, 8)
        this.currAPR = numeral(Number(vxAPR)).format('0%')
        this.currRewardList = this.vxRewardHistory[29].rewardList
        this.defaultRewardList = this.currRewardList
        const movingAvgTempArr = []
        for (let index = 0; index < 30; ++index) {
          const apr = this.vxRewardHistory[index].vxAPR
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
      const newInputAmount = (inputAmount / 1000)
      this.currRewardAmount = newInputAmount * this.defaultRewardAmount
      this.currRewardList.forEach((rewardObj, rewardIndex) => {
        this.currRewardList[rewardIndex].value.usd = newInputAmount * this.defaultRewardList[rewardIndex].value.usd
      })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>

<!-- Staked Total
<v-card-subtitle>
  Staked Total: {{ vxMiningInfo.stakedAmount }}
</v-card-subtitle>  -->

<!-- Staking Ratio
<v-card-subtitle>
  Staking Ratio: {{ vxMiningInfo.stakingRatio }}
</v-card-subtitle>  -->
