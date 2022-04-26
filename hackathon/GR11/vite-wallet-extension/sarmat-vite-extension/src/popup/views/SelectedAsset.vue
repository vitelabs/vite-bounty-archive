<template>
  <div class="flex flex-col justify-between h-full">
    <div class="mb-4">
      <div class="flex flex-col space-y-8">
        <div class="flex items-center p-2">
          <BaseToggle icon="chevron-left" to="/" />
          <p class="ml-24 text-sm">{{ forPrice(token.price) }}</p>
        </div>
      </div>
      <div class="px-2">
        <div class="flex flex-col justify-between h-full">
          <div class="flex flex-col justify-between items-center">
            <img width="50" class="mb-4" :src="token.urlIcon" alt="token img" />
            <h1>
              {{ forAmount(token.balance) + ' ' + token.originalSymbol }}
            </h1>
            <p class="text-sm">{{ forPrice(token.price, token.balance) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="
        h-fu80
        flex flex-col
        justify-between
        bg-blue-200
        rounded-t-xl
        w-full
      "
    >
      <h1 class="my-2">Transaction history</h1>
      <span class="text-base font-xl block">
        <hr class="border-none h-0.5 bg-blue-400"
      /></span>
      <div class="h-80 overflow-y-scroll">
        <TransactionList :txs="assetTxs" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { usePrices } from '@/composables/usePrices'
import TransactionList from '@/components/lists/TransactionList.vue'

export default defineComponent({
  name: 'SelectedAsset',
  components: { TransactionList },
  setup() {
    const store = useStore()
    const token = computed(() => store.getters['account/selectedAsset'])
    const { forPrice, forAmount } = usePrices()
    const assetTxs = computed(() =>
      store.getters['account/txsList'].filter(
        (el) => el.tokenInfo.tokenId === token.value.tokenId
      ).length
        ? store.getters['account/txsList'].filter(
            (el) => el.tokenInfo.tokenId === token.value.tokenId
          )
        : []
    )
    return {
      token,
      forPrice,
      forAmount,
      assetTxs
    }
  }
})
</script>
