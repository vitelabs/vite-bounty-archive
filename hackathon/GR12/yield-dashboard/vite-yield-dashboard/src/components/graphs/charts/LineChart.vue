<template>
  <div>
    <vue-apex-charts
      v-if="chartOptionsLoaded"
      :options="lineChartOptions"
      :series="lineChartData"
    ></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import eventBus from '@/utils/events/eventBus'

export default {

  components: {
    VueApexCharts,
  },

  props: {
    chartID: { type: String, default: '' },
    xAxisCategories: { type: Array, default: null },
    seriesData: { type: Array, default: null },
  },

  data() {
    return {
      lineChartOptions: {
        chart: {
          id: 'line-chart',
          type: 'line',
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          decimalsInFloat: 4,
        },
      },
      lineChartData: [
        {
          name: 'line-chart-series',
          data: [],
        },
      ],
      chartOptionsLoaded: false,
    }
  },

  mounted() {
    this.onMounted()

    // adding eventBus listener
    eventBus.$on('line-chart-update', eventRes => {
      console.log('** [EVENT] line-chart-update event **')
      this.chartOptionsLoaded = false
      if (eventRes.lineChartData) {
        console.log('[EVENT] line-chart-update event lineChartData: ', eventRes.lineChartData)
        this.lineChartData = [
          {
            data: eventRes.lineChartData,
          },
        ]
      } else if (eventRes.lineChartCategories && eventRes.chartID === this.chartID) {
        console.log('[EVENT] line-chart-update event lineChartCategories: ', eventRes.lineChartCategories)
        eventRes.lineChartCategories.forEach((val, index) => {
          this.lineChartOptions.xaxis.categories[index] = val
        })
      }
      this.chartOptionsLoaded = true
    })
  },

  // eventBus.$emit('line-chart-update', {
  //   lineChartData: state.lineChartData.data,
  // })

  // eventBus.$emit('line-chart-update', {
  //   lineChartCategories: state.lineChartCategories.data,
  //   chartID: ,
  // })

  beforeDestroy() {
    // removing eventBus listener
    eventBus.$off('line-chart-update')
  },

  methods: {
    async onMounted() {
      this.chartOptionsLoaded = false

      if (this.chartID !== '') {
        this.lineChartOptions.chart.id = this.chartID
        // console.log('[LINE CHART] chartID: ', this.lineChartOptions.chart.id)
      }

      if (this.xAxisCategories) {
        // this.lineChartOptions.xaxis.categories = this.xAxisCategories

        this.xAxisCategories.forEach(val => {
          const rhsDate = new Date(val.seconds * 1000)
          // console.log('[LINE CHART] val: ', index, rhsDate)
          this.lineChartOptions.xaxis.categories.push(rhsDate.getDate())
        })
        // console.log('[LINE CHART] xAxisCategories: ', this.xAxisCategories)
        // console.log('[LINE CHART] xaxis.categories: ', this.lineChartOptions.xaxis.categories)
      }

      if (this.seriesData) {
        this.lineChartData = [
          {
            data: this.seriesData,
          },
        ]
        // console.log('[LINE CHART] lineChartData: ', this.lineChartData)
      }

      this.chartOptionsLoaded = true
    },
  },
}
</script>

<style lang="scss">
</style>
