import { expect } from 'chai';
import * as vuilder from '@vite/vuilder';
import config from './deploy.config.json';

async function run(): Promise<void> {
	try {
		const provider = vuilder.newProvider(config.http);
		console.log(await provider.request('ledger_getSnapshotChainHeight'));
		const deployer = vuilder.newAccount(config.mnemonic, 0, provider);

		// compile
		const compiledContracts = await vuilder.compile('JointAccounts.solpp');
		expect(compiledContracts).to.have.property('JointAccounts');

		// deploy
		let joint = compiledContracts.JointAccounts;
		//console.log(joint);
		joint.setDeployer(deployer).setProvider(provider);
		await joint.deploy({});
	expect(joint.address).to.be.a('string');
	console.log(joint.address);

	// stake quota
	await deployer.stakeForQuota({
		beneficiaryAddress: joint.address,
		amount: '2001000000000000000000',
	});
		return;
	} catch (err) {
		console.log(err);
	}
}
run().then(() => {
	console.log('done');
});
