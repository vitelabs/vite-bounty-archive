<template>
  <div class="p-2 flex flex-col space-y-6 justify-center h-full">
    <img
      class="mx-auto"
      src="assets/images/vite-logo-blue@2x.png"
      width="360"
      alt="Welcome Image"
    />
    <h1 class="mx-12">Welcome to Vite browser wallet</h1>

    <p class="text-center">Secure and trusted crypto wallet</p>
    <p class="text-center text-sm font-normal">
      You can import an existing wallet or create a new one
    </p>
    <div class="flex justify-around items-center space-x-3">
      <BaseButton size="lg" color="gradient" to="/create-wallet"
        >Create</BaseButton
      >
      <BaseButton size="lg" color="gradient" to="/import-wallet"
        >Import</BaseButton
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
