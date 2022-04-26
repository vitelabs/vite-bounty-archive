<template>
  <div class="rounded-md bg-yellow-100 p-4">
    <div class="flex">
      <div class="flex-shrink-0">
        <BaseIcon class="text-yellow-400" :name="icon" />
      </div>
      <div class="ml-3">
        <h3 class="text-sm font-medium text-yellow-400">Attention needed</h3>
        <div class="mt-1 text-sm text-yellow-700">
          <span>
            <slot />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'BaseWarning',
  props: {
    type: {
      type: String,
      validator: (value: string) => ['warn', 'error'].includes(value)
    }
  },
  setup(props) {
    const icon = computed(() => {
      switch (props.type) {
        case 'info':
          return 'alert-triangle'
        case 'error':
          return 'alert-circle'
        default:
          return 'alert-triangle'
      }
    })
    return {
      icon
    }
  }
})
</script>
