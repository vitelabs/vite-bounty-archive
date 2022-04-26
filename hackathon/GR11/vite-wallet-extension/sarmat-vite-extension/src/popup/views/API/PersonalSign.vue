<template>
  <div class="mt-2 p-2">
    <div class="text-center">
      <h1 class="text-2xl">Personal Sign</h1>
    </div>
    <div class="space-y-6 mt-6">
      <p>
        For:
        <span class="text-blue-400">
          {{ host }}
        </span>
      </p>
      <p>
        Data:
        <span class="text-blue-400">
          {{ data }}
        </span>
      </p>
      <p>
        Signed Data:
        <span class="text-blue-400 break-words">
          {{ signedData }}
        </span>
      </p>
    </div>
    <footer class="fixed inset-x-0 bottom-0 px-2 py-6">
      <div class="flex gap-4 justify-between">
        <BaseButton block @click="deny" outline> Deny </BaseButton>
        <BaseButton block @click="accept"> Accept </BaseButton>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { decryptKeyStore } from 'src/services/CryptoService'
import { sign } from 'src/services/AccountService'
import {
  GET_WALLET_SERVICE_STATE,
  THIRDPARTY_PERSONAL_SIGN_CONNECT,
  THIRDPARTY_PERSONAL_SIGN_SUCCESS_RESPONSE,
  THIRDPARTY_PERSONAL_SIGN_REJECT_RESPONSE,
  PERSONAL_SIGN_REJECT
} from '../../../types'

export default defineComponent({
  setup() {
    const store = useStore()
    const host = ref(null)
    const data = ref(null)

    const account = computed(() => store.getters['wallets/active'])
    const password = computed(() => store.getters['settings/password'])
    const privateKey = computed(() =>
      decryptKeyStore(account.value.keystore, password.value)
    )
    const signedData = computed(() =>
      data.value ? sign(data.value, privateKey.value) : ''
    )

    function accept() {
      chrome.runtime.sendMessage({
        action: THIRDPARTY_PERSONAL_SIGN_SUCCESS_RESPONSE,
        payload: {
          data: signedData.value
        }
      })
    }

    function deny() {
      chrome.runtime.sendMessage({
        action: THIRDPARTY_PERSONAL_SIGN_REJECT_RESPONSE,
        payload: {
          message: PERSONAL_SIGN_REJECT
        }
      })
      window.close()
    }

    onMounted(() => {
      chrome.runtime.sendMessage(
        { action: GET_WALLET_SERVICE_STATE },
        // @ts-ignore
        async ({ state } = {}) => {
          if (state) {
            try {
              const { signData, session } = state
              data.value = signData.msgData
              host.value = session.host
            } catch (err) {
              console.error(err)
            }
          } else {
            window.close()
          }
        }
      )
      chrome.runtime.connect({ name: THIRDPARTY_PERSONAL_SIGN_CONNECT })
    })

    return {
      deny,
      host,
      accept,
      data,
      signedData
    }
  }
})
</script>

<style></style>
