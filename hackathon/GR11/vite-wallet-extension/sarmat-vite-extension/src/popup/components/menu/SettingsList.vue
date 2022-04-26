<template>
  <section class="mt-2 h-full flex flex-col bg-blue-100 rounded-2xl">
    <ul class="w-full">
      <li class="list-item" @click="addAccountModal = !addAccountModal">
        <div class="flex items-center text-gray-600">
          <BaseIcon name="plus" size="xl" />
          <div class="ml-2">
            <h3 class="leading-none text-xl font-medium">Add account</h3>
          </div>
        </div>
        <base-icon name="chevron-right" size="xl" class="text-blue-600" />
      </li>
      <li class="list-item" @click="importAccountModal = !importAccountModal">
        <div class="flex items-center text-gray-600">
          <BaseIcon name="download" size="xl" />
          <div class="ml-2">
            <h3 class="leading-none text-xl font-medium">Import account</h3>
          </div>
        </div>
        <base-icon name="chevron-right" size="xl" class="text-blue-600" />
      </li>
      <li class="list-item" @click="exportModal = !exportModal">
        <div class="flex items-center text-gray-600">
          <BaseIcon name="upload" size="xl" />
          <div class="ml-2">
            <h3 class="leading-none text-xl font-medium">Export private key</h3>
          </div>
        </div>
        <base-icon name="chevron-right" size="xl" class="text-blue-600" />
      </li>
      <li class="list-item" @click="openNewTab">
        <div class="flex items-center text-gray-600">
          <BaseIcon name="maximize" size="xl" />
          <div class="ml-2">
            <h3 class="leading-none text-xl font-medium">Open in a new tab</h3>
          </div>
        </div>
        <base-icon name="chevron-right" size="xl" class="text-blue-600" />
      </li>
      <li class="list-item" @click="lockWallet">
        <div class="flex items-center text-gray-600">
          <BaseIcon name="lock" size="xl" />
          <div class="ml-2">
            <h3 class="leading-none text-xl font-medium">Lock</h3>
          </div>
        </div>
        <base-icon name="chevron-right" size="xl" class="text-blue-600" />
      </li>
    </ul>
  </section>
  <ExportPrivateKeyModal :open="exportModal" @close="exportModal = false" />
  <AddAccountModal :open="addAccountModal" @close="addAccountModal = false" />
  <ImportAccountModal
    :open="importAccountModal"
    @close="importAccountModal = false"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ExportPrivateKeyModal from '../modals/ExportPrivateKeyModal.vue'
import AddAccountModal from '../modals/AddAccountModal.vue'
import ImportAccountModal from '../modals/ImportAccountModal.vue'
import { openNewTab } from '../../../utils'

export default defineComponent({
  name: 'AccountsList',
  components: {
    ExportPrivateKeyModal,
    AddAccountModal,
    ImportAccountModal
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const exportModal = ref(false)
    const addAccountModal = ref(false)
    const importAccountModal = ref(false)

    function lockWallet() {
      store.dispatch('settings/setLockState', true)
      router.push({ path: '/lock' })
    }

    return {
      openNewTab,
      exportModal,
      addAccountModal,
      importAccountModal,
      lockWallet
    }
  }
})
</script>

<style scoped>
.list-item {
  @apply px-2 py-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-blue-300;
}
</style>
