<template>
  <div
    @click="clickHandler"
    class="
      bg-blue-300
      rounded-lg
      w-10
      h-10
      flex
      justify-center
      items-center
      cursor-pointer
      transition
      duration-100
      ease-in-out
      hover:bg-blue-400
    "
  >
    <BaseIcon class="text-black" :name="icon" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'BaseToggle',
  props: {
    to: {
      type: String
    },
    icon: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const router = useRouter()
    function clickHandler() {
      props.to ? router.push(props.to) : emit('click')
    }
    return {
      clickHandler
    }
  }
})
</script>
