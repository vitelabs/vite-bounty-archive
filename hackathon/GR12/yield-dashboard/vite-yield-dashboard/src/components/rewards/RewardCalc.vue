<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="3"
        >
          <v-text-field
            v-model="stakingAmountInput"
            type="number"
            label="Staking Amount"
            :rules="[numberRule]"
            outlined
            solo
            @input="fireCallback()"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
import eventBus from '@/utils/events/eventBus'

export default {

  props: {
    rewardInputCallback: { type: String, default: '' },
  },

  data() {
    return {
      stakingAmountInput: 1000,
      numberRule: v => {
        if (typeof v === 'string' && !v.trim()) return true
        if (!Number.isNaN(parseFloat(v)) && v >= 0) return true

        return 'Must be a number greater than 0'
      },
    }
  },

  // computed: {
  //   ...mapState([
  //     'thirtyDayCategories',
  //     'sevenDayCategories',
  //     'prevDatesLoaded',
  //   ]),
  //   ...mapGetters([
  //     'getThirtyDayCategories',
  //     'getSevenDayCategories',
  //     'getPrevDatesLoaded',
  //   ]),
  // },

  // created() {
  //   this.onCreated()
  // },

  // beforeDestroy() {
  //   this.onBeforeDestroy()
  // },

  methods: {

    // async onCreated() {
    // },

    // async onBeforeDestroy() {
    // },

    async fireCallback() {
      eventBus.$emit(this.rewardInputCallback, { inputAmount: this.stakingAmountInput })
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
