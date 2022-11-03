import { useRef, useState } from 'react';
import Modal from './Modal';
import TextInput, { TextInputRefObject } from './TextInput';
import JointContract from '../contracts/JointAccounts';
import { connect } from '../utils/globalContext';
import { validateInputs } from '../utils/misc';
import { State } from '../utils/types';
import { CANCELED } from '../utils/constants';
import { getLogsByAccountBlock, waitResponse } from '../utils/viteScripts';
import MemberCard from './MemberCard';
import MemberInputCard from './MemberInputCard';
import Switch from './Switch';

type Props = State & {};

const NewAccount = ({ i18n, viteApi, vcInstance, callContract, setState }: Props) => {
	const [promptTxConfirmation, promptTxConfirmationSet] = useState(false);
	const [threshold, thresholdSet] = useState('');
	const [members, membersSet] = useState<string[]>([]);
	const thresholdRef = useRef<TextInputRefObject>();
	const [staticAcconut, setStaticAccount] = useState<boolean>(false);
	const [depositPermission, setDepositPermission] = useState<boolean>(false);

	return (
		<>
			<p className="text-2xl">{i18n.createAccount}</p>
			{members.length > 0 && (
				<div className="bg-skin-middleground rounded-md p-8">
					<span className="font-bold">{members.length} Members</span>
					{members.map((member, i) => {
						return <MemberCard
							key={i}
							member={member}
							onRemove={() => {
								membersSet([
									...members.slice(0, i),
									...members.slice(i+1)
								])
							}}
						/>
					})}
				</div>
			)}
			<MemberInputCard onAddMember={(member:string) => {
				membersSet([
					...members,
					member
				])
			}} members={members} address={vcInstance?.accounts[0]}/>

            <div className="bg-skin-middleground rounded-md p-8">
				<TextInput
					numeric
					_ref={thresholdRef}
					label={i18n.threshold}
					value={threshold}
					maxDecimals={18}
					onUserInput={(v) => thresholdSet(v)}
					getIssue={(v) => {
						if (+v <= 0) {
							return i18n.amountMustBePositive;
						}
						if (+v % 1 !== 0) {
							return i18n.positiveIntegersOnly;
						}
						if (+v > members.length) {
							return i18n.thresholdTooBig;
						}
					}}
				/>
				<div className='mt-5'>
					<Switch value={staticAcconut} setValue={value => {
						setStaticAccount(value)
					}}>
						{i18n.staticAccount}
					</Switch>
				</div>
				<div>
					<Switch value={depositPermission} setValue={value => {
						setDepositPermission(value)
					}}>
						{i18n.memberDepositOnly}
					</Switch>
				</div>
            </div>
			<div className="flex flex-col gap-4">
				<button
					className={`${
						vcInstance ? 'bg-skin-medlight brightness-button' : 'bg-gray-400'
					} h-8 px-3 rounded-md font-semibold text-white shadow`}
					disabled={!vcInstance}
					onClick={async () => {
						try {
							if(!members.length){
								setState({
									toast: i18n.emptyMembersList
								})
								return
							}
							if (validateInputs([thresholdRef])) {
								promptTxConfirmationSet(true);
								const {hash} = await callContract(JointContract, 'createAccount', [
									members,
									threshold,
									staticAcconut,
									depositPermission,
								]);
								const receiveBlock = await waitResponse(viteApi, hash!)
								
								const events = await getLogsByAccountBlock(
									viteApi,
									receiveBlock.hash,
									JointContract.abi,
									'AccountCreated'
								);

								const event = events.filter(
									(item) => item.returnValues['1'] === vcInstance?.accounts[0]
								)[0];
								setState({
									accountId: event.returnValues.accountId,
									toast: i18n.transactionConfirmed,
								});
								thresholdSet('');
								promptTxConfirmationSet(false);
							}
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
					{i18n.createAccount}
				</button>
			</div>
			{!!promptTxConfirmation && (
				<Modal onClose={() => promptTxConfirmationSet(false)}>
					<p className="text-center text-lg font-semibold">
						{i18n.confirmTransactionOnYourViteWalletApp}
					</p>
				</Modal>
			)}
		</>
	);
};

export default connect(NewAccount);
