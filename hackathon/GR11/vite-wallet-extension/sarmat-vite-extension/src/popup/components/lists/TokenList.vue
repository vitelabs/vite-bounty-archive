<template>
  <div @scroll="scroll" class="h-80 overflow-y-auto">
    <div
      v-for="token in tokenList
        .sort((a, b) => b.balance - a.balance)
        .slice(0, endToken)"
      :key="token.tokenId"
      @click="selectToken(token)"
      class="w-full cursor-pointer transition-all"
      :class="
        hasCheck(token) && selector
          ? 'bg-blue-300'
          : 'bg-blue-200 hover:bg-blue-300'
      "
    >
      <div v-if="loaded" class="flex p-3 justify-between">
        <div class="flex items-center space-x-5">
          <img width="40" :src="token.urlIcon" :alt="token.originalSymbol" />
          <div class="text-left">
            <p class="text-black">
              {{ forAmount(token.balance) + ' ' + token.originalSymbol }}
            </p>
            <span class="font-medium pt-1 text-sm text-gray-600">{{
              selector ? compressAddress(token.tokenId) : token.name
            }}</span>
          </div>
        </div>
        <span class="font-medium pt-1 text-sm text-black">{{
          forPrice(token.price, token.balance)
        }}</span>
        <div v-if="selector">
          <BaseIcon
            v-if="hasCheck(token)"
            class="text-black"
            name="check-circle"
          />
          <BaseIcon v-else class="text-black" name="circle" />
        </div>
      </div>
      <div v-else class="flex p-3 w-full justify-between animate-pulse">
        <div class="rounded-full bg-blue-400 w-16 h-10 mr-2"></div>
        <div class="w-full space-y-2">
          <div class="h-4 bg-blue-400 rounded w-2/4"></div>
          <div class="h-3 bg-blue-400 rounded w-1/4"></div>
        </div>
        <div class="h-3 bg-blue-400 rounded w-1/4"></div>
      </div>
      <hr v-if="selector" class="bg-white text-white border-none h-0.5" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed, ComputedRef } from 'vue'
import { useStore } from 'vuex'
import { IVitexToken } from '@/types'
import { compressAddress } from '@/helpers/string'
import { usePrices } from '@/composables/usePrices'

export default defineComponent({
  name: 'TokenList',
  props: {
    tokens: {
      type: Array,
      default: () => []
    },
    selector: {
      type: Boolean,
      default: false
    },
    balance: {
      type: [Number, String],
      default: 0
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const loaded = computed(() => store.getters['settings/loaded'])

    const endToken = ref(5)

    function scroll() {
      if (props.tokens.length > endToken.value) {
        endToken.value++
      }
    }

    const selectedTokens: ComputedRef<Array<IVitexToken>> = computed(() => {
      return store.getters['account/selectedTokens']
    })

    function hasCheck(token: IVitexToken): boolean {
      return !!selectedTokens.value.find((el: IVitexToken) =>
        el.tokenId.includes(token.tokenId)
      )
    }

    function selectToken(token: IVitexToken): void {
      if (props.selector) {
        hasCheck(token)
          ? store.commit('account/removeSelectedTokens', token)
          : store.commit('account/addSelectedTokens', token)
      } else {
        emit('select', token)
      }
    }

    const tokenList = computed(() => props.tokens)

    const { forPrice, forAmount } = usePrices()

    return {
      hasCheck,
      selectToken,
      compressAddress,
      forPrice,
      endToken,
      scroll,
      tokenList,
      forAmount,
      loaded
    }
  }
})
</script>
