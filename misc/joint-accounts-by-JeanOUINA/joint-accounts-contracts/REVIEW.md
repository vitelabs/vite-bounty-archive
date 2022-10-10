git diff from samuele's last commit: a952dc2603a84acf4d6df4257ed28b1e059d9377

- `JointAccount` struct has added `mapping(address => bool) isMember;` prop
- require` error messages have been removed and moved to comments, which is fine I guess
	- The reason for this might be to stay under the contract size limit?
- `mapping(address => uint256[]) accountsByMember;`
	- `mapping(address => mapping(uint256 => uint256)) accountIdIndexByMember;`
	- added to contract for better indexing/searching
- `createAccount` has a few added `require` statements that make it less likely have a joint account that can't be used by anyone
- `balancesOf` can return an array of balances by token id
- `isMember` is more efficient
- additional `getAccountsByMember` and `getAccounts` functions make querying state easier
- updated `_addMember`and `_removeMember` functions take into account `isMember`, `accountsByMember`, and `accountIdIndexByMember` props
- 