	// Requires and DB login
	require('dotenv').config()
	const mysql = require('mysql2/promise');
	const fetch = require('node-fetch');
	const BigNumber = require('bignumber.js')
	let move_decimal = require('move-decimal-point')
	const {
	    abi, error, keystore, utils, constant,
	    accountBlock, ViteAPI, wallet
	} = require('@vite/vitejs');
	const { Vite_TokenId } = constant;
	const { getWallet } = wallet;
	const { createAccountBlock } = accountBlock;
	// must install http/ipc/ws packages separately if you need set up network connection
	const { HTTP_RPC } = require('@vite/vitejs-http');
	const { stringify } = require('querystring');

	let WS_service = new HTTP_RPC(process.env.NODE_URL);
	let provider = new ViteAPI(WS_service, () => {
	    console.log("Connected");
	});


	let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER , database: 'vitetokens', password: process.env.DB_PASS}).then((conn) => {
	    connection = conn;
	}); 

	function getRandomPoolNo(min, max) {
	  min = Math.ceil(min);
	  max = Math.floor(max);
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	async function getActualBal(amt, tokenid) {
	    let tokeninfo;
	    await provider.request(
		"contract_getTokenInfoById", 
		tokenid
	    ).then((contractAddress) => {
		tokeninfo = contractAddress
	    }).catch((err) => {
		tokeninfo = 'invalid'
		console.log(err)
	    });
	    let tokenbal = move_decimal(amt,-Math.abs(tokeninfo.decimals)); 
	    return tokenbal
	}


	async function getActualBalInfo(amt, tokenid) {
	    let tokeninfo;
	    await provider.request(
		"contract_getTokenInfoById", 
		tokenid
	    ).then((contractAddress) => {
		tokeninfo = contractAddress
	    }).catch((err) => {
		tokeninfo = 'invalid'
		console.log(err)
	    });
	    let tokenbal = move_decimal(amt,-Math.abs(tokeninfo.decimals)); 
	    return [tokenbal, tokeninfo.tokenSymbol, tokeninfo.tokenName];
	}


	async function sendPool(address1) {
	const [BinaryRow] = await connection.execute('SELECT COUNT(*) AS howmany FROM pools') // Check how many pools there are
	let howmany = BinaryRow[0].howmany; // save amount of pools to the letiable
	let hm = getRandomPoolNo(1,howmany); // select a random pool
	const [pooldata] = await connection.execute(`SELECT * FROM pools AS pooldata WHERE no=${hm}`); // get information about the random pool
	console.log('********');
	console.log('Pool Name:' + pooldata[0].name); // log the information
	console.log('Pool address:' + pooldata[0].address);
	console.log('Pool reward:' + pooldata[0].reward);
	console.log('Pool tokenID:' + pooldata[0].tokenid);
	console.log('********');
	let seed = pooldata[0].seed; // save the seed of the pool (mnemonic)
	let pooladdress = pooldata[0].address; // save address of the pool
	let reward = pooldata[0].reward // save the reward of the pool

	/* Now the code is going to check if the pool balance is over the REWARD + 1 amount*/

	let junk = await provider.getBalanceInfo(pooldata[0].address)
	if (junk.balance.balanceInfoMap === undefined || junk.balance.balanceInfoMap[`${pooldata[0].tokenid}`] === undefined) {
	    return await sendPool(address1)
	console.log(junk)
	console.log('undef')
	}
	let bal = junk.balance.balanceInfoMap[`${pooldata[0].tokenid}`].balance

	console.log(bal + 'ball')
	console.log(pooldata[0].reward + 'barewardlance')
	console.log(pooldata[0].reward > bal)
	if (parseInt(pooldata[0].reward) > parseInt(bal)) {
	    console.log("Pool balance below the required, looking for a better one.")
	   return await sendPool(address1);

	    
	} else {
	    const wallet1 = getWallet(pooldata[0].seed);
	    const { privateKey, address } = wallet1.deriveAddress(0);
	    const accountBlock1 = createAccountBlock('send', {
		address: address,
		toAddress: address1, 
		tokenId: `${pooldata[0].tokenid}`,
		amount: `${pooldata[0].reward}`    // 10 Vite (18 decimals)
	    }, provider, privateKey);
	    const sendAccountBlock = async () => {
		accountBlock1.setProvider(provider)
		accountBlock1.setPrivateKey(privateKey)
		await accountBlock1.autoSetPreviousAccountBlock();
		await accountBlock1.PoW();


		return accountBlock1.sign().send();
		
	    }
	    sendAccountBlock().then(() => {
		console.log('Send success');
	 // add error handling
	    }).catch((err) => {
		console.warn(err);
	// add error handling
	    });
	    console.log(`Sent ${reward} to ${address} from pool ${pooldata[0].name}`) // log the process
	    return pooldata[0].name;
	    }
	}


	async function getPoolData(name) {
	    let esc = escape(name);
	    console.log(name);
	    console.log(esc);
	    const [pooldata] = await connection.execute(`SELECT * FROM pools AS pooldata WHERE name="${esc}"`); // get information about the random pool
	    if (pooldata[0] === undefined) {
		return JSON.parse(`{"address": "null", "poolname": "null", "reward": "null", "desc": "null", "smalltext": "null", "img": "null", "tokenid": "null"}`)
	    }

	let rate = await getActualBalInfo(1, pooldata[0].tokenid)
	console.log(rate)
	let pooladdress = pooldata[0].address; // save address of the pool
	console.log(pooldata[0].reward)
	console.log(rate[0])
	let reward = new BigNumber(pooldata[0].reward).times(rate[0]).toFixed()// improvise
	let description = pooldata[0].description
	let smalltext = pooldata[0].information
	let img = pooldata[0].img
	let tokenid = pooldata[0].tokenid
	console.log(`{"address": "${pooladdress}", "poolname": "${name}", "reward": "${reward}", "desc": "${description}", "smalltext": "${smalltext}", "img": "no"}`)
	return JSON.parse(`{"address": "${pooladdress}", "poolname": "${name}", "reward": "${reward}", "desc": "${description}", "smalltext": "${smalltext}", "img": "${img}", "tokenid": "${tokenid}", "rate": "${rate[0]}", "tokensymbol" : "${rate[1]}", "tokenname": "${rate[2]}"}`)

	}
	module.exports = { // Export functions
	    sendPool: sendPool,
	    getPoolData: getPoolData,
	    getActualBal: getActualBal
	}
