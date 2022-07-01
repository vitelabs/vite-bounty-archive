import { NetworkTypes } from 'utils/types';
import { connect, setStateType } from 'utils/globalContext';

function Avnetworks(networkTypes: [NetworkTypes, string][], setState: setStateType) {
	return () => {
		return (
			<>
				{networkTypes.map(([networkType, label]) => {
					const active = (localStorage.networkType || 'testnet') === networkType;
					return (
						<button
							key={networkType}
							className={`fx px-2 w-full text-skin-primary font-bold h-7 bg-skin-foreground brightness-button ${
								active ? 'text-skin-highlight' : ''
							}`}
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => {
								localStorage.networkType = networkType;
								setState({ networkType });
							}}
						>
							{label}
						</button>
					);
				})}
			</>
		);
	};
}

export default Avnetworks;
