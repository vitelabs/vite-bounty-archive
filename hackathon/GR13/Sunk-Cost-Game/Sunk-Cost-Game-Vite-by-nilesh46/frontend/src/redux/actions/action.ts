import { setUri, login, logout } from "../slice/userSlice";
import {loadPotDetails , setCreationFee , setEvents} from '../slice/potSlice';
import Connector from "@vite/connector";
import { ViteAPI, accountBlock , abi , utils } from "@vite/vitejs";
import {HTTP_RPC} from "@vite/vitejs-http";
import sunkCostGame from "../../contract/sunkCostGame_abi.json";
import sunkCostGameContract from "../../contract/sunkCostGame_contract.json";
import * as Utils from './utils';

let provider;
let contract;
let vc;
const viteTokenId = "tti_5649544520544f4b454e6e40";

export const Initialize = () => async(dispatch) => {

    //set the network provider
    provider = new ViteAPI(
        new HTTP_RPC(sunkCostGameContract.networkHTTP),
        () => console.log("Vite provider connected")
    );

    //set contract details
    contract = {
        address: sunkCostGameContract.address,
        abi: sunkCostGame,
        provider: provider
    };

    //iniialize wallet Connect Login
    await dispatch(Login());

    //load data from contract
    await dispatch(GetPotData());
};

const Login = () => async (dispatch) => {
    vc = new Connector({ bridge: sunkCostGameContract.bridgeWS });
    await vc.createSession();
    const uri = vc.uri;
    dispatch(setUri(uri));
    vc.on("connect", (err: any, payload: any) => {
        // vcInstance can start prompting transactions on the user's Vite wallet app
        console.log("WalletConnector.connect", err, payload, vc.session);
        dispatch(login(vc.session.accounts[0]));
    });
    vc.on("disconnect", (err: any, payload: any) => {
        console.log("WalletConnector.disconnect", err, payload);
        // User's Vite wallet app is no longer connected
        Logout();
        vc.stopBizHeartBeat();
    });
};

const Logout = () => async (dispatch) => {
    await vc.killSession();
    await vc.destroy();
    dispatch(logout());
};

export const ContractQuery = async (methodName: string, params:any[]) => {
   
    const methodAbi = contract.abi.find((x: { name: string; }) => {
      return x.name === methodName;
    });
    if (!methodAbi) {
      throw new Error("method not found:" + methodName);
    }

    let data = abi.encodeFunctionCall(methodAbi, params);
    let dataBase64 = Buffer.from(data, 'hex').toString('base64');

    while(true) {
      let result = await provider.request("contract_query", {
          address: contract.address,
          data: dataBase64
        });
        
      // parse result
      if (result) {
        let resultBytes = Buffer.from(result, 'base64').toString('hex');
        let outputs = [];
        for (let i = 0; i < methodAbi.outputs.length; i++) {
            outputs.push(methodAbi.outputs[i].type);
        }
      //   console.log(abi.decodeParameters(
      //     outputs,
      //     resultBytes
      // ));
        return abi.decodeParameters(
            outputs,
            resultBytes
        );
      }
      console.log('Query failed, try again.');
      await Utils.sleep(500);
    }    
  }

  export const ContractCall = async (user:any, methodName: string, params:any[] , amount: string , tokenId : string ) => {
    console.log(amount ,tokenId , methodName , user , params);
    const methodAbi = contract.abi.find(
        (x: any) => x.name === methodName && x.type === "function"
    );
    if (!methodAbi) {
        throw new Error("method not found:" + methodName);
    }
    if (!user.address) {
        throw new Error("User Not Authenticated");
    }

    // const viteValue = 10n ** 18n * BigInt(amount);

    const block = await accountBlock.createAccountBlock("callContract", {
        address: user.address,
        abi: methodAbi,
        toAddress: contract.address,
        params : params,
        // params: ['300000' , '200000' , '10' , '5' , '20000' , 'tti_5649544520544f4b454e6e40'],
        tokenId: tokenId,
        amount: amount,
    }).accountBlock;

    const result = await new Promise((resolve, reject) => {
        vc.on("disconnect", () => {
            reject({ code: 11020, message: "broken link" });
        });

        vc.sendCustomRequest({
            method: "vite_signAndSendTx",
            params: [{ block }],
        })
            .then((r) => {
                resolve(r);
            })
            .catch((e) => {
                reject(e);
            });
    });

    return result;
  }

  export const GetPotData = () => async dispatch => {
    const [totalPots] = await ContractQuery("totalPotsCreated",[]);
    const [creationFee] = await ContractQuery("potCreationFee",[]);
    const creationEvents = await ScanEvents( "0","PotCreated");
    const rewardClaimedEvents = await ScanEvents("0" , "RewardClaimed");
    const boughtEvents = await ScanEvents("0", "PotBought");

    let pots = [];
    for( let i = 0 ; i < totalPots ; i++){
        const potData = await ContractQuery("Pots", [i]);
        potData.push(i);
        var end = new Date(0);
        end.setUTCSeconds(potData[10]);
        const status = end <= new Date() ? "expired" : "active";
        potData.push(status);
        pots.push(potData);

    }
    dispatch(loadPotDetails({totalPots , pots , creationFee , creationEvents , boughtEvents , rewardClaimedEvents}));
}


