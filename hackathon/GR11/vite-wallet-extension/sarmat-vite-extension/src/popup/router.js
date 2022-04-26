import { createRouter, createWebHashHistory } from 'vue-router'
import { computed } from 'vue'
import AuthRoute from './AuthRoute.vue'

import CreateWallet from './pages/Wallet/CreateWallet.vue'
import ImportWallet from './pages/Wallet/ImportWallet.vue'

import LogIn from './pages/API/LogIn.vue'
import SignTransaction from './pages/API/SignTransaction.vue'
import PersonalSign from './pages/API/PersonalSign.vue'

import Home from './views/Home.vue'
import History from './pages/History.vue'
import Deposit from './pages/Deposit.vue'
import Lock from './pages/Lock.vue'
import ExportPrivateKey from './pages/ExportPrivateKey.vue'
import About from './pages/About.vue'
import Settings from './pages/Settings/index.vue'
import Security from './pages/Settings/Security/index.vue'
import Contacts from './pages/Settings/Contacts/index.vue'
import PincodeModal from './pages/Settings/Security/PincodeModal.vue'

import store from './store'

const routes = [
  //third party api route
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/sign',
    name: 'signtransaction',
    component: SignTransaction
  },
  {
    path: '/personal_sign',
    name: 'personalsign',
    component: PersonalSign
  },
  //end
  {
    path: '/',
    name: 'auth',
    component: AuthRoute,
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/home',
    name: 'account',
    component: Home,
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/history',
    name: 'history',
    component: History,
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  //transaction send route
  //end
  {
    path: '/deposit',
    name: 'deposit',
    component: Deposit,
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/private-key',
    name: 'private-key',
    component: ExportPrivateKey,
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      authenticate: true
    }
  },
  {
    path: '/lock',
    name: 'lock',
    component: Lock
  },
  //wallet create route
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('./views/Welcome')
  },
  {
    path: '/create-wallet',
    name: 'create-wallet',
    component: CreateWallet,
    meta: {
      authenticate: true
    }
  },
  {
    path: '/import-wallet',
    name: 'import-wallet',
    component: () => import('./views/wallet/ImportWallet.vue'),
    meta: {
      authenticate: true
    }
  },
  //end
  {
    path: '/create-password',
    name: 'CreatePassword',
    component: () => import('./views/CreatePassword.vue')
  },
  //settings route
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/settings/security',
    name: 'security',
    component: Security,
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/settings/contacts',
    name: 'contacts',
    component: Contacts,
    meta: {
      requiredAccount: true,
      authenticate: true
    }
  },
  {
    path: '/settings/security/pincode',
    name: 'pincode',
    component: PincodeModal,
    props: {
      method: 'update',
      subModule: false
    },
    meta: {
      requiredAccount: true
    }
  }
  //end
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const password = computed(() => store.getters['settings/password'])

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.authenticate)) {
    if (!password.value) {
      next({ path: '/create-password' })
    } else if (store.getters.getLockState) {
      next({ path: '/lock' })
    }
  }
  if (to.matched.some((record) => record.meta.requiredAccount)) {
    if (!store.state.wallets.accounts.length) {
      chrome.tabs.create({
        url: 'popup.html#/welcome'
      })
      return
    }
  }
  next()
})

export default router
