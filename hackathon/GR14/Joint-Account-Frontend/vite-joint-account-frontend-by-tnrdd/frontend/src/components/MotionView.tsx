import { useRef, useState, useEffect, useCallback } from 'react';
import { wallet } from '@vite/vitejs';
import Modal from './Modal';
import TextInput, { TextInputRefObject } from './TextInput';
import JointContract from '../contracts/JointAccounts';
import { connect } from '../utils/globalContext';
import { validateInputs } from '../utils/misc';
import { toSmallestUnit, toBiggestUnit } from '../utils/strings';
import { NULL } from '../utils/constants';
import { State } from '../utils/types';
import { INVALID_TOKENID, CANCELED } from '../utils/constants';
import { getPastEvents, getContractState } from '../utils/viteScripts';

type Props = State & {};
type Motion = {
	threshold?: string;
	id?: string;
	proposer?: string;
	to?: string;
	tokenId?: string;
	transferAmount?: string;
	votes?: string | null;
};

const MotionView = ({
	i18n,
	viteApi,
	networkType,
	vcInstance,
	callContract,
	setState,
	accountId,
}: Props) => {
	const [promptTxConfirmation, promptTxConfirmationSet] = useState(false);
	const [motion, motionSet] = useState<Motion>({});
	const [tokenId, tokenIdSet] = useState('');
	const [amount, amountSet] = useState('');
	const [beneficiaryAddress, beneficiaryAddressSet] = useState('');
	const tokenIdRef = useRef<TextInputRefObject>();
	const amountRef = useRef<TextInputRefObject>();
	const beneficiaryAddressRef = useRef<TextInputRefObject>();

	const updateMotionStatus = useCallback(async () => {
		const events = getPastEvents(
			viteApi,
			JointContract.address[networkType],
			JointContract.abi,
			'MotionCreated',
			{
				fromHeight: 0,
				toHeight: 0,
			}
		);
		const threshold = getContractState(
			viteApi,
			JointContract.address[networkType],
			JointContract.abi,
			'approvalThreshold',
			[accountId]
		);

		const results = await Promise.all([events, threshold]);
		const event = results[0].pop().returnValues;
		const active = await getContractState(
			viteApi,
			JointContract.address[networkType],
			JointContract.abi,
			'active',
			[accountId, event.motionId]
		);

		if (results[1]) {
			if (active && active[0] === '1') {
				const votes = await getContractState(
					viteApi,
					JointContract.address[networkType],
					JointContract.abi,
					'voteCount',
					[accountId, event.motionId]
				);
				const tokenInfo = await viteApi.request('contract_getTokenInfoById', event.tokenId);
				motionSet({
					threshold: results[1][0],
					id: event.motionId,
					proposer: event.proposer,
					to: event.to,
					tokenId: event.tokenId,
					transferAmount: toBiggestUnit(event.transferAmount, tokenInfo.decimals),
					votes: votes && votes[0],
				});
			} else {
				motionSet({});
			}
		}
	}, [networkType, viteApi, accountId]);

	useEffect(() => {
		updateMotionStatus();

		viteApi
			.subscribe('newVmLog', {
				addressHeightRange: {
					[JointContract.address[networkType]]: {
						fromHeight: '0',
						toHeight: '0',
					},
				},
			})
			.then((event: any) => {
				event.on(() => {
					updateMotionStatus();
				});
			});
	}, [networkType, updateMotionStatus, viteApi]);

	return (
		<div className="flex flex-col gap-4">
			<p className="text-2xl">Active motion</p>
			{motion.id ? (
				<div className="flex flex-col gap-4 bg-skin-middleground rounded-md p-4 break-all text-skin-secondary">
					<span>
						<b>Transfer</b> {motion.transferAmount} <b>of</b> {motion.tokenId}
					</span>
					<span>
						{' '}
						<b>to</b> {motion.to}
					</span>
					<span>
						{' '}
						<b>votes: </b>
						{motion.votes}/{motion.threshold}
					</span>
					<button
						className={`${
							vcInstance ? 'bg-skin-medlight brightness-button' : 'bg-gray-400'
						} h-8 px-3 rounded-md font-semibold text-white shadow`}
						disabled={!vcInstance}
						onClick={async () => {
							try {
								promptTxConfirmationSet(true);
								await callContract(JointContract, 'voteMotion', [accountId, motion.id]);
								setState({
									toast: i18n.transactionConfirmed,
								});
								promptTxConfirmationSet(false);
							} catch (err) {
								if (err instanceof Error) {
									console.error(err);
								} else {
									if (typeof err === 'object' && err !== null) {
										const error = err as any;
										if (error.message && error.code === CANCELED) {
											setState({ toast: i18n.canceled });
											promptTxConfirmationSet(false);
										}
									}
								}
							}
						}}
					>
						{i18n.vote}
					</button>
					<button
						className={`${
							vcInstance ? 'bg-red-500 brightness-button' : 'bg-gray-400'
						} h-8 px-3 rounded-md font-semibold text-white shadow`}
						disabled={!vcInstance}
						onClick={async () => {
							try {
								promptTxConfirmationSet(true);
								await callContract(JointContract, 'cancelMotion', [accountId, motion.id]);
								setState({
									toast: i18n.transactionConfirmed,
								});
								promptTxConfirmationSet(false);
							} catch (err) {
								if (err instanceof Error) {
									console.error(err);
								} else {
									if (typeof err === 'object' && err !== null) {
										const error = err as any;
										if (error.message && error.code === CANCELED) {
											setState({ toast: i18n.canceled });
											promptTxConfirmationSet(false);
										}
									}
								}
							}
						}}
					>
						{i18n.cancelMotion}
					</button>
				</div>
			) : (
				<p>No active motion...</p>
			)}
			<p className="text-2xl">Create a new motion</p>
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
			<TextInput
				_ref={beneficiaryAddressRef}
				disabled={!vcInstance}
				label={i18n.beneficiaryAddress}
				value={beneficiaryAddress}
				onUserInput={(v) => beneficiaryAddressSet(v.trim())}
				getIssue={(v) => {
					if (!wallet.isValidAddress(v)) {
						return i18n.invalidAddress;
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
						if (validateInputs([tokenIdRef, amountRef, beneficiaryAddressRef])) {
							const tokenInfo = await viteApi.request('contract_getTokenInfoById', tokenId);
							const smallestUnitAmount = toSmallestUnit(amount, tokenInfo.decimals);

							const balance = await getContractState(
								viteApi,
								JointContract.address[networkType],
								JointContract.abi,
								'balanceOf',
								[accountId, tokenId]
							);
							if (balance && parseInt(balance[0]) >= parseInt(smallestUnitAmount)) {
								promptTxConfirmationSet(true);
								await callContract(JointContract, 'createTransferMotion', [
									accountId,
									tokenId,
									smallestUnitAmount,
									beneficiaryAddress,
									NULL,
								]);
								setState({
									toast: i18n.transactionConfirmed,
								});
								tokenIdSet('');
								amountSet('');
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

export default connect(MotionView);
