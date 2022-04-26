<template>
  <div class="relative">
    <Listbox v-model="selectedToken" v-slot="{ open }">
      <div class="relative">
        <label class="font-semibold cursor-pointer text-black absolute -top-7"
          >Select token</label
        >
        <ListboxButton
          :class="
            open ? 'border-blue-500' : 'border-gray-300 hover:border-black'
          "
          class="
            relative
            w-full
            flex
            items-center
            py-2
            pl-3
            pr-10
            text-left
            rounded-lg
            shadow-md
            ring-0
            border
            cursor-pointer
            focus:outline-none
            transition-all
          "
        >
          <img class="h-8 mr-2" :src="selectedValue.urlIcon" alt="" />
          <span class="block truncate flex-center">
            <span class="text-base mr-2 text-black font-medium">
              {{ selectedValue.originalSymbol }}
            </span>
            <span class="text-sm text-gray-400">
              {{ selectedValue.name }}
            </span>
          </span>
          <span
            class="
              absolute
              inset-y-0
              right-0
              flex
              items-center
              pr-2
              pointer-events-none
            "
          >
            <BaseIcon
              :class="[
                {
                  'transform rotate-180': open
                },
                'transition duration-300'
              ]"
              name="chevron-down"
            />
          </span>
        </ListboxButton>

        <ListboxOptions
          class="
            absolute
            w-full
            mt-1
            overflow-auto
            text-base
            bg-white
            rounded-md
            shadow-select
            max-h-60
            ring-1 ring-black ring-opacity-5
            focus:outline-none
            sm:text-sm
            z-10
          "
          ><ListboxOption disabled class="p-2">
            <BaseInput
              v-model="filter"
              placeholder="Search by name or symbol"
              icon="search"
            />
          </ListboxOption>
          <ListboxOption v-if="!filteredTokens.length" disabled class="p-2">
            <p class="text-sm text-center">There are no assets available.</p>
            <p class="text-sm text-center">
              Only assets with a positive balance are shown.
            </p>
          </ListboxOption>
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="token in filteredTokens.sort(
              (a, b) => b.balance - a.balance
            )"
            :key="token.tokenId"
            :value="token"
            as="template"
          >
            <li
              :class="[
                active ? ' bg-blue-100' : ' bg-white',
                selected ? 'bg-blue-100' : 'bg-white',
                'cursor-pointer select-none relative py-2 border-t px-4 flex justify-between  '
              ]"
            >
              <div class="flex items-center">
                <img class="h-8 mr-2" :src="token.urlIcon" alt="" />
                <span class="block truncate">
                  <p class="text-base mr-2 text-black font-medium">
                    {{ token.balance + ' ' + token.originalSymbol }}
                  </p>
                  <p class="text-sm text-gray-400">
                    {{ token.name }}
                  </p>
                </span>
              </div>
              <span class="text-black mr-6">{{
                forPrice(token.price, token.balance)
              }}</span>

              <span
                v-if="selected"
                class="
                  absolute
                  inset-y-0
                  right-0
                  flex
                  items-center
                  pr-3
                  text-black
                "
              >
                <BaseIcon name="check" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>
    <ul
      v-if="errors.length"
      class="absolute left-0 -bottom-6 font-medium text-sm text-red-600"
    >
      <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  ComputedRef,
  onMounted
} from 'vue'
import { useStore } from 'vuex'
import { IVitexToken } from '@/types'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption
} from '@headlessui/vue'
import { usePrices } from '@/composables/usePrices'

export default defineComponent({
  name: 'TokenSelect',
  props: {
    modelValue: Object,
    errors: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption
  },

  setup(_, { emit }) {
    const store = useStore()

    const tokens: ComputedRef<Array<IVitexToken>> = computed(() => {
      return store.getters['account/fullTokenInfo']
    })
    const filter = ref('')
    const filteredTokens = computed(() => {
      return tokens.value
        .filter((e) => e.balance > 0)
        .filter(
          (el: IVitexToken) =>
            el.name.toLowerCase().includes(filter.value.toLowerCase()) ||
            el.originalSymbol.toLowerCase().includes(filter.value.toLowerCase())
        )
    })
    const selectedToken = ref(null)
    watch(selectedToken, () => {
      filter.value = ''
    })

    const selectedValue = computed(() => {
      if (selectedToken.value) {
        return selectedToken.value
      } else if (filteredTokens.value.length) {
        return filteredTokens.value[0]
      }
      return tokens.value[0]
    })
    onMounted(() => emit('update:modelValue', selectedValue.value))
    watch(selectedValue, () => {
      emit('update:modelValue', selectedValue.value)
    })

    const { forPrice } = usePrices()

    return {
      tokens,
      selectedToken,
      selectedValue,
      forPrice,
      filteredTokens,
      filter
    }
  }
})
</script>
