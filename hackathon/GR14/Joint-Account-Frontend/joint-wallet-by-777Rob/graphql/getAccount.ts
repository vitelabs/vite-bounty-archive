import { BigNumber } from 'bignumber.js';
import { provider } from './index';

export const getAccount = async ({ address, fromHeight = 0, toHeight = 0 }) => {
	const balanceInfo: any = await provider.getBalanceInfo(address);

	let accountBalances: any = [];
	if (balanceInfo.balance.balanceInfoMap) {
		accountBalances = Object.values(balanceInfo.balance.balanceInfoMap).map((tokenInfo: any) => {
			return {
				name: tokenInfo.tokenInfo.tokenName,
				symbol: tokenInfo.tokenInfo.tokenSymbol,
				decimals: tokenInfo.tokenInfo.decimals,
				tokenId: tokenInfo.tokenInfo.tokenId,
				totalSupply: tokenInfo.tokenInfo.totalSupply,
				maxSupply: tokenInfo.tokenInfo.maxSupply,
				index: tokenInfo.tokenInfo.index,
				owner: tokenInfo.tokenInfo.owner,
				balance: tokenInfo.balance,
			};
		});
	}

	const account = {
		address: address,
		balances: accountBalances.filter((balanceInfo) => new BigNumber(balanceInfo.balance).gt(0)),
	};
	return account;
};
