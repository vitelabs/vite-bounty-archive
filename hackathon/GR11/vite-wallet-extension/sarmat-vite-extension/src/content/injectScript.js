import walletProvider from './WalletProvider'

Object.defineProperty(window, 'vite', {
  enumerable: true,
  writable: true,
  configurable: true,
  value: walletProvider
})
