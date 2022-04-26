import Web3 from "web3";
import stable from './contracts/PRE.json';

const TOKEN_ADDRESS = "0xa0228a6c2e57A3FcAAE1d12F33bF478E42ef9A49";
export const PREDICTION_ADDRESS = "0x2f5e2ebCA25b61C9fb868E5477d593d6157C28C2";
const getToken = ()=>{
    let web3Js=null;
    web3Js = new Web3(window.ethereum);
    let instance = new web3Js.eth.Contract(stable.abi,TOKEN_ADDRESS);
    return instance;
}
export const instanceToken = getToken();
export const getBalance = async (address)=>{
    if(address !== ""){return await instanceToken.methods.balanceOf(address).call().then((res)=>{
        return res/10**18;
    }).catch((err)=>{
        console.log("token balance error: ",err);
    });
    }
}
export const getAllowance = async (addr)=>{
    return await instanceToken.methods.allowance(addr,PREDICTION_ADDRESS).call().then((res)=>{
        return res/10**18;
    }).catch((err)=>{
        console.log("token allowance error: ",err);
    });
}
