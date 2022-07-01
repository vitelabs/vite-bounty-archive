import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { State } from '../utils/types';
import ViteLogo from './ViteLogo';
import { PlusIcon } from '@heroicons/react/solid';
import ViteConnectButton from '../containers/ViteConnectButton';
type Props = State & {};

const options = [
	{
		logo: <ViteLogo className="h-20 fill-blue-500" />,
	},
];

const LandingSignedOut = ({ i18n }: Props) => {
	useTitle('Connect');
	return (
		<div className="py-12">
			<div className="max-w-7xl mb-12 mx-auto px-4 sm:px-6 lg:px-8 text-center ">
				<h2 className="h-12 text-4xl font-bold font-sans decoration-neutral-700">{i18n.welcome}</h2>
				<h3 className="text-xl font-sans decoration-neutral-600 h-7">{i18n.connectWalletLong}</h3>
			</div>
			<div className="flex mx-auto">
				{options.map((option) => (
					<button className="mx-auto p-6 shadow-xl rounded-lg bg-skin-foreground items-center flex justify-center">
						{option.logo}
						<ViteConnectButton />
					</button>
				))}
			</div>
		</div>
	);
};

export default connect(LandingSignedOut);
