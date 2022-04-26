export function saveValue(value): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set(value, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      }
      resolve()
    })
  })
}

export function getValue(value): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(value, (items) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      }
      resolve(items)
    })
  })
}

export function removeValue(value): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(value, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      }
      resolve()
    })
  })
}
