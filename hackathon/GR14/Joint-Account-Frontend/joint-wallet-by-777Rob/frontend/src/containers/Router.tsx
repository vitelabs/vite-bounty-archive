import { useCallback, useEffect, useMemo } from 'react';
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import WS_RPC from '@vite/vitejs-ws';
import { account, accountBlock, ViteAPI } from '@vite/vitejs';
import Landing from '../pages/Landing';
// import LandingTest from '../pages/LandingTest';
// import JointWallet from '../pages/JointWallet';
import AppHome from './AppContainer';
import WalletSelect from '../pages/WalletSelect';
import { connect } from '../utils/globalContext';
import { ContractAbiElement, State, ViteBalanceInfo, Contract } from '../utils/types';
import Toast from './Toast';
import { VCSessionKey } from '../utils/viteConnect';
import { PROD } from '../utils/constants';
import PageContainer from './PageContainer';
import History from '../pages/History';
// import AppHomeTest from '../pages/AppHomeTest';
import CreateJointWallet from '../pages/CreateJointWallet';
import JointWallet from '../pages/JointWallet';
import Settings from 'pages/Settings';
import JointWalletDashboard from 'pages/JointWalletDashboard';
import JointWalletMotions from 'pages/JointWalletMotions';
import JointWalletHistory from 'pages/JointWalletHistory';

const providerWsURLs = {
	localnet: 'ws://localhost:23457',
	// testnet: 'wss://buidl.vite.net/gvite/ws',
	testnet: 'ws://localhost:23457',
	mainnet: 'wss://node.vite.net/gvite/ws', // or 'wss://node-tokyo.vite.net/ws'
};
const providerTimeout = 6000000;
const providerOptions = { retryTimes: 10, retryInterval: 5000 };

type Props = State;

const Router = ({ setState, vcInstance, networkType }: Props) => {
	// const connectedAccount = useMemo(() => vcInstance?.accounts[0], [vcInstance]);
	const connectedAccount = useMemo(() => vcInstance?.accounts[0], [vcInstance]);

	const rpc = useMemo(
		() =>
			new WS_RPC(
				networkType === 'mainnet' ? providerWsURLs.mainnet : providerWsURLs.testnet,
				providerTimeout,
				providerOptions
			),
		[networkType]
	);

	const viteApi = useMemo(() => {
		return new ViteAPI(rpc, () => {
			console.log('client connected');
		});
	}, [rpc]);

	useEffect(() => setState({ viteApi }), [setState, viteApi]);

	const getBalanceInfo = useCallback(
		(address: string) => {
			return viteApi.getBalanceInfo(address);
		},
		[viteApi]
	);

	const subscribe = useCallback(
		(event: string, ...args: any) => {
			return viteApi.subscribe(event, ...args);
		},
		[viteApi]
	);

	const updateViteBalanceInfo = useCallback(() => {
		if (vcInstance?.accounts[0]) {
			getBalanceInfo(vcInstance.accounts[0])
				// @ts-ignore
				.then((res: ViteBalanceInfo) => {
					setState({ viteBalanceInfo: res });
				})
				.catch((e) => {
					console.log(e);
					setState({ toast: JSON.stringify(e), vcInstance: null });
					localStorage.removeItem(VCSessionKey);
					// Sometimes on page load, this will catch with
					// Error: CONNECTION ERROR: Couldn't connect to node wss://buidl.vite.net/gvite/ws.
				});
		}
	}, [setState, getBalanceInfo, vcInstance]);

	useEffect(updateViteBalanceInfo, [updateViteBalanceInfo]);

	useEffect(() => {
		if (vcInstance) {
			subscribe('newAccountBlocksByAddr', vcInstance.accounts[0])
				.then((event: any) => {
					event.on(() => {
						updateViteBalanceInfo();
					});
				})
				.catch((err: any) => console.warn(err));
		}
		return () => viteApi.unsubscribeAll();
	}, [setState, subscribe, vcInstance, viteApi, updateViteBalanceInfo]);

	const callContract = useCallback(
		(
			contract: Contract,
			methodName: string,
			params: any[] = [],
			tokenId?: string,
			amount?: string
		) => {
			if (!vcInstance) {
				throw new Error(`VC instance not found`);
			}
			const methodAbi = contract.abi.find(
				(x: ContractAbiElement) => x.name === methodName && x.type === 'function'
			);
			if (!methodAbi) {
				throw new Error(`method not found: ${methodName}`);
			}
			const toAddress = contract.address['testnet'];
			console.log(toAddress);
			if (!toAddress) {
				throw new Error(`${networkType} contract address not found`);
			}
			console.log('Creating block');
			console.log(connectedAccount);
			const txParams = {
				address: connectedAccount,
				abi: methodAbi,
				toAddress,
				params,
			};
			console.log(params);
			console.log(methodAbi);
			const block = accountBlock.createAccountBlock('callContract', txParams).accountBlock;

			console.log('Sending tx');
			console.log(block);
			// const tx = vcInstance.signAndSendTx([{ block }]);
			// console.log(tx);
			return vcInstance.signAndSendTx([{ block }]);
		},
		[connectedAccount, networkType, vcInstance]
	);

	useEffect(() => {
		setState({ callContract });
	}, [setState, callContract]);

	return (
		<BrowserRouter>
			<PageContainer>
				<Routes>
					<Route path="/history" element={<History />} />
					<Route path="/app" element={<AppHome />}>
						<Route path="" element={<Navigate to="select" />} />
						<Route path="select" element={<WalletSelect />} />
						<Route path="create" element={<CreateJointWallet />} />
						<Route path="wallet/:id" element={<JointWallet />}>
							<Route path="dashboard" element={<JointWalletDashboard />} />
							<Route path="motions" element={<JointWalletMotions />} />
							<Route path="history" element={<JointWalletHistory />} />
						</Route>
						<Route path="settings" element={<Settings />} />
					</Route>
					<Route path="/" element={<Landing />} />
					{/* <Route path="*" element={<Navigate to="/" />} /> */}
					{/* <Route path="/LandingTest" element={<AppHomeTest to="/LandingTest" />} /> */}
				</Routes>
			</PageContainer>
			<Toast />
		</BrowserRouter>
	);
};

export default connect(Router);
