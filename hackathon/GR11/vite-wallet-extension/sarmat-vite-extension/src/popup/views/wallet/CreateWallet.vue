<template>
  <div class="fixed inset-x-0 top-0 z-50 flex p-2 items-center">
    <BaseToggle icon="chevron-left" to="/" />
    <h1 class="ml-14">Create wallet</h1>
  </div>
  <div class="px-2 pt-16">
    <main v-if="scene == 1">
      <section class="h-full w-full flex flex-col">
        <BaseWarning class="mt-4" name="info">
          Write down or copy this phrase in the correct order and keep it in a
          safe place.
        </BaseWarning>

        <BaseTextarea
          label="Your recovery phrase"
          class="mt-8 mb-24"
          icon="copy"
          @iconEvent="copyRecoveryPhrase"
          v-model="mnemonic"
          readonly
        />
      </section>
      <section
        class="
          text-sm
          w-full
          px-2
          py-2
          fixed
          bottom-0
          right-0
          bg-blue-300
          rounded-t-md
        "
      >
        <BaseCheck class="mx-2" v-model="agree">
          I understand that if i lose my recovery phrase, i will not be able to
          access my funds.
        </BaseCheck>
        <BaseButton
          color="blue"
          size="lg"
          @click="continueToConfirm"
          :disabled="!agree"
          >Continue</BaseButton
        >
      </section>
    </main>
    <main v-if="scene == 2">
      <section class="flex flex-col h-full">
        <div class="grid grid-cols-1 gap-y-6 px-3">
          <BaseInput
            @input="requiedV$.validator.$touch"
            v-model="name"
            placeholder="Name"
            :errors="requiedError"
            label="Set the wallet name"
          ></BaseInput>
          <BaseTextarea
            @input="CMV$.$touch"
            label="Write or paste the phrase in the correct order"
            v-model="mnemonicForConfirm"
            icon="clipboard"
            :errors="confrimMnemonicErrors"
            @iconEvent="pasteRecoveryPhrase"
          ></BaseTextarea>
          <ul class="space-x-2 flex flex-wrap justify-center">
            <li
              v-for="(mnemonicItem, idx) in randomMnemonic"
              :key="idx"
              @click="addMnemonic(mnemonicItem)"
              :disabled="hasAdded(mnemonicItem)"
              :class="
                hasAdded(mnemonicItem)
                  ? 'bg-gray-300 cursor-default'
                  : 'cursor-pointer btn-grad'
              "
              class="border rounded-2xl py-1 px-4 mb-2"
            >
              {{ mnemonicItem }}
            </li>
          </ul>
        </div>
      </section>

      <section
        class="
          text-sm
          w-full
          px-4
          py-8
          fixed
          bottom-0
          right-0
          bg-blue-300
          rounded-t-md
        "
      >
        <BaseButton
          @click="saveWallet"
          color="blue"
          size="lg"
          :disabled="
            !mnemonicConfirmed || confrimMnemonicErrors.length || !name
          "
          >Create Wallet</BaseButton
        >
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
  createRandom,
  validateMnemonic,
  createFromMnemonic,
  createAccount
} from '../../../services/AccountService'
import { useClipboard } from '@/composables/useClipboard'
import { useValidate } from '@/composables/useValidate'

export default defineComponent({
  name: 'CreateWallet',
  emits: ['nextStep'],
  setup() {
    const store = useStore()
    const router = useRouter()
    let scene = ref(1)
    const wallet = createRandom()
    const password = computed(() => store.getters['settings/password'])
    const mnemonic = wallet.mnemonic
    const mnemonicForConfirm = ref('')
    const { writeClipboard, readClipboard } = useClipboard()

    const { CMV$, confrimMnemonicErrors } = useValidate({
      mnemonic: mnemonic,
      mnemonicForConfirm: mnemonicForConfirm
    })

    function copyRecoveryPhrase() {
      writeClipboard(mnemonic)
    }
    async function pasteRecoveryPhrase() {
      const clipboard = await readClipboard()
      mnemonicForConfirm.value = clipboard
      CMV$.value.$touch()
    }

    const randomMnemonic = computed(() => {
      return mnemonic
        .split(' ')
        .sort(() => Math.round(Math.random() * 100) - 50)
    })
    const accountsNum = computed(() => store.getters['wallets/accountsNum'])
    const agree = ref(false)

    function continueToConfirm() {
      scene.value = 2
    }

    function hasAdded(word: string): boolean {
      return !!mnemonicForConfirm.value.split(' ').find((el) => el === word)
    }

    function addMnemonic(item: string): void {
      CMV$.value.$touch()
      if (!mnemonicForConfirm.value.split(' ').includes(item)) {
        mnemonicForConfirm.value = [
          ...mnemonicForConfirm.value.split(' '),
          item
        ].join(' ')
      }
    }

    const mnemonicConfirmed = computed(() => {
      return validateMnemonic(mnemonicForConfirm.value)
    })

    const fromMnemonic = computed(() => {
      return createFromMnemonic(mnemonic)
    })

    const name = ref(`Wallet ${accountsNum.value + 1}`)
    const { requiedV$, requiedError } = useValidate({ validator: name })
    function saveWallet() {
      const createdWallet = createAccount(
        name.value,
        fromMnemonic.value.privateKey,
        password.value,
        mnemonic
      )
      store.commit('wallets/addAccount', createdWallet)

      router.push('/')
    }

    return {
      store,
      scene,
      router,
      mnemonic,
      randomMnemonic,
      hasAdded,
      continueToConfirm,
      agree,
      wallet,
      name,
      mnemonicForConfirm,
      addMnemonic,
      mnemonicConfirmed,
      saveWallet,
      copyRecoveryPhrase,
      pasteRecoveryPhrase,
      CMV$,
      confrimMnemonicErrors,
      requiedV$,
      requiedError
    }
  }
})
</script>

<style>
.slide-enter-to {
  position: absolute;
  right: 0;
}

.slide-enter-from {
  position: absolute;
  right: -100%;
}

.slide-leave-to {
  position: absolute;
  left: -100%;
}

.slide-leave-from {
  position: absolute;
  left: 0;
}

.btn-grad {
  background-image: linear-gradient(
    to right,
    #457fca 0%,
    #8dc3f5 51%,
    #457fca 100%
  );
}
.btn-grad {
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px rgb(231, 230, 230);
  display: block;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
}
</style>
