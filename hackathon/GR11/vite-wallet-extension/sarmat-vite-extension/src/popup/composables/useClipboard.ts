export function useClipboard() {
  function writeClipboard(text) {
    const type = 'text/plain'
    const blob = new Blob([text], { type })
    //@ts-ignore
    const data = [new ClipboardItem({ [type]: blob })]
    navigator.clipboard.write(data)
  }

  async function readClipboard() {
    let text = ''
    const permissions = await navigator.permissions.query({
      //@ts-ignore
      name: 'clipboard-read'
    })

    if (permissions.state == 'granted' || permissions.state == 'prompt') {
      const data = await navigator.clipboard.read()
      for (let i = 0; i < data.length; i++) {
        if (!data[i].types.includes('text/plain')) {
          console.log('Clipboard contains non-text data. Unable to access it.')
        } else {
          const blob = await data[i].getType('text/plain')
          text = await blob.text()
        }
      }
    }
    return text
  }

  return {
    writeClipboard,
    readClipboard
  }
}
