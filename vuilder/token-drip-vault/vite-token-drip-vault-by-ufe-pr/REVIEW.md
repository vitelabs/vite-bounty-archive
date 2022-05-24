- IterableMapping is a library that implements a new struct `Map` that can be iterated upon
- The TokenDripVault contract has 3 events: CreateVault, FundVault, and Withdraw
- constructor is empty. No contract owner = good
- 3 modifiers: onlySettingsUnlocked, onlyVaultMember, onlyVaultOwner
	- onlyVaultOwner checks if sender is owner AND beneficiary. It's possible for owner to remove themself as a beneficiary.
- timestamp code for "non-standard network tests" seems like a hack for a bug on the local network side
	- question for ufe: "I've seen this pattern before. Could you describe why it is necessary?"
- createVault makes sense
	- settingsLocked can't be locked (i.e. set to true) later
- addBeneficiary makes sense
- removeBeneficiary makes sense
	- requiring `_beneficiary != address(0)` might be unnecessary cuz 0 addresses can't be added to begin with and `isBeneficiary(_id, _beneficiary)` is also required
	- onlyVaultOwner can add beneficiaries, but any/only beneficiary can remove any beneficiary. Interesting choice.
- withdrawing and funding makes sense
- setWithdrawAmountStacks makes sense
	- can be set by onlyVaultMember - think owner makes more sense for this

This contract checks all the boxes