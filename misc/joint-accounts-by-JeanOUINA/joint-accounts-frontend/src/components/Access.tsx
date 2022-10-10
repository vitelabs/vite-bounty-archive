import { useEffect, useMemo, useRef, useState } from 'react';
import TextInput, { TextInputRefObject } from './TextInput';
import JointContract from '../contracts/JointAccounts';
import { connect } from '../utils/globalContext';
import { validateInputs } from '../utils/misc';
import { State } from '../utils/types';
import { getContractState } from '../utils/viteScripts';
import { getAccountsByIds, getAccountsIdsByMember, JointAccount } from '../utils/jointAccount';
import * as vite from '@vite/vitejs'
import ViteConnectButton from '../containers/ViteConnectButton';
import AccountCard from './AccountCard';
import { useRefresh } from '../utils/hooks';
import Loading from './Loading';

const Access = ({ i18n, viteApi, networkType, vcInstance, setState }: State) => {
	const [accountId, accountIdSet] = useState('');
	const accountIdRef = useRef<TextInputRefObject>();
	// REVIEW: I would use `undefined` or `null` instead of `'loading'` and `!accounts` instead of `accounts === 'loading'` for the same effect. Less typing, harder to mess up. This applies to other files that use `'loading'` as well.
	const [accounts, setAccounts] = useState<'loading'|Error|JointAccount[]>(vcInstance?.accounts[0] ? [] : 'loading');
    const [accountsRefreshId, refreshAccounts] = useRefresh()

	const address = vcInstance?.accounts[0]
	useEffect(() => {
		let cancel = false;

		(async () => {
			if(!vcInstance)return setAccounts([])
			setAccounts('loading')

			const contractAddress = JointContract.address[networkType];
			
			const accountsIds = await getAccountsIdsByMember(
				viteApi,
				contractAddress,
				JointContract.abi,
				address
			)
			if(cancel)return
			
			const accounts = await getAccountsByIds(
				viteApi,
				contractAddress,
				JointContract.abi,
				accountsIds,
				vite.constant.Vite_TokenId
			);
			if(cancel)return

			setAccounts(accounts)
		})()
		.catch(err => {
			if(cancel)return
			console.error(err);
			setAccounts(err);
		})
		
		return () => {
			cancel = true;
		}
	}, [networkType, vcInstance, viteApi, address])

	const accountsComponent = useMemo(() => {
		if(!address)return <>
			<div className='mt-5'></div>
			<ViteConnectButton fontSize={30}/>
		</>
		if(accounts === 'loading')return <Loading/>
		if(accounts instanceof Error){
			return <p className='text-center mt-5 text-3xl'>
				{i18n.couldNotLoad.replace('{name}', 'accounts')}
			</p>
		}
		if(!accounts.length){
			return <>
				<p className='text-center mt-5 text-xl'>
					{i18n.noAccounts}
				</p>
				<button
					className='bg-skin-medlight min-h-8 px-3 rounded-md brightness-button font-semibold text-white shadow'
					onClick={async () => {
						setState({
							activeTab: i18n.createAccount
						})
					}}
				>
					<p style={{
						fontSize: 30
					}}>{i18n.createAccount}</p>
				</button>
			</>
		}

		return <div className='flex self-center flex-wrap gap-4 justify-center'>
			{accounts.sort((a, b) => {
				if(a.favorite && !b.favorite)return -1;
				if(!a.favorite && b.favorite)return 1;
				return Number(a.id) - Number(b.id);
			}).map(account => {
				return <AccountCard account={account} key={account.id} refresh={refreshAccounts}/>
			})}
		</div>
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accounts, address, i18n, setState, refreshAccounts, accountsRefreshId])

	return (
		<div className='flex flex-col gap-4'>
			<p className='text-2xl'>{i18n.accessAccount}</p>
			{accountsComponent}
			<p className={
				'text-center text-3xl text-skin-secondary'
			} style={{
				marginTop: address ? '1rem' : '15rem'
			}}>
				{i18n.orAccessAccountWithId}
			</p>
			<TextInput
				numeric
				_ref={accountIdRef}
				label={i18n.account}
				maxDecimals={18}
				value={accountId}
				onUserInput={(v) => accountIdSet(v)}
				getIssue={(v) => {
					if (+v < 0) {
						return i18n.amountMustBePositive;
					}
					if (+v % 1 !== 0) {
						return i18n.positiveIntegersOnly;
					}
				}}
			/>
			<button
				className='bg-skin-medlight brightness-button h-8 px-3 rounded-md font-semibold text-white shadow'
				onClick={async () => {
					try {
						if (validateInputs([accountIdRef])) {
							const contractAddress = JointContract.address[networkType];
							const exists = await getContractState(
								viteApi,
								contractAddress,
								JointContract.abi,
								'accountExists',
								[accountId]
							);

							if (exists && exists[0] === '0') {
								setState({
									toast: i18n.invalidAccountId,
								});
							} else {
								setState({
									accountId: accountId,
									activeTab: i18n.account
								});
							}
							accountIdSet('');
						}
					} catch (err) {
						if (err instanceof Error) {
							console.error(err);
						}
					}
				}}
			>
				{i18n.access}
			</button>
		</div>
	);
};

export default connect(Access);
