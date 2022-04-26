<template>
  <div>
    <vue-apex-charts
      v-if="options.xaxis.categories && seriesData"
      type="bar"
      width="500"
      :options="options"
      :series="series"
      :class="$vuetify.theme.dark ? 'voting-results-dark' : 'voting-results-light'"
    ></vue-apex-charts>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {

  components: {
    VueApexCharts,
  },

  props: {
    id: { type: String, default: 'vuechart-example' },
    xAxisCategories: { type: Array, default: null },
    seriesData: { type: Array, default: null },
  },

  created() {
    this.onCreated()
  },

  setup() {
    return {
      options: {
        chart: {
          id: '',
        },
        xaxis: {
          categories: [],
        },
      },
      series: [{
        name: '',
        data: [0],
      }],
    }
  },

  methods: {
    async onCreated() {
      if (this.id) {
        this.options.chart.id = this.id
      }

      if (this.xAxisCategories) {
        this.xAxisCategories.forEach((axisName, index) => {
          this.options.xaxis.categories[index] = axisName.optionName
          this.series[0].data[index] = this.seriesData[0].data[index]
        })
      }
    },
  },
}
</script>

<style lang="scss">
</style>
