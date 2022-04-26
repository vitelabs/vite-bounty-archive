import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { computed } from 'vue'
import store from '../store'
import * as storage from '../../services/StorageService'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('../views/Welcome.vue'),
    meta: {
      onboarding: true
    }
  },
  {
    path: '/create-password',
    name: 'CreatePassword',
    component: () => import('../views/CreatePassword.vue'),
    meta: {
      onboarding: true
    }
  },
  {
    path: '/lock',
    name: 'Lock',
    component: () => import('../views/Lock.vue')
  },
  {
    path: '/create-wallet',
    name: 'CreateWallet',
    component: () => import('../views/wallet/CreateWallet.vue'),
    meta: {
      authenticate: true,
      onboarding: true
    }
  },
  {
    path: '/import-wallet',
    name: 'ImportWallet',
    component: () => import('../views/wallet/ImportWallet.vue'),
    meta: {
      authenticate: true,
      onboarding: true
    }
  },
  {
    path: '/manage-assets',
    name: 'ManageAssets',
    component: () => import('../views/ManageAssets.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import('../views/Menu.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/send',
    name: 'Send',
    component: () => import('../views/Send.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/recieve',
    name: 'Recieve',
    component: () => import('../views/Recieve.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/selected-asset',
    name: 'SelectedAsset',
    component: () => import('../views/SelectedAsset.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/API/Login.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/personal-sign',
    name: 'PersonalSign',
    component: () => import('../views/API/PersonalSign.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/sign',
    name: 'SignTransaction',
    component: () => import('../views/API/SignTransaction.vue'),
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const password = computed(() => store.getters['settings/password'])
const accounts = computed(() => store.getters['wallets/accounts'])
const timeout = computed(() => store.getters['settings/timeout'])
const lockState = computed(() => store.getters['settings/lockState'])

router.beforeEach(async (to, from, next) => {
  const { AppState } = await storage.getValue('AppState')
  if (AppState) {
    const { lastClosed } = AppState
    if (
      lastClosed &&
      accounts.value.length &&
      to.path !== '/lock' &&
      from.path !== '/lock'
    ) {
      const now = Date.now()
      const offset = now - lastClosed

      if (offset >= timeout.value) {
        store.dispatch('settings/setLockState', true)
        next({ path: '/lock' })
        return
      }
    }
  }

  if (to.matched.some((record) => record.meta.authenticate)) {
    if (!password.value) {
      next({ path: '/create-password' })
    } else if (lockState.value) {
      next({ path: '/lock' })
    }
  }
  if (to.matched.some((record) => record.meta.requiredAccount)) {
    if (!accounts.value.length) {
      chrome.tabs.create({
        url: 'popup.html#/welcome'
      })
      return
    }
  }
  if (to.matched.some((record) => record.meta.onboarding)) {
    if (!accounts.value.length) {
      next()
    } else {
      next(false)
    }
  }
  next()
})

export default router
