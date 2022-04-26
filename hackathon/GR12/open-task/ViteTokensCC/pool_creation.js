	// Requires
	// Well obvioully it's simple math but hey
	const move_decimal = require('move-decimal-point');

	require('dotenv').config()

	const mysql = require('mysql2/promise');
	const {
	    abi, error, keystore, constant,
	    accountBlock, ViteAPI, wallet
	  } = require('@vite/vitejs');
	  const { Vite_TokenId } = constant;
	  const { getWallet } = wallet;
	  const { createAccountBlock } = accountBlock;
	  const { createWallet,  utils } = wallet;
	  // must install http/ipc/ws packages separately if you need set up network connection
	  const { HTTP_RPC } = require('@vite/vitejs-http');
	  
	  let WS_service = new HTTP_RPC(process.env.NODE_URL);
	  let provider = new ViteAPI(WS_service, () => {
	    console.log("Connected");
	  });
	  const { ReceiveAccountBlockTask } = accountBlock;
	  async function sendAccountBlock(accountBlock, pk) {
	    accountBlock.setProvider(provider).setPrivateKey(pk);
	    await accountBlock.autoSetPreviousAccountBlock();
	    await accountBlock.PoW().catch((err) => {
		console.log(err) // ignore the error
	    })
	    const result = await accountBlock.sign().send();
	    console.log('send success', result);
	}

	async function sendAccountBlock2(accountBlock1, pk) {
	    accountBlock1.setProvider(provider).setPrivateKey(pk);
	    await accountBlock1.autoSetPreviousAccountBlock();
	    await accountBlock1.PoW()
	    const result = await accountBlock1.sign().send();
	    console.log('send success', result);
	}
	let randomstring = require("randomstring"); // some thing

	    
	let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER , database: 'vitetokens', password: process.env.DB_PASS}).then((conn) => {
	    connection = conn;
	}); 


	// Create Pool step 1.
	async function createPool1(name1, reward1, desc1, information1, account1, seed1, depaddr1, depseed1, image, tokenid) {
	    // Why not annoy the user with waiting and check the token id here?
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
	console.log(tokeninfo);
	    let tokenreward = move_decimal(reward1,tokeninfo.decimals); 
	    let [rows, fields] = await connection.execute(`SELECT * FROM pools WHERE name="${name1}"`)
	    console.log(rows);
	    if (name1.match(/^\d/) || desc1.match(/^\d/) || information1.match(/^\d/)) {
		return [null, null, 63];
	    }
	    if (rows.length === 0) { // check if the name is taken or not
		var desc1esc = escape(desc1);
		var information1esc = escape(information1);
		var name1esc = escape(name1);
		var name2esc = name1esc.replace(/\%20/g, ' ');
		var imageesc = image.replace(/\n/g, '')
		var txid = randomstring.generate({
		    charset: '1234567890',
		    length: 5
		  })
		  if (isNaN(reward1)) {
		      return [null, null, 69]
		  } else if (reward1 < 0.01 && tokeninfo.maxSupply < tokenreward) {
		    return [null, null, 83]
		  } else  {
		    await connection.execute(`INSERT INTO pending (address, reward, description, information, seed, name, depseed, depaddr, txid, image, tokenid) VALUES ("${account1}", "${tokenreward}", "${desc1esc}", "${information1esc}", "${seed1}", "${name2esc}", "${depseed1}", "${depaddr1}", "${txid}", "${imageesc}", "${tokenid}");`)
		    return [depaddr1, txid, 1];
		  }
	    } else {
		return [null, null, 99]
	    }

	   
	   
	}

	async function getPendingData(txid) {
	    let [rows, fields] = await connection.execute(`SELECT * FROM pending WHERE txid="${txid}"`)
	    // rows = all the data and stuff
	    console.log(rows[0])
	    if (rows[0] === undefined) {
		return [0, null, null]
		// return (code, name, depo addr)
	    } else {
		
		return [1, rows[0].name, rows[0].depaddr]

	    }
	}

	// Verify the 1 VITE payment.
	async function verifyPool(txid) {
	    let unreceived;
	    console.log(txid, 'txid')
	    const [rows, fields] = await connection.execute(`SELECT * FROM pending WHERE txid="${txid}"`)
	    if (rows[0] === undefined) {
		return 0;
	    } else {
		let unreceived;
		console.log(1)
		let wallet1 = getWallet(rows[0].depseed)
		console.log(2)
		let { privateKey, address } = wallet1.deriveAddress(0); 
		console.log(3)
	   
		    if (rows[0].depaddr === undefined) {
			console.log(console.error() + 'error depaddr undefined')
			return 99
		    }
		    await provider.request(
			"ledger_getUnreceivedBlocksByAddress", 
			rows[0].depaddr, 
			0, 
			1
		    ).then((contractAddress) => {
			unreceived = contractAddress
		    }).catch((err) => {
			console.warn(err);
			return 0;
		    });
		    if (unreceived[0] != undefined) {
			const accountBlock12 = createAccountBlock('receive', {
			    address: rows[0].depaddr,
			    sendBlockHash: unreceived[0].hash
			});
			console.log('its not undefined receiving')
			await sendAccountBlock(accountBlock12, privateKey)
		    }


		    let amount;
		     await provider.getBalanceInfo(rows[0].depaddr)
		    .then(({ balance, unreceived }) => {
			amount = balance;
		    })
		    .catch(err => {
			return 0;
		    });
		    console.log('after balance ifno')
		    if (amount.balanceInfoMap === undefined) {
			console.log(console.error() + 'most likely this')
			return 0
		    }
		    console.log(amount)
		    let vitebalraw = amount.balanceInfoMap.tti_5649544520544f4b454e6e40.balance
		    let vitebalance = parseFloat(amount.balanceInfoMap.tti_5649544520544f4b454e6e40.balance) / 1000000000000000000

		    if (vitebalance > 0.99) { // !!!!!!!!!!!!!!!!!!!!!!!! 0.99
			let wallet1 = getWallet(rows[0].depseed)

			console.log(2)
			let { privateKey, address } = wallet1.deriveAddress(0); 
			console.log("PAID");
			await connection.execute(`DELETE FROM pending WHERE txid="${txid}"`);
			// if 100
			console.log('before createaccoutnblock')
			const accountBlock2 = createAccountBlock('send', {
			    address: address,
			    toAddress: 'vite_23c6be45392335da7f6dc1f02795e6a1c841f8727d7ae914fb', 
			    tokenId: Vite_TokenId,
			    amount: vitebalraw    // 10 Vite (18 decimals)
			}, provider, privateKey)
			await setTimeout( async function() {
			    await sendAccountBlock2(accountBlock2, privateKey).catch((err) => {
				console.log(err) // ignore
			    })
			}, 10000);
		       

			const [BinaryRow] = await connection.execute('SELECT COUNT(*) AS howmany FROM pools')

			var hm = BinaryRow[0].howmany
			var setto = hm + 1;

			//  remove the pool from pending


			var secret = randomstring.generate(20) // generate the secret string


			await connection.execute(`INSERT INTO pools (address, reward, description, information, seed, name, no, secret , img, tokenid) VALUES ('${rows[0].address}', '${rows[0].reward}', '${rows[0].description}', '${rows[0].information}', '${rows[0].seed}', '${escape(rows[0].name)}', '${setto}', '${secret}' , "${rows[0].image}", "${rows[0].tokenid}")`)
			console.log(rows[0].secret)

			return [rows[0].address, rows[0].seed, secret, rows[0].name]; // return stuff

		    } else {
			// no luck today m8 you didn't pay
			return 0;
		    }

		// add the check for if depaddr exists :)


	    }

	}


	module.exports = {
	    createPool1: createPool1,
	    verifyPool: verifyPool,
	    getPendingData: getPendingData
	}
