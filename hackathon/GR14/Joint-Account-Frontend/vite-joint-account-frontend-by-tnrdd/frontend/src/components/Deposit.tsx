import { useRef, useState } from 'react';
import Modal from './Modal';
import TextInput, { TextInputRefObject } from './TextInput';
import JointContract from '../contracts/JointAccounts';
import { connect } from '../utils/globalContext';
import { validateInputs } from '../utils/misc';
import { toSmallestUnit } from '../utils/strings';
import { State } from '../utils/types';
import { INVALID_TOKENID, CANCELED } from '../utils/constants';

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
	const [tokenId, tokenIdSet] = useState('');
	const [amount, amountSet] = useState('');
	const tokenIdRef = useRef<TextInputRefObject>();
	const amountRef = useRef<TextInputRefObject>();

	return (
		<div className="flex flex-col gap-4">
			<p className="text-2xl">Deposit to the Joint Account</p>
			<TextInput
				_ref={tokenIdRef}
				disabled={!vcInstance}
				label={i18n.tokenId}
				value={tokenId}
				onUserInput={(v) => tokenIdSet(v.trim())}
			/>
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
			<button
				className={`${
					vcInstance ? 'bg-skin-medlight brightness-button' : 'bg-gray-400'
				} h-8 px-3 rounded-md font-semibold text-white shadow`}
				disabled={!vcInstance}
				onClick={async () => {
					try {
						if (validateInputs([amountRef])) {
							const tokenInfo = await viteApi.request('contract_getTokenInfoById', tokenId);
							promptTxConfirmationSet(true);
							await callContract(
								JointContract,
								'deposit',
								[accountId],
								tokenId,
								toSmallestUnit(amount, tokenInfo.decimals)
							);
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
