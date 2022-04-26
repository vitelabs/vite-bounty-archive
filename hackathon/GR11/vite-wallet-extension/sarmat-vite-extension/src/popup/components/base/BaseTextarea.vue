<template>
  <div class="relative">
    <label
      :for="label"
      class="block pl-1 font-medium cursor-pointer text-gray-700"
      >{{ label }}</label
    >
    <textarea
      :id="label"
      class="
        block
        w-full
        pr-8
        h-20
        resize-none
        font-medium
        text-grey-900
        border-gray-300
        placeholder-gray-400
        rounded-md
      "
      :class="
        errors.length
          ? 'focus:border-transparent  focus:ring-red-600 border-red-600'
          : 'focus:border-transparent focus:ring-blue-500 hover:ring-gray-900 hover:border-gray-900'
      "
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      :placeholder="placeholder"
      :readonly="readonly"
    />
    <div v-if="icon" @click="clickHandler" class="absolute top-9 right-2">
      <BaseIcon
        v-if="modelValue && icon !== 'copy'"
        name="x"
        class="h-5 w-5 cursor-pointer"
        aria-hidden="true"
      />
      <BaseIcon
        v-else-if="!clickStatus"
        :name="icon"
        class="h-5 w-5 cursor-pointer"
        aria-hidden="true"
      />
      <BaseIcon v-else class="h-5 w-5 text-green-500" name="check-square" />
    </div>
    <ul
      v-if="errors.length"
      class="absolute left-0 -bottom-6 font-medium text-sm text-red-600"
    >
      <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'BaseTextarea',
  props: {
    modelValue: [String, Number],
    placeholder: String,
    label: String,
    icon: String,
    errors: {
      type: Array,
      default: () => {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const clickStatus = ref(false)
    function clickHandler(event) {
      if (!props.modelValue && props.icon === 'clipboard') {
        emit('iconEvent', event.target)
      } else if (props.icon === 'copy') {
        clickStatus.value = true
        setTimeout(() => {
          clickStatus.value = false
        }, 500)
        emit('iconEvent', event.target)
      } else if (props.modelValue) {
        emit('update:modelValue', '')
      }
    }
    return { clickStatus, clickHandler }
  }
})
</script>
