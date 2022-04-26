const hide = (id) => {
  const elt = document.getElementById(id)
  if (elt) {
    elt.style.display = 'none'
  }
}

const show = (id) => {
  const elt = document.getElementById(id)
  if (elt) {
    elt.style.display = ''
  }
}

function copyToClipboard (text) {
  const textArea = document.createElement('textarea')
  textArea.value = text

  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  document.execCommand('copy')

  document.body.removeChild(textArea)
}

const balanceToReadable = (balance, decimals) => {
  return (parseInt(balance) / parseFloat(`1e+${decimals}`)).toFixed(2)
}