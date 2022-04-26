<template>
  <section class="p-2 absolute inset-0 bg-white">
    <div class="text-left mt-32">
      <div class="flex items-center">
        <h1 class="text-gray-600 text-base font-black cursor-default">
          Welcome back to
        </h1>
        <img
          class="ml-2"
          :src="require('@/assets/images/vite-logo.png')"
          width="90"
          alt="Welcome Image"
        />
      </div>
      <p>Secure and trusted crypto wallet</p>
    </div>
    <div
      class="
        fixed
        px-2
        py-10
        space-y-8
        inset-x-0
        bottom-0
        rounded-t-2xl
        bg-blue-200
        flex flex-col
      "
    >
      <BaseInput
        @input="lV$.password.$touch"
        v-model="state.password"
        label="Password"
        placeholder="Input the password"
        :errors="unLockErrors"
        passwordInput
      />
      <BaseButton @click="unLock" color="blue" size="lg" block :disabled="state.password && unLockErrors.length"
        >Unlock <BaseIcon class="ml-2" name="unlock" size="sm"
      /></BaseButton>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useValidate } from '@/composables/useValidate'
import * as storage from '../../services/StorageService'

export default defineComponent({
  name: 'Lock',
  setup() {
    const router = useRouter()

    const state = reactive({
      password: ''
    })

    const store = useStore()

    const { lV$, unLockErrors } = useValidate(state)

    async function unLock() {
        store.dispatch('settings/setLockState', false)
        const { AppState } = await storage.getValue('AppState')
        storage.saveValue({
          AppState: { ...AppState, lastClosed: Date.now() }
        })
        router.push('/')
    }

    return {
      state,
      lV$,
      unLockErrors,
      unLock
    }
  }
})
</script>
