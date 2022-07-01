const JointAccounts = {
	address: {
		mainnet: '',
		testnet: 'vite_3b1ccbab8afcae701af4e882c7fb62f4760d9adbf2e3749198', // <your_contract_address>
		localnet: '',
	},
	abi: [
		{
			anonymous: false,
			inputs: [
				{ indexed: true, internalType: 'uint256', name: 'accountId', type: 'uint256' },
				{ indexed: true, internalType: 'address', name: 'creator', type: 'address' },
			],
			name: 'AccountCreated',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{ indexed: true, internalType: 'uint256', name: 'accountId', type: 'uint256' },
				{ indexed: true, internalType: 'tokenId', name: 'tokenId', type: 'tokenId' },
				{ indexed: true, internalType: 'address', name: 'from', type: 'address' },
				{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
			],
			name: 'Deposit',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{ indexed: true, internalType: 'uint256', name: 'accountId', type: 'uint256' },
				{ indexed: true, internalType: 'uint256', name: 'motionId', type: 'uint256' },
				{ indexed: true, internalType: 'address', name: 'member', type: 'address' },
			],
			name: 'MemberAdded',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{ indexed: true, internalType: 'uint256', name: 'accountId', type: 'uint256' },
				{ indexed: true, internalType: 'uint256', name: 'motionId', type: 'uint256' },
				{ indexed: true, internalType: 'address', name: 'member', type: 'address' },
			],
			name: 'MemberRemoved',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{ indexed: true, internalType: 'uint256', name: 'accountId', type: 'uint256' },
				{ indexed: true, internalType: 'uint256', name: 'motionId', type: 'uint256' },
			],
			name: 'MotionCancelled',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{ indexed: true, internalType: 'uint256', name: 'accountId', type: 'uint256' },
				{ indexed: true, internalType: 'uint256', name: 'motionId', type: 'uint256' },
				{ indexed: true, internalType: 'uint256', name: 'motionType', type: 'uint256' },
				{ indexed: false, internalType: 'address', name: 'proposer', type: 'address' },
				{ indexed: false, internalType: 'tokenId', name: 'tokenId', type: 'tokenId' },
				{ indexed: false, internalType: 'uint256', name: 'transferAmount', type: 'uint256' },
				{ indexed: false, internalType: 'address', name: 'to', type: 'address' },
				{ indexed: false, internalType: 'uint256', name: 'destinationAccount', type: 'uint256' },
				{ indexed: false, internalType: 'uint256', name: 'threshold', type: 'uint256' },
			],
			name: 'MotionCreated',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{ indexed: true, internalType: 'uint256', name: 'accountId', type: 'uint256' },
				{ indexed: true, internalType: 'uint256', name: 'motionId', type: 'uint256' },
				{ indexed: false, internalType: 'uint256', name: 'threshold', type: 'uint256' },
			],
			name: 'ThresholdChanged',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{ indexed: true, internalType: 'uint256', name: 'accountId', type: 'uint256' },
				{ indexed: true, internalType: 'uint256', name: 'motionId', type: 'uint256' },
				{ indexed: true, internalType: 'tokenId', name: 'tokenId', type: 'tokenId' },
				{ indexed: false, internalType: 'address', name: 'to', type: 'address' },
				{ indexed: false, internalType: 'uint256', name: 'destinationAccount', type: 'uint256' },
				{ indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
			],
			name: 'Transfer',
			type: 'event',
		},
		{
			anonymous: false,
			inputs: [
				{ indexed: true, internalType: 'uint256', name: 'accountId', type: 'uint256' },
				{ indexed: true, internalType: 'uint256', name: 'motionId', type: 'uint256' },
				{ indexed: true, internalType: 'address', name: 'voter', type: 'address' },
				{ indexed: false, internalType: 'bool', name: 'vote', type: 'bool' },
			],
			name: 'Vote',
			type: 'event',
		},
		{
			inputs: [{ internalType: 'uint256', name: '_accountId', type: 'uint256' }],
			name: 'accountExists',
			outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'active',
			outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [{ internalType: 'uint256', name: '_accountId', type: 'uint256' }],
			name: 'approvalThreshold',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'tokenId', name: '_tokenId', type: 'tokenId' },
			],
			name: 'balanceOf',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'cancelMotion',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'cancelVote',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'address[]', name: '_members', type: 'address[]' },
				{ internalType: 'uint256', name: '_approvalThreshold', type: 'uint256' },
				{ internalType: 'bool', name: '_isStatic', type: 'bool' },
				{ internalType: 'bool', name: '_isMemberOnlyDeposit', type: 'bool' },
			],
			name: 'createAccount',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'address', name: '_member', type: 'address' },
			],
			name: 'createAddMemberMotion',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_threshold', type: 'uint256' },
			],
			name: 'createChangeThresholdMotion',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'address', name: '_member', type: 'address' },
			],
			name: 'createRemoveMemberMotion',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'tokenId', name: '_tokenId', type: 'tokenId' },
				{ internalType: 'uint256', name: '_transferAmount', type: 'uint256' },
				{ internalType: 'address', name: '_to', type: 'address' },
				{ internalType: 'uint256', name: '_destinationAccount', type: 'uint256' },
			],
			name: 'createTransferMotion',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [{ internalType: 'uint256', name: '_accountId', type: 'uint256' }],
			name: 'deposit',
			outputs: [],
			stateMutability: 'payable',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'destinationAccount',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [{ internalType: 'uint256', name: '_accountId', type: 'uint256' }],
			name: 'getMembers',
			outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'address', name: '_member', type: 'address' },
			],
			name: 'isMember',
			outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [{ internalType: 'uint256', name: '_accountId', type: 'uint256' }],
			name: 'isMemberOnlyDeposit',
			outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [{ internalType: 'uint256', name: '_accountId', type: 'uint256' }],
			name: 'isStatic',
			outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'motionExists',
			outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'motionType',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'proposer',
			outputs: [{ internalType: 'address', name: '', type: 'address' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'threshold',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'to',
			outputs: [{ internalType: 'address', name: '', type: 'address' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'tokenId',
			outputs: [{ internalType: 'tokenId', name: '', type: 'tokenId' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'transferAmount',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'voteCount',
			outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
			stateMutability: 'view',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
			],
			name: 'voteMotion',
			outputs: [],
			stateMutability: 'nonpayable',
			type: 'function',
		},
		{
			inputs: [
				{ internalType: 'uint256', name: '_accountId', type: 'uint256' },
				{ internalType: 'uint256', name: '_motionId', type: 'uint256' },
				{ internalType: 'address', name: '_voter', type: 'address' },
			],
			name: 'voted',
			outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
			stateMutability: 'view',
			type: 'function',
		},
	],
};

export default JointAccounts;
