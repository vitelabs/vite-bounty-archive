import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import DropdownButton from '../components/DropdownButton';
import Modal from '../components/Modal';
import QR from '../components/QR';
import { connect } from '../utils/globalContext';
import { shortenAddress } from '../utils/strings';
import { State } from '../utils/types';
import { initViteConnect } from '../utils/viteConnect';

type Props = State & {
	fontSize?: number
}

const ViteConnectButton = ({ setState, i18n, vcInstance, fontSize }: Props) => {
	const [connectURI, connectURISet] = useState('');

	useEffect(() => {
		if (vcInstance) {
			vcInstance.on('disconnect', () => setState({ vcInstance: null }));
		}
	}, [setState, vcInstance]);

	return vcInstance ? (
		<DropdownButton
			buttonJsx={<p>{shortenAddress(vcInstance.accounts[0])}</p>}
			dropdownJsx={
				<div className="fx px-2 py-0.5 h-7 gap-2">
					<ArrowRightOnRectangleIcon className="h-full text-skin-muted" />
					<button
						className="font-semibold"
						onClick={() => {
							vcInstance!.killSession();
							// setState({ accountId: undefined });
						}}
						onMouseDown={(e) => e.preventDefault()}
					>
						{i18n.logOut}
					</button>
				</div>
			}
		/>
	) : (
		<>
			<button
				className="bg-skin-medlight min-h-8 px-3 rounded-md brightness-button font-semibold text-white shadow"
				onClick={async () => {
					vcInstance = initViteConnect();
					connectURISet(await vcInstance.createSession());
					vcInstance.on('connect', () => {
						connectURISet('');
						setState({ vcInstance });
					});
				}}
			>
				<p style={fontSize ? {
					fontSize
				} : {}}>{i18n.connectWallet}</p>
			</button>
			{!!connectURI && (
				<Modal onClose={() => connectURISet('')}>
					<p className="text-center text-lg mb-3 font-semibold">{i18n.scanWithYourViteWalletApp}</p>
					<div className="xy">
						<QR data={connectURI} />
					</div>
				</Modal>
			)}
		</>
	);
};

export default connect(ViteConnectButton);
