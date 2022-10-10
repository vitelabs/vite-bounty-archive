import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';
import HistoryEventRow from '../components/HistoryEventRow';
import Loading from '../components/Loading';
import JointContract from '../contracts/JointAccounts';
import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { Event, State, TokenInfo } from '../utils/types';
import { getPastEvents, getTokens } from '../utils/viteScripts';

type Props = State & {};

const History = ({ i18n, viteApi, networkType, setState }: Props) => {
	useTitle(i18n.history);
	const [events, eventsSet] = useState<Event[]>();
	const [tokens, setTokens] = useState<'loading'|Map<string, TokenInfo>>('loading');

	useEffect(() => {
		let cancel = false;

		(async () => {
			setTokens('loading')
			const tokens = await getTokens(viteApi)
			if(cancel)return;

			setTokens(new Map(tokens.map(e => [e.tokenId, e])));
		})();

		return () => {
			cancel = true;
		}
	}, [networkType, viteApi])

	const updateEvents = useCallback(() => {
		eventsSet(undefined);
		const contractAddress = JointContract.address[networkType];
		getPastEvents(
			viteApi,
			contractAddress,
			JointContract.abi,
			undefined,
			{
				fromHeight: 1,
				toHeight: 0,
			}
		)
			.then((events) => {
				console.log('events:', events);
				eventsSet(events.reverse());
			})
			.catch((e) => {
				console.error('e:', e);
				setState({ toast: JSON.stringify(e) });
			});
	}, [viteApi, networkType, setState]);

	useEffect(() => {
		updateEvents();
	}, [updateEvents]);

	if(!events || tokens === 'loading')return <Loading />

	return (
		<div className="space-y-4">
			<div className="flex justify-between mx-auto">
				<p className="text-2xl">{i18n.history}</p>
				<button className="p-1" onClick={updateEvents}>
					<ArrowPathIcon className="w-5" />
				</button>
			</div>
			<table className='table-auto w-full mt-5 overflow-x-auto'>
				<thead>
					<tr>
						<th>{i18n.transaction}</th>
						<th>{i18n.event}</th>
						<th>{i18n.account}</th>
						<th>{i18n.action}</th>
					</tr>
				</thead>
				<tbody>
					{events.map((event) => {
						return (
							<HistoryEventRow event={event as any} tokens={tokens} key={`${event.accountBlockHash}-${event.event}`} />
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default connect(History);
