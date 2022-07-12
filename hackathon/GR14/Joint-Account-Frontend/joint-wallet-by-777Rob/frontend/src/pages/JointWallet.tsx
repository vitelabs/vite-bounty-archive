import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';
import ButtonCard from 'components/ButtonCard';
import Tabs, { TabsProps } from '../components/Tabs';
import { FaWallet } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Outlet, useParams } from 'react-router-dom';

type Props = State & {};

const JointWallet = ({ i18n }: Props) => {
	const { id } = useParams();
	console.log('id:', id);

	const tabs = [
		{ name: 'Overview', link: `/app/wallet/${id}/dashboard` },
		{ name: 'Motions', link: `/app/wallet/${id}/motions` },
		{ name: 'Transaction history', link: `/app/wallet/${id}/history` },
	];

	return (
		<div>
			<Tabs
				tabs={tabs}
				className="ml-4"
				onTabChange={(newTab: string) => {
					console.log('newTab');
					console.log(newTab);
				}}
			/>
			{/* https://reactrouter.com/docs/en/v6/components/outlet */}
			<Outlet />
		</div>
	);
};

export default connect(JointWallet);
