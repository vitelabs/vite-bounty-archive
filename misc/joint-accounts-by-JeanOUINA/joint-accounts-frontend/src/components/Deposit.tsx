import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from './Modal';
import TextInput, { TextInputRefObject } from './TextInput';
import JointContract from '../contracts/JointAccounts';
import { connect } from '../utils/globalContext';
import { validateInputs } from '../utils/misc';
import { toSmallestUnit } from '../utils/strings';
import { State, TokenInfo } from '../utils/types';
import { INVALID_TOKENID, CANCELED } from '../utils/constants';
import { getTokens, waitResponse } from '../utils/viteScripts';
import { getAccountsByIds, getMembers, JointAccount } from '../utils/jointAccount';
import Select from './Select';
import { getTicker } from '../utils/wallet';
import { constant } from '@vite/vitejs';
import Loading from './Loading';

type Props = State & {};

const Deposit = ({
	i18n,
	viteApi,
	networkType,
	vcInstance,
	callContract,
	setState,
	accountId,
}: Props) => {
	const [promptTxConfirmation, promptTxConfirmationSet] = useState(false);
	const [tokenId, tokenIdSet] = useState(constant.Vite_TokenId);
	const [tokens, setTokens] = useState<'loading'|TokenInfo[]>('loading')
	const [members, setMembers] = useState<'loading'|string[]>('loading')
	const [account, setAccount] = useState<'loading'|JointAccount>('loading')
	const [amount, amountSet] = useState('');
	const amountRef = useRef<TextInputRefObject>();

	useEffect(() => {
		let cancel = false

		;(async () => {
			setTokens('loading')
			setMembers('loading')
			setAccount('loading')

			const contractAddress = JointContract.address[networkType];	
			await Promise.all([
				getTokens(viteApi)
				.then(tokens => {
					if(cancel)return
					setTokens(tokens)
				}),
                getMembers(
                    viteApi,
                    contractAddress,
                    JointContract.abi,
                    accountId
                ).then(members => {
                    if(cancel)return

			        setMembers(members)
                }),
				getAccountsByIds(
                    viteApi,
                    contractAddress,
                    JointContract.abi,
                    [accountId],
					constant.Vite_TokenId
				).then(accounts => {
                    if(cancel)return

					setAccount(accounts[0])
				})
			])
		
		})()
		return () => {
			cancel = true
		}
	}, [viteApi, networkType, accountId])
	const canDeposit = useMemo(() => {
		if(members === 'loading' || account === 'loading')return false
		if(!vcInstance?.accounts[0])return false
		if(account.isMemberOnlyDeposit){
			if(!members.includes(vcInstance?.accounts[0]))return false
		}
		return true
	}, [members, account, vcInstance])

	if(tokens === 'loading' || members === 'loading' || account === 'loading')return <Loading/>

	return (
		<div className="flex flex-col gap-4">
			<p className="text-2xl">{i18n.deposit}</p>
			<Select options={tokens.map(token => {
				return {
					label: `${token.tokenName} (${getTicker(token)})`,
					value: token.tokenId
				}
			})} label={i18n.token} selected={tokenId} onChange={selected => {
				tokenIdSet(selected)
			}}/>
			<TextInput
				numeric
				_ref={amountRef}
				label={i18n.amount}
				value={amount}
				maxDecimals={18}
				onUserInput={(v) => amountSet(v)}
				getIssue={(v) => {
					if (+v <= 0) {
						return i18n.amountMustBePositive;
					}
					if (+v % 1 !== 0) {
						return i18n.positiveIntegersOnly;
					}
				}}
			/>
			<button
				className={`${
					canDeposit ? 'bg-skin-medlight brightness-button' : 'bg-gray-400'
				} h-8 px-3 rounded-md font-semibold text-white shadow`}
				disabled={!canDeposit}
				onClick={async () => {
					try {
						if (validateInputs([amountRef])) {
							const tokenInfo = await viteApi.request('contract_getTokenInfoById', tokenId);
							promptTxConfirmationSet(true);
							const {hash} = await callContract(
								JointContract,
								'deposit',
								[accountId],
								tokenId,
								toSmallestUnit(amount, tokenInfo.decimals)
							);
							await waitResponse(viteApi, hash!)
							setState({
								toast: i18n.transactionConfirmed,
							});
							amountSet('');
							promptTxConfirmationSet(false);
						}
					} catch (err) {
						if (err instanceof Error) {
							console.error(err);
						} else {
							if (typeof err === 'object' && err !== null) {
								const error = err as any;
								if (error.error && error.error.code === INVALID_TOKENID) {
									setState({ toast: i18n.invalidTokenId });
								} else if (error.message && error.code === CANCELED) {
									setState({ toast: i18n.canceled });
									promptTxConfirmationSet(false);
								}
							}
						}
					}
				}}
			>
				{i18n.deposit}
			</button>
			{vcInstance && account.isMemberOnlyDeposit && !canDeposit && <p
				className='text-center text-lg'
			>
				{i18n.memberDepositOnlyError}
			</p>}
			{!!promptTxConfirmation && (
				<Modal onClose={() => promptTxConfirmationSet(false)}>
					<p className="text-center text-lg font-semibold">
						{i18n.confirmTransactionOnYourViteWalletApp}
					</p>
				</Modal>
			)}
		</div>
	);
};

export default connect(Deposit);
