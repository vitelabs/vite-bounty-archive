<template>
  <div class="flex flex-col justify-between h-full">
    <div class="flex flex-col space-y-8">
      <div class="flex items-center p-2">
        <BaseToggle icon="chevron-left" to="/" />
        <h1 class="ml-24">Send</h1>
      </div>
      <div class="pt-4 space-y-4 px-2">
        <TokenSelect
          @input="sendInputV$.tokenSelect.$touch"
          v-model="token"
          :errors="tokenSelectError"
        />
        <BaseInput
          @input="sendInputV$.addressInput.$touch"
          @iconEvent="pasteAddress"
          v-model="toAddress"
          class="mt-2"
          label="Address"
          icon="clipboard"
          :errors="addressInputError"
        />
        <BaseInput
          @input="sendInputV$.amountInput.$touch"
          @iconEvent="pasteMaxValue"
          v-model="amount"
          type="number"
          class="mt-2"
          amountInput
          label="Amount"
          :placeholder="`Available ${token?.balance} ${token?.originalSymbol}`"
          :errors="amountInputError"
        />
      </div>
    </div>
    <div class="w-full py-8 px-2">
      <BaseButton
        @click="openModal"
        color="blue"
        block
        :disabled="
          sendInputV$.addressInput.$error ||
          sendInputV$.amountInput.$error ||
          sendInputV$.tokenSelect.$error ||
          !amount ||
          !toAddress ||
          !token
        "
      >
        Send
      </BaseButton>
    </div>
  </div>
  <TxConfirm
    :show="isOpen"
    @close="closeModal"
    :params="{ amount, toAddress, token }"
  />
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref, watch } from 'vue'
import TokenSelect from '@/components/TokenSelect.vue'
import TxConfirm from '@/components/modals/TxConfirm.vue'
import { useNumbers } from '@/composables/useNumbers'
import { useClipboard } from '@/composables/useClipboard'
import { useValidate } from '@/composables/useValidate'
import { IVitexToken } from '@/types'

export default defineComponent({
  name: 'Send',
  components: {
    TxConfirm,
    TokenSelect
  },
  setup() {
    const { formatUnits } = useNumbers()
    const isOpen = ref(false)
    const amount: Ref<string | number> = ref()
    const token: Ref<IVitexToken> = ref()
    const rawAmount = ref('')
    const toAddress = ref('')

    watch(amount, () => {
      rawAmount.value = formatUnits(amount.value, 18)
    })
    // watch(token, () => {
    //   amount.value = null
    // })

    function openModal() {
      isOpen.value = true
    }

    function closeModal() {
      isOpen.value = false
    }

    const { readClipboard } = useClipboard()
    async function pasteAddress() {
      sendInputV$.value.$touch()

      const clipboard = await readClipboard()
      toAddress.value = clipboard
    }

    function pasteMaxValue() {
      amount.value = token.value ? token.value.balance : 0
      sendInputV$.value.$touch()
    }

    const toSendBalance = computed(() => token.value.balance)
    const {
      sendInputV$,
      addressInputError,
      amountInputError,
      tokenSelectError
    } = useValidate({
      amountInput: amount,
      addressInput: toAddress,
      tokenSelect: token,
      balance: toSendBalance
    })

    return {
      token,
      amount,
      toAddress,
      isOpen,
      rawAmount,
      openModal,
      closeModal,
      pasteAddress,
      sendInputV$,
      addressInputError,
      amountInputError,
      tokenSelectError,
      pasteMaxValue,
      toSendBalance
    }
  }
})
</script>

<style></style>
