import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';

type Props = State & {};

const About = ({ i18n }: Props) => {
	useTitle(i18n.about);
	return (
		<div className="space-y-4 max-w-3xl mx-auto">
			<h1 className="text-3xl mb-5">What's a Joint Account?</h1>
			<span>
				A Joint Account is an account shared by different members, it improves the security of the
				funds deposited in it because to move them a minimum number of members must agree.
				<br />
				You can create a Joint Account and use it in a few easy steps, get the{' '}
				<a
					className="text-skin-medlight"
					href="https://apps.apple.com/us/app/vite-multi-chain-wallet/id1437629486"
				>
					iOS
				</a>{' '}
				or{' '}
				<a
					className="text-skin-medlight"
					href="https://play.google.com/store/apps/details?id=net.vite.wallet"
				>
					Android
				</a>{' '}
				wallet and connect it to get started.
			</span>
			<div>
				<div>
					<div className="flex items-center mt-5">
						<span className="flex justify-center items-center w-10 h-10 ml-0.5 bg-skin-medlight rounded-full text-white text-2xl font-bold">
							1
						</span>
						<span className="ml-5 text-xl font-bold">Create an account</span>
					</div>
					<div className="ml-5 pl-10 border-l-4 border-skin-line-divider">
						Under the 'Create Account' tab you can choose how many votes will be needed to move the
						account funds via the 'Threshold' field. You can add how many members you wish by
						filling out the 'Member Address' field. When you
						are done press the 'Create Joint Account' button to create your account.
					</div>
				</div>
				<div>
					<div className="flex items-center">
						<span className="flex justify-center items-center w-10 h-10 ml-0.5 bg-skin-medlight rounded-full text-white text-2xl font-bold">
							2
						</span>
						<span className="ml-5 text-xl font-bold">Deposit funds</span>
					</div>
					<div className="ml-5 pl-10 border-l-4 border-skin-line-divider">
						You can deposit funds to the account from the 'Deposit' tab, choose the token you want
						to deposit by selecting the token into the 'Token' field.
						Then choose the amount of tokens you want to deposit via the
						'Amount' field and press the 'Deposit' button to make a deposit.
					</div>
				</div>
				<div>
					<div className="flex items-center">
						<span className="flex justify-center items-center w-10 h-10 ml-0.5 bg-skin-medlight rounded-full text-white text-2xl font-bold">
							3
						</span>
						<span className="ml-5 text-xl font-bold">Create a Transfer</span>
					</div>
					<div className="ml-5 pl-10 border-l-4 border-skin-line-divider">
						To move funds to a different address you can create a transfer motion from the 'Transfer' tab.
						Choose the token and the amount you want to move by selecting the token from the 'Token' field and
						filling out the 'Amount' field. Then enter the address you want to transfer funds to in the
						'Beneficiary address' field and press the 'Create Motion' button.
					</div>
				</div>
				<div>
					<div className="flex items-center">
						<span className="flex justify-center items-center w-10 h-10 ml-0.5 bg-skin-medlight rounded-full text-white text-2xl font-bold">
							4
						</span>
						<span className="ml-5 text-xl font-bold">Transfer funds</span>
					</div>
					<div className="ml-5 pl-10">
						When there is an active motion it will be displayed under the 'Motions' tab, if you are
						the creator of the motion your vote is already counted. Other members can vote in favor
						of the motion by pressing the 'Approve' button. You can cancel a motion only if you are
						the creator of it, to do so press the 'Cancel Motion' button.
					</div>
				</div>
			</div>
		</div>
	);
};

export default connect(About);
