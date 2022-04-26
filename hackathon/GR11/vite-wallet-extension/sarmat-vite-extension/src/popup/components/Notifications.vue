<template>
  <div
    v-if="items.some((i) => now < i.timestamp + duration && !i.hide)"
    class="fixed right-2 bottom-100 text-center cursor-pointer"
    style="z-index: 99999"
  >
    <div v-for="(item, key) in items" :key="key">
      <div
        v-if="now < item.timestamp + duration && !item.hide"
        @click="item.hide = true"
        class="mt-2"
      >
        <div
          class="inline-block border-l-4 p-2"
          :class="`bg-${item.type}-50 border-${item.type}-400`"
        >
          <div class="flex items-center">
            <base-icon name="alert-circle" class="h-4 w-4"></base-icon>
            <div class="ml-2">
              <p class="text-sm" :class="`text-${item.type}-700`">
                {{ item.message }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useNotifications } from '@/composables/useNotifications'

export default defineComponent({
  setup() {
    const { items } = useNotifications()
    const duration = 3000

    const now = ref(Date.now())

    setInterval(() => (now.value = Date.now()), 1000)

    return {
      items,
      now,
      duration
    }
  }
})
</script>
