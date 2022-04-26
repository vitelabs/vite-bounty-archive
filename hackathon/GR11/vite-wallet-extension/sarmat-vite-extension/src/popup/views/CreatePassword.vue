<template>
  <div class="p-2 h-full">
    <section class="flex flex-col space-y-6 mt-10">
      <h1>Create Password</h1>
      <p class="text-center mx-3">
        Save the password to a safe place. You will need it to unlock your
        wallet.
      </p>

      <BaseInput
        @input="cpV$.password.$touch"
        v-model="state.password"
        label="Password"
        placeholder="Input the password"
        :errors="passwordErrors"
        passwordInput
      />
      <BaseInput
        @input="cpV$.repeatPassword.$touch"
        v-model="state.repeatPassword"
        class="mt-2"
        label="Confirm password"
        placeholder="Confirm the password"
        :errors="repeatPasswordErrors"
        passwordInput
      />
    </section>
    <section
      class="w-full px-4 py-8 fixed bottom-0 right-0 rounded-xl bg-blue-300"
    >
      <BaseButton
        @click="savePassword"
        block
        color="blue"
        :disabled="
          !state.password ||
          cpV$.password.$error ||
          cpV$.repeatPassword.$error ||
          !state.repeatPassword
        "
      >
        Create
      </BaseButton>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useValidate } from '@/composables/useValidate'
import * as storage from '../../services/StorageService'

export default defineComponent({
  name: 'CreatePassword',

  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const state = reactive({
      password: '',
      repeatPassword: ''
    })

    const { cpV$, passwordErrors, repeatPasswordErrors } = useValidate(state)

    async function savePassword() {
      cpV$.value.$touch()
      store.dispatch('settings/storePassword', state.password)
      store.dispatch('settings/setLockState', false)
      const { AppState } = await storage.getValue('AppState')
      storage.saveValue({
        AppState: { ...AppState, lastClosed: Date.now() }
      })
      router.push(route.redirectedFrom)
    }

    return {
      cpV$,
      state,
      savePassword,
      passwordErrors,
      repeatPasswordErrors
    }
  }
})
</script>

<style></style>
