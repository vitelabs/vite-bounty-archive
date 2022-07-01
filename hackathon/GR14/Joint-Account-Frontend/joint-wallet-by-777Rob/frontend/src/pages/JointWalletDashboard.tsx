import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';
import LabelCard from 'components/LabelCard';
import { useParams } from 'react-router-dom';
import { useJointAccountQuery } from 'graphql/generated/useJointAccount';
import { JointAccountContract } from 'contracts/JointAccounts';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { MessageIcon } from 'assets/MessageIcon';
import { LikeFilledIcon } from 'assets/LikeFilledIcon';
import { LikeIcon } from 'assets/LikeIcon';
import { PieChartIcon } from 'assets/PieChartIcon';
import { UserIcon } from 'assets/UserIcon';
import _ from 'lodash';
import { UsersIcon } from '../assets/UsersIcon';
type Props = State & {};

const JointWalletDashboard = ({ i18n, vcInstance, callContract }: Props) => {
	useTitle('Wallet dashboard');

	const { id } = useParams();
	const accountId = typeof id === 'string' ? parseInt(id) : 0;

	const { data, loading } = useJointAccountQuery({
		variables: {
			accountId: accountId,
		},
	});
	console.log(data);

	const [deposit, setDeposit] = useState({
		amount: 0,
		viteTokenId: 'tti_5649544520544f4b454e6e40',
	});

	const navigate = useNavigate();

	return loading ? (
		<div>{i18n.loading}</div>
	) : (
		<div className="grid gap-4 mx-4 mt-4 grid-cols-6">
			<LabelCard svgIcon={<UsersIcon />} className="col-span-3" title="Members">
				<div className="space-y-2 mt-3 ">
					{data?.JointAccount?.members?.map((user) => (
						<div className="flex justify-between bg-skin-base  rounded-xl items-center p-3">
							<div className="flex items-center">
								<UserIcon />
								<div>
									{/* <p className="text-lg font-semibold">{user.name}</p> */}
									<p className="text-sm font-bold ml-2">{user?.address}</p>
								</div>
							</div>
							<div className="cursor-pointer bg-skin-highlight text-white p-2 rounded-2xl">
								{MessageIcon}
							</div>
						</div>
					))}
					<div className="flex items-center justify-center">
						<button
							className="primarybtn  justify-self-center"
							onClick={() => navigate(`/app/wallet/${id}/motions`)}
						>
							{i18n.addSigners}
						</button>
					</div>
				</div>
			</LabelCard>

			<LabelCard svgIcon={<UsersIcon />} className="col-span-3" title="Motions">
				<div className="space-y-2 mt-3">
					{data?.JointAccount?.motions?.map((motion) => {
						let votedUp = _.find(motion?.votes, { address: vcInstance?.accounts[0], voted: true });
						// console.log('votedUp', votedUp, 'vcInstance?.accounts[0]', vcInstance?.accounts[0]);
						return (
							<div className="flex justify-between bg-skin-base  rounded-xl items-center p-3">
								<div className="flex">
									<div className="flex items-center">
										<div
											className={`object-cover w-8 h-8 mx-2 rounded-full 
										${motion?.approved === true && 'bg-green-500'} 
										${motion?.approved === false && 'bg-orange-500'}`}
										/>
										<div>
											<p className="text-sm font-semibold">
												{i18n.proposer}: {motion?.proposer}
											</p>
											<p className="text-sm -mt-1 ">
												{i18n.type}: {motion?.type}
											</p>
										</div>
									</div>
								</div>

								{votedUp ? (
									<div
										onClick={async () => {
											await callContract(JointAccountContract, 'cancelVote', [
												motion?.accountId,
												motion?.index,
											]);
										}}
										className="flex cursor-pointer"
									>
										<LikeFilledIcon />
									</div>
								) : (
									<div
										className="flex cursor-pointer"
										onClick={async () => {
											await callContract(JointAccountContract, 'voteMotion', [
												motion?.accountId,
												motion?.index,
											]);
										}}
									>
										<LikeIcon />
									</div>
								)}
							</div>
						);
					})}
					<div className="flex  items-center justify-center">
						<button
							className="primarybtn  justify-self-center"
							onClick={() => navigate(`/app/wallet/${id}/motions`)}
						>
							{i18n.createMotion}
						</button>
					</div>
				</div>
			</LabelCard>

			<LabelCard title="Account Statistic" svgIcon={PieChartIcon} className="col-span-3">
				<p className="text-xl font-bold">
					{i18n.treshold}: {data?.JointAccount?.approvalThreshold || 'Error fetching data'}
				</p>
				<p className="text-xl font-bold">
					{i18n.members}: {data?.JointAccount?.members?.length || 'Error fetching data'}
				</p>
				<p className="text-xl font-bold">
					{i18n.motions}: {data?.JointAccount?.motions?.length || 'Error fetching data'}
				</p>
			</LabelCard>

			<LabelCard title="Token balances" svgIcon={PieChartIcon} className="col-span-3">
				{data?.JointAccount?.balances?.map((balance) => (
					<div className="flex justify-between bg-skin-base rounded-xl items-center p-3">
						<div className="flex items-center gap-x-4 ml-4">
							<div>
								<p className="text-gray-500 text-xs font-extralight">{i18n.balance}</p>
								<p className="text-md font-bold">{balance?.balance}</p>
								<p className="text-gray-500 text-xs font-extralight">{i18n.symbol}</p>
								<p className=" text-bold ">{balance?.symbol}</p>
							</div>
							<div className="mb-1">
								<p className="text-gray-500 text-xs font-extralight">{i18n.name}</p>
								<p className="text-md font-bold">{balance?.name}</p>
								<p className="text-gray-500 text-xs font-extralight">Token ID</p>
								<p className="text-sm font-bold">{balance?.tokenId}</p>
							</div>
						</div>
					</div>
				))}
			</LabelCard>

			<LabelCard title="Deposit" svgIcon={<PlusCircleIcon />} className="col-span-3">
				<div>
					<div>
						<p className="text-gray-500 text-xs font-extralight">{i18n.amount}</p>
						<input
							value={deposit.amount}
							className="text-input"
							onChange={(e) => setDeposit({ ...deposit, amount: parseInt(e.target.value) })}
						/>
					</div>
					<div>
						<p className="text-gray-500 text-xs font-extralight">Token ID</p>
						<input
							className="text-input"
							value={deposit.viteTokenId}
							onChange={(e) => setDeposit({ ...deposit, viteTokenId: e.target.value })}
						/>
					</div>

					<div className="flex justify-center">
						<button
							className="primarybtn mt-2"
							onClick={async () =>
								await callContract(JointAccountContract, 'deposit', [
									deposit.amount,
									deposit.viteTokenId,
									accountId,
								])
							}
						>
							{i18n.deposit}
						</button>
					</div>
				</div>
			</LabelCard>
		</div>
	);
};

export default connect(JointWalletDashboard);
