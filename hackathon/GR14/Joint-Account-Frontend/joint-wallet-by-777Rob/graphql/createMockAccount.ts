import { wallet } from '@vite/vitejs';
import { accountBlock } from '@vite/vitejs';
import { JointAccountContract } from '../frontend/src/contracts/JointAccounts';
import { provider, network } from './index';

export const createMockAccount = async () => {
	let bob = await wallet.deriveAddress({
		mnemonics:
			'dignity chuckle buffalo pear hybrid tent wheel speed method stove vocal action concert when tattoo',
		index: 0,
	});
	let alice = await wallet.deriveAddress({
		mnemonics:
			'dignity chuckle buffalo pear hybrid tent wheel speed method stove vocal action concert when tattoo',
		index: 1,
	});

	async function sendAccountBlock(accountBlock) {
		accountBlock.setProvider(provider).setPrivateKey(bob.privateKey);
		await accountBlock.autoSetPreviousAccountBlock();
		const result = await accountBlock.sign().send();
		console.log('send success', result);
	}
	try {
		const ReceiveTask = new accountBlock.ReceiveAccountBlockTask({
			address: alice.address,
			privateKey: alice.privateKey,
			provider: provider,
		});
		ReceiveTask.onSuccess((result) => {
			console.log('success', result);
		});
		ReceiveTask.onError((error) => {
			console.log('error', error);
		});
		ReceiveTask.start({
			checkTime: 10,
			transactionNumber: 10,
			gapTime: 1,
		});
		ReceiveTask.start();
		console.log();
	} catch (e) {
		console.log(e);
	}

	const createAccountBlock = await accountBlock.createAccountBlock('callContract', {
		address: bob.address,
		height: await provider.request('ledger_getSnapshotChainHeight'),
		toAddress: JointAccountContract.address[network],
		abi: JointAccountContract.abi,
		methodName: 'createAccount',
		params: [[bob.address, alice.address], 1, false, false],
	});

	const createMotionBlock = await accountBlock.createAccountBlock('callContract', {
		address: bob.address,
		height: await provider.request('ledger_getSnapshotChainHeight'),
		toAddress: JointAccountContract.address[network],
		abi: JointAccountContract.abi,
		methodName: 'createAddMemberMotion',
		params: [1, alice.address],
	});

	await sendAccountBlock(createAccountBlock);
	await sendAccountBlock(createMotionBlock);
	return { createAccountBlock, createMotionBlock };
	// console.log(createAccountBlock, createMotionTransaction);
};
