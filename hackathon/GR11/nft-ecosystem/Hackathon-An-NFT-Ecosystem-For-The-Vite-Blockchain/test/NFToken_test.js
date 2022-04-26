const { WS_RPC } = require('@vite/vitejs-ws');
const { ViteAPI, wallet, utils, abi, accountBlock, keystore } = require('@vite/vitejs');
const { seed } = require('./secrets');
const { binary, off_chain, ABI } = require('./config');


// connect to node
//const connection = new WS_RPC('ws://localhost:23457'); // local debug node
const connection = new WS_RPC('wss://buidl.vite.net/gvite/ws'); // testnet node

const provider = new ViteAPI(connection, () => {
    console.log("client connected");
});
 
// derive account from seed phrase
const user1 = wallet.getWallet(seed).deriveAddress(0);
const user2 = wallet.getWallet(seed).deriveAddress(1);
const user3 = wallet.getWallet(seed).deriveAddress(2);


// fill in contract info
const CONTRACT = {
    binary: binary,
    abi: ABI,
    offChain: off_chain,
    address: 'vite_9202e199976861024fd2e13d9e2b6caa77b1f1fb5158b3be2f',
}


async function sendTx(account, address, amount) {
    const ab = accountBlock.createAccountBlock('send', {
        address: account.address,
        toAddress: address,
        amount
    }).setProvider(provider).setPrivateKey(account.privateKey);

    await ab.autoSetPreviousAccountBlock();
    const result = await ab.sign().send();
    console.log('send success', result);
}

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
  //  console.log('receive success', result);
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
  //  console.log('call success', result);
}

async function subscribeToEvent(address, eventName){
    const filterParameters = {"addressHeightRange":{[address]:{"fromHeight":"0","toHeight":"0"}}}; 
    const subscription = await provider.subscribe("createVmlogSubscription", filterParameters);
    subscription.callback = (res) => {
	const sig = abi.encodeLogSignature(CONTRACT.abi, eventName);
        if (sig === res[0]['vmlog']['topics'][0]) {
            const topics = [res[0]['vmlog']['topics'][1], res[0]['vmlog']['topics'][2], res[0]['vmlog']['topics'][3]];
	        const data = Buffer.from(res[0]['vmlog']['data'], 'base64').toString('hex');
	        const log = abi.decodeLog(CONTRACT.abi, data, topics, eventName);
	        console.log('event detected', log);
    	};
    };
    console.log('subscribe success', {eventName});
    return subscription;
}

async function callOffChain(methodName, params){
    
    const ehex = abi.encodeFunctionCall(CONTRACT.abi, params, methodName);
    const database64 = Buffer.from(ehex, 'hex').toString('base64');
    const code = Buffer.from(CONTRACT.offChain, 'hex').toString('base64');

    const res = await provider.request('contract_callOffChainMethod', {
        address: CONTRACT.address,
        code,
        data: database64
    }).then((result) => {
        return result;
    }).catch((err) => {
        console.warn(err);
    });

    const hexbuf = Buffer.from(res, 'base64').toString('hex');
    const outputabi = CONTRACT.abi.find(x=>x.name===methodName).outputs
    const out = abi.decodeParameters(outputabi, hexbuf);
    return out;
}

async function createToken(account, metadataURI) {
    return await callContract(account, 'createToken', CONTRACT.abi, [metadataURI])
}
async function transferToken(account, recipient, tokenId) {
    return await callContract(account, 'safeTransferFrom', CONTRACT.abi, [account.address, recipient.address, tokenId]);
}

async function approve(account, approved, tokenId) {
    return await callContract(account, 'approve', CONTRACT.abi, [approved.address, tokenId]);
}

async function getBalance(account) {
    return await callOffChain('getBalance', [account.address]);
}

async function getTokensOf(account) {
    return await callOffChain('getTokensOf', [account.address]);
}

async function getOwnerOf(tokenId) {
    return await callOffChain('getOwnerOf', [tokenId]);
}

async function isCallerApproved(account, tokenId) {
    return await callOffChain('isCallerApproved', [account.address,tokenId]);
}

async function setApprovalForAll(account, operator, approved) {
    return await callContract(account, 'setApprovalForAll', CONTRACT.abi, [operator.address, approved]);
}

async function main() {
    // await sendTx(user2, user3.address, '2000000000000000000000');
    // await receiveTransaction(user3);
  
    // set up logging on events
    await subscribeToEvent(CONTRACT.address, 'Transfer');
    await subscribeToEvent(CONTRACT.address, 'Approval');
    await subscribeToEvent(CONTRACT.address, 'ApprovalForAll');

    const balanceBeforeUser1 =  await getBalance(user1);
    const balanceBeforeUser2 =  await getBalance(user2);

    // User1 creates token
    await createToken(user1, "1234");
    await createToken(user1, "1234");
    await createToken(user1, "1234");

    // Check that balance of user1 has increased
    const balanceAfterUser1 =  await getBalance(user1);
    console.assert((parseInt(balanceAfterUser1)-parseInt(balanceBeforeUser1)) === 3);

    //  Get the tokens of User1
    let tokensOfUser1 = await getTokensOf(user1);
    const lastTokenId = parseInt(tokensOfUser1[0][tokensOfUser1.length-1]);
    console.log('lastTokenId', lastTokenId);
    // User1 transfers the last token to the User2
    await transferToken(user1, user2, lastTokenId);

    // Check that balance of user2 has increased and the balance of user1 has decreased
   
    const balanceAfterTransferUser1 =  await getBalance(user1);
    const balanceAfterTransferUser2 =  await getBalance(user2);
    console.assert((parseInt(balanceAfterTransferUser2)-parseInt(balanceBeforeUser2)) === 1);
    console.assert((parseInt(balanceAfterUser1)-parseInt(balanceAfterTransferUser1)) === 1);
    
    // User1 approves User2 to transfer his token 
    const tokenApproved = parseInt(tokensOfUser1[0][0]);
    
    await approve(user1, user2, tokenApproved);
    
    const isApproved = await isCallerApproved(user2, tokenApproved);
    console.assert(isApproved);
    //User 2 transfer approvedToken to User3
    await transferToken(user2, user3, tokenApproved);

     // Check the owner of the approvedToken
    const owner = await getOwnerOf(tokenApproved);
    console.assert(owner[0] === user3.address);


}

main().then(res => {}).catch(err => console.error(err));