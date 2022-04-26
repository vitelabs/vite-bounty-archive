<template>
  <div class="mt-2 p-2 break-words">
    <div class="text-center">
      <h1 class="text-2xl">Sign Transaction</h1>
      <p class="text-blue-400">{{ host }}</p>
    </div>
    <div>
      <p class="text-sm">From: {{ account.address }}</p>
      <p class="text-sm">To: {{ tx.toAddress }}</p>
      <p class="text-sm">Token: {{ tx.tokenId }}</p>
      <p class="text-sm">Amount: {{ tx.amount }}</p>
    </div>
    <footer class="fixed inset-x-0 bottom-0 p-2 bg-blue-100">
      <div class="flex gap-4 justify-between">
        <BaseButton block @click="deny" outline> Deny </BaseButton>
        <BaseButton block @click="accept" :loading="loading"> Send </BaseButton>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useWeb3 } from '@/composables/useWeb3'
import { useNotifications } from '@/composables/useNotifications'
import { decryptKeyStore } from 'src/services/CryptoService'

import { accountBlock } from '@vite/vitejs'
import {
  GET_WALLET_SERVICE_STATE,
  THIRDPARTY_SIGNATURE_KEY_SUCCESS_RESPONSE,
  THIRDPARTY_SIGNATURE_KEY_REJECT_RESPONSE,
  THIRDPARTY_SIGN_CONNECT,
  SIGN_REJECT
} from '../../../types'

export default defineComponent({
  setup() {
    const store = useStore()
    const { provider } = useWeb3()
    const { notify } = useNotifications()
    const host = ref(null)
    const tx = ref({})
    const loading = ref(false)

    const account = computed(() => store.getters['wallets/active'])
    const password = computed(() => store.getters['settings/password'])

    async function accept() {
      loading.value = true
      const privateKey = decryptKeyStore(account.value.keystore, password.value)

      const myAccountBlock = accountBlock
        .createAccountBlock('send', {
          address: tx.value.address,
          toAddress: tx.value.toAddress,
          tokenId: tx.value.tokenId,
          amount: tx.value.amount
        })
        .setProvider(provider)
        .setPrivateKey(privateKey)

      const sendAccountBlock = async () => {
        await myAccountBlock.autoSetPreviousAccountBlock()
        return myAccountBlock.sign().send()
      }

      sendAccountBlock()
        .then((result) => {
          console.log(result)
          notify({
            type: 'green',
            message: 'Transaction sent'
          })
          chrome.runtime.sendMessage({
            action: THIRDPARTY_SIGNATURE_KEY_SUCCESS_RESPONSE,
            payload: {
              txParams: result
            }
          })
        })
        .catch((err) => {
          console.warn(err)
          notify({
            type: 'red',
            message: err.error.message
          })
        })
        .finally(() => {
          loading.value = false
        })
    }

    function deny() {
      chrome.runtime.sendMessage({
        action: THIRDPARTY_SIGNATURE_KEY_REJECT_RESPONSE,
        payload: {
          message: SIGN_REJECT
        }
      })
      window.close()
    }

    chrome.runtime.sendMessage(
      { action: GET_WALLET_SERVICE_STATE },
      // @ts-ignore
      async ({ state } = {}) => {
        if (state) {
          try {
            tx.value = state.txnInfo
          } catch (err) {
            console.error(err)
          }
        } else {
          window.close()
        }
      }
    )
    chrome.runtime.connect({ name: THIRDPARTY_SIGN_CONNECT })

    return {
      account,
      deny,
      host,
      accept,
      loading,
      tx
    }
  }
})
</script>

<style></style>
