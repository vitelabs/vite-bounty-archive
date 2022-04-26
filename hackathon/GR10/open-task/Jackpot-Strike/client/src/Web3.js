import Web3 from "web3";
import Prediction from './contracts/Prediction.json';
import { PREDICTION_ADDRESS } from "./Token";

let eth = window.ethereum;
export const chainData = [{
  chainId: '0x4',
  chainName: 'Rinkeby Testnet',
  nativeCurrency:
  {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
  blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
}]
function reload() {
  window.location.reload(true);
}
export const getWeb3 = async () => {
  if (eth) {
    try {
      await eth.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x4' }] }).then(async () => {
        await eth.request({ method: `eth_requestAccounts` });
      })
    } catch (switchError) {
      console.log(switchError)
      if (switchError.code === 4902) {
        try {
          await eth.request({ method: 'wallet_addEthereumChain', params: chainData })
        } catch {
          window.alert("please, accept Binance Smart Chain network!");
          reload();
        }
      }
    }
  } else {
    console.log("Install Metamask!");
    return false;
  }
  return true
}
export function getContract() {
  let web3Js = null;
  web3Js = new Web3(eth);
  let instance = new web3Js.eth.Contract(Prediction.abi, PREDICTION_ADDRESS);
  return instance;
}

export const instance = getContract();

export async function fetchPrice(Id) {
  return await instance.methods.getLatestPrice(Id).call().then((res) => {
    return res / 10 ** 18;
  }).catch((err) => {
    console.log("error in fetching price ", err);
  });
}
export async function latestCycle(Id) {
  return await instance.methods.getLatestCycle(Id).call().then((res) => {
    return res;
  }).catch((err) => {
    console.log("error in fetching cycle ", err);
  });
}
export async function fetchStatus(Id) {
  let cycle = await latestCycle(Id);
  if (cycle !== undefined) {
    return await instance.methods.getPriceStatus(Id, cycle).call().then((res) => {
      return res;
    }).catch((err) => {
      console.log("error in fetching status ", err);
    })
  }
}
export async function fetchStatusOfCycle(Id, cycle) {
  return await instance.methods.getPriceStatus(Id, cycle).call().then((res) => {
    return res;
  }).catch((err) => {
    console.log("error in fetching status ", err);
  })

}
export async function fetchRounds(Id) {
  return await instance.methods.getLatestRoundInCycle(Id).call().then((res) => {
    return res;
  }).catch((err) => {
    console.log("error in fetching rounds", err);
  })
}
export async function fetchIsLocked(Id) {
  return await instance.methods.isPriceLocked(Id).call().then((res) => {
    return res;
  }).catch((err) => {
    console.log("error in fetching isLocked", err);
  })
}
export async function fetchIsWithdrawn(Id,Cycle,Address) {
  return await instance.methods.getIsWithdrawn(Id,Cycle).call({from:Address}).then((res) => {
    return res;
  }).catch((err) => {
    console.log("error in fetching isLocked", err);
  })
}
export async function fetchBoundries(Id) {
  let cycle = await latestCycle(Id);
  if (cycle !== undefined) {
    return await instance.methods.getPriceBoundries(Id, cycle).call().then((res) => {
      return res;
    }).catch((err) => {
      console.log("error in fetching isLocked", err);
    })
  }
}
export async function fetchParticipation(Id, addr) {
  return await instance.methods.getCyclesParticipation(Id).call({ from: addr }).then((res) => {
    return res;
  }).catch((err) => {
    console.log("error in fetching isLocked", err);
  })
}
export const statusAdapt = (num) => {
  let result = "...";
  if (num === "0") {
    result = "PENDING"
  } else if (num === "1") {
    result = "TIE"
  } else if (num === "2") {
    result = "LONG"
  } else if (num === "3") {
    result = "SHORT"
  }
  return result;
}
export const statusState = (num) => {
  let result = "...";
  if (num === "0") {
    result = "Not Yet Determined!"
  } else if (num === "1") {
    result = "No Wins Or Losses!"
  } else if (num === "2") {
    result = "You Won!"
  } else if (num === "3") {
    result = "Good Luck Next Time!"
  }
  return result;
}
export const getChainId = async () => {
  return await eth.chainId;
}

