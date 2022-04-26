/* eslint-disable prettier/prettier */ /* eslint-disable prettier/prettier */
<template>
  <div class="base-icon inline-block">
    <i :data-feather="name" :width="iconSize" :height="iconSize" :fill="fill" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'BaseIcon',
  props: {
    name: { type: String, required: true },
    size: {
      type: String,
      default: 'md',
      validator: (val: string): boolean => {
        return ['xxs', 'xs', 'sm', 'md', 'lg', 'xl'].includes(val)
      }
    },
    filled: { type: Boolean, default: false }
  },
  // #ffc700
  setup(props) {
    const iconSize = computed(() => {
      switch (props.size) {
        case 'xxs':
          return '8'
        case 'xs':
          return '12'
        case 'sm':
          return '16'
        case 'lg':
          return '24'
        case 'xl':
          return '28'
        default:
          return '20'
      }
    })
    const feather = require('feather-icons')
    const fill = computed(() => (props.filled ? 'currentColor' : 'none'))
    onMounted(() => feather.replace())
    return { iconSize, fill }
  }
})
</script>
