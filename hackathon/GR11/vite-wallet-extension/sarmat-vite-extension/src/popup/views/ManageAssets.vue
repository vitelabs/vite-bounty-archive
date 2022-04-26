<template>
  <div>
    <div class="fixed inset-x-0 top-0 z-50 bg-blue-200 flex p-2 items-center">
      <BaseToggle icon="chevron-left" to="/" />
      <h1 class="ml-12 text-blue-400">Asset Management</h1>
    </div>
    <div class="flex justify-between bg-blue-200">
      <BaseLink
        v-for="(navItem, idx) in ['Search', 'Your assets']"
        :key="idx"
        @click="navRoute = navItem"
        :active="navRoute === navItem"
        >{{ navItem }}
      </BaseLink>
    </div>
    <template v-if="navRoute === 'Search'">
      <div class="rounded-b-md bg-blue-200 p-3">
        <BaseInput
          v-model="filter"
          class="mx-3 my-8"
          placeholder="Search by name or symbol"
        />
      </div>
      <p class="text-center pt-8">
        {{
          filter
            ? `${filteredTokens.length} of ${tokens.length}`
            : 'All assets added'
        }}
      </p>
      <div class="fixed inset-x-0 bottom-0 rounded-t-md bg-blue-200">
        <TokenList :tokens="filteredTokens" selector />
        <p
          v-if="!filteredTokens.length"
          class="text-blue-900 absolute inset-0 top-2/4 text-center"
        >
          Not found
        </p>
      </div>
    </template>
    <div v-if="navRoute === 'Your assets'">
      <div class="rounded-b-2xl bg-blue-200 px-3 pt-8 h-96">
        <BaseInput placeholder="Contract address" />
      </div>
      <div class="px-3 py-8">
        <BaseButton color="blue" size="lg">Add asset</BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, ComputedRef } from 'vue'
import TokenList from '@/components/lists/TokenList.vue'
import { useStore } from 'vuex'
import { IVitexToken } from '@/types'

export default defineComponent({
  name: 'ManagseAssets',
  components: { TokenList },
  setup() {
    const store = useStore()
    const navRoute = ref('Search')

    const tokens: ComputedRef<Array<IVitexToken>> = computed(() => {
      return store.getters['account/fullTokenInfo']
    })

    const filter = ref('')
    const filteredTokens = computed(() => {
      return tokens.value.filter(
        (el: IVitexToken) =>
          el.name.toLowerCase().includes(filter.value.toLowerCase()) ||
          el.originalSymbol.toLowerCase().includes(filter.value.toLowerCase())
      )
    })

    return {
      navRoute,
      filter,
      tokens,
      filteredTokens
    }
  }
})
</script>
