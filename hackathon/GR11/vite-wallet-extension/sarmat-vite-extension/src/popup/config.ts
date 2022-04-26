export default {
  networks: [
    {
      id: 1,
      name: 'Mainnet',
      httpUrl: 'https://node.vite.net/gvite',
      wsUrl: 'wss://node-tokyo.vite.net/ws',
      httpVitex: 'https://vitex.vite.net/api/v1'
    },
    {
      id: 2,
      name: 'Testnet',
      httpUrl: 'https://buidl.vite.net/gvite/http',
      wsUrl: 'wss://buidl.vite.net/gvite/ws',
      httpVitex: 'https://vitex.vite.net/api/v1'
    },
    {
      id: 3,
      name: 'Local',
      httpUrl: 'http://127.0.0.1:9500',
      wsUrl: '',
      httpVitex: 'https://vitex.vite.net/api/v1'
    }
  ],
  nativeAsset: {
    tokenSymbol: 'VITE',
    tokenName: 'Vite Token',
    tokenId: 'tti_5649544520544f4b454e6e40',
    decimals: 18
  }
}
