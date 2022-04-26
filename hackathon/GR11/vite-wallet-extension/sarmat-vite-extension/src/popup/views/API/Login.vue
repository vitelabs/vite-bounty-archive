<template>
  <div class="mt-2 p-2">
    <h1 class="text-2xl text-center">Sign in Request</h1>
    <div class="flex items-center justify-around mt-6">
      <div class="p-1 border border-gray-300 rounded-full">
        <img class="w-6" :src="hostIcon" alt="" />
      </div>
      <BaseIcon name="arrow-right" />
      <div class="py-0.5 px-3 border border-gray-300 rounded-full">
        <span class="text-xl font-bold text-gray-500">?</span>
      </div>
      <BaseIcon name="arrow-right" />

      <div
        class="
          h-10
          w-10
          flex
          items-center
          justify-center
          rounded-full
          bg-purple-300
          text-white text-xl
        "
      >
        {{ accountNameSymbol(account.name) }}
      </div>
    </div>
    <div class="text-left mt-6 flex flex-col space-y-4">
      <div>
        <p>
          <span class="text-xl text-blue-400">{{ host }}</span> wants to connect
          to your account
          <span class="text-xl text-blue-400">
            {{ compressAddress(account.address, 10, 5) }} </span
          >.
        </p>
      </div>
      <span class="text-sm text-gray-600 font-medium"
        >This site requests access to view the current account address. Make
        sure that you trust the site you are using.</span
      >
    </div>
    <footer
      class="fixed inset-x-0 bottom-0 flex gap-4 px-2 py-6 justify-between"
    >
      <BaseButton block @click="deny" outline> Deny </BaseButton>
      <BaseButton block @click="accept"> Accept </BaseButton>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { compressAddress, accountNameSymbol } from '@/helpers/string'
import {
  THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE,
  GET_WALLET_SERVICE_STATE,
  THIRDPARTY_GET_ACCOUNT_CONNECT
} from '../../../types'

export default defineComponent({
  setup() {
    const store = useStore()
    const host = ref('')
    const hostIcon = computed(() =>
      host.value
        ? `http://www.google.com/s2/favicons?domain=${host.value}`
        : require('@/assets/images/logo-blue.svg')
    )
    const account = computed(() => store.getters['wallets/active'])

    function accept() {
      chrome.runtime.sendMessage({
        action: THIRDPARTY_GET_ACCOUNT_SUCCESS_RESPONSE,
        payload: {
          name: account.value.name,
          address: account.value.address
        }
      })
      window.close()
    }

    function deny() {
      window.close()
    }

    onMounted(() => {
      chrome.runtime.sendMessage(
        { action: GET_WALLET_SERVICE_STATE },
        // @ts-ignore
        ({ state } = {}) => {
          if (state && state.host) {
            host.value = state.host
          } else {
            // window.close()
          }
        }
      )
      chrome.runtime.connect({ name: THIRDPARTY_GET_ACCOUNT_CONNECT })
    })

    return {
      accept,
      deny,
      account,
      compressAddress,
      accountNameSymbol,
      host,
      hostIcon
    }
  }
})
</script>

<style></style>
