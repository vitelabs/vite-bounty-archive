<template>
  <span
    class="
      inline-flex
      items-center
      justify-center
      px-2.5
      py-0.5
      rounded-md
      text-sm
      font-medium
    "
    :class="`bg-${color}-100 text-${color}-600`"
  >
    <base-icon v-if="icon" :name="icon" class="mr-1 h-4 w-4"></base-icon>
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseBadge',
  props: {
    color: {
      type: String,
      default: 'blue',
      validator: (val: string): boolean => {
        return ['blue', 'red', 'yellow', 'green'].includes(val)
      }
    },
    icon: {
      type: String
    }
  }
})
</script>

<style></style>
