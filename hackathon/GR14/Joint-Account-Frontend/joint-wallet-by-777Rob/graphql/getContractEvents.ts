import { utils } from '@vite/vitejs';
import { ContractEvent } from './generated/schematypes';
import * as abi from '@vite/vitejs-abi';
import { provider } from './index';

export const getContractEvents = async ({ input }: any) => {
	const {
		contractAddress,
		contractAbi,
		eventName = 'allEvents',
		fromHeight = 0,
		toHeight = 0,
	} = input;

	let contractEventsFormated: ContractEvent[] = [];

	const filteredAbi =
		eventName === 'allEvents'
			? contractAbi
			: contractAbi.filter((a) => {
					return a.name === eventName;
			  });

	let logs = await provider.request('ledger_getVmLogsByFilter', {
		addressHeightRange: {
			[contractAddress.toString()]: {
				fromHeight: fromHeight.toString(),
				toHeight: toHeight.toString(),
			},
		},
	});

	if (logs) {
		for (let log of logs) {
			log = log.vmlog;

			for (let abiItem of filteredAbi) {
				try {
					if (abiItem.type == 'event') {
						let dataHex = utils._Buffer.from(log.data, 'base64').toString('hex');
						let returnValues = abi.decodeLog(abiItem.toString(), dataHex, log.topics);
						let contractEvent: ContractEvent = {};
						contractEvent = {
							returnValues: returnValues,
							fromHeight: fromHeight,
							contractAddress: contractAddress,
							toHeight: toHeight,
							event: abiItem.name,
							eventName: abiItem.name,
							raw: {
								data: dataHex,
								topics: log.topics,
							},
							accountBlockHeight: log.accountBlockHeight,
							accountBlockHash: log.accountBlockHash,
							logAddress: log.address,
						};
						contractEventsFormated.push(contractEvent);
						break;
					}
				} catch (e) {
					console.log(e);
				}
			}
		}
	}

	return contractEventsFormated;
};
