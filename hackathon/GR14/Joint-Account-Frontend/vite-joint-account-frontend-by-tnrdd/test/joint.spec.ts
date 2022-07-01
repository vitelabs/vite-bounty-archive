import { describe } from 'mocha';
import { expect } from 'chai';
import * as vuilder from '@vite/vuilder';
import config from './vite.config.json';

let provider: any;
let deployer: any;
let joint: any;
let alice: any;
let bob: any;
let charlie: any;
let mnemonicCounter = 1;

const VITE = 'tti_5649544520544f4b454e6e40';
const NULL = '115792089237316195423570985008687907853269984665640564039457584007913129639935';

const waitForContractReceive = async (tokenId: string) => {
	do {} while ((await joint.balance(tokenId)) == '0');
};

const checkEvents = (result: any, correct: Array<Object>) => {
	expect(result).to.be.an('array').with.length(correct.length);
	for (let i = 0; i < correct.length; i++) {
		expect(result[i].returnValues).to.be.deep.equal(correct[i]);
	}
};

describe('test Joint Accounts', () => {
	before(async function () {
		provider = vuilder.newProvider(config.networks.local.http);
		console.log(await provider.request('ledger_getSnapshotChainHeight'));
		deployer = vuilder.newAccount(config.networks.local.mnemonic, 0, provider);
		console.log('deployer', deployer.address);
	});
	beforeEach(async function () {
		alice = vuilder.newAccount(config.networks.local.mnemonic, mnemonicCounter++, provider);
		bob = vuilder.newAccount(config.networks.local.mnemonic, mnemonicCounter++, provider);
		charlie = vuilder.newAccount(config.networks.local.mnemonic, mnemonicCounter++, provider);
		await deployer.sendToken(alice.address, '0');
		await alice.receiveAll();
		await deployer.sendToken(bob.address, '0');
		await bob.receiveAll();
		await deployer.sendToken(charlie.address, '0');
		await charlie.receiveAll();
		// compile
		const compiledContracts = await vuilder.compile('JointAccounts.solpp');
		expect(compiledContracts).to.have.property('JointAccounts');

		// deploy
		joint = compiledContracts.JointAccounts;
		joint.setDeployer(deployer).setProvider(provider);
		await joint.deploy({});
		expect(joint.address).to.be.a('string');
		console.log(joint.address);

		// check default balance
		expect(await joint.balance()).to.be.equal('0');
	});
	it('creates an account', async function () {
		await joint.call('createAccount', [[alice.address, bob.address, charlie.address], 2, 0, 0], {
			caller: alice,
		});

		expect(await joint.query('accountExists', [0])).to.be.deep.equal(['1']);
		expect(await joint.query('getMembers', [0])).to.be.deep.equal([
			[alice.address, bob.address, charlie.address],
		]);
		expect(await joint.query('approvalThreshold', [0])).to.be.deep.equal(['2']);
		const events = await joint.getPastEvents('allEvents', { fromHeight: 0, toHeight: 100 });
		checkEvents(events, [
			{
				'0': '0',
				accountId: '0',
				'1': alice.address,
				creator: alice.address,
			}, // Account created
		]);
	});

	it('deposits to an account', async function () {
		await joint.call('createAccount', [[alice.address, bob.address], 2, 1, 0], {
			caller: alice,
		});

		await deployer.sendToken(alice.address, '1000000', VITE);
		await alice.receiveAll();
		await joint.call('deposit', [0], { caller: alice, amount: '1000000', tokenId: VITE });
		await waitForContractReceive(VITE);

		expect(await joint.query('balanceOf', [0, VITE])).to.be.deep.equal(['1000000']);

		const events = await joint.getPastEvents('allEvents', { fromHeight: 0, toHeight: 100 });
		checkEvents(events, [
			{
				'0': '0',
				accountId: '0',
				'1': alice.address,
				creator: alice.address,
			}, // Account created
			{
				'0': '0',
				accountId: '0',
				'1': VITE,
				tokenId: VITE,
				'2': alice.address,
				from: alice.address,
				'3': '1000000',
				amount: '1000000',
			}, // Alice deposits
		]);
	});

	it('creates and votes a transfer motion', async function () {
		await joint.call('createAccount', [[alice.address, bob.address], 2, 1, 0], {
			caller: alice,
		});

		await deployer.sendToken(alice.address, '1000000', VITE);
		await alice.receiveAll();
		await joint.call('deposit', [0], { caller: alice, amount: '1000000', tokenId: VITE });
		await waitForContractReceive(VITE);

		await joint.call('createTransferMotion', [0, VITE, '50', charlie.address, NULL], {
			caller: alice,
		});
		await charlie.receiveAll();

		expect(await joint.query('motionExists', [0, 0])).to.be.deep.equal(['1']);
		expect(await joint.query('motionType', [0, 0])).to.be.deep.equal(['0']);
		expect(await joint.query('tokenId', [0, 0])).to.be.deep.equal([VITE]);
		expect(await joint.query('transferAmount', [0, 0])).to.be.deep.equal(['50']);
		expect(await joint.query('to', [0, 0])).to.be.deep.equal([charlie.address]);
		expect(await joint.query('threshold', [0, 0])).to.be.deep.equal([NULL]);
		expect(await joint.query('proposer', [0, 0])).to.be.deep.equal([alice.address]);
		expect(await joint.query('voteCount', [0, 0])).to.be.deep.equal(['1']);
		expect(await joint.query('active', [0, 0])).to.be.deep.equal(['1']);

		expect(await joint.query('voted', [0, 0, alice.address])).to.be.deep.equal(['1']);
		expect(await joint.query('voted', [0, 0, bob.address])).to.be.deep.equal(['0']);

		// Motion hasn't been approved yet
		expect(await charlie.balance(VITE)).to.be.deep.equal('0');

		await joint.call('voteMotion', [0, '0'], { caller: bob });
		await charlie.receiveAll();

		expect(await joint.query('voteCount', [0, 0])).to.be.deep.equal(['2']);
		expect(await joint.query('active', [0, 0])).to.be.deep.equal(['0']);

		expect(await joint.query('voted', [0, 0, alice.address])).to.be.deep.equal(['1']);
		expect(await joint.query('voted', [0, 0, bob.address])).to.be.deep.equal(['1']);

		// Motion was approved
		expect(await charlie.balance(VITE)).to.be.deep.equal('50');

		const events = await joint.getPastEvents('allEvents', { fromHeight: 0, toHeight: 100 });
		checkEvents(events, [
			{
				'0': '0',
				accountId: '0',
				'1': alice.address,
				creator: alice.address,
			}, // Account created
			{
				'0': '0',
				accountId: '0',
				'1': VITE,
				tokenId: VITE,
				'2': alice.address,
				from: alice.address,
				'3': '1000000',
				amount: '1000000',
			}, // Alice deposits
			{
				'0': '0',
				accountId: '0',
				'1': '0',
				motionId: '0',
				'2': '0',
				motionType: '0',
				'3': alice.address,
				proposer: alice.address,
				'4': VITE,
				tokenId: VITE,
				'5': '50',
				transferAmount: '50',
				'6': charlie.address,
				to: charlie.address,
				'7': NULL,
				destinationAccount: NULL,
				'8': NULL,
				threshold: NULL,
			}, // Motion created
			{
				'0': '0',
				accountId: '0',
				'1': '0',
				motionId: '0',
				'2': alice.address,
				voter: alice.address,
				'3': '1',
				vote: '1',
			}, // Alice votes yes
			{
				'0': '0',
				accountId: '0',
				'1': '0',
				motionId: '0',
				'2': bob.address,
				voter: bob.address,
				'3': '1',
				vote: '1',
			}, // Bob votes yes
			{
				'0': '0',
				accountId: '0',
				'1': '0',
				motionId: '0',
				'2': VITE,
				tokenId: VITE,
				'3': charlie.address,
				to: charlie.address,
				'4': NULL,
				destinationAccount: NULL,
				'5': '50',
				amount: '50',
			}, // Transfer is executed
		]);
	});

	it('cancels a motion', async function () {
		await joint.call('createAccount', [[alice.address, bob.address], 2, 1, 0], {
			caller: alice,
		});

		await deployer.sendToken(alice.address, '1000000', VITE);
		await alice.receiveAll();
		await joint.call('deposit', [0], { caller: alice, amount: '1000000', tokenId: VITE });
		await waitForContractReceive(VITE);

		await joint.call('createTransferMotion', [0, VITE, '50', charlie.address, NULL], {
			caller: alice,
		});
		await charlie.receiveAll();

		await joint.call('cancelMotion', [0, 0], { caller: alice });

		expect(await joint.query('active', [0, 0])).to.be.deep.equal(['0']);

		const events = await joint.getPastEvents('allEvents', { fromHeight: 0, toHeight: 100 });
		checkEvents(events, [
			{
				'0': '0',
				accountId: '0',
				'1': alice.address,
				creator: alice.address,
			}, // Account created
			{
				'0': '0',
				accountId: '0',
				'1': VITE,
				tokenId: VITE,
				'2': alice.address,
				from: alice.address,
				'3': '1000000',
				amount: '1000000',
			}, // Alice deposits
			{
				'0': '0',
				accountId: '0',
				'1': '0',
				motionId: '0',
				'2': '0',
				motionType: '0',
				'3': alice.address,
				proposer: alice.address,
				'4': VITE,
				tokenId: VITE,
				'5': '50',
				transferAmount: '50',
				'6': charlie.address,
				to: charlie.address,
				'7': NULL,
				destinationAccount: NULL,
				'8': NULL,
				threshold: NULL,
			}, // Motion created
			{
				'0': '0',
				accountId: '0',
				'1': '0',
				motionId: '0',
				'2': alice.address,
				voter: alice.address,
				'3': '1',
				vote: '1',
			}, // Alice votes yes
			{
				'0': '0',
				accountId: '0',
				'1': '0',
				motionId: '0',
			}, // Alice cancels motion
		]);
	});
});
