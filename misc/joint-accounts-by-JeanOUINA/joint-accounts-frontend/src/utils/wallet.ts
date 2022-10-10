// @ts-nocheck

import { toBiggestUnit } from './strings';
import { TokenInfo, ViteBalanceInfo } from './types';

export const getViteTokenBalance = (viteBalanceInfo: ViteBalanceInfo, tokenId: string) => {
	if (viteBalanceInfo.balance.balanceInfoMap) {
		const { balance, tokenInfo } = viteBalanceInfo.balance.balanceInfoMap[tokenId];
		return toBiggestUnit(balance, tokenInfo.decimals);
	}
	return '0';
};

export const getTicker = (tokenInfo: TokenInfo) => {
	if(tokenInfo.tokenSymbol === 'VITE')return 'VITE'
	return `${tokenInfo.tokenSymbol}-${(''+tokenInfo.index).padStart(3-tokenInfo.index.toString(), '0')}`
}