import {
  ViteAPI,
  constant,
  abi as abiUtil,
  accountBlock, wallet
} from '@vite/vitejs';

import * as dotenv from "dotenv"
import * as fs from "fs"
import { Contrat, ViteClient, waitFor } from './utils';
import HTTP_RPC from "@vite/vitejs-http"

dotenv.config()

function defaultAccount() {
  const mnemonics = process.env.MNEMONICS
  const myWallet = wallet.getWallet(mnemonics);
  const { originalAddress, publicKey, privateKey, address } = wallet.deriveAddress({ mnemonics, index: 0 })
  console.log("privateKey", privateKey)
  console.log("address", address)
  return { address, privateKey }
}


function prepareDeployBlock(deployer: string) {
  const code = fs.readFileSync("./resources/space-binary").toString("hex")
  const params = ["Space 1", constant.Vite_TokenId, "200", "21600"]
  // constructor abi
  const abi = {
    "inputs":
      [
        { "internalType": "string", "name": "name_", "type": "string" },
        { "internalType": "tokenId", "name": "tokenId_", "type": "tokenId" },
        { "internalType": "uint256", "name": "quorumVotes_", "type": "uint256" },
        { "internalType": "uint256", "name": "votingPeriod_", "type": "uint256" },
      ],
    "stateMutability": "nonpayable", "type": "constructor"
  }

  return accountBlock.createAccountBlock("createContract", {
    address: deployer,
    abi,
    code,
    responseLatency: 1,
    randomDegree: 1,
    params,
  })

}


async function deploy() {
  const client = new ViteClient("https://buidl.vite.net/gvite")

  const { address, privateKey } = defaultAccount()

  const block = prepareDeployBlock(address)
  block.setProvider(client.provider).setPrivateKey(privateKey)

  const result = await block.autoSend()
  // console.log("result", result)

  // wait for confirm & receiving
  await waitFor(() => {
    return client.isConfirmed(result.hash);
  }, "Wait for confirming deploy request", 1000);

  await waitFor(() => {
    return client.isReceived(result.hash);
  }, "Wait for receiving deploy request", 1000);



  const sendBlock = await client.getAccountBlock(result.hash);
  // console.log("sendBlock", sendBlock)
  const receiveBlock = await client.getAccountBlock(sendBlock.receiveBlockHash);
  // console.log("receiveBlock", receiveBlock)
  if (receiveBlock?.blockType !== 4) {
    throw new Error("Contract deploy failed:" + this.abi.name);
  }
  console.log("Contract deployed to ", result.toAddress)
}

async function query() {
  const client = new ViteClient("https://buidl.vite.net/gvite")
  const abi = JSON.parse(fs.readFileSync("./resources/space-abi.json").toString())

  const contractAddress = "vite_ea2fa3d19e280174f674b945621670aec1f596a568a946e510"
  const meth = 'getProposal'
  const params = ["1"]

  const space = new Contrat(contractAddress, abi, client.provider)
  const result = await space.query(meth, params)
  console.log(result)


  // const result = await client.contractQuery(contractAddress, data)
  // console.log(result)
}



// deploy().catch((e) => console.log(e))
query().catch((e) => console.log(e))