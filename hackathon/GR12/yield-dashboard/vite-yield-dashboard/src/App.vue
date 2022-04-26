<template>
  <component :is="resolveLayout">
    <router-view></router-view>
  </component>
</template>

<script>
import { computed } from '@vue/composition-api'
import { useRouter } from '@/utils'

const LayoutBlank = () => import('@/layouts/Blank.vue')
const LayoutContent = () => import('@/layouts/Content.vue')

export default {

  components: {
    LayoutBlank,
    LayoutContent,
  },

  setup() {
    const { route } = useRouter()

    const resolveLayout = computed(() => {
      // Handles initial route
      if (route.value.name === null) return null

      if (route.value.meta.layout === 'content') return 'layout-content'

      return 'layout-blank'
    })

    return {
      resolveLayout,
    }
  },
}
</script>
