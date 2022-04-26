<template>
  <div class="relative">
    <label
      :for="label"
      class="block pb-1 font-semibold cursor-pointer text-gray-700"
      >{{ label }}</label
    >
    <div class="relative rounded-md shadow-sm">
      <input
        :id="label"
        :value="modelValue"
        :disabled="disabled"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
        class="
          block
          w-full
          pr-10
          h-12
          border-gray-300
          font-medium
          text-base text-gray-900
          placeholder-gray-400
          transition-all
          caret-blue-600
          rounded-md
        "
        :class="
          errors.length
            ? 'focus:border-transparent  focus:ring-red-600 border-red-600'
            : 'focus:border-transparent focus:ring-blue-500 hover:ring-gray-900 hover:border-gray-900'
        "
        :type="inputType"
        :placeholder="placeholder"
      />

      <div
        v-if="icon || passwordInput || amountInput"
        @click="iconClickHandler($event)"
        class="
          absolute
          inset-y-0
          right-0
          pr-2
          py-auto
          flex
          items-center
          justify-center
        "
      >
        <div
          class="flex items-center justify-center"
          v-if="!passwordInput && !amountInput"
        >
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
        <div class="flex items-center justify-center" v-else-if="passwordInput">
          <BaseIcon
            v-if="!showPassword"
            name="eye"
            class="h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
          <BaseIcon
            v-else
            name="eye-off"
            class="h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
        </div>
        <div
          v-else-if="amountInput"
          class="
            flex
            items-center
            justify-center
            rounded-lg
            bg-blue-600
            hover:bg-blue-500
            transition-all
          "
        >
          <div class="text-white text-xs py-1 px-2 cursor-pointer text-center">
            Max
          </div>
        </div>
      </div>
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
import { computed, defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'BaseInput',
  props: {
    modelValue: [String, Number],
    label: String,
    placeholder: String,
    icon: String,
    type: String,
    disabled: Boolean,
    passwordInput: {
      type: Boolean,
      default: false
    },
    amountInput: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  setup(props, { emit }) {
    const showPassword = ref(false)

    const inputType = computed(() => {
      if (!props.type && props.passwordInput) {
        return showPassword.value ? 'text' : 'password'
      } else if (props.type) {
        return props.type
      }
      return 'text'
    })
    const clickStatus = ref(false)

    function iconClickHandler(event) {
      if (props.passwordInput) {
        showPassword.value = !showPassword.value
        emit('iconEvent', event.target)
      } else if (!props.modelValue && props.icon === 'clipboard') {
        emit('iconEvent', event.target)
      } else if (props.icon === 'copy') {
        clickStatus.value = true
        setTimeout(() => {
          clickStatus.value = false
        }, 500)
        emit('iconEvent', event.target)
      } else if (props.modelValue) {
        emit('update:modelValue', '')
      } else if (props.amountInput || props.icon) {
        emit('iconEvent', event.target)
      }
    }

    return {
      showPassword,
      inputType,
      iconClickHandler,
      clickStatus
    }
  }
})
</script>
