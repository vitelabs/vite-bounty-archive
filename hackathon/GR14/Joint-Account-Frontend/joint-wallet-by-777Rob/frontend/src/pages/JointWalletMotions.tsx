import { useParams } from 'react-router-dom';
import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';
import LabelCard from 'components/LabelCard';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useJointAccountQuery } from 'graphql/generated/useJointAccount';
import { JointAccountContract } from 'contracts/JointAccounts';
import { MotionIcon } from 'assets/MotionIcon';
import { TrashIcons } from 'assets/TrashIcons';
import { NewMotionIcon } from 'assets/NewMotionIcon';
import { CornerIcon } from 'assets/CornerIcon.1';

enum ActionTypes {
	AddMember,
	RemoveMember,
	TransferFunds,
	Threshold,
}

type Props = State & {};

const ActionOptions = [
	{ name: 'Transfer Funds', type: ActionTypes.TransferFunds },
	{ name: 'Add Member', type: ActionTypes.AddMember },
	{ name: 'Remove Member', type: ActionTypes.RemoveMember },
	{ name: 'Change Threshold', type: ActionTypes.Threshold },
];

const JointWalletMotions = ({ i18n, callContract, setState }: Props) => {
	useTitle('Wallet Motions');
	const { id } = useParams();
	const accountId = id !== undefined ? parseInt(id) : 420;

	// Fetch data
	const { data, loading } = useJointAccountQuery({
		variables: {
			accountId: accountId,
		},
	});

	const [selected, setSelected] = useState(ActionOptions[0]);

	const [motionParams, setMotionParams] = useState({
		addressTo: '',
		viteTokenId: 'tti_5649544520544f4b454e6e40',
		amount: 1,
		address: '',
		newThreshold: 0,
		action: '',
	});

	return loading ? (
		<div>{i18n.loading}</div>
	) : (
		<div className="">
			<div className="grid gap-4 mx-4 mt-4 grid-cols-2">
				<LabelCard title="New Motion" svgIcon={NewMotionIcon}>
					<label className="text-xs font-medium text-gray-500">{i18n.motionPurpose} </label>
					<Listbox value={selected} onChange={setSelected}>
						<div className="relative mt-1">
							<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
								<span className="block truncate">{selected.name}</span>
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
								</span>
							</Listbox.Button>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options
									defaultValue="Select "
									className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
								>
									{ActionOptions.map((action) => (
										<Listbox.Option
											key={action.type}
											className={({ active }) =>
												`relative cursor-default hover:bg-skin-highlight rounded-lg hover:text-white select-none py-2 pl-10 pr-4 ${
													active ? 'bg-skin-highlight rounded-lg text-white' : ''
												}`
											}
											value={action}
										>
											{({ selected }) => (
												<>
													<span
														className={`block truncate ${
															selected ? 'font-medium  ' : 'font-normal'
														}`}
													>
														{action.name}
													</span>
													{selected ? (
														<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
															<CheckIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</Listbox>
					<div className="flex-col">
						<div className="text-xs font-medium text-gray-500">
							{selected === ActionOptions[0] && 'Address to'}
							{selected === ActionOptions[1] && 'Address Member'}
							{selected === ActionOptions[2] && 'Address Member'}
							{selected === ActionOptions[3] && 'Treshold amount'}
						</div>
					</div>

					{/* Transfer Funds */}

					{selected === ActionOptions[0] && (
						<div className="w-full space-y-1 border-y-2 border-x-2 rounded-xl p-2 focus:border-skin-lowlight">
							<input
								value={motionParams.addressTo}
								onChange={(e) => setMotionParams({ ...motionParams, addressTo: e.target.value })}
								placeholder={i18n.amountToTransfer}
								className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
							/>
							<div className="flex justify-end">
								<CornerIcon className="self-end" />
							</div>
						</div>
					)}

					{selected === ActionOptions[0] && (
						<>
							<div className="text-xs font-medium text-gray-500">Vite Token Id </div>
							<div className="w-full space-y-1 border-y-2 border-x-2 rounded-xl p-2 focus:border-skin-lowlight">
								<input
									value={motionParams.viteTokenId}
									onChange={(e) =>
										setMotionParams({ ...motionParams, viteTokenId: e.target.value })
									}
									placeholder="Vite token ID"
									className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
								/>
								<div className="flex justify-end">
									<CornerIcon className="self-end" />
								</div>
							</div>
						</>
					)}
					{selected === ActionOptions[0] && (
						<>
							<div className="text-xs font-medium text-gray-500">{i18n.amountToTransfer}</div>
							<div className="w-full space-y-1 border-y-2 border-x-2 rounded-xl p-2 focus:border-skin-lowlight">
								<input
									value={motionParams.amount}
									onChange={(e) =>
										setMotionParams({ ...motionParams, amount: parseInt(e.target.value) })
									}
									placeholder={i18n.beneficiaryAddress}
									className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
								/>
								<div className="flex justify-end">
									<CornerIcon className="self-end" />
								</div>
							</div>
						</>
					)}
					{selected === ActionOptions[3] && (
						<>
							<div className="text-xs font-medium text-gray-500">New approval treshold </div>
							<div className="w-full space-y-1 border-y-2 border-x-2 rounded-xl p-2 focus:border-skin-lowlight">
								<input
									value={motionParams.newThreshold}
									onChange={(e) =>
										setMotionParams({
											...motionParams,
											newThreshold: parseInt(e.target.value),
										})
									}
									placeholder={i18n.beneficiaryAddress}
									className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
								/>
								<div className="flex justify-end">
									<CornerIcon className="self-end" />
								</div>
							</div>
						</>
					)}

					{/* Add member */}
					{selected === ActionOptions[1] && (
						<>
							<label>Member Address</label>
							<div className="w-full space-y-1 border-y-2 border-x-2 rounded-xl p-2 focus:border-skin-lowlight">
								<input
									value={motionParams.address}
									onChange={(e) =>
										setMotionParams({ ...motionParams, address: e.target.value, action: 'Add' })
									}
									placeholder={i18n.memberAddress}
									className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
								/>
								<div className="flex justify-end">
									<CornerIcon className="self-end" />
								</div>
							</div>
						</>
					)}

					{/* Remove Member */}
					{selected === ActionOptions[2] && (
						<>
							<label>{i18n.memberAddress}</label>
							<div className="w-full space-y-1 border-y-2 border-x-2 rounded-xl p-2 focus:border-skin-lowlight">
								<input
									value={motionParams.address}
									onChange={(e) =>
										setMotionParams({ ...motionParams, address: e.target.value, action: 'Remove' })
									}
									placeholder={i18n.memberAddress}
									className="block w-full rounded-md border-gray-200 text-sm transition focus:border-blue-600 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
								/>
								<div className="flex justify-end">
									<CornerIcon className="self-end" />
								</div>
							</div>
						</>
					)}
					<div className="mt-30">
						<button
							className="primarybtn bottom-1"
							onClick={async () => {
								// const ActionOptions = [
								// 	{ name: 'Transfer Funds', type: ActionTypes.TransferFunds },
								// 	{ name: 'Add Member', type: ActionTypes.AddMember },
								// 	{ name: 'Remove Member', type: ActionTypes.RemoveMember },
								// 	{ name: 'Change Threshold', type: ActionTypes.Threshold },
								// ];
								// promptTxConfirmationSet(true);

								let option: any[] = [];
								let type = '';

								switch (selected) {
									case ActionOptions[0]:
										option = [
											id,
											motionParams.viteTokenId,
											motionParams.amount,
											motionParams.addressTo,
											id,
										];
										type = 'createTransferMotion';
										break;
									case ActionOptions[1]:
										option = [id, motionParams.address];
										type = 'createAddMemberMotion';
										break;
									case ActionOptions[2]:
										option = [id, motionParams.address];
										type = 'createRemoveMemberMotion';
										break;
									case ActionOptions[3]:
										option = [
											id,
											motionParams.viteTokenId,
											motionParams.addressTo,
											motionParams.amount,
										];
										type = 'createChangeThresholdMotion';
										break;
									case ActionOptions[4]:
										option = [id, motionParams.newThreshold];
										break;
									default:
										option = [];
										setState({ toast: 'Error' });
										break;
								}

								await callContract(JointAccountContract, type, option);
								setState({ toast: i18n.transactionConfirmed });
							}}
						>
							Create motion
						</button>
					</div>
				</LabelCard>

				<LabelCard svgIcon={MotionIcon} title="My Motions" className="gap-4">
					{data?.JointAccount?.motions?.map((motion) => (
						<div className="flex justify-between bg-skin-base  rounded-xl items-center p-3">
							<div className="flex">
								<div className="flex items-center">
									<div
										className={`object-cover w-8 h-8 mx-2 rounded-full 
									${motion?.approved === true && 'bg-green-500'} 
									${motion?.approved === false && 'bg-orange-500'}`}
									/>
									<div>
										<p className="text-md font-semibold">{motion?.proposer}</p>
										{/* <p className="text-sm -mt-2">{motion.proposerWallet}</p> */}
										<p className="text-md -mt-1 ">{motion?.type}</p>
									</div>
								</div>
							</div>

							<div className="flex items-center">
								<div className="cursor-pointer mr-4 text-center">
									<p className="font-bold">{i18n.votes}</p>
									<p>
										{motion?.voteCount}/{motion?.threshold}
									</p>
								</div>
								<div
									onClick={async () => {
										await callContract(JointAccountContract, 'cancelMotion', [
											motion?.accountId,
											motion?.index,
										]);
									}}
									className="cursor-pointer"
								>
									<TrashIcons />
								</div>
							</div>
						</div>
					))}{' '}
				</LabelCard>
			</div>
		</div>
	);
};

export default connect(JointWalletMotions);
