// Encoding and big numbers
import { encode } from 'https://unpkg.com/js-base64';
import Big from 'https://unpkg.com/big.js';

// Vite related imports
import { ViteAPI } from 'https://unpkg.com/@vite/vitejs';
import { WS_RPC } from 'https://unpkg.com/@vite/vitejs-ws';
import HTTP_RPC from 'https://unpkg.com/@vite/vitejs-http';

// Encryption functions from crypto-js-aes-json.js
import { cryptoJsAesEncrypt, cryptoJsAesDecrypt } from './crypto-js-aes-json/crypto-js-aes-json.js'

// window.vpfw_async_js_data
// array(  'txAmountUSD' => $this->get_order_total(),
//         'tokenDefault' => $this->token_default,
//         'addressDefault' => $this->address_default,
//         'nodeURL' => $this->node_url,
//         'httpURL' => $this->http_url,
//         'allowMultipleTokens' => true,
//         'shouldDisplayMemo' => true,
//         'defaultMemo' => $this->default_memo,
//         'paymentTimeout' => $this->paymentTimeout,
//         'qrCodeSize' => $this->qrCodeSize  ));

let currentTx;
let tokenList = [];
let currTimeLeft = window.vpfw_async_js_data['paymentTimeout'];
let currTokenID = window.vpfw_async_js_data['tokenDefault'];
let currTotal = usdTotal = window.vpfw_async_js_data['txAmountUSD'];
let defaultMemo = window.vpfw_async_js_data['defaultMemo'];
let wssURL = window.vpfw_async_js_data['nodeURL'];
let httpURL = window.vpfw_async_js_data['httpURL'];
let addressDefault = addressDefault;

/**
 *
 *
 * @return response
 */
async function createNewBlockSubByAddr()
{
    let wssRPC = new WS_RPC(wssURL);
    let wsProvider = new ViteAPI(wssRPC, () =>
    {
        return;
    });

    return await wsProvider.subscribe("createUnreceivedBlockSubscriptionByAddress", addressDefault);
}


/**
 *
 *
 * @return response
 */
async function getHashInfo(hash)
{
    let httpRPC = new HTTP_RPC(httpURL);
    let httpProvider = new ViteAPI(httpRPC, () =>
    {
        return;
    });

    return await httpProvider.request("ledger_getAccountBlockByHash", hash);
}


/**
 *
 *
 * @return response
 */
async function getTokenList()
{
    let httpRPC = new HTTP_RPC(httpURL);
    let httpProvider = new ViteAPI(httpRPC, () =>
    {
        return;
    });

    return await httpProvider.request('contract_getTokenInfoList', 0, 1000);
}


/**
 *
 *
 * @return response
 */
 async function getTransactionHistory(address, indexStart, pageCount)
 {
    let httpRPC = new HTTP_RPC(httpURL);
    let httpProvider = new ViteAPI(httpRPC, () =>
    {
        return;
    });

    return await httpProvider.request("ledger_getBlocksByAccAddr", address, indexStart, pageCount);
    
 }


