# Vite Wallet API Documentation

## Get Account

Before start using the wallet user needs to connect your account to the host using the `window.vite.getAccount()` function and approve host in opened popup.

```
const getAccount = await window.vite.getAccount()
```

## Sign Message

For signing messages use the `window.vite.sign(<string>)` function.

```
async function signMessage(message) {
  return await window.vite.sign(message)
}

const signedMessage = signMessage('hello')
console.log(signedMessage) // 9e4389f073628a0fc81d4e919f2a7a37003c71b9f2adeca796be03c6de2806553cbc4a70778ac9530626d4a4a5db2f2e06c0bb99e22009cbaf7efe3e33235901
```

## Send Transaction

For sending transaction use the `window.vite.signTransaction()` function. Params example [here](https://docs.vite.org/vite.js/accountBlock/accountBlock.html#how-to-send-accountblock).

```
async function signTransaction() {
  return await window.vite.signTransaction({
        address: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
        toAddress: 'vite_553462bca137bac29f440e9af4ab2e2c1bb82493e41d2bc8b2',
        tokenId: 'tti_5649544520544f4b454e6e40',
        amount: '0'
}).then(console.log).catch(console.log)
```
