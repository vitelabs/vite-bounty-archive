<template>
  <div>
    <!-- FIX ME
    <line-chart
      v-if="tabSelected === 0 && isChartLoaded()"
      :chartID="thirtyChartID"
      :xAxisCategories="thirtyDayCategories"
      :seriesData="thirtyDayData"
    >
    </line-chart>-->

    <!-- FIX ME
    <line-chart
      v-if="tabSelected === 1 && isChartLoaded()"
      :chartID="sevenChartID"
      :xAxisCategories="sevenDayCategories"
      :seriesData="sevenDayData"
    >
    </line-chart> -->

    <v-tabs-items v-model="tabs">
      <v-tab-item
        :key="0"
        value="30-day-chart-tab"
      >
        <line-chart
          :chartID="thirtyChartID"
          :xAxisCategories="prevDatesObj.thirtyDayCategories"
          :seriesData="thirtyDayData"
        >
        </line-chart>
      </v-tab-item>
      <v-tab-item
        :key="1"
        value="7-day-chart-tab"
      >
        <line-chart
          :chartID="sevenChartID"
          :xAxisCategories="prevDatesObj.sevenDayCategories"
          :seriesData="sevenDayData"
        >
        </line-chart>
      </v-tab-item>
    </v-tabs-items>
    <v-tabs
      v-model="tabs"
      fixed-tabs
    >
      <v-tab
        href="#30-day-chart-tab"
        class="primary--text"
      >
        <span>30 Day APR History</span>
      </v-tab>

      <v-tab
        href="#7-day-chart-tab"
        class="primary--text"
      >
        <span>7 Day Moving Averages</span>
      </v-tab>
    </v-tabs>
    <!--<v-bottom-navigation
      :value="value"
      color="primary"
      horizontal
    >
      <v-btn
        @click="onClick(0)"
      >
        <span>Recents</span>
        <v-icon>
          {{ icons.mdiHistory }}
        </v-icon>
      </v-btn>
      <v-btn
        @click="onClick(1)"
      >
        <span>Favorites</span>
        <v-icon>
          {{ icons.mdiHeart }}
        </v-icon>
      </v-btn>
    </v-bottom-navigation>-->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import {
  mdiHeart,
  mdiHistory,
} from '@mdi/js'
import LineChart from '@/components/graphs/charts/LineChart.vue'

// import eventBus from '@/utils/events/eventBus'

export default {

  components: {
    LineChart,
  },

  props: {
    thirtyChartID: { type: String, default: 'thirty-day-aprs-history' },
    thirtyDayData: { type: Array, default: null },
    sevenChartID: { type: String, default: 'seven-day-moving-averages' },
    sevenDayData: { type: Array, default: null },
  },

  data() {
    return {
      value: 0,
      tabSelected: 0,
      tabs: null,
    }
  },

  setup() {
    return {
      // Icons
      icons: {
        mdiHeart,
        mdiHistory,
      },
    }
  },

  computed: {
    ...mapState([
      'prevDatesObj',
      'prevDatesLoaded',
    ]),
    ...mapGetters([
      'getPrevDatesObj',
      'getPrevDatesLoaded',
    ]),
  },

  created() {
    this.onCreated()
  },

  methods: {

    async isChartLoaded() {
      if (this.prevDatesLoaded
          && this.thirtyDayData
          && this.sevenDayData
      ) {
        return true
      }

      return false
    },

    onCreated() {
      // this.updateDateCategories()

      // this.polling = setInterval(() => {
      //   const currDate = new Date()
      //   if (this.todayDate < currDate) {
      //     this.todayDate = currDate
      //     this.updateDateCategories()
      //     eventBus.$emit('line-chart-update', {
      //       lineChartCategories: this.thirtyDayCategories.reverse(),
      //       chartID: this.thirtyChartID,
      //     })
      //     eventBus.$emit('line-chart-update', {
      //       lineChartCategories: this.sevenDayCategories.reverse(),
      //       chartID: this.sevenChartID,
      //     })
      //   }
      // }, 60000)
    },

    beforeDestroy() {
      // clearInterval(this.polling)
    },

    updateDateCategories() {
      // const today = new Date()
      // const todayTime = new Date(today.getTime())
      // for (let i = 0; i < 30; ++i) {
      //   const priorDate = new Date(today.getTime())
      //   priorDate.setDate(today.getDate() - (i + 1))
      //   this.thirtyDayCategories.push(priorDate)
      //   if (i < 7) {
      //     this.sevenDayCategories.push(priorDate)
      //   }
      // }

      // this.$store.commit('setThirtyDayCategories', this.thirtyDayCategories)
      // this.$store.commit('setSevenDayCategories', this.sevenDayCategories)
    },

    async onClick(index) {
      this.tabSelected = index
      // console.log('index', index)
      // console.log('tabSelected', this.tabSelected)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
