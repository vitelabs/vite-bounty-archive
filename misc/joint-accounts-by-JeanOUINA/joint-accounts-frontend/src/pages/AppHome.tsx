import NewAccount from '../components/NewAccount';
import Access from '../components/Access';
import Deposit from '../components/Deposit';
import TransferMotion from '../components/TransferMotion';
import TabNavigation from '../components/TabNavigation';
import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';
import AccountInfo from '../components/AccountInfo';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import Motions from '../components/Motions';

type Props = State & {};

const AppHome = ({
	i18n,
	setState,
	accountId,
	activeTab,
}: Props) => {
	useTitle(i18n.app);

	return (
		<div className="space-y-4 max-w-3xl mx-auto">
			{accountId && (
				<div className="flex justify-end font-bold">
					<p>
						{i18n.account} {accountId}
					</p>
					<button
						className={'h-6 w-6 ml-1 brightness-button font-extrabold transition duration-200 text-red-400'}
						onClick={() => {
							setState({
								accountId: null as unknown as string,
								activeTab: i18n.accessAccount
							});
						}}
					>
						<ArrowRightOnRectangleIcon className="text-inherit" />
					</button>
				</div>
			)}
			{accountId ? (
				<TabNavigation
					tabNames={[
						i18n.account,
						i18n.motions,
						i18n.deposit,
						i18n.transfer
					]}
					defaultTab={i18n.account}
				/>
			) : (
				<TabNavigation tabNames={[
					i18n.accessAccount,
					i18n.createAccount
				]} defaultTab={i18n.accessAccount} />
			)}
			{activeTab === i18n.accessAccount && <Access />}
			{activeTab === i18n.createAccount && <NewAccount />}
			{accountId && activeTab === i18n.account && <AccountInfo />}
			{accountId && activeTab === i18n.motions && <Motions />}
			{accountId && activeTab === i18n.deposit && <Deposit />}
			{accountId && activeTab === i18n.transfer && <TransferMotion />}
		</div>
	);
};

export default connect(AppHome);
