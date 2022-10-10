import { useEffect, useMemo, useState } from 'react';
import { connect } from '../utils/globalContext';
import { balancesOf } from '../utils/jointAccount';
import JointContract from '../contracts/JointAccounts';
import { State, TokenInfo } from '../utils/types';
import BigNumber from 'bignumber.js';
import { getTicker } from '../utils/wallet';
import { getTokens } from '../utils/viteScripts';
import Loading from './Loading';

type Props = State & {

}

const Balances = ({viteApi, i18n, accountId, networkType}: Props) => {
	const [balances, setBalances] = useState<'loading'|[
		string,
		TokenInfo
	][]>('loading')
	useEffect(() => {
		let cancel = false

		;(async () => {
			setBalances('loading')

			const contractAddress = JointContract.address[networkType];
			const tokens = await getTokens(viteApi)
			if(cancel)return

			const balances = await balancesOf(
				viteApi,
				contractAddress,
				JointContract.abi,
				accountId,
				tokens.map(e => e.tokenId)
			)
			if(cancel)return
			
			setBalances(tokens.map((token, i) => {
				return [
					balances[i],
					token
				] as [string, TokenInfo]
			}).filter(e => {
				if(e[1].tokenSymbol === 'VITE')return true
				if(e[0] === '0')return false
				return true
			}))
		})()
		return () => {
			cancel = true
		}
	}, [accountId, networkType, viteApi])

	const formattedBalances = useMemo(() => {
		if(balances === 'loading')return
		return balances.map(balance => {
			return [
				new BigNumber(balance[0])
					.shiftedBy(-balance[1].decimals)
					.toFixed(),
				balance[1]
			] as [string, TokenInfo]
		})
	}, [balances])

	if(!formattedBalances)return <Loading/>

	return (
		<table className="table-auto w-full mt-5">
			<thead>
				<tr>
				<th className="border px-4 py-2">{i18n.token}</th>
				<th className="border px-4 py-2">{i18n.amount}</th>
				</tr>
			</thead>
			<tbody>
				{formattedBalances.map((balance, i) => {
					const ticker = getTicker(balance[1])
					return <tr key={i}>
						<td className="border px-4 py-2">
							{
								i18n.tokenName
								.replace('{name}', balance[1].tokenName)
								.replace('{ticker}', ticker)
							}
						</td>
						<td className="border px-4 py-2">
							{
								i18n.amountTicker
								.replace('{amount}', balance[0])
								.replace('{ticker}', ticker)
							}
						</td>
					</tr>
				})}
			</tbody>
		</table>
	);
};

export default connect(Balances);
