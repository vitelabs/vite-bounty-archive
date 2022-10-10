import { abi, utils } from '@vite/vitejs';
import { ViteAPI } from '@vite/vitejs/distSrc/utils/type';
import { TokenInfo } from './types';

export const getTokens = async (viteApi: ViteAPI) => {
	const result = await viteApi.request('contract_getTokenInfoList', 0, 1000)
	const tokens:TokenInfo[] = result.tokenInfoList
	return tokens
}
export const getToken = async (viteApi: ViteAPI, tokenId: string) => {
	const result = await viteApi.request('contract_getTokenInfoById', tokenId)
	return result
}

export const waitResponse = async (viteApi: ViteAPI, hash:string) => {
	const timeout = Date.now()+100*1000
	while(Date.now() < timeout){
		await new Promise(r=>setTimeout(r,500))
		const userblock = await viteApi.request('ledger_getAccountBlockByHash', hash)
		if(!userblock?.receiveBlockHash)continue
		
		const receiveBlock = await viteApi.request(
			'ledger_getAccountBlockByHash',
			userblock.receiveBlockHash
		)
		const data = utils._Buffer.from(receiveBlock.data||'', 'base64')
		if(data[32] !== 0x00){
			throw new Error('Transaction reverted')
		}
		return receiveBlock
	}
	throw new Error("Couldn't find response tx from contract before timeout")
}

export const getLogsByAccountBlock = async (viteApi: ViteAPI, hash:string, abi:any[], eventName?: string) => {
	const logs = await viteApi.request('ledger_getVmLogs', hash);
	const events = decodeLog(
		logs.map((log:any) => ({vmlog:log})),
		abi,
		eventName
	)
	return events
}

export const getPastEvents = async (
	viteApi: ViteAPI,
	contractAddress: string,
	contractAbi: any[],
	eventName = 'allEvents',
	{
		fromHeight = 1,
		toHeight = 0,
		filter
	}: {
		filter?: Record<string, string|string[]>;
		fromHeight?: number;
		toHeight?: number;
	}
) => {
	const topics = []
	if(eventName !== 'allEvents'){
		topics.push([abi.encodeLogSignature(
			contractAbi.find((item:any) => item.name === eventName)
		)])
	}else{
		topics.push([])
	}
	if(filter){
		if(eventName === 'allEvents')throw new Error("Can't filter allEvents")
		const eventAbi = contractAbi.find((item:any) => item.name === eventName)
		for(const input of eventAbi.inputs){
			if(!input.indexed)continue
			if(!filter[input.name]){
				topics.push([])
				continue
			}
			const value = filter[input.name]
			if(Array.isArray(value)){
				topics.push(value.map((v:any) => abi.encodeParameter(input.type, v)))
			}else{
				topics.push([abi.encodeParameter(input.type, value)])
			}
		}
	}

	const logs = await viteApi.request('ledger_getVmLogsByFilter', {
		addressHeightRange: {
			[contractAddress!]: {
				fromHeight: fromHeight.toString(),
				toHeight: toHeight.toString(),
			},
		},
		topics: topics,
		pageIndex: 0,
		pageSize: 1000,
	});
	return decodeLog(logs, contractAbi, eventName)
};

export function decodeLog(
	logs:any[],
	contractAbi: any[],
	eventName = 'allEvents'
){
	const result:any[] = []
	const filteredAbi =
		eventName === 'allEvents'
			? contractAbi
			: contractAbi.filter((a: any) => {
					return a.name === eventName;
			  });
	if (logs) {
		for (const log of logs) {
			const vmLog = log.vmlog;
			const topics = vmLog.topics;
			for (const abiItem of filteredAbi) {
				const signature = abi.encodeLogSignature(abiItem);
				if (abiItem.type === 'event' && signature === topics[0]) {
					let dataHex;
					if (vmLog.data) {
						dataHex = utils._Buffer.from(vmLog.data, 'base64').toString('hex');
					}
					const returnValues:any = abi.decodeLog(abiItem, dataHex, topics);
					for(let i = 1; i < topics.length; i++){
						const input = abiItem.inputs[i]
						if(!input?.indexed)continue
						if(input.type !== 'tokenId')continue
						// indexed token id are not decoded due to a bug

						returnValues[i] = abi.decodeParameter(input.type, topics[i+1])
						returnValues[input.name] = abi.decodeParameter(input.type, topics[i+1])
					}
					const item = {
						returnValues: returnValues,
						event: abiItem.name,
						raw: {
							data: dataHex,
							topics: topics,
						},
						signature: signature,
						accountBlockHeight: log.accountBlockHeight,
						accountBlockHash: log.accountBlockHash,
						address: log.address,
					};
					result.push(item);
					break;
				}
			}
		}
	}
	return result;
}

/*
 * This function can be replaced by queryContractState of vitejs
 * when using @vite/vitejs >= v2.3.18-alpha.3
 */

export const getContractState = async (
	viteApi: ViteAPI,
	contractAddress: string,
	contractAbi: any[],
	methodName: string,
	params: any[]
) => {
	const methodAbi = contractAbi.find((method) => method.name === methodName);
	const data = abi.encodeFunctionCall(methodAbi, params || []);
	const state = await viteApi.request('contract_query', {
		address: contractAddress,
		data: utils._Buffer.from(data, 'hex').toString('base64'),
	});
	if (!state) {
		return null;
	}
	const hexState = utils._Buffer.from(state, 'base64').toString('hex');
	return abi.decodeParameters(methodAbi?.outputs, hexState);
};
