import provider from '@vite/vitejs-ws'
import { ViteAPI,  abi, accountBlock } from '@vite/vitejs';
import IPFSService from './IPFSService';
import Connector from '@vite/connector';
const { binary, off_chain, ABI, addr } = require('./config');
const providerURL = 'wss://buidl.vite.net/gvite/ws';
const providerTimeout = 60000;
const providerOptions = { retryTimes: 10, retryInterval: 5000 };
const WS_RPC = new provider(providerURL, providerTimeout, providerOptions);
const viteClient = new ViteAPI(WS_RPC, () => {
    console.log("client connected");
});

const BRIDGE = 'wss://biforst.vite.net'
let vbInstance = null;
let connected = false;

const initConnector = (QRData, connectUser, disconnect) => {
    console.log('connected', connected);
    vbInstance = new Connector({ bridge: BRIDGE })
    setTimeout(10000)
    console.log(vbInstance);
    vbInstance.createSession().then(() => {
        console.log('connect uri', vbInstance.uri);
        console.log(vbInstance.uri.length);
        QRData(vbInstance.uri);
    });

    vbInstance.on('connect', (err, payload) => {
        const { accounts } = payload.params[0];
        if (!accounts || !accounts[0]) throw new Error('address is null');

        const address = accounts[0];
        console.log('user address', address);
        connectUser(address)
        connected = true;
    })

    vbInstance.on('disconnect', err => {
        if(connected) {
            console.log(err)
            vbInstance.destroy();
            disconnect()
            console.log('called init connector');
            connected = false;
        }
       

    })
}


const CONTRACT = {
    binary: binary,
    abi: ABI,
    offChain: off_chain,
    address: addr
}

async function sendVcTx(...args) {    
    console.log(args)
    console.log('vbInstance', vbInstance);
    vbInstance.sendCustomRequest({method: 'vite_signAndSendTx', params: args}
    ).then(signedBlock => console.log(signedBlock), err => console.error(err))
    .catch( (err) => {console.warn(err); throw(err)});
}

async function callContract(account, methodName, params, amount) {
    console.log(params);
    const block = accountBlock.createAccountBlock('callContract', {
        address: account,
        abi: CONTRACT.abi,
        methodName,
        amount,
        toAddress: CONTRACT.address,
        params
    })

    let myblock = block.accountBlock
    console.log("SENDING BLOCK:", myblock)
    await sendVcTx({block: myblock, abi: CONTRACT.abi})
}

async function callOffChain(methodName, params){
    const ehex = abi.encodeFunctionCall(CONTRACT.abi, params, methodName);
    const database64 = Buffer.from(ehex, 'hex').toString('base64');
    const code = Buffer.from(CONTRACT.offChain, 'hex').toString('base64');
    const res = await viteClient.request('contract_callOffChainMethod', {
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

async function getMetaData (id) {
    const result = await callOffChain('getTokenURI', [id]);
    console.log(result);
    const getData = await IPFSService.getData(result);
    getData.id = id;
    return getData;
  }

async function subscribeToEvent(address, eventName, detected){
    const filterParameters = {"addressHeightRange":{[address]:{"fromHeight":"0","toHeight":"0"}}}; 
    const subscription = await viteClient.subscribe("createVmlogSubscription", filterParameters);
    subscription.callback = (res) => {
    const sig = abi.encodeLogSignature(CONTRACT.abi, eventName);
        if (sig === res[0]['vmlog']['topics'][0]) {
            const topics = [res[0]['vmlog']['topics'][1], res[0]['vmlog']['topics'][2], res[0]['vmlog']['topics'][3]];
            const data = Buffer.from(res[0]['vmlog']['data'], 'base64').toString('hex');
            const log = abi.decodeLog(CONTRACT.abi, data, topics, eventName);
            console.log('event detected', log);
            detected(log);
        }
    };
    return subscription;
}


export default class TokenService {

    static connectToBridge(QRData, connectUser, disconnect) {
        initConnector(QRData, connectUser, disconnect);
    }

    static async createToken(metadata, account, eventDetected) {
        console.log(metadata);
        await subscribeToEvent(CONTRACT.address, 'Transfer', eventDetected);
        return await callContract(account,'mint', [metadata])
    }


    static async getAllTokens() {
        const result = await callOffChain('getAllTokens', []);
        let tokens = [];
        for (let i = 0; i < result[0].length; i++) {
            let tokenMetadata = await getMetaData(result[0][i]);
            tokens.push(tokenMetadata)
        }
        return tokens;   
    }

    static async getTokensOf(user) {
        console.log(user);
        const result = await callOffChain('getTokensOf', [user]);
        let tokens = [];
        for (let i = 0; i < result[0].length; i++) {
          let tokenMetadata = await getMetaData(result[0][i]);
          tokens.push(tokenMetadata)
        }
        console.log(tokens);
       return tokens;   
    }

    static async transferToken(from, to, tokenId, eventDetected) {
        await subscribeToEvent(CONTRACT.address, 'Transfer', eventDetected);
        const owner = await callOffChain('getOwnerOf', [tokenId]);
        return await callContract(from, 'transferFrom', [owner[0], to, tokenId]);
    }

    static async  approveToken(from, to, tokenId, eventDetected) {
        await subscribeToEvent(CONTRACT.address, 'Approval', eventDetected);
        return await callContract(from, 'approve',  [to, tokenId]);
    }

    static async  getApprovedTokens(user) {
        const result = await callOffChain('getAllTokens', []);
        let approvedTokens = [];
        for (let i = 0; i < result[0].length; i++) {
            const isApproved = await callOffChain('isCallerApproved', [user, result[0][i]]);
            if(isApproved[0] === "1") {
                let tokenMetadata = await getMetaData(result[0][i]);
                approvedTokens.push(tokenMetadata)
            }
        }
        return approvedTokens;
    }

    static async  getOwner(tokenId) {

        const owner = await callOffChain('getOwnerOf', [tokenId]);        
        return owner[0];
    }

    static async  isOwner(user, tokenId) {
        console.log('IS_OWNER');
        const owner = await callOffChain('getOwnerOf', [tokenId]);
        return owner[0] ===  user;
    }

    static async  getApprovedAddress(tokenId) {

        const approved = await callOffChain('getApprovedAddress', [tokenId]);
        if(approved[0] === "vite_0000000000000000000000000000000000000000a4f3a0cb58") {
            return  '';
        }
        return approved[0];
    }

    static async burnToken(account, tokenId, eventDetected) {
        console.log(account);
        await subscribeToEvent(CONTRACT.address, 'Transfer', eventDetected);
        return await callContract(account, 'burn',  [tokenId]);
    }
    
}
