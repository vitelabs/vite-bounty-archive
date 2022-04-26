// fork of https://github.com/weserickson/solpp-dapp-workshop/blob/master/src/vitescripts.js
import CONTRACT from './contracts';
import provider from '@vite/vitejs-ws';
import { ViteAPI, abi, accountBlock, constant } from '@vite/vitejs';
import Connector from '@vite/connector';
const { Vite_TokenId } = constant;

// const providerURL = 'wss://node-tokyo.vite.net/ws';
// const providerURL = 'wss://node.vite.net/gvite/ws';
// const providerURL = 'wss://buidl.vite.net/gvite/ws'; // Testnet
const providerURL = CONTRACT.network;

const providerTimeout = 60000;
const providerOptions = { retryTimes: 10, retryInterval: 5000 };
const WS_RPC = new provider(providerURL, providerTimeout, providerOptions);
const viteClient = new ViteAPI(WS_RPC, () => {
  // console.log('client connected');
});

type Block = {
  accountAddress: string;
  amount: string;
  blockType: number;
  data: string;
  fee: string;
  hash: string;
  height: string;
  prevHash: string;
  publicKey: string;
  signature: string;
  toAddress: string;
  tokenId: string;
};

export const getQuota = () => {
  WS_RPC.request('contract_getQuotaByAccount', [CONTRACT.address]).then((height: any) => {
    console.log(height);
  }).catch((err: any) => {
    console.warn(err);
  });
}

// TODO: Refractor, centralize state.
// TODO: Provide a live update for the balance
export const getBalance = (setBalance = (b: any) => { }) => {
  viteClient.getBalanceInfo(CONTRACT.address)
    .then(({ balance, unreceived }:any) => {
      setBalance(balance.balanceInfoMap[Vite_TokenId].balance / 10 ** 18);
    })
    .catch((err:any) => {
      console.warn(err);
      return "N/A";
    });
}

export const callContract = async (
  vbInstance: typeof Connector,
  methodName: string,
  params: any[] = [],
  amount: string = '10',
) => {
  let block = await accountBlock.createAccountBlock('callContract', {
    address: vbInstance.accounts[0],
    abi: CONTRACT.abi,
    toAddress: CONTRACT.address,
    params,
    methodName,
    amount: String(amount),
    tokenId: Vite_TokenId,
  });
  let myblock = block.accountBlock;
  return await sendVcTx(vbInstance, { block: myblock, abi: CONTRACT.abi });
};

function sendVcTx(vbInstance: typeof Connector, ...args: any) {
  return vbInstance
    .sendCustomRequest({ method: 'vite_signAndSendTx', params: args })
    .then((signedBlock: Block) => signedBlock);
}

// from https://github.com/weserickson/vite-staking-pools/blob/master/test.js
export const callOffChain = (vbInstance: typeof Connector, methodName: string, params?: any[]) => {
  const ehex = abi.encodeFunctionCall(CONTRACT.abi, params, methodName);
  const ebase64 = Buffer.from(ehex, 'hex').toString('base64');
  const code = Buffer.from(CONTRACT.offChain, 'hex').toString('base64');

  return vbInstance
    .request('contract_callOffChainMethod', {
      address: CONTRACT.address,
      code,
      data: ebase64,
    })
    .then((res: any) => {
      const hexbuf = Buffer.from(res, 'base64').toString('hex');
      const { outputs = [] } = CONTRACT.abi.find((x) => x.name === methodName) || {};
      return abi.decodeParameters(outputs, hexbuf);
    });
};