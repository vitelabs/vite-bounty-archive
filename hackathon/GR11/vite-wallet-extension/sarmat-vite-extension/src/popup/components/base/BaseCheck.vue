<template>
  <div class="max-w-sm mx-auto cursor-pointer">
    <label class="flex cursor-pointer">
      <input
        @change="$emit('update:modelValue', $event.target.checked)"
        v-bind="$attrs"
        type="checkbox"
        class="
          cursor-pointer
          text-blue-500
          w-4
          h-4
          mr-2
          mt-1
          focus:ring-blue-400 focus:ring-opacity-25
          border border-gray-300
          rounded-sm
        "
      />
      <span class="font-normal">
        <slot />
      </span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'change']
})
</script>
