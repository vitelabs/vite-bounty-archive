import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';
import SettingsSelect from 'components/SettingsSelect';
type Props = State & {};

const Settings = ({ i18n }: Props) => {
	useTitle('Settings');
	return (
		<div className="">
			<p>
				<SettingsSelect />
			</p>
		</div>
	);
};

export default connect(Settings);
