import { JointAccount } from './generated/schematypes';
import _ from 'lodash';
import { updateJointAccounts, allJointAccounts } from './index';

export const getUsersJointAccounts = async ({
	userAddress,
	fromHeight = 0,
	toHeight = 0,
	update = true,
}) => {
	update && (await updateJointAccounts());
	const userAccounts = allJointAccounts.filter((account: JointAccount) => {
		{
			if (
				_.includes(
					account.members?.map((member) => member?.address),
					userAddress
				)
			) {
				return account;
			}
		}
	});
	return userAccounts;
};
