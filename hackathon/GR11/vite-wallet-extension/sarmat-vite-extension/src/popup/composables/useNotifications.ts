import { ref } from 'vue'

export interface chromeNotification {
  title: string
  message: string
}

export interface Notification {
  message: string
  type: string
  timestamp?: number
}

const items = ref<Notification[]>([])

export function useNotifications() {
  function notify(payload: Notification) {
    items.value.push({ ...payload, timestamp: Date.now() })
  }

  function chromeNotify(params: chromeNotification): void {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/128.png',
      ...params
    })
  }

  return {
    items,
    notify,
    chromeNotify
  }
}
