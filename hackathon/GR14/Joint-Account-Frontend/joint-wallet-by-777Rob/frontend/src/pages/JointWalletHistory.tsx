import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';

type Props = State & {};

const JointWalletHistory = ({ i18n }: Props) => {
	useTitle('Wallet history');
	return (
		<div className="">
			<p>_____</p>
		</div>
	);
};

export default connect(JointWalletHistory);
