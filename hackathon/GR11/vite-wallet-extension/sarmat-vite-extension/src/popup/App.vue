<template>
  <div class="box-container">
    <Notifications />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onUnmounted, watch } from 'vue'
import Notifications from '@/components/Notifications.vue'
import { APP_CONNECT } from '../types'
import { useWeb3 } from './composables/useWeb3'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    Notifications
  },
  setup() {
    const store = useStore()
    const {
      subscribeNewBlockData,
      fetchFullTokenInfo,
      getTxsList,
      unsubscribeAutoReceive,
      subscribeAutoReceive,
      handleNetworkChanged,
      unsubscribeNewBlockHandler
    } = useWeb3()

    const active = computed(() => store.getters['wallets/active'])
    const selectedNetwork = computed(() => store.getters['network/network'])

    watch(
      [active, selectedNetwork],
      ([newAccount, newNetwork], [oldAccount, oldNetwork]) => {
        if (!active.value) return
        if (newNetwork !== oldNetwork) {
          unsubscribeNewBlockHandler()
          handleNetworkChanged(newNetwork)
          subscribeNewBlockData()
        }
        store.commit('settings/setLoaded', false)
        Promise.all([
          fetchFullTokenInfo(active.value.address),
          getTxsList(active.value.address)
        ]).then(() => {
          store.commit('settings/setLoaded', true)
        })
        subscribeAutoReceive()
      },
      { immediate: true }
    )
    chrome.runtime.connect({ name: APP_CONNECT })
    onUnmounted(() => {
      unsubscribeAutoReceive()
      unsubscribeNewBlockHandler()
    })
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
body {
  width: 360px;
  height: 600px;
}
.box-container {
  font-family: 'Signika Negative', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #617ba3;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  width: 360px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 5px 15px #0044ff5b;
}
</style>
