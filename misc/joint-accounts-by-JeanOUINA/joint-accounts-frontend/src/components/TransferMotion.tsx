import { useRef, useState, useEffect } from 'react';
import { constant, wallet } from '@vite/vitejs';
import Modal from './Modal';
import TextInput, { TextInputRefObject } from './TextInput';
import JointContract from '../contracts/JointAccounts';
import { connect } from '../utils/globalContext';
import { validateInputs } from '../utils/misc';
import { toSmallestUnit } from '../utils/strings';
import { NULL, NULL_ADDRESS } from '../utils/constants';
import { State, TokenInfo } from '../utils/types';
import { INVALID_TOKENID, CANCELED } from '../utils/constants';
import { getTokens, waitResponse } from '../utils/viteScripts';
import Select from './Select';
import { getTicker } from '../utils/wallet';
import { balancesOf, getMembers } from '../utils/jointAccount';
import BigNumber from 'bignumber.js';
import Loading from './Loading';

type Props = State & {};

const TransferMotion = ({
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
	const [amount, amountSet] = useState('');
	const [beneficiaryType, setBeneficiaryType] = useState<'account'|'address'>('address');
	const [beneficiaryAddress, beneficiaryAddressSet] = useState('');
	const [beneficiaryAccountId, beneficiaryAccountIdSet] = useState('');
	const amountRef = useRef<TextInputRefObject>();
	const beneficiaryAddressRef = useRef<TextInputRefObject>();
	const beneficiaryAccountIdRef = useRef<TextInputRefObject>();


	useEffect(() => {
		let cancel = false

		;(async () => {
			setTokens('loading')
			setMembers('loading')

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
                })
			])
		
		})()
		return () => {
			cancel = true
		}
	}, [viteApi, networkType, accountId])

	if(tokens === 'loading' || members === 'loading')return <Loading/>

	return (
		<div className="flex flex-col gap-4">
			<p className="text-2xl">{i18n.transfer}</p>
			<Select options={tokens.map(token => {
				return {
					label: i18n.tokenName
						.replace('{name}', token.tokenName)
						.replace('{ticker}', getTicker(token)),
					value: token.tokenId
				}
			})} label={i18n.token} selected={tokenId} onChange={selected => {
				tokenIdSet(selected)
			}} id='tokens-select'/>
			<TextInput
				numeric
				_ref={amountRef}
				disabled={!vcInstance}
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
			<Select
				options={[
					{
						value: 'address',
						label: i18n.EOA
					},
					{
						value: 'account',
						label: i18n.jointAccount
					},
				]}
				selected={beneficiaryType}
				label={i18n.beneficiaryType}
				onChange={(value) => {
					setBeneficiaryType(value as any)
				}}
				id="beneficiary-type-select"
			/>
			{beneficiaryType === 'address' ? <TextInput
				_ref={beneficiaryAddressRef}
				label={i18n.beneficiaryAddress}
				value={beneficiaryAddress}
				onUserInput={(v) => beneficiaryAddressSet(v.trim())}
				getIssue={(v) => {
					if (!wallet.isValidAddress(v)) {
						return i18n.invalidAddress;
					}
				}}
			/> : <TextInput
				numeric
				_ref={beneficiaryAccountIdRef}
				label={i18n.beneficiaryAccountId}
				maxDecimals={18}
				value={beneficiaryAccountId}
				onUserInput={(v) => beneficiaryAccountIdSet(v.trim())}
				getIssue={(v) => {
					if (+v < 0) {
						return i18n.amountMustBePositive;
					}
					if (+v % 1 !== 0) {
						return i18n.positiveIntegersOnly;
					}
				}}
			/>}
			<button
				className={`${
					vcInstance ? 'bg-skin-medlight brightness-button' : 'bg-gray-400'
				} h-8 px-3 rounded-md font-semibold text-white shadow`}
				disabled={!vcInstance}
				onClick={async () => {
					try {
						if (validateInputs([
							amountRef,
							beneficiaryType === 'address' ?
								beneficiaryAddressRef :
								beneficiaryAccountIdRef
						])) {
							const tokenInfo = tokens.find(e => e.tokenId === tokenId)!;
							const smallestUnitAmount = toSmallestUnit(amount, tokenInfo.decimals);

							const balances = await balancesOf(
								viteApi,
								JointContract.address[networkType],
								JointContract.abi,
								accountId,
								[tokenId]
							)
							const balance = new BigNumber(balances[0])
							if (balance.isGreaterThanOrEqualTo(smallestUnitAmount)) {
								promptTxConfirmationSet(true);
								const {hash} = await callContract(JointContract, 'createTransferMotion', [
									accountId,
									tokenId,
									smallestUnitAmount,
									beneficiaryType === 'address' ? beneficiaryAddress : NULL_ADDRESS,
									beneficiaryType === 'account' ? beneficiaryAccountId : NULL,
								]);
								await waitResponse(viteApi, hash!)
								setState({
									toast: i18n.transactionConfirmed,
								});
								beneficiaryAddressSet('');
								promptTxConfirmationSet(false);
							} else {
								setState({ toast: i18n.insufficientBalance });
							}
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
				{i18n.createMotion}
			</button>
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

export default connect(TransferMotion);
