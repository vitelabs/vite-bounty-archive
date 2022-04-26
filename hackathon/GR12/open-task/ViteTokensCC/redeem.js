
	const mysql = require('mysql2/promise');
	require('dotenv').config()

	const fetch = require('node-fetch');

	var dateTime = require('get-date');

	const {sendPool} = require('./pool_stuff.js');
	let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER , database: 'vitetokens', password: process.env.DB_PASS}).then((conn) => {
	connection = conn;
	}); 

	async function DoesIPExist(ip) {
	console.log(ip + 'doesip existip');
	    let [rows, fields] = await connection.execute(`SELECT * FROM faucet WHERE ip = '${ip}'`);
	console.log(rows.length)
	console.log(rows + 'from ip');
	    if (rows.length > 0) {
		console.log('ip is there')
		return true;

	    } else {
	console.log('ip doesnt exist')
		return false;
		console.log('exsts')
	    }
	}

	async function doesAddyExist(addy) {
	    let [rows, fields] = await connection.execute(`SELECT * FROM faucet WHERE address = '${addy}'`);
	    if (rows.length < 1 ) {

	console.log('addy doesnt exist')
		return false;

	    } else {
		return true;
	    }
	}
	// Yes, I know I can use 1 function, but why have one why you can have two? have a good time reading Vite Judges!, Yes, I use NotEquals because I feel like doing so :).


	async function dateIsTheSameAddy(addy) {
	    let l;
	    let [rows, fields] = await connection.execute(`SELECT * FROM faucet WHERE address = '${addy}'`);
	    rows.forEach(element => {
		console.log(element)

	       if (element.date1 === dateTime()) {
		console.log('equals')   
		l = true;   
		return true;
	       } else {
		console.log('doesnt equal')
	       } 
	    });
	    if (l != true) {
		return false
	    } else {
		return true;
	    }
	}
	async function dateIsTheSameIP(ip) {
	    let [rows, fields] = await connection.execute(`SELECT * FROM faucet WHERE ip = '${ip}'`);
	console.log('----')
	console.log(rows[0].date1 + 'logged date')
	console.log(dateTime() + 'current tine')
	console.log('----');    
	let l;

	rows.forEach(element => {
	    console.log(element)

	   if (element.date1 === dateTime()) {
	    console.log('equals')   
	    l = true;   
	    return true;
	   } else {
	    console.log('doesnt equal')
	   } 
	});
	if (l != true) {
	    return false
	} else {
	    return true;
	}
	}

	async function dateNotEqualsB(ip) {
	    let [rows, fields] = await connection.execute(`SELECT * FROM faucet WHERE ip = '${ip}'`);
	    if (rows.date1 != dateTime()) { // Date is the same, False;
		return true;
	console.log('date not equals b')
	    } else {
		return false;
	    }
	}


	async function areViteDocsGood() {
	    return false; // sorry, but it's true
	}

	async function check(ip, address) {

	    console.log('Starting a new claim.')
	    var ipclear = ip.replace(/f/g, '')
	    var ipclear2 = ipclear.replace(/@/g, '')
	    var iphashed = ipclear2;
		console.log(ipclear2)
	    var headers1 = new fetch.Headers({
		'Authorization': 'Bearer ' + process.env.WHOIS_KEY,	
		    'Accept': 'application/json'
	    });
	    var ipcheck = await fetch(`https://whois.as207111.net/api/lookup?ip_address=${ip}`, {
		headers: headers1
	    }).then(res => res.json())
	if (ipcheck.message === 'The given data was invalid.' || ipcheck.message === 'private range') {
	    return [20, ipcheck.message]
	}


	    console.log(ipcheck.privacy);
	    var block = ipcheck.privacy.proxy
	    var block2 = ipcheck.privacy.hosting
	    if (ipcheck.errors === undefined) {
		if (block === true || block2 === true || ipcheck.asn.asn === 7552 || ipcheck.city === 'Hanoi' || ipcheck.country === 'TR' || ipcheck.asn.asn  === 7738 ||  ipcheck.asn.isp === "Idea Cellular Limited" || ipcheck.asn.asn ===  23693 || ipcheck.country === 'ID') {// Personal ban list (due to abuse)
		    console.log(`Locked connection from ${ipcheck.country} ISP: ${ipcheck.asn.isp}, abuse lock.`)
		    return [69, null];
		}
	    else {
		console.log('Passed VPN check, continuing.')

	    
		if (false) { // personal VITE addy ban list here
		    return [69, null];
		    console.log()
		} else {
		    // Not VPN, go ahead and do checks
		    if (await DoesIPExist(ip)) {
	console.log('ip exists')             
	   // ip exists
			if (await dateIsTheSameIP(ip)) {
			    console.log('claimed returning 5');
			    let responseforindex = [5, null]
			    console.log('Date check failed, aborting claim.')
			    return responseforindex; // 5 Already claimed for today
			} else {
			    // okay, let it claim
			    console.log('Fetching data from SQL and sending money from a random pool')
			    await connection.execute(`INSERT INTO faucet (ip, date1, address) VALUES ('${ip}', '${dateTime()}', '${address}')`)
			    var poolresponse = await sendPool(address);
			    var responseforindex  = [420, poolresponse]
			    console.log('Letting claim')
			    return responseforindex; // New ip, making record and claiming
			}
		    }
		     else {
			// ip does not exist
	console.log('no ip')
			if (await doesAddyExist(address)) {
			    // addy exists
	console.log('addy exists')
			    if (await dateIsTheSameAddy(address)) {
				console.log('claimed returning 5');
				let responseforindex = [5, null]
				console.log('Date check failed, aborting claim.')
				return responseforindex; // 5 Already claimed for today
			    } else {
				console.log('Fetching data from SQL and sending money from a random pool')
				await connection.execute(`INSERT INTO faucet (ip, date1, address) VALUES ('${ip}', '${dateTime()}', '${address}')`)
				var poolresponse = await sendPool(address);
				var responseforindex  = [420, poolresponse]
				console.log('Letting claim')
				return responseforindex; // New ip, making record and claiming
			    }
			} else {
			    console.log('Fetching data from SQL and sending money from a random pool')
			    await connection.execute(`INSERT INTO faucet (ip, date1, address) VALUES ('${ip}', '${dateTime()}', '${address}')`)
			    var poolresponse = await sendPool(address);
			    var responseforindex  = [420, poolresponse]
			    console.log('Letting brand new claim')
			    return responseforindex; // New ip, making record and claiming
			}
		    }
		}
	    }
	}
	}


	  
	  

	  
	  
	  
	module.exports =  {
	    check: check,
	}
	// 

	// 

	/*


		    if (await DoesIPExist(ip)) { // Doing a check if the IP exists
					   // IP Exists
			if (dateIsTheSame(ip)) {
			    // date is the same, abort

			} else {
			    // date is not the same, continue
			}
			if (await doesAddyExist(address)) {
			    // addy exists

			    // Yes, I accquire the knowledge, that I can make a function out of it but suprise! I'm not going to.
			 


			    return responseforindex; // New ip, making record and claiming
			} else {
			    // IP Already exists
			    if (await dateNotEqualsA(address)) {






			    } else {
				// time is different but the addy is here
				// Found address, and the date is different, let the claim begin!


				console.log(dateTime()); // current date

				console.log(dateTime(true)); // current date
	       
				

			    }
			}
			// didn't found ip, register new line

			
			
		    } else {
			// ip not here do addy lookup
			if (await doesAddyExist(address)) {
			    // addy exists check date 
			} else {
			    console.log('Fetching data from SQL and sending money from a random pool')

			    await connection.execute(`INSERT INTO faucet (ip, date1, address) VALUES ('${iphashed}', '${dateTime()}', '${address}')`)

			    var poolresponse = await sendPool(address);

			    var responseforindex  = [420, poolresponse]
			    
			    console.log('New ip address claming! Making a new SQL record')
			}

			console.log('Found IP in the records, checking the date');
			if (await dateNotEqualsB(ip)) {
			    // distribute


			  await connection.execute(`UPDATE faucet SET date1 = '${dateTime()}' WHERE ip = '${iphashed}'`)
			  await connection.execute(`UPDATE faucet SET address = '${address}' WHERE ip = '${iphashed}'`)
			  var poolresponse = await sendPool(address)
			  var responseforindex  = [8, poolresponse]
			  console.log('Date check passed updating records and claiming.')
			  return responseforindex; // Claiming, updating the date
			  

			} else {
			    // User Claimed
			    var responseforindex = [5, null]
			    console.log('Date check failed, aborting claim. Returning 5')
			    return responseforindex; // 5 Already claimed for today
			    
			}
		
		    }
		}
	    }
	   
		  ;
		  
	    }

	}
	*/
