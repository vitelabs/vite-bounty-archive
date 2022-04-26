<template>
  <BaseModal :open="open" @close="closeModal">
    <template v-slot:header> Export Private Key </template>
    <div class="flex flex-col space-y-8">
      <BaseInput
        @input="lV$.password.$touch"
        v-model="state.password"
        label="Password"
        placeholder="Input the password"
        :errors="unLockErrors"
        passwordInput
      />
      <BaseInput
        v-model="privateKey"
        label="Private key"
        disabled
        icon="copy"
        @iconEvent="copyPrivateKey"
      />
    </div>
    <template v-slot:footer>
      <div class="flex gap-4 justify-between">
        <BaseButton block outline> Cancel </BaseButton>
        <BaseButton
          block
          @click="exportPrivateKey"
          :disabled="state.password && unLockErrors.length"
        >
          Export
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onBeforeUnmount, reactive } from 'vue'
import { useStore } from 'vuex'
import { useValidate } from '../../composables/useValidate'
import { decryptKeyStore } from '../../../services/CryptoService'
import { useClipboard } from '@/composables/useClipboard'

export default defineComponent({
  name: 'ExportPrivaKeyModal',
  setup(_, { emit }) {
    const store = useStore()

    const open = ref(false)
    const state = reactive({ password: '' })
    const privateKey = ref('')

    const password = computed(() => store.getters['settings/password'])
    const active = computed(() => store.getters['wallets/active'])

    const { lV$, unLockErrors } = useValidate(state)
    const { writeClipboard } = useClipboard()

    function closeModal() {
      emit('close')
      state.password = ''
      privateKey.value = ''
    }

    function exportPrivateKey() {
      if (!lV$.value.password.$error) {
        privateKey.value = decryptKeyStore(
          active.value.keystore,
          password.value
        )
      }
    }
    function copyPrivateKey() {
      writeClipboard(privateKey.value)
    }

    onBeforeUnmount(() => {
      state.password = ''
      privateKey.value = ''
    })

    return {
      open,
      closeModal,
      exportPrivateKey,
      state,
      privateKey,
      lV$,
      unLockErrors,
      copyPrivateKey
    }
  }
})
</script>

<style></style>
