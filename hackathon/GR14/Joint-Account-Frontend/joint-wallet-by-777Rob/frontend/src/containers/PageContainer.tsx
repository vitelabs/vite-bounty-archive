import { ReactNode, useEffect, useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import A from 'components/A';
import { NetworkTypes, State } from '../utils/types';
import { connect } from '../utils/globalContext';
import { PROD } from '../utils/constants';
import DropdownButton from '../components/DropdownButton';
import TabsTheme from 'components/Tabs/TabsTheme';
import Avnetworks from 'components/Avnetworks';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
});

type Props = State & {
	noPadding?: boolean;
	children: ReactNode;
};

const PageContainer = ({ networkType, languageType, i18n, setState, children }: Props) => {
	useEffect(() => {
		import(`../i18n/${languageType}.ts`).then((translation) => {
			setState({ i18n: translation.default });
		});
	}, [setState, languageType]);

	const networkTypes = useMemo(() => {
		const arr: [NetworkTypes, string][] = [
			['mainnet', i18n?.mainnet],
			['testnet', i18n?.testnet],
		];
		!PROD && arr.push(['localnet', i18n?.localnet]);
		return arr;
	}, [i18n]);

	const AvailableNetworks = Avnetworks(networkTypes, setState);

	return !i18n ? null : (
		<ApolloProvider client={client}>
			<div className="min-h-screen flex flex-col">
				<header>
					<div className="absolute right-0 m-2"></div>
				</header>
				<div className="absolute right-1 w-60 h-8 mt-14 flex">
					{/* <Tabs tabs={TabsTheme} size="xs" /> */}
					<TabsTheme />
					<DropdownButton
						buttonJsx={<p>{i18n[networkType]}</p>}
						dropdownJsx={<AvailableNetworks />}
					/>
				</div>

				<div className="flex-1 flex flex-col sm:flex-row">
					<main className="flex-1">{children}</main>
				</div>
				<footer className="fx mt-16 justify-end gap-2 bottom-0 h-16 px-2 py-1 bg-skin-foreground text-skin-muted text-sm">
					<A
						href="https://twitter.com/vitelabs"
						className="dark:bg-slate-700 dark:text-white bg-slate-400 rounded-lg px-2 py-1 brightness-button"
					>
						Vite Twitter
					</A>
					<A
						href="https://github.com/777Rob/joint-wallet"
						className="dark:bg-slate-700 dark:text-white bg-slate-400 rounded-lg px-2 py-1 brightness-button"
					>
						Project GitHub
					</A>
					<A
						href="https://github.com/vitelabs/vite-express"
						className="dark:bg-slate-700 dark:text-white bg-slate-400 rounded-lg px-2 py-1  brightness-button"
					>
						Vite express
					</A>
					<A
						href="https://discord.gg/AEnScAQA"
						className="dark:bg-slate-700 dark:text-white bg-slate-400 rounded-lg px-2 py-1 brightness-button"
					>
						Vite Discord
					</A>
					<A
						href="http://localhost:4000/graphql"
						className="dark:bg-slate-700 dark:text-white bg-slate-400 rounded-lg px-2 py-1  brightness-button"
					>
						GraphQl
					</A>
				</footer>
			</div>
		</ApolloProvider>
	);
};

export default connect(PageContainer);