/**
 *
 *
 * @return response
 */
 async function getExchangeRates()
 {
    let vitexRPC = new HTTP_RPC("https://api.vitex.net/api/v2");
    let vitexProvider = new ViteAPI(vitexRPC, () =>
    {
        return;
    });

    // FIX ME - zdolph 10/11/21

    // Get All Tokens //
    // GET /api/v2/tokens
        // category 	        STRING      NO      Token category, [quote,all], default all
        // tokenSymbolLike      STRING      NO      Token symbol. For example, VITE. Fuzzy search supported.
        // offset 	            INTEGER     NO      Search starting index, starts at 0, default 0
        // limit 	            INTEGER     NO      Search limit, max 500, default 500

        // "tokenId": "tti_322862b3f8edae3b02b110b1",
        // "name": "BTC Token",
        // "symbol": "BTC-000",
        // "originalSymbol": "BTC",
        // "totalSupply": "2100000000000000",
        // "owner": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        // "tokenDecimals": 8,
        // "urlIcon": null


    // Get Token Detail //
    // GET /api/v2/token/detail
        //  tokenSymbol 	STRING 	NO 	Token symbol. For example, VITE
        //  tokenId 	    STRING 	NO 	Token id. For example, tti_5649544520544f4b454e6e40

        // "tokenId": "tti_322862b3f8edae3b02b110b1",
        // "name": "BTC Token",
        // "symbol": "BTC-000",
        // "originalSymbol": "BTC",
        // "totalSupply": "2100000000000000",
        // "publisher": "vite_ab24ef68b84e642c0ddca06beec81c9acb1977bbd7da27a87a",
        // "tokenDecimals": 8,
        // "tokenAccuracy": "0.00000001",
        // "publisherDate": null,
        // "reissue": 2,
        // "urlIcon": null,
        // "gateway": null,
        // "website": null,
        // "links": null,
        // "overview": null


    // Get Exchange Rate //
    // GET /api/v2/exchange-rate
        //  tokenSymbols 	STRING 	NO 	Trading pairs, split by ",". For example, VITE,ETH-000
        //  tokenIds 	    STRING 	NO 	Token ids, split by ",". For example, tti_5649544520544f4b454e6e40,tti_5649544520544f4b454e6e40

        // "tokenId": "tti_5649544520544f4b454e6e40",
        // "tokenSymbol": "VITE",
        // "usdRate": 0.03,
        // "cnyRate": 0.16


    // Get All Trading Pairs //   
    // GET /api/v2/markets
        //   offset     INTEGER 	NO 	Search starting index, starts at 0, default 0
        //   limit 	    INTEGER 	NO 	Search limit, max 500, default 500

        // "symbol": "BTC-000_USDT",
        // "tradeTokenSymbol": "BTC-000",
        // "quoteTokenSymbol": "USDT-000",
        // "tradeToken": "tti_322862b3f8edae3b02b110b1",
        // "quoteToken": "tti_973afc9ffd18c4679de42e93",
        // "pricePrecision": 8,
        // "quantityPrecision": 8

    //return await vitexProvider.request('exchange-rate');
 }


/**
 *
 *
 * @return QRCode
 */
async function generateQRCode()
{
    let qrCodeSize = window.vpfw_async_js_data['qrCodeSize'];
    let qrCodeString = "vite:$" + addressDefault;
    qrCodeString += "?tti=$" + currTokenID;
    qrCodeString += "&amount=$" + currTotal.toString();
    qrCodeString += "&data=" + encode(defaultMemo).replaceAll("=", "");

    new QRCode(document.getElementById("qrcode"),
    {
        text: qrCodeString,
        width: qrCodeSize,
        height: qrCodeSize,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });


    // EXAMPLE USAGE
    //<div id="qrcode"></div>
    //<script type="text/javascript">
    //new QRCode(document.getElementById("qrcode"), "http://jindo.dev.naver.com/collie");
    //</script>

    //qrcode.clear(); // clear the code.
    //qrcode.makeCode("http://naver.com"); // make another code.
}


/**
 *
 *
 * @return TxForm
 */
async function generateTxForm(iteration = 0)
{
    let txInnerHtml =  '<p>Loading ....</p>';
    
    if (!iteration)
        document.getElementById("vpfwTimerText").innerHTML = txInnerHtml;

    if (tokenOptions.length > 0) 
    {
        // FIX ME - zdolph - 10/11/21
        txInnerHtml = '<StyledSelect />';
        txInnerHtml += '<script type="text/javascript">generateTokenList()</script>';
        document.getElementById("vpfwTimerText").innerHTML = txInnerHtml;
    }
    else 
    {
        setTimeout(function()
        {
            generateTxForm(++iteration);
        }, 1000)
    }
}


/**
 *
 *
 * @return TxForm
 */
async function generateTokenList()
{
    // set dropdown from the getToken
    tokenList = await getTokenList();
    tokenList.tokenInfoList.forEach((value, index) =>
    {
        value.label = value.tokenName;
        value.key = index;
    });

    //let tokenPairInfo = await httpProvider.request('contract_getTokenInfoList', 0, 1000);
    //let otherTokenPrice = 0; // FIXME
    //currTotal = usdTotal / otherTokenPrice;
 
    var select = document.createElement("select");
    select.name = "Tokens";
    select.id = "tokens"
 
    for (const val of values)
    {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }
 
    var label = document.createElement("label");
    label.innerHTML = "Choose your pets: "
    label.htmlFor = "pets";
 
    document.getElementById("container").appendChild(label).appendChild(select);
}


