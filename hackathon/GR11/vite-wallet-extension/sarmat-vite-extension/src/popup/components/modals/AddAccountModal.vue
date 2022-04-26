<template>
  <BaseModal :open="open" @close="closeModal">
    <template v-slot:header> Add Account </template>
    <template v-slot:default>
      <BaseInput label="Account Name" v-model="name" />
    </template>
    <template v-slot:footer>
      <div class="flex gap-4 justify-between">
        <BaseButton block @click="deriveWallet" :disabled="!name">
          Confirm
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useWeb3 } from '@/composables/useWeb3'
import { deriveNewAccount } from '../../../services/AccountService'

export default defineComponent({
  name: 'AddAccountModal',
  components: {},
  setup(_, { emit }) {
    const store = useStore()
    const { unsubscribeAutoReceive } = useWeb3()
    const accountsNum = computed(() => store.getters['wallets/accountsNum'] + 1)
    const name = ref(`Wallet ${accountsNum.value}`)
    const accounts = computed(() => store.getters['wallets/createdAccounts'])
    const password = computed(() => store.getters['settings/password'])

    function closeModal() {
      emit('close')
    }

    function deriveWallet() {
      console.log(accounts.value[0].mnemonicStore)
      const { address, keystore } = deriveNewAccount(
        accounts.value.length,
        accounts.value[0].mnemonicStore,
        password.value
      )
      unsubscribeAutoReceive()
      store.commit('wallets/addAccount', {
        name: name.value,
        address: address,
        keystore: keystore
      })
      closeModal()
    }

    watch(accountsNum, () => {
      name.value = `Wallet ${accountsNum.value}`
    })

    return {
      name,
      closeModal,
      deriveWallet
    }
  }
})
</script>

<style></style>
