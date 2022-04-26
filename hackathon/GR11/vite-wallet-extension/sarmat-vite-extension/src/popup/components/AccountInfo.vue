<template>
  <div class="px-6 border text-center flex flex-col space-y-3">
    <div v-if="loaded" class="flex w-full justify-center items-center mr-2">
      <img class="w-8" src="assets/images/logo-blue.svg" />
      <div class="font-semibold text-blue-900">
        <span class="text-3xl">{{ forAmount(balance) }}</span>
        <span>VITE</span>
      </div>
    </div>
    <div
      v-else
      class="flex w-full justify-center items-center space-x-2 animate-pulse"
    >
      <div class="rounded-full bg-blue-400 h-12 w-12"></div>
      <div class="h-6 bg-blue-400 rounded w-1/4"></div>
    </div>

    <BaseTooltip placement="bottom">
      <template v-slot:activator>
        <div
          @click="copyAddress"
          class="
            p-2
            rounded-xl
            cursor-pointer
            hover:shadow-xl
            active:bg-blue-300
            hover:bg-blue-100
            transition
            duration-100
            ease-in-out
          "
        >
          <span v-if="loaded">
            <p class="font-semibold text-blue-900 text-2xl">
              {{ active.name }}
            </p>
            <p class="font-semibold text-sm">
              {{ active.address ? compressAddress(active.address, 10, 5) : '' }}
            </p>
          </span>
          <div
            v-else
            class="space-y-2 animate-pulse flex flex-col items-center"
          >
            <div class="h-5 bg-blue-400 rounded w-1/4"></div>
            <div class="h-3 bg-blue-400 rounded w-32"></div>
          </div>
        </div>
      </template>
      <div
        v-text="copiedAddress ? 'Copied' : 'Copy address'"
        class="w-20 text-center"
      />
    </BaseTooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useNumbers } from '@/composables/useNumbers'
import { compressAddress } from '@/helpers/string'
import { useClipboard } from '@/composables/useClipboard'
import { usePrices } from '@/composables/usePrices'

export default defineComponent({
  name: 'AccountInfo',
  setup() {
    const store = useStore()
    const loaded = computed(() => store.getters['settings/loaded'])
    const { toNum, frac } = useNumbers()

    const copiedAddress = ref(false)

    const balance = computed(() => store.getters['account/balance'])
    const active = computed(() => store.getters['wallets/active'])

    const { writeClipboard } = useClipboard()

    function copyAddress() {
      writeClipboard(active.value.address)
      copiedAddress.value = true
      setTimeout(() => {
        copiedAddress.value = false
      }, 1000)
    }

    const { forAmount } = usePrices()

    return {
      copiedAddress,
      balance,
      active,
      toNum,
      frac,
      compressAddress,
      copyAddress,
      forAmount,
      loaded
    }
  }
})
</script>

<style></style>
