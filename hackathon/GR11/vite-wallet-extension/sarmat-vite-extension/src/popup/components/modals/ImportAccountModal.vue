<template>
  <BaseModal :open="open" @close="closeModal">
    <template v-slot:header> Import Account </template>
    <template v-slot:default>
      <BaseInput
        v-model="name"
        @input="requiedV$.validator.$touch"
        :errors="requiedError"
        label="Account Name"
      ></BaseInput>
      <BaseTextarea
        label="Write or paste your private key"
        icon="clipboard"
        class="mt-5"
        @input="importTextareaV$.validator.$touch"
        :errors="importTextareaError"
        @iconEvent="pasteSource"
        v-model.trim="source"
      ></BaseTextarea>
    </template>
    <template v-slot:footer>
      <div class="flex gap-4 justify-between">
        <BaseButton
          block
          @click="importAccount"
          :disabled="!name || !source || importTextareaError.length"
        >
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
import {
  createFromPrivateKey,
  createAccount
} from '../../../services/AccountService'
import { useClipboard } from '@/composables/useClipboard'
import { useValidate } from '@/composables/useValidate'

export default defineComponent({
  name: 'ImportAccountModal',
  setup(_, { emit }) {
    const store = useStore()
    const { unsubscribeAutoReceive } = useWeb3()
    const { readClipboard } = useClipboard()
    const accountsNum = computed(() => store.getters['wallets/accountsNum'] + 1)
    const name = ref(`Wallet ${accountsNum.value}`)
    const source = ref('')
    const password = computed(() => store.getters['settings/password'])

    function closeModal() {
      emit('close')
      source.value = ''
    }

    async function pasteSource() {
      importTextareaV$.value.$touch()
      const clipboard = await readClipboard()
      source.value = clipboard
    }

    function importAccount() {
      const account = createFromPrivateKey(source.value)

      const wallet = createAccount(
        name.value,
        account.privateKey,
        password.value
      )
      unsubscribeAutoReceive()
      store.commit('wallets/addImportedAccount', wallet)
      closeModal()
    }

    watch(accountsNum, () => {
      name.value = `Wallet ${accountsNum.value}`
    })

    const { requiedV$, requiedError } = useValidate({
      validator: name
    })
    const { importTextareaV$, importTextareaError } = useValidate({
      validator: source,
      type: 'Private key'
    })

    return {
      name,
      closeModal,
      importAccount,
      source,
      pasteSource,
      importTextareaV$,
      importTextareaError,
      requiedV$,
      requiedError
    }
  }
})
</script>
