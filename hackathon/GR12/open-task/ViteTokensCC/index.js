	// Initial Server Config
	require('dotenv').config()
	const cors = require('cors')
	const expressip = require('express-ip');
	const BigNumber = require('bignumber.js')
	const express = require('express');

	const fetch = require('node-fetch')

	let app = express();

	app.listen(1256);

	app.use(cors());

	app.use(expressip().getIpInfoMiddleware);

	app.use(express.static("./public"));

	app.use(express.static("./public/views"));
	// End Of Inital Server Config


	// Vite.js / Crypto Config
	const {
	  abi, error, keystore, utils, constant,
	  accountBlock, ViteAPI, wallet
	} = require('@vite/vitejs');
	const { Vite_TokenId } = constant;
	const { getWallet } = wallet;
	const { createAccountBlock } = accountBlock;
	const { createWallet } = wallet;
	// must install http/ipc/ws packages separately if you need set up network connection
	const { HTTP_RPC } = require('@vite/vitejs-http');

	let WS_service = new HTTP_RPC(process.env.NODE_URL);
	let provider = new ViteAPI(WS_service, () => {
	  console.log("Connected");
	});

	const crypto = require('crypto');

	// File Operations Config
	const path = require('path');
	const fs = require('fs');
	let multer  = require('multer')
	let storage = multer.diskStorage({
	  destination: function (req, file, cb) {
	    cb(null, 'public/data/uploads')
	  },
	  filename: function (req, file, cb) {
	    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
	  }
	})
	let upload = multer({ storage: storage });


	// Import functions from other files.
	const {check} = require('./redeem.js');
	const {createPool1, verifyPool, getPendingData} = require('./pool_creation.js');
	const { getPoolData, getActualBal } = require('./pool_stuff.js');




	// function to encode file data to base64 encoded string
	function base64_encode(file) {
	    // read binary data
	    let bitmap = fs.readFileSync(file);
	    // convert binary data to base64 encoded string
	    return bitmap.toString('base64');
	}

	// Etc.
	      // Verify reCaptcha Function
	      async function verify(key) {
		let stuff = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${key}`, { method: 'POST'}).then(res => res.json());
		return stuff.success
	      }



	// API Calls.



	  
	      
	    // Main Redeem Function
	    app.get('/redeem', function (req, res) {
		(async () => {
		  let ipInfo = req.ipInfo;
		  let ipInfo2 = ipInfo.ip;
		  let verifyresponse = await verify(req.query.key)

		    if (verifyresponse === true) {
		      (async () => {
			console.log(req.query.addr);
			let isValid = parseInt(wallet.isValidAddress(req.query.addr));
			if (isValid === 0 || isValid === 2) { // validate the addr
			  let responseforhtml = JSON.parse(`{"code": "199", "poolname": "null"}`)
			  res.json(responseforhtml)
			} else {
			  let ipInfo = req.ipInfo;
			  let ipInfo2 = ipInfo.ip;
			  
			  let response = await check(ipInfo2, req.query.addr);
			  let responsecode = response[0]
	      
			  let poolname  = response[1]
	      
			  let responseforhtml = JSON.parse(`{"code": "${responsecode}", "poolname": "${poolname}"}`)
	console.log(responseforhtml);
			  if (responsecode === 69) {
			    console.log('Malcious IP detected');
			    res.json(responseforhtml);
			    console.log('------------------------------------');
			  } else if (responsecode === 420) {
			    res.json(responseforhtml);
			    console.log('------------------------------------');
			  } else if (responsecode === 8) {
			    res.json(responseforhtml);
			    console.log('------------------------------------');
			  } else if (responsecode === 5) {
			    res.json(responseforhtml);
			    console.log('------------------------------------');
			  } else if (responsecode === 10) {
			    res.json(responseforhtml);
			    console.log('------------------------------------');
			  } else if (responsecode === 20) {
			    res.json(responseforhtml);
			    console.log('------------------------------------');
			  }  else if (responsecode === 49) {
			    res.json(responseforhtml);
			    console.log('------------------------------------');
			  }
			}

		      })()
		      // which means we can continue

		    } else {
		      let responseforhtml = JSON.parse(`{"code": "10", "poolname": "null"}`)
		      res.json(responseforhtml);
		      console.log("Not completed captcha.")

		    }


		})();

	       })

		 


	       // Serve pool page
	      app.get('/pool/*', function (req, res) {
		res.sendFile(path.join(__dirname, './public', '/views/pool.html'));

	      })
	      // Serve pay page.
	      app.get('/pay/*', function (req, res) {
		res.sendFile(path.join(__dirname, './public', '/views/pay.html'));

	      })


	      // Get information about the pool.
	      app.get('/api/poolinfo', async function (req, res) {
		let poolname  = req.query.name;

		let pooldata = await getPoolData(req.query.name);
		let symbol = pooldata.tokensymbol
		console.log(pooldata.address)
		console.log(pooldata.poolname)
		console.log(pooldata.reward)
		console.log(pooldata.desc)
		console.log(pooldata.smalltext)
	 
		if (pooldata.address === 'null') {
	 let pooljson = JSON.parse(`{"address": "${pooldata.address}", "poolname": "${pooldata.poolname}", "reward": "${pooldata.reward}", "desc": "${pooldata.desc}", "smalltext": "${pooldata.smalltext}", "img": "${pooldata.img}", "balance": "null"}`)
		  res.json(pooljson);
	} else {


	  let rate = pooldata.rate
	  let junk = await provider.getBalanceInfo(pooldata.address)// balance
console.log(junk)
	  if (junk.balance.balanceInfoMap === undefined || junk.balance.balanceInfoMap[`${pooldata.tokenid}`] === undefined) {
	    let pooljson = JSON.parse(`{"address": "${pooldata.address}", "poolname": "${pooldata.poolname}", "reward": "${pooldata.reward}", "desc": "${pooldata.desc}", "smalltext": "${pooldata.smalltext}", "img": "${pooldata.img}", "balance": "0", "symbol": "${symbol}", "tokenname": "${pooldata.tokenname}", "tokenid": "${pooldata.tokenid}"}`)
	    res.json(pooljson);
	  } else {
	    let bal = junk.balance.balanceInfoMap[`${pooldata.tokenid}`].balance
	    let bal2 = new BigNumber(bal).times(rate).toFixed()
	  
	  
		    let pooljson = JSON.parse(`{"address": "${pooldata.address}", "poolname": "${pooldata.poolname}", "reward": "${pooldata.reward}", "desc": "${pooldata.desc}", "smalltext": "${pooldata.smalltext}", "img": "${pooldata.img}", "balance": "${bal2}", "symbol": "${symbol}", "tokenname": "${pooldata.tokenname}", "tokenid": "${pooldata.tokenid}"}`)
		    res.json(pooljson);
	  
	  
	  }

	      }

	      })


	      // Creating pool step 1 API
	      app.post('/api/makepool', upload.single('uploaded_file'), async function (req, res) { // validate hcaptcha
	    // req.body will hold the text fields, if there were any 
	   let image;


		let data = await verify(req.query.key, 'none');

		if (data === true) {
		  /* getting the base64 right here
		    should end in a small bit */
		    if (req.file === undefined) {
		image = ' data:image/png;base64,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' 
		    } else { // okay the string above is long
	image = 'data:image/png;base64,' + base64_encode(req.file.path)
			fs.unlink(req.file.path, (err) => { // delete the image, we're storing base64
			    if (err) {
				console.error(err + 'whatever');
				return;
			    }
			    console.log('removed image from the server storage')
			    //file removed
			})
	}
		    



		  let name = req.query.name;
		let reward = req.query.reward;
		let desc = req.query.desc;
		let information = req.query.information;
		let tokenid = req.query.tokenid;
		(async () => {
		  const myWallet = wallet.createWallet();
		  const mnemonics = myWallet.mnemonics
		  const addyOBJ = myWallet.deriveAddress(0)
		  const account = addyOBJ.address
		  const myWallet1 = wallet.createWallet();
		  const mnemonics1 = myWallet1.mnemonics
		  const addyOBJ1 = myWallet1.deriveAddress(0)
		  const account1 = addyOBJ1.address
		  if (name.length < 3 || desc < 10) { // check string length

		    // bad string length
		    let responser = JSON.parse(`{
		      "deposit": "null",
		      "txid": "null",
		      "code": "20" 
		    }`)
		    res.json(responser);
		  } else {
		    // correct, continue
		    if (utils.isValidTokenId(tokenid) === true) {
		      let resp = await createPool1(name, reward, desc, information, account, mnemonics, account1, mnemonics1, image, tokenid)
		      let responser = JSON.parse(`{
			"deposit": "${resp[0]}",
			"txid": "${resp[1]}",
			"code": "${resp[2]}" 
		      }`)
		      res.json(responser);
		    } else {
		      let responser = JSON.parse(`{
			"deposit": "000",
			"txid": "000",
			"code": "456" 
		      }`)
		      res.json(responser);
		    }


		  }

		})()
		} else {
		  // captcha incorrect
		  let responser = JSON.parse(`{
		    "deposit": "null",
		    "txid": "null",
		    "code": "10" 
		  }`)
		  res.json(responser);
	    }

	      


	      })
	      app.get('/api/verifypool', function (req, res) {
		(async () => {
		  let resp = await verifyPool(req.query.name)
		  if (resp === 0) {
		    let responseforverify = JSON.parse(`{
		      "address": "null",
		      "seed": "null",
		      "secret": "null"
		    }`)
		    res.json(responseforverify);
		  } else {
		    console.log(resp)
		    let responseforverify = JSON.parse(`{
		      "address": "${resp[0]}",
		      "seed": "${resp[1]}",
		      "secret": "${resp[2]}",
		      "name": "${resp[3]}"
		    }`)
		    res.json(responseforverify);
		  }
		})()
		
	      })
	      
	      // experiments

	      app.get('/api/chk', async function (req, res) {
		
		let pn = req.query.txid
		let pendingdata = await getPendingData(pn)
		let resp = JSON.parse(`
		{
		  "code" : "${pendingdata[0]}",
		  "name" : "${pendingdata[1]}",
		  "depaddr" : "${pendingdata[2]}"
		}
		`)
		res.json(resp);
	      })
	     





	      // experiments -------------------------






	      
