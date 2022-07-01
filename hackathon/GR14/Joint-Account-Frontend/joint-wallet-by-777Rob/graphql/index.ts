import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { WS_RPC } from '@vite/vitejs-ws';
import { account, ViteAPI } from '@vite/vitejs';
import schema from './schema';
import { JointAccount, Account } from './generated/schematypes';
import { JointAccountContract } from '../frontend/src/contracts/JointAccounts';
import _ from 'lodash';
import cors from 'cors';
import Axios from 'axios';
import { createMockAccount } from './createMockAccount';
import { getContractEvents } from './getContractEvents';
import { getJointAccountData } from './getJointAccountData';
import { getAccount } from './getAccount';
import { getUsersJointAccounts } from './getUsersJointAccounts.1';
var app = express();
app.use(cors());

export const network = 'testnet';

const providerWsURLs = {
	localnet: 'http://localhost:23457',
	testnet: 'http://localhost:23457',
	mainnet: 'wss://node.vite.net/gvite/ws', // or 'wss://node-tokyo.vite.net/ws'
};

export let allJointAccounts: JointAccount[] = [];

export const updateJointAccounts = async () => {
	const accountsCreatedRequest = await provider.queryContractState({
		address: JointAccountContract.address[network],
		abi: JointAccountContract.abi,
		methodName: 'getAccountsLength',
		params: [],
	});

	let accountsCreatedNumber = 0;
	accountsCreatedNumber = parseInt(accountsCreatedRequest[0]);
	// console.log('accountsCreatedNumber', accountsCreatedNumber);
	const accendingNumberArray = _.fill(Array(accountsCreatedNumber), 1).map((item, index) => index);

	// Load all joint accounts into global variable
	allJointAccounts = await Promise.all(
		accendingNumberArray.map(async (item) => {
			const accountConfig = await provider.queryContractState({
				address: JointAccountContract.address[network],
				abi: JointAccountContract.abi,
				methodName: 'accounts',
				params: [item],
			});
			const accountMembers = await provider.queryContractState({
				address: JointAccountContract.address[network],
				abi: JointAccountContract.abi,
				methodName: 'getMembers',
				params: [item],
			});

			return {
				approvalThreshold: accountConfig[0],
				isStatic: accountConfig[1] == 1,
				id: item,
				name: 'Wallet',
				isMemberOnlyDeposit: accountConfig[2] == 1,
				members: accountMembers[0].map((memberAddress) => {
					return {
						address: memberAddress,
					};
				}),
			};
		})
	);
};

let WS_service = new WS_RPC(providerWsURLs[network]);

export let provider = new ViteAPI(WS_service, async () => {
	console.log('Connected to Vite node');
	await updateJointAccounts();
});

var root = {
	ContractEvents: getContractEvents,
	Account: getAccount,
	UsersJointAccounts: getUsersJointAccounts,
	JointAccount: getJointAccountData,
	GetMockAccount: createMockAccount,
};

app.use(
	'/graphql',
	graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql');
