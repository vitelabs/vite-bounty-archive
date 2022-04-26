<template>
  <div class="text-base font-semibold text-center w-full">
    <span
      :class="active ? 'text-blue-900' : 'text-blue-400'"
      class="w-full cursor-pointer"
    >
      <span class="py-3 text-base font-xl block"><slot /></span>
      <hr
        :class="active ? ' bg-blue-900 ' : 'bg-blue-400'"
        class="border-none h-0.5"
    /></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLink',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
})
</script>
