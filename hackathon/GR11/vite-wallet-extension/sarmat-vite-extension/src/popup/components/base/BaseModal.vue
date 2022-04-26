<template>
  <transition name="fade">
    <div
      v-if="open"
      class="
        w-full
        fixed
        z-10
        inset-x-0
        bottom-0
        rounded-t-2xl
        ring-1 ring-gray-300
        bg-white
        h-3/4
        flex flex-col
        justify-between
        p-2
        duration-500
      "
    >
      <header class="border-b py-4 px-2 flex items-center justify-between">
        <h1 class="m-auto"><slot name="header" /></h1>
        <BaseToggle @click="closeModal" icon="x" />
      </header>
      <section class="px-2 flex flex-col">
        <slot />
      </section>
      <footer class="p-2">
        <slot name="footer" />
      </footer>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'BaseModal',
  props: {
    open: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const { open } = toRefs(props)

    function closeModal() {
      emit('close')
    }

    return {
      closeModal
    }
  }
})
</script>

<style lang="scss"></style>
