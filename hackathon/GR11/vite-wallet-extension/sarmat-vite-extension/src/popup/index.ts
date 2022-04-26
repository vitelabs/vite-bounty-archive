import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import { FROM_BACK_TO_POPUP, CLOSE_WINDOW } from '../types'

import * as storage from '../services/StorageService'
import registerBaseComponents from './helpers/registerBaseComponents'
import registerDirectives from './helpers/registerDirectives'
import './assets/styles/tailwind.css'

export const app = createApp(App)

registerBaseComponents(app)
registerDirectives(app)

//save the version info
// @ts-ignore
storage.getValue('meta').then(({ meta }) => {
  storage.saveValue({
    meta: {
      ...meta,
      version: '0.0.1'
    }
  })
})

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  const { type, action } = message
  if (!type || type !== FROM_BACK_TO_POPUP) {
    return false
  }
  if (action === CLOSE_WINDOW) {
    window.close()
  }
  sendResponse()
  return true
})

app.use(store).use(router).mount('#app')
