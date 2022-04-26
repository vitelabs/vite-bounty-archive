import { wallet } from '@vite/vitejs'

const addrTypes = {
  0: 'Illegal',
  1: 'User',
  2: 'Contract'
}

export function addrType(addr) {
  return addrTypes[wallet.isValidAddress(addr)]
}

export function atos(amount, decimals, showDecimals = 8) {
  if (!amount || amount == 0 || !decimals || decimals === 0) {
    return `${amount}`
  }
  if (amount.length > decimals) {
    return `${withCommas(amount.slice(0, -decimals))}.${amount
      .slice(amount.length - decimals, amount.length)
      .slice(0, showDecimals)
      .replace(/0*$/, '')}`.replace(/\.*$/, '')
  }
  const b =
    '0'.repeat(decimals - amount.length) +
    amount
      .slice(0, showDecimals - (decimals - amount.length))
      .replace(/0*$/, '')
  if (b.length != 0) {
    return `0.${b}`
  }
  const ab =
    '0'.repeat(decimals - amount.length) +
    amount.slice(0, decimals - amount.length).replace(/0*$/, '')
  return parseFloat(ab).toString()
}

export function tokenView(tokenSymbol, tokenIndex) {
  return `${tokenSymbol}-${(Array(3).join('0') + tokenIndex).slice(-3)}`
}

export function withCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
