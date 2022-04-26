const { WS_RPC } = require('@vite/vitejs-ws');
const { ViteAPI, wallet, utils, abi, accountBlock, keystore } =require('@vite/vitejs');

// test account
const seed = " "
// connect to node
const connection = new WS_RPC('ws://localhost:23457');
const provider = new ViteAPI(connection, () => {
    console.log("client connected");
});
 
// derive account from seed phrase
const myAccount = wallet.getWallet(seed).deriveAddress(0);
const recipientAccount = wallet.getWallet(seed).deriveAddress(1);

// fill in contract info
const CONTRACT = {
    binary: '',   // binary code
    abi: []
    offChain: '',  // binary offchain code
    address: '',   // contract address
}

CONTRACT.address = '';

async function receiveTransaction(account) {
    // get the first unreceived tx
    const data = await provider.request('ledger_getUnreceivedBlocksByAddress', account.address, 0, 1);
    if (!data || !data.length) {
        console.log('[LOG] No Unreceived Blocks');
        return;
    }
    // create a receive tx
    const ab = accountBlock.createAccountBlock('receive', {
        address: account.address,
        sendBlockHash: data[0].hash
    }).setProvider(provider).setPrivateKey(account.privateKey);

    await ab.autoSetPreviousAccountBlock();
    const result = await ab.sign().send();
    console.log('receive success', result);
}

async function sendTx(account, address ,amount) {
    const ab = accountBlock.createAccountBlock('send', {
        address: account.address,
        toAddress: address,
        amount
    }).setProvider(provider).setPrivateKey(account.privateKey);

    await ab.autoSetPreviousAccountBlock();
    const result = await ab.sign().send();
    console.log('send success', result);
}

async function callContract(account, methodName, abi, params, amount) {
    const block = accountBlock.createAccountBlock('callContract', {
        address: account.address,
        abi,
        methodName,
        amount,
        toAddress: CONTRACT.address,
        params
    }).setProvider(provider).setPrivateKey(account.privateKey);

    await block.autoSetPreviousAccountBlock();
    const result = await block.sign().send();
    console.log('call success', result);
}

async function main() {
    // call the contract we deployed and send over 150 VITE
    await callContract(myAccount, 'sayHello', CONTRACT.abi, [recipientAccount.address], '150000000000000000000');
    // send 10 VITE 
    await sendTx(myAccount, recipientAccount.address, '10000000000000000000');
    // recipient receives the tx
    await receiveTransaction(recipientAccount);
}

main().then(res => {}).catch(err => console.error(err));
