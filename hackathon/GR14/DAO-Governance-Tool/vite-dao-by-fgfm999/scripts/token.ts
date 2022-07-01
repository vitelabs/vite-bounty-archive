import { ViteAPI, wallet, accountBlock } from "@vite/vitejs"
import HTTP_RPC from "@vite/vitejs-http"
import * as dotenv from "dotenv"
dotenv.config()


const rpc = new HTTP_RPC("https://buidl.vite.net/gvite")
const provider = new ViteAPI(rpc, () => {
  console.log("vite connected");
});

const mnemonics = process.env.MNEMONICS
const myWallet = wallet.getWallet(mnemonics);
const { privateKey, address: owner } = wallet.deriveAddress({ mnemonics, index: 0 })

async function issueToken() {
  const block = accountBlock.createAccountBlock('issueToken', { // blockType: 2
    address: owner,
    tokenName: 'CoinX',
    isReIssuable: true,
    maxSupply: '10000000000000000000000000',
    isOwnerBurnOnly: false,
    totalSupply: '100000000000000000000000',
    decimals: 2,
    tokenSymbol: 'TEST'
  });

  block.setProvider(provider).setPrivateKey(privateKey)
  const result = await block.autoSend()
  // wait for confirm
  // wait for receive
  // get event from receiveBlock, the tokeId you issued is in the event

  // or , you can use the result.hash  in  https://buidl.viteview.xyz/ to get info manully
  console.log(result, result)
}

issueToken().then(() => console.log('ok')).catch((e) => console.log(e))


