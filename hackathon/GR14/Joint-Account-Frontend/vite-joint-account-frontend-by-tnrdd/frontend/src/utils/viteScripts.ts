import { abi, utils } from '@vite/vitejs';
import { ViteAPI } from '@vite/vitejs/distSrc/utils/type';

export const getPastEvents = async (
	viteApi: ViteAPI,
	contractAddress: string,
	contractAbi: any[],
	eventName: string = 'allEvents',
	{
		fromHeight = 0,
		toHeight = 0,
	}: {
		filter?: Object;
		fromHeight?: Number;
		toHeight?: Number;
	}
) => {
	let result: any[] = [];
	let logs = await viteApi.request('ledger_getVmLogsByFilter', {
		addressHeightRange: {
			[contractAddress!]: {
				fromHeight: fromHeight.toString(),
				toHeight: toHeight.toString(),
			},
		},
	});
	const filteredAbi =
		eventName === 'allEvents'
			? contractAbi
			: contractAbi.filter((a: any) => {
					return a.name === eventName;
			  });
	if (logs) {
		for (let log of logs) {
			let vmLog = log.vmlog;
			let topics = vmLog.topics;
			for (let abiItem of filteredAbi) {
				let signature = abi.encodeLogSignature(abiItem);
				if (abiItem.type === 'event' && signature === topics[0]) {
					let dataHex;
					if (vmLog.data) {
						dataHex = utils._Buffer.from(vmLog.data, 'base64').toString('hex');
					}
					let returnValues = abi.decodeLog(abiItem, dataHex, topics);
					let item = {
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
};

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
