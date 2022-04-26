- `ConsensusContract` is an interface for voting for and cancelling voting for SBPs
- `Ownable` is a pretty standard contract for having 1 owner that can change itself
- `Votable` is `Ownable` and implements the `ConsensusContract` interface
	- contract `owner` can `receive` any token sent to the contract
- `TokenVault` is `Votable`
	- Not a fan of vaults having a `MAX_BENEFICIARIES` of `5`
	- `createVault`
		- I don't think a `NewBeneficiary` event should be emitted for each one
	- `withdraw`
		- Unclear why `vault.lastWithdrawBlock` isn't just `block.number`
		```
		uint leftoversBlocks = elapsedBlocks - cycles * vault.frequency;
		vault.lastWithdrawBlock = block.number - leftoversBlocks;
		```
	- `withdrawEverything` looks good
	- `deposit`
		- `require(vault.balance > 0);` would be annoying if you had a vault of a weekly allowance and you withdraw everything and now your boss or contract owner can't deposit to the vault
	- `lockSettings` looks good
	- `updateSettings` looks good although not sure what settings should actually be update-able. Currently just `withdrawableAmountStacks` and `acceptsAdditionalFunds` seem fine.
	- `addBeneficiary` looks good, but again not sure about `MAX_BENEFICIARIES` being needed
	- `removeBeneficiary` looks good