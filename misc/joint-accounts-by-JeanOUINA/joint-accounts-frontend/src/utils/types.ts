import { AccountBlockBlock } from '@vite/vitejs/distSrc/utils/type';
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
	) => Promise<AccountBlockBlock>;
	viteApi: ViteAPI;
	toast: string;
	languageType: string;
	networkType: NetworkTypes;
	i18n: typeof en;
	vcInstance: VC | null;
	viteBalanceInfo: ViteBalanceInfo;
	accountId: string;
	activeTab: string;
	motionId: string;
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

export type Events = AccountCreatedEvent|
	MotionCreatedEvent|
	MotionCancelledEvent|
	VoteEvent|
	TransferEvent|
	MemberAddedEvent|
	MemberRemovedEvent|
	ThresholdChangedEvent|
	DepositEvent
export type Event<Name=string, Values=Record<string, string|string[]>> = {
	returnValues: Values & Record<'accountId', string>; // REVIEW: I haven't used ts' `Record` type before, but why not use `{ accountId: string }` here instead? Applies to other uses of `Record` in this project
	event: Name;
	raw: {
		data?: string;
		topics: [string];
	};
	signature: string;
	accountBlockHeight: string;
	accountBlockHash: string;
	address: string;
}

export type AccountCreatedEvent = Event<'AccountCreated', Record<'creator', string>>;

export type MotionCreatedEvent = Event<
	'MotionCreated',
	Record<
		'motionId'|
		'motionType'|
		'proposer'|
		'tokenId'|
		'transferAmount'|
		'to'|
		'destinationAccount'|
		'threshold',
		string
	>
>;
export type MotionCancelledEvent = Event<'MotionCancelled', Record<'motionId', string>>;

export type VoteEvent = Event<'Vote', Record<
	'motionId'|'voter'|'vote',
	string
>>;

export type TransferEvent = Event<'Transfer', Record<
	'motionId'|
	'tokenId'|
	'to'|
	'destinationAccount'|
	'amount',
	string
>>;

export type MemberAddedEvent = Event<'MemberAdded', Record<
	'member'|'motionId',
	string
>>;

export type MemberRemovedEvent = Event<'MemberRemoved', Record<
	'member'|'motionId',
	string
>>;

export type ThresholdChangedEvent = Event<'ThresholdChanged', Record<
	'threshold'|'motionId',
	string
>>;

export type DepositEvent = Event<'Deposit', Record<
	'tokenId'|'from'|'amount',
	string
>>;