export const ScanEvents = async (fromHeight: string,eventName: string) => {

    let heightRange = {[contract.address]: {
        fromHeight: fromHeight.toString(),
        toHeight: "0",
      },
    };

    const vmLogs = await provider.request("ledger_getVmLogsByFilter", {
      addressHeightRange: heightRange,
    });
  
    if (!vmLogs) {
      return [];
    }

    const eventAbi = contract.abi.find(
      (item: { name: string; type: string }) =>
        item.type === "event" && item.name === eventName
    );
  
    const events = vmLogs.filter((x: any) => {
      return encodeLogId(eventAbi) === x.vmlog.topics[0];
    });
  
    if (!events || events.length === 0) {
      return [];
    }
  
    return events.map((input: any) => {
      const event: any = decodeEvent(input.vmlog, contract.abi, eventName);
      return {
        event: event,
        height: input.accountBlockHeight,
        hash: input.accountBlockHash,
      };
    });
  }
  

const decodeEvent = (log: any,abiArr: Array<{ name: string; type: string }>,name: string) => {
    const result = abi.decodeLog(
      abiArr,
      Buffer.from(log.data ? log.data : "", "base64").toString("hex"),
      log.topics.slice(1, log.topics.length),
      name
    );
    return Object.assign(result, { name: name });
}
  
const encodeLogId = (item: { name: string; type: string }) => {
    let id = "";
    if (item.type === "function") {
      id = abi.encodeFunctionSignature(item);
    } else if (item.type === "event") {
      id = abi.encodeLogSignature(item);
    }
    return id;
}

export const CreatePot = async (user , amount , params) => {
    const methodName = "createPot";
    const methodAbi = contract.abi.find(
        (x: any) => x.name === methodName && x.type === "function"
    );
    if (!methodAbi) {
        console.log("Medthod Not Found");
        return;
    }

    const viteTokenId = "tti_5649544520544f4b454e6e40";
    const viteValue = 10n ** 18n * BigInt(amount);

    const block = await accountBlock.createAccountBlock("callContract", {
        address: user.address,
        abi: methodAbi,
        toAddress: contract.address,
        params : params,
        // params: ['300000' , '200000' , '10' , '5' , '20000' , 'tti_5649544520544f4b454e6e40'],
        tokenId: viteTokenId,
        amount: viteValue.toString(),
    }).accountBlock;

    const result = await new Promise((resolve, reject) => {
        vc.on("disconnect", () => {
            reject({ code: 11020, message: "broken link" });
        });

        vc.sendCustomRequest({
            method: "vite_signAndSendTx",
            params: [{ block }],
        })
            .then((r) => {
                resolve(r);
            })
            .catch((e) => {
                reject(e);
            });
    });

    console.log(result);
};