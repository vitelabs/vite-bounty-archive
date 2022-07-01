import { RefreshIcon } from '@heroicons/react/outline';
import { useCallback, useEffect, useState } from 'react';
import JointContract from '../contracts/JointAccounts';
import { connect } from '../utils/globalContext';
import { useTitle } from '../utils/hooks';
import { shortenAddress } from '../utils/strings';
import { AccountCreatedEvent, State } from '../utils/types';
import { getPastEvents } from '../utils/viteScripts';

type Props = State & {};

const History = ({ i18n, viteApi, networkType, setState }: Props) => {
	useTitle(i18n.history);
	const [events, eventsSet] = useState<AccountCreatedEvent[]>();

	const updateEvents = useCallback(() => {
		eventsSet(undefined);
		const contractAddress = JointContract.address[networkType];
		getPastEvents(viteApi, contractAddress, JointContract.abi, 'AccountCreated', {
			fromHeight: 0,
			toHeight: 0,
		})
			.then((events) => {
				console.log('events:', events);
				eventsSet(events);
			})
			.catch((e) => {
				console.log('e:', e);
				setState({ toast: JSON.stringify(e) });
			});
	}, [viteApi, networkType, setState]);

	useEffect(() => {
		updateEvents();
	}, [updateEvents]);

	return (
		<div className="space-y-4 max-w-3xl mx-auto">
			<div className="flex justify-between">
				<p className="text-2xl">{i18n.history}</p>
				<button className="p-1" onClick={updateEvents}>
					<RefreshIcon className="w-5" />
				</button>
			</div>
			<div className="">
				<div className="flex">
					<div className="flex-1">
						<p className="">{i18n.accountId}</p>
					</div>
					<div className="flex-1">
						<p className="">{i18n.creator}</p>
					</div>
				</div>
				{events ? (
					events.map((event) => {
						return (
							<div className="flex" key={event.accountBlockHash}>
								<div className="flex-1">
									<p className="">{event.returnValues.accountId}</p>
								</div>
								<div className="flex-1">
									<p className="">{shortenAddress(event.returnValues.creator)}</p>
								</div>
							</div>
						);
					})
				) : (
					<p className="">Loading...</p>
				)}
			</div>
		</div>
	);
};

export default connect(History);