/**
 *
 *
 * @return bool
 */
async function startVPFWTimer()
{
	if (currTimeLeft > 0)
	{
		setTimeout(() => 
        {
            setTimer(currTimeLeft--);
            let currTimeText = "The transaction will expire in ";
            currTimeText += Math.floor(currTimeLeft / 60).toString();
            currTimeText += "m ";
            currTimeText += (currTimeLeft - Math.floor(currTimeLeft / 60) * 60).toString();
            currTimeText += "s";
            document.getElementById("vpfwTimerText").innerHTML = currTimeText;
        }, 1000);

	}
	else
	{
        // Failure: Timeout
		postTxResult(false);
        document.getElementById("vpfwTimerText").innerHTML = "Transaction has timed out";
	}
 
}


/**
 *
 *
 */
async function postTxResult(result)
{
    if (!result)
    {
        document.getElementById("vitepayFormId").style.display = "none";
    }

    jQuery.ajax(
    {
        method: 'post',
        url: vpfwAjaxVar.ajaxurl,
        data:
        {
            result: result,
            tx: currentTx,
            action: 'post_vpfw_result',
        }
    }).done(function(msg)
    {
        // We could do something with response here
        console.log(msg);
    });
}


/**
 *
 *
 * @return bool
 */
async function validateTransaction(transaction, tokenId, amount)
{
    let validated = false;
    let divider = `1e+${transaction.tokenInfo.decimals}`;
    let amountTx = (new Big(`${transaction.amount}`)).div(Big(divider));

    if (transaction.fromBlockHash === "0000000000000000000000000000000000000000000000000000000000000000")
    {
        return false;
    }

    const request = await getHashInfo(transaction.fromBlockHash);
    if(request !== null && parseInt(amount) === parseInt(amountTx) && tokenId === transaction.tokenId)
        validated = true;
  
    return validated; 
}


/**
 *
 *
 */
async function checkPaymentStatus()
{
    const event = await createNewBlockSubByAddr();
    event.on(async (result) =>
    {
        const hashAddress = result[0].hash;
        const txInfo = await getHashInfo(hashAddress);
        currentTx = txInfo;
        if (inputAmount.current && inputToken.current)
        {
            // Check if the transaction is valid or not. 
            let divider = '`1e+'+txInfo.tokenInfo.decimals.toString();
            let amountTx = (new Big( txInfo.amount )).div(Big( divider ));
            if (parseInt(amountTx) === parseInt(amount) && txInfo.tokenId === tokenId)
            {
                // Success: Tx Confirmed
                postTxResult(true);
            }
            else if (currTimeLeft < 3)
            {
                // Failure: Tx Unconfirmed
                postTxResult(false);
            }
        }
    });
}


/**
 *
 *
 * @return bool
 */
 async function validateTransactionHistory()
 {
     let count = 500;
     let transactions = getTransactionHistory(addressDefault, 0, count);
     transactions = transactions.filter(tx => tx.fromAddress !== tx.toAddress && tx.blockType === 4);
 
     if (transactions !== null && transactions.length > 0)
     {
         for (var i = 0; i < transactions.length; ++i)
         {
             if (await validateTransaction(transactions[i], tokenId, amount))
             {
                 // Success: Tx Confirmed
                 postTxResult(true);
                 break;
             }
         }
     }
 
     return false;
 }


/**
 *
 *
 * @return bool
 */
async function checkAPIStatus(e, tokenId, amount)
{
    e.preventDefault();

    let transactions = await validateTransactionHistory();
    transactions = transactions.filter(tx => tx.fromAddress !== tx.toAddress && tx.blockType === 4);
    let statusTransaction = false;
    if (transactions !== null && transactions.length > 0)
    {
        for (var i = 0; i < transactions.length; ++i)
        {
            if (await validateTransaction(transactions[i], tokenId, amount ))
            {
                // Success: Tx Confirmed
                statusTransaction = true;
                postTxResult(statusTransaction);
                break;
            }
        }
    }
    return statusTransaction;
}