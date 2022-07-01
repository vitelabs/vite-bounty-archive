import { JointAccountContract } from '../frontend/src/contracts/JointAccounts';
import _ from 'lodash';
import { provider, network } from './index';
import { getPastEvents } from './getPastEvents';

export const getJointAccountData = async ({ accountId }: { accountId: number }) => {
	enum MotionType {
		TRANSFER,
		ADD_MEMBER,
		REMOVE_MEMBER,
		CHANGE_THRESHOLD,
	}
	//
	const accountConfig = await provider.queryContractState({
		address: JointAccountContract.address[network],
		abi: JointAccountContract.abi,
		methodName: 'accounts',
		params: [accountId],
	});

	const approvalThreshold = accountConfig[0];
	const events = await getPastEvents(
		JointAccountContract.address[network],
		JointAccountContract.abi,
		'MotionCreated',
		{ fromHeight: 0, toHeight: 0 }
	);

	// event MotionCreated(
	// 	uint256 indexed accountId,
	// 	uint256 indexed motionId,
	// 	uint256 indexed motionType,
	// 	address proposer,
	// 	vitetoken tokenId,
	// 	uint256 transferAmount,
	// 	address to,
	// 	uint256 destinationAccount,
	// 	uint256 threshold
	// );
	const accountsMotionEvents = events.filter((event) => event.returnValues['0'] == accountId);

	const accountMembers = await provider.queryContractState({
		address: JointAccountContract.address[network],
		abi: JointAccountContract.abi,
		methodName: 'getMembers',
		params: [accountId],
	});

	const accountMotionDetails = await Promise.all(
		accountsMotionEvents.map(async (motion) => {
			const voteCount = await provider.queryContractState({
				address: JointAccountContract.address[network],
				abi: JointAccountContract.abi,
				methodName: 'voteCount',
				params: [accountId, motion.returnValues[1]],
			});

			const votesFormated = await Promise.all(
				_.flatten(accountMembers).map(async (memberAddress) => {
					// console.log(memberAddress);
					const memberVotes = await provider.queryContractState({
						address: JointAccountContract.address[network],
						abi: JointAccountContract.abi,
						methodName: 'voted',
						params: [accountId, motion.returnValues[1], memberAddress],
					});
					return {
						address: memberAddress,
						voted: memberVotes[0] == 1,
					};
				})
			);

			const motionFormated = {
				accountId: motion.returnValues[0],
				index: motion.returnValues[1],
				type: MotionType[motion.returnValues[2]],
				proposer: motion.returnValues[3],
				tokenId: motion.returnValues[4],
				transferAmount: motion.returnValues[5],
				to: motion.returnValues[6],
				destinationAccount: motion.returnValues[7],
				threshold: approvalThreshold,
				voteCount: voteCount[0],
				approved: voteCount[0] >= approvalThreshold,
				votes: votesFormated,
			};
			return motionFormated;
		})
	);

	const balances: any = await provider.getBalanceInfo(JointAccountContract.address[network]);
	const tokenInfoMap = balances.balance.balanceInfoMap;
	const tokenIds = _.flatten(_.toPairs(tokenInfoMap).map((balance) => [balance[0]]));

	// Does not load price for all tokens
	// const balanceValueRequest = await Axios.get('https://api.vitex.net/api/v2/exchange-rate');
	const accountBalancesFormated = await Promise.all(
		tokenIds.map(async (tokenId) => {
			const accountsTokenBalance = await provider.queryContractState({
				address: JointAccountContract.address[network],
				abi: JointAccountContract.abi,
				methodName: 'balances',
				params: [accountId, tokenId],
			});
			// console.log(tokenInfoMap[tokenId]);
			return {
				tokenId: tokenId,
				balance: accountsTokenBalance[0],
				name: tokenInfoMap[tokenId].tokenInfo.tokenName,
				symbol: tokenInfoMap[tokenId].tokenInfo.tokenSymbol,
				decimals: tokenInfoMap[tokenId].tokenInfo.decimals,
			};
		})
	);

	// Calculate USD balance value
	// Not all balances come from api
	// const balanceValueUSD = accountBalances.reduce((total, current) => {
	// 	console.log(balanceValueRequest.data.data);
	// 	const priceDataCurrentToken = balanceValueRequest.data.data.filter(
	// 		(priceData) => priceData.tokenId == current.tokenId
	// 	);
	// 	if (priceDataCurrentToken.length > 0) {
	// 		return total.add(
	// 			new BigNumber(priceDataCurrentToken.usdRate).multipliedBy(new BigNumber(current.balance))
	// 		);
	// 	}
	// }, new BigNumber(0));
	// console.log(accountBalances);

	const membersFormated = accountMembers[0].map((memberAddress) => {
		return {
			address: memberAddress,
		};
	});

	const jointAccount = {
		approvalThreshold: accountConfig[0],
		isStatic: accountConfig[1] == 1,
		id: accountId,
		name: 'Wallet',
		isMemberOnlyDeposit: accountConfig[2] == 1,
		balances: accountBalancesFormated,
		motions: accountMotionDetails,
		members: membersFormated,
	};
	return jointAccount;
};
