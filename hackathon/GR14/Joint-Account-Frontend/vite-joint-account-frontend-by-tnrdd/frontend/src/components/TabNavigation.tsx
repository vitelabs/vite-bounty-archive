import { useEffect } from 'react';
import { connect } from '../utils/globalContext';
import { State } from '../utils/types';

type Props = State & {
	tabNames: string[];
	defaultTab: string;
};

const TabNavigation = ({ tabNames, defaultTab, activeTab, setState }: Props) => {
	useEffect(() => {
		setState({ activeTab: defaultTab });
	}, [defaultTab, setState]);

	return (
		<div className="flex gap-4 bg-skin-middleground rounded-t-md shadow-md text-skin-muted">
			{tabNames.map((name, i) => {
				return (
					<div
						key={i}
						className={`p-2 font-bold cursor-pointer ${
							activeTab === name
								? 'border-b-4 border-skin-medlight text-skin-medlight'
								: 'border-b-0'
						}`}
						onClick={() => setState({ activeTab: name })}
					>
						{name}
					</div>
				);
			})}
		</div>
	);
};

export default connect(TabNavigation);
