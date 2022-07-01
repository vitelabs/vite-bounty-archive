import { expect } from 'chai';
import * as vuilder from '@vite/vuilder';
import config from './deploy.config.json';
const vite = require('@vite/vuilder');

async function run(): Promise<void> {
	try {
		const provider = vuilder.newProvider(config.http);
		// const provider = await vuilder.startLocalNetwork(config.http);
		console.log(await provider.request('ledger_getSnapshotChainHeight'));
		const deployer = vuilder.newAccount(config.mnemonic, 0, provider);
		// provider = vite.localProvider();
		// deployer = vite.newAccount(config.mnemonic, 0);

		// // compile
		const compiledContracts = await vite.compile('../contracts/JointAccounts.solpp');
		expect(compiledContracts).to.have.property('JointAccounts');

		// // deploy
		let jointAccounts = compiledContracts.JointAccounts;
		jointAccounts.setDeployer(deployer).setProvider(provider);

		const jointAccount = await jointAccounts.deploy({ responseLatency: 3 });
		console.log(jointAccount);
		//     function createAccount(address[] memory _members, uint256 _approvalThreshold, bool _isStatic, bool _isMemberOnlyDeposit) external returns(uint256) {
		console.log(
			await jointAccount.contractCall(
				['vite_84a033d237218a546753319b1e6874fe35399f652e807ce6f7'],
				1,
				true,
				true
			)
		);
		await jointAccount.call(
			'createAccount',
			[
				[
					'vite_6fb192a18078cd858a076a8f4ae6934caa90d92ec136d7787b',
					'vite_a9b37048f93d82e80fa72164dbbd5ed208cee7c59191232b17',
				],
				1,
				1,
				0,
			],
			{ caller: deployer }
		);

		// expect(jointAccounts.address).to.be.a('string');
		console.log(jointAccounts.address);
		// const jointAccounts = provider.contra
		let logs = await provider.request('ledger_getVmLogsByFilter', {
			addressHeightRange: {
				[jointAccounts.address]: {
					fromHeight: '0',
					// fromHeight: fromHeight.toString(),
					toHeight: '0',
				},
			},
		});
		console.log(logs);
	} catch (e) {
		console.log(e);
	}

	// stake quota
	// await deployer.stakeForQuota({beneficiaryAddress: cafe.address, amount:"2001000000000000000000"});

	return;
}

run().then(() => {
	console.log('done');
});
