import React from 'react'
import { useState, useEffect } from 'react'
import contractABI from '../../contractABI'
const { WS_RPC } = require('@vite/vitejs-ws');
require('dotenv').config()
const { ViteAPI, wallet, utils, abi, accountBlock, keystore } = require('@vite/vitejs');

// test account
const seed = "want topic together book banana inherit health chunk hard solve fetch tag devote grain aisle spring tube coil state orchard crowd write horn humble";
console.log(seed)
const myAccount = wallet.getWallet(seed).deriveAddress(0);
const recipientAccount = wallet.getWallet(seed).deriveAddress(1);


const CONTRACT = {
    binary: process.env.CONTRACT_BINARY,
    abi: contractABI,                    // JSON ABI
    offChain: process.env.CONTRACT_OFFCHAIN,  // binary offchain code
    address: process.env.CONTRACT_ADDRESS,   // contract address
}

const Transact = (props) => {


    let WS_service = new WS_RPC("wss://buidl.vite.net/gvite/ws");
    let provider = new ViteAPI(WS_service);

    const [mint, setMint] = useState("")
    const [ order, setOrder ] = useState(0);
    const [ type, setType ] = useState("");
    const [ buyData, setBuyData ] = useState("");
    const [ sellData, setSellData ] = useState("");


    function getType(e){
        setType(e.target.value)
    }

    if(props.user){
        if(props.user.isVuilder === true){
            // IF USER IS A VUILDER DISPLAY MINT
            return (
                <div className="mint-wrap">
                    <form id="vuild-mint" action="" onSubmit={e => {
                        e.preventDefault()
                        async function callContract(account, methodName, abi, params, amount) {
                            console.log("starting contract call")
                            const block = accountBlock.createAccountBlock('callContract', {
                              address: account.address,
                              abi,
                              methodName,
                              amount,
                              toAddress: process.env.VUILDER_ADDRESS_ONE,
                              params
                            }).setProvider(provider).setPrivateKey(account.privateKey);
                        
                            await block.autoSetPreviousAccountBlock();
                            const result = await block.sign().send();
                            console.log('call success', result);
                            setMint(result.data)
                        }
                        
                        async function main() {
                            console.log("starting main!")
                            // call the contract we deployed and send over 150 VITE
                            await callContract(process.env.CONTRACT_ADDRESS,'mint', contractABI, [process.env.VUILDER_ADDRESS_ONE], '1000');
                        }
                    
                        main().then(res => {}).catch(err => console.error("ERROR",err));
                    }}>
                        <div>
                            <input id="vuild-mint-val" type="text" value={1000} disabled/>
                        </div>
                        <div>
                            <input id="mint-sub" type="submit" value={`Mint`}/>
                        </div>
                    </form>
                </div>
            )
        }else{
            // IF USER IS A FAN DISPLAY BUY/SELL
            return(
                <div className="transact-wrap">
                    <form id="fan-mint" action="" onSubmit={e => {
                        e.preventDefault()
                        if(type === 'Buy'){
                            async function callContract(account, methodName, abi, params, amount) {
                                const block = accountBlock.createAccountBlock('callContract', {
                                  address: myAccount.address,
                                  abi,
                                  methodName,
                                  amount,
                                  toAddress: "vite_eca03264469a39e24b9f783cc3ee0f0aea7235057047971999",
                                  params
                                }).setProvider(provider).setPrivateKey(account.privateKey);
                            
                                await block.autoSetPreviousAccountBlock();
                                const result = await block.sign().send();
                                console.log('call success', result);
                                setBuyData(result.data)
                            }
                            
                            async function main() {
                                console.log("starting main!")
                                // call the contract we deployed and send over 150 VITE
                                await callContract(process.env.CONTRACT_ADDRESS,'buyToken', contractABI, [process.env.VUILDER_ADDRESS_ONE, order ], order);
                            }
                        
                            main().then(res => {}).catch(err => console.error("ERROR",err));
                        }else if(type === 'Sell'){
                            async function callContract(account, methodName, abi, params, amount) {
                                const block = accountBlock.createAccountBlock('callContract', {
                                  address: myAccount.address,
                                  abi,
                                  methodName,
                                  amount,
                                  toAddress: "vite_eca03264469a39e24b9f783cc3ee0f0aea7235057047971999",
                                  params
                                }).setProvider(provider).setPrivateKey(account.privateKey);
                            
                                await block.autoSetPreviousAccountBlock();
                                const result = await block.sign().send();
                                console.log('call success', result);
                                setSellData(result.data)
                            }
                            
                            async function main() {
                                await callContract(process.env.CONTRACT_ADDRESS,'sellToken', contractABI, [process.env.VUILDER_ADDRESS_ONE], order);
                            }
                        
                            main().then(res => {}).catch(err => console.error("ERROR",err));
                        }
                    }}>
                        <div>
                            <input id="fan-mint-val" type="text" onChange={(e) => setOrder(e.target.value)}/>
                        </div>
                        <div className="buy-sell-wrap">
                            <input className="transact-btn buy-btn" type="submit" value="Buy" onClick={e => {getType(e)}}/>
                            <input className="transact-btn sell-btn" type="submit" value="Sell" onClick={e => {getType(e)}}/>
                        </div>
                    </form>
                </div>
            )
        }
    }  else{
        return(
            <div>Loading</div>
        )
    }
    
}
        

export default Transact
