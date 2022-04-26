<template>
  <v-card
    outlined
  >
    <v-card-title
      class="text-decoration-underline font-weight-bold reward-card-title"
    >
      <p class="text-center">
        Rewards for SBP Voting
      </p>
    </v-card-title><br>

    <v-divider class="mb-5"></v-divider>

    <div
      v-if="!rewardDataLoaded"
      class="text-center mb-5"
    >
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <!-- SBP List (Table) -->
    <v-simple-table
      v-if="rewardDataLoaded"
      fixed-header
      height="815px"
    >
      <v-list>
        <v-list-group
          v-for="(listItem, listIndex) in sbpList"
          :key="listItem.sbpName"
          v-model="listItem.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-avatar
              v-if="listItem.icon"
            >
              <v-icon>
                {{ listItem.icon }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="listItem.sbpName"></v-list-item-title>
              <v-list-item-subtitle>
                {{ `Total Reward: ${ listItem.votingReward }` }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content>
              <reward-charts
                v-if="rewardDataLoaded
                  && tempSbpThirtyData
                  && tempSbpMovingAverageData
                  && sbpList[listIndex].active"
                thirtyChartID="sbp-rewards-thirty-day-chart"
                :thirtyDayData="tempSbpThirtyData"
                sevenChartID="sbp-rewards-seven-day-chart"
                :sevenDayData="tempSbpMovingAverageData"
              ></reward-charts>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-simple-table>

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
            How do I vote for an SBP?
          </p>
          <p>
            1) Open Vite app<br>
            2) Click VITE<br>
            3) Click Vote<br>
            4) Select the SBP you'd like to vote for from the list and press vote (you'll have to run POW for quota)<br>
          </p><br>
          <p
            class="text-decoration-underline font-weight-bold"
          >
            How much in rewards will I receive after voting?
          </p>
          <p>
            The more VITE you have in your wallet the higher rewards you get. The number of total votes has an effect on your reward amount.<br>
            The higher number of total votes the smaller rewards you will receive. The total reward amount is shared between all voters.<br>
          </p>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { mapState, mapGetters } from 'vuex'
import {
  rewardsBackupStore,
  rewardsBackupDocID,
  getDataById,
} from '@/firebase/firebase'
import RewardCharts from '@/components/rewards/RewardCharts.vue'

export default {

  components: {
    RewardCharts,
  },

  data() {
    return {
      sbpList: null,
      rewardDataLoaded: false,
      tempSbpThirtyData: new Array(30).fill(Math.random()),
      tempSbpMovingAverageData: new Array(7).fill(Math.random()),
    }
  },

  computed: {
    ...mapState([
      'prevDatesObj',
      'prevDatesLoaded',
      'rewardsLoadedCallbackHandle',
    ]),
    ...mapGetters([
      'getPrevDatesObj',
      'getPrevDatesLoaded',
      'getRewardsLoadedCallbackHandle',
    ]),
  },

  async created() {
    getDataById(rewardsBackupStore, rewardsBackupDocID).then(rewardsDoc => {
      if (rewardsDoc) {
        this.sbpList = rewardsDoc.data().sbp[29].rewardMap
        if (this.sbpList) {
          this.sbpList.sort((a, b) => b.votingReward - a.votingReward)
          // this.onRewardHistoryLoaded()
          this.rewardDataLoaded = true
        }
      }
    })
  },

  methods: {

    onRewardHistoryLoaded() {
      if (this.sbpList) {
        Object.values(this.sbpList).forEach((val, index) => {
          console.log(`rewardMap[${index}]: `, val)
        })
      }
    },
  },

  // async onInputAmountUpdate(inputAmount) {
  //   if (inputAmount > 0) {
  //     console.log('[SBP] onInputAmountUpdate', inputAmount)
  //   } else {
  //     console.log('[SBP] onInputAmountUpdate', inputAmount)
  //   }
  // },
}
</script>

<style lang="scss" scoped>

</style>
