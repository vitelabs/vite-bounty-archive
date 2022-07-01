import { useState } from 'react';
import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';
import { JointAccountContract } from '../contracts/JointAccounts';
import { TiDelete } from 'react-icons/ti';
import { BsFillFileMinusFill, BsFillPlusSquareFill } from 'react-icons/bs';
import { FaMinusSquare } from 'react-icons/fa';
import { MinusIcon } from '../assets/MinusIcon';
import { PlusIcon } from '../assets/PlusIcon';
type Props = State & {};

type JointAccountMember = {
	name: string;
	walletAddress: string;
};

type JointAccountProps = {
	// [key: string]: string;
	walletName: string;
	isMemberOnlyDeposit: boolean;
	isStatic: boolean;
	approvalThreshold: number;
	members: JointAccountMember[];
};

type ErrorsType = {
	walletName?: null | string;
	isMemberOnlyDeposit?: null | string;
	isStatic?: null | string;
	approvalThreshold?: null | string;
	member?: null | string;
};
const CreateJointWallet = ({ i18n, viteApi, callContract, setState, vcInstance }: Props) => {
	useTitle('Wallet create');
	const [jointAccountProps, setJointAccountProps] = useState<JointAccountProps>({
		walletName: '',
		isMemberOnlyDeposit: true,
		isStatic: true,
		approvalThreshold: 0,
		members: [],
	});

	const [activeErrors, setActiveErrors] = useState<ErrorsType>({
		walletName: null,
		isMemberOnlyDeposit: null,
		isStatic: null,
		approvalThreshold: null,
		member: null,
	});

	const [loading, setLoading] = useState(false);

	const [member, setMember] = useState<JointAccountMember>({
		name: `Account_${(Math.random() * 100000).toFixed(0)}`,
		walletAddress: vcInstance?.accounts[0],
	});

	return (
		<div className="text-center">
			<p className="text-2xl mb-3 font-semibold">Creating new joint account</p>
			<p className="text-xl mb-10 font-normal">You can add any number of members</p>
			<div className="card text-center ">
				<form
					onSubmit={async (e: React.SyntheticEvent) => {
						e.preventDefault();
						setLoading(true);
						console.log(jointAccountProps.members.map((member) => member.walletAddress));
						await callContract(JointAccountContract, 'createAccount', [
							jointAccountProps.members.map((member) => member.walletAddress),
							jointAccountProps.approvalThreshold,
							jointAccountProps.isStatic,
							jointAccountProps.isMemberOnlyDeposit,
						]);

						setState({ toast: i18n.transactionConfirmed });
						setLoading(false);
					}}
					className="grid grid-cols-1 gap-2 mt-4 sm:grid-cols-6 text-xl"
				>
					<div className="col-span-6 text-left">
						<label className="font-semibold text-xl">Account Name</label>
						<input
							value={jointAccountProps.walletName}
							onChange={(e) =>
								setJointAccountProps({
									...jointAccountProps,
									walletName: e.target.value,
								})
							}
							name="walletName"
							type="text"
							className="text-input"
						/>
						<div className="text-sm text-red-500 mt-1">{activeErrors.walletName}</div>
					</div>

					<div className="text-left col-span-3 flex flex-col space-y-1.5" role="radiogroup">
						<legend className={`font-medium text-xl`}>Who are allowed to deposit</legend>
						<div
							onClick={() => {
								setJointAccountProps({
									...jointAccountProps,
									isMemberOnlyDeposit: true,
								});
							}}
							className="inline-flex items-center space-x-1.5"
						>
							<input
								// value={jointAccountProps.isMemberOnlyDeposit}
								id="basic1"
								type="radio"
								checked={jointAccountProps.isMemberOnlyDeposit}
								name="isMemberOnlyDeposit"
								className={`${jointAccountProps.isStatic && 'bg-skin-highlight'}`}
							/>
							<label className="cursor-pointer truncate text-lg font-medium text-gray-500">
								{i18n.members}
							</label>
						</div>

						<div
							onClick={() => {
								setJointAccountProps({
									...jointAccountProps,
									isMemberOnlyDeposit: false,
								});
							}}
							className="inline-flex items-center space-x-1.5"
						>
							<input
								checked={!jointAccountProps.isMemberOnlyDeposit}
								type="radio"
								name="everyoneCanDeposit"
								className="radio-input"
							/>
							<label className="cursor-pointer truncate text-lg font-medium text-gray-500">
								{i18n.everyone}
							</label>
						</div>
					</div>

					<div className="text-left col-span-3 flex flex-col space-y-1.5 mb-12" role="radiogroup">
						<legend className="font-medium   text-xl">Mutability</legend>{' '}
						<div
							onClick={() => {
								setJointAccountProps({ ...jointAccountProps, isStatic: true });
							}}
							className="flex items-center space-x-1.5"
						>
							<input
								checked={jointAccountProps.isStatic}
								id="basic1"
								type="radio"
								name="accountIsStatic"
								className="radio-input"
							/>
							<label className="cursor-pointer truncate text-lg font-medium text-gray-500">
								{i18n.static}
							</label>
						</div>
						<div
							onClick={() => {
								setJointAccountProps({ ...jointAccountProps, isStatic: false });
							}}
							className="inline-flex items-center space-x-1.5"
						>
							<input
								checked={!jointAccountProps.isStatic}
								id="basic2"
								type="radio"
								name="accountIsVariable"
								className="radio-input"
							/>
							<label className="cursor-pointer truncate text-lg font-medium text-gray-500">
								{i18n.variable}
							</label>
						</div>
					</div>

					<h4 className="col-span-6 text-center font-semibold  text-2xl mb-6">{i18n.addSigners}</h4>
					<div className="col-span-6 flex text-center items-center space-x-2">
						<div>
							<label className="font-semibold">{i18n.nick}</label>
							<input
								value={member.name}
								onChange={(e) =>
									setMember({
										name: e.target.value,
										walletAddress: member.walletAddress,
									})
								}
								id="username"
								name="memberName"
								type="text"
								className="text-input"
							/>
							<div className="text-xs text-red-500 mt-1 h-2"></div>
						</div>
						<div className="flex-grow">
							<label className="font-semibold">{i18n.walletAddress}</label>
							<input
								value={member.walletAddress}
								onChange={(e) =>
									setMember({
										name: member.name,
										walletAddress: e.target.value,
									})
								}
								id="newMember"
								type="text"
								className="text-input"
							/>
							<div className="text-sm text-red-500 mb-1  h-2">
								{activeErrors.member !== null &&
									activeErrors.member !== undefined &&
									activeErrors.member}
							</div>
						</div>
						<div
							onClick={addNewMember}
							className="bg-skin-highlight mt-6 cursor-pointer rounded-md p-2 text-white text-2xl "
						>
							<PlusIcon className="w-5" />
						</div>
					</div>

					{jointAccountProps.members.map((member, i) => (
						<div className="col-span-6 flex text-center items-center space-x-2 ">
							<div>
								<input
									id="username"
									type="text"
									name={`memberName-${i}`}
									value={member.name}
									className="text-input"
									disabled
								/>
							</div>
							<div className="flex-grow">
								<input
									id="walletaddress"
									name={`memberWallue-${i}`}
									value={member.walletAddress}
									type="text"
									disabled
									className="text-input text-gray-700 "
								/>
							</div>
							<div
								onClick={removeMember(member)}
								className="bg-red-600 rounded-md cursor-pointer p-2 text-white text-2xl "
							>
								<MinusIcon className="w-5" />
							</div>
						</div>
					))}

					<h4 className="col-span-6 mb-2 mt-5 text-center font-semibold">
						{i18n.votesForConfirmation}
					</h4>
					<div className="col-span-6 flex justify-center">
						<div className="flex w-35 border-glo shadow border-y-2 border-x-2 rounded-lg ">
							<MinusIcon
								onClick={incrementVotingTreshold()}
								className="w-5 cursor-pointer hover:bg-skin-base"
							/>
							<h1 className="text-2xl font-semibold flex-1 text-center w-10">
								{jointAccountProps.approvalThreshold}
							</h1>
							<PlusIcon
								onClick={decrementVotingTreshold()}
								className="w-5 cursor-pointer hover:bg-skin-base"
							/>
						</div>
					</div>

					<div className="col-span-6 mb-10">
						{i18n.max}: {jointAccountProps.members.length}
					</div>
					<div className="col-span-6">
						<button type="submit" className="primarybtn text-2xl">
							{loading ? 'Loading....' : 'Create Joint Account'}
						</button>
					</div>
				</form>
			</div>{' '}
		</div>
	);

	function decrementVotingTreshold() {
		return () => {
			console.log(jointAccountProps.members.length);
			const lessThanMemberCount =
				jointAccountProps.approvalThreshold < jointAccountProps.members.length;

			lessThanMemberCount &&
				setJointAccountProps({
					...jointAccountProps,
					approvalThreshold: jointAccountProps.approvalThreshold + 1,
				});
		};
	}

	function incrementVotingTreshold() {
		return () => {
			const moreThanOne = jointAccountProps.approvalThreshold - 1 > 0;
			moreThanOne &&
				setJointAccountProps({
					...jointAccountProps,
					approvalThreshold: jointAccountProps.approvalThreshold - 1,
				});
		};
	}

	function removeMember(member: JointAccountMember) {
		return () =>
			setJointAccountProps({
				...jointAccountProps,
				members: jointAccountProps.members.filter(
					(memberx) => memberx.walletAddress !== member.walletAddress
				),
			});
	}

	function addNewMember() {
		const addressLengthIsCorrect = member.walletAddress.length == 55;
		const existingWallet = jointAccountProps.members.find(
			(x: any) => x.walletAddress === member.walletAddress
		);

		console.log(existingWallet);
		if (!addressLengthIsCorrect) {
			setActiveErrors({
				...activeErrors,
				member: i18n.addressIncorect,
			});
			throw new Error(i18n.addressIncorect);
		} else if (existingWallet) {
			setActiveErrors({
				...activeErrors,
				member: i18n.alreadyAdded,
			});
			throw new Error(i18n.alreadyAdded);
		} else {
			setActiveErrors({ ...activeErrors, member: null });
			const membersMerged = [...jointAccountProps.members, member];

			setJointAccountProps({
				...jointAccountProps,
				members: membersMerged,
			});

			setMember({
				name: `Account_${(Math.random() * 100000).toFixed(0)}`,
				walletAddress: '',
			});
		}
	}
};

export default connect(CreateJointWallet);

type IconProps = {
	className?: string;
};
