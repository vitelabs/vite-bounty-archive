import { ViteAPI } from '@vite/vitejs/distSrc/viteAPI/type';
import JointContract from '../contracts/JointAccounts';
import en from '../i18n/en';
import { setStateType } from './globalContext';
import { VC } from './viteConnect';

export type NetworkTypes = 'testnet' | 'mainnet' | 'localnet';

export type State = {
	setState: setStateType;
	callContract: (
		contract: typeof JointContract,
		methodName: string,
		params?: any[],
		tokenId?: string,
		amount?: string
	) => Promise<object>;
	scanEvents: (
		abi: any[],
		address: string,
		fromHeight: string,
		eventName: string
	) => Promise<object>;
	viteApi: ViteAPI;
	toast: string;
	languageType: string;
	networkType: NetworkTypes;
	i18n: typeof en;
	vcInstance: VC | null;
	metamaskAddress: string;
	viteBalanceInfo: ViteBalanceInfo;
	accountId: number;
	activeTab: string;
};

export type ViteBalanceInfo = {
	balance: {
		address: string;
		blockCount: string;
		balanceInfoMap?: {
			[tokenId: string]: {
				tokenInfo: TokenInfo;
				balance: string;
			};
		};
	};
	unreceived: {
		address: string;
		blockCount: string;
	};
};

export type TokenInfo = {
	tokenName: string;
	tokenSymbol: string;
	totalSupply: string;
	decimals: number;
	owner: string;
	tokenId: string;
	maxSupply: string;
	ownerBurnOnly: false;
	isReIssuable: false;
	index: number;
	isOwnerBurnOnly: false;
};

export type NewAccountBlock = {
	hash: string;
	height: number;
	heightStr: string;
	removed: boolean;
};

export type AccountCreatedEvent = {
	returnValues: {
		accountId: number;
		creator: string;
	};
	event: string;
	raw: {
		data: string;
		topics: [string];
	};
	signature: string;
	accountBlockHeight: string;
	accountBlockHash: string;
	address: string;
};

export type MotionCreatedEvent = {
	returnValues: {
		accountId: number;
		motionId: number;
		motionType: number;
		proposer: string;
		tokenId: string;
		transferAmount: number;
		to: string;
		destinationAccount: number;
		threshold: number;
	};
	event: string;
	raw: {
		data: string;
		topics: [string];
	};
	signature: string;
	accountBlockHeight: string;
	accountBlockHash: string;
	address: string;
};

export type MotionCancelledEvent = {
	returnValues: {
		accountId: number;
		motionId: number;
	};
	event: string;
	raw: {
		data: string;
		topics: [string];
	};
	signature: string;
	accountBlockHeight: string;
	accountBlockHash: string;
	address: string;
};

export type VoteEvent = {
	returnValues: {
		accountId: number;
		motionId: number;
		voter: string;
		vote: boolean;
	};
	event: string;
	raw: {
		data: string;
		topics: [string];
	};
	signature: string;
	accountBlockHeight: string;
	accountBlockHash: string;
	address: string;
};

export type TransferEvent = {
	returnValues: {
		accountId: number;
		motionId: number;
		tokenId: string;
		address: string;
		destinationAccount: string;
		amount: number;
	};
	event: string;
	raw: {
		data: string;
		topics: [string];
	};
	signature: string;
	accountBlockHeight: string;
	accountBlockHash: string;
	address: string;
};

export type DepositEvent = {
	returnValues: {
		accountId: number;
		tokenId: string;
		from: string;
		amount: number;
	};
	event: string;
	raw: {
		data: string;
		topics: [string];
	};
	signature: string;
	accountBlockHeight: string;
	accountBlockHash: string;
	address: string;
};
