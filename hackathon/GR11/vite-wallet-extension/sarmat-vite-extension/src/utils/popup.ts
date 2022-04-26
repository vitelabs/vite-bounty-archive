export function openNewTab() {
  return chrome.tabs.create({
    url: 'popup.html#/'
  })
}
