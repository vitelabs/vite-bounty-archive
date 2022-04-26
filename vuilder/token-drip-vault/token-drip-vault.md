# Vuilder Hackathon Bounty: Token Drip Vault

## Purpose

The Vite ecosystem needs a public utility where users can safely lock up their Vite tokens in a contract that throttles the withdrawal amount so that:
1. Token holders can have confidence that the token cannot be rugged
2. Accounts can allocate a steady stream of tokens to specific addresses like an allowance
3. Crypto hodlers worried about having their keys stolen can ensure they will never lose all their deposited tokens at once

## Features
- Users can create an arbitrary amount of "vaults"
- Vaults have specific vault properties that the owner (i.e. creator/sender) and beneficiaries can and cannot set during and/or after vault creation (see “Contract Requirements” for details)
- Each vault has an owner-defined "cycle" which is the period where new funds become available to beneficiaries to withdraw. Once a vault has had the allotted amount withdrawn, beneficiaries have to wait until the next cycle to withdraw more funds.
- Beneficiaries can choose how many tokens they want to withdraw (up to the allotted amount).
- Beneficiaries may revoke themselves

## Prizes
- 45,000 VITE (Approxi. $2000 at the time of publication) for creating a UI design
- 45,000 VITE (Approxi. $2000 at the time of publication) for developing a smart contract

## Contract Requirements
- Uses Solidity++ 0.8.0
- Unit tests for all contract functionality using [ViteJS](https://github.com/vitelabs/vite.js "https://github.com/vitelabs/vite.js") and your unit testing library of choice
- Vault properties should include:
	- `id`: The unique identifier (probably the `fromhash`) for a vault
	- `withdrawableAmount`: The maximum number of tokens a beneficiary can withdraw at the moment
	- `balance`: The total number of tokens in the vault
	- Settings that can only be set during vault creation
		- `owner`: The address that calls the contract to create the vault
		- `frequency`: The number of seconds per cycle
		- `tokenAmountPerCycle`: The number of tokens withdrawable per cycle
		- `tokenTypeId`: ID of the token the vault holds
			- vaults should only hold one type of token 
		- `ownerCanWithdrawAllFunds`: If `true`, the vault's `owner` can remove all tokens from the vault at once.
		- `settingsLocked`: If `true`, the vault's settings cannot be changed by anyone - including the `owner`. 
	- Settings that can be set during vault creation or if `settingsLocked === false`
		- `withdrawableAmountStacks`: If `true`, the withdrawable amount stacks on top of any previously unwithdrawn tokens (e.g. 1000 more VITE becomes withdrawable per cycle vs 1000 VITE max can be withdrawn per cycle)
		- `acceptsAdditionalFunds`: If `true`, anyone can send tokens to the vault, increasing its `balance`. If `false`, the `owner` must supply the vault's maximum `balance` during the vault creation transaction.
		- `beneficiaries`: Mapping of addresses that can withdraw from the vault
			- Only the vault `owner` can add to `beneficiaries`
			- Note: Addresses in `beneficiaries` can remove themselves regardless of `settingsLocked`. This is important for scenarios where the keys of a beneficiary have been compromised. In this case, the compromised account should remove itself. Therefore it’ll probably be a good idea to make multiple addresses from different mnemonics beneficiaries.
	- Additional properties that you can think of are welcome
		- Keep in mind that this contract will be interacted with from a GUI so getters and setters should be implemented. For example, a property like `totalBeneficiaries` may be helpful for getting a list of vault beneficiaries.

## UI Requirements
- Uses Figma or a similar design tool that makes copying color/pixel values easy
- The UI should:
	- Take into account "Contract Requirements"
	- Have a logo
	- Allow users to log in with ViteConnect (i.e. scanning QR code with Vite mobile app)
	- Is easy for anyone to understand and use - regardless of their experience with crypto.
	- Have a homepage that describes what the dapp is, how to use it, and why it exists
	- Have a component for creating a vault
	- Have a component that lists all the vaults an account owns
	- Have a component for updating vault settings for owners and beneficiaries
		- Allow users to set aliases for vaults (this will be stored locally, not on-chain) 
	- Have a component for funding vaults
	- Have a component for withdrawing from vaults
	- Be responsive to different screen sizes
	- Have a light and dark mode with a component to choose between dark/light/system themes

## Judging Criteria
- The Vite Labs team will check to make sure all of the requirements have been met
- Consolation prizes will be given for submissions that are good, but don’t meet all requirements
- If your submission is close to completion, but requires minor improvements, we may reach out to you to discuss revisions with you so you can get the full bounty prize.

## Winner Announcement
- After the hackathon, we will announce the winner(s) when all submissions have been reviewed and the judge's scores tabulated.

## Resources
- Vite Documentation: [https://docs.vite.org/](https://docs.vite.org/ "https://docs.vite.org/")
- Vite Discord: [https://discord.com/invite/CsVY76q](https://discord.com/invite/CsVY76q "https://discord.com/invite/CsVY76q")

## Follow Vite on social media
- [https://twitter.com/vitelabs](https://twitter.com/vitelabs "https://twitter.com/vitelabs")
- [https://twitter.com/vitexexchange](https://twitter.com/vitexexchange "https://twitter.com/vitexexchange")
- [https://t.me/vite\_en](https://t.me/vite_en "https://t.me/vite_en")
- [https://t.me/vitexexchange](https://t.me/vitexexchange "https://t.me/vitexexchange")