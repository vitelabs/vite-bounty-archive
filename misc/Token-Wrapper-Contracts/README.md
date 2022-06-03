# GR14 Hackathon - Token Wrapper Contracts

## Purpose
The Vite ecosystem needs contracts for wrapping [native Vite tokens](https://docs.vite.org/vite-docs/reference/mintage.html) into [ERC-20 tokens](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) and vice versa. This will:
1. Make porting projects based on ERC-20 tokens easier
2. Allow developers to extend the features of native Vite tokens by wrapping them into ERC-20 contracts
3. Allow developers to make ERC-20 tokens useable on Vite projects based on native Vite tokens by wrapping them into native Vite tokens


## Features
- The first contract should extend the ERC-20 protocol and act as a template for wrapping native Vite tokens into ERC-20 tokens
	- Before deploying, the token id of the wrapped native Vite token should be specified so that all other tokens sent to the contract are reverted.
	- After deploying the contract, users should be able to:
		- Send their native Vite token to the wrapper contract and have that reflected in their balance when calling the contact's `balanceOf` method.
		- Burn their balance in the wrapper contract in exchange for the locked native Vite token.
- The second contract should be a template for wrapping ERC-20 tokens into native Vite tokens
	- Before deploying, the address of the ERC-20 contract should be specified so that all other tokens sent to the contract are rejected.
	- The contract's constructor should issue a new token that can be reissued and burned.
		- This token's id should be set in a `public` state variable
	- After deploying the contract, users should be able to:
		- Swap ERC-20 tokens in the wrapper contract for newly minted tokens of the same token created in the constructor.
		- Send their wrapped ERC-20 tokens (i.e. native Vite tokens) to this contract in exchange for the ERC-20 tokens allocated to the wrapper contract's balance.
	- Refer to the built-in [Token Issuance Contract](https://docs.vite.org/vite-docs/api/rpc/contract_v2.html) for minting and burning native Vite tokens

## Contract Requirements
- Takes into account "Features" listed above
- Uses Solidity++ 0.8
- Unit tests for all contract functionality using [ViteJS](https://github.com/vitelabs/vite.js "https://github.com/vitelabs/vite.js") and/or [Vuilder](https://github.com/vitelabs/vuilder) and your unit testing library of choice.
	- Refer to [Vite Express](https://github.com/vitelabs/vite-express) for a contract testing (and frontend) template.


## Reward
- $3000 in Vite

## Judging Criteria
- The Vite Labs team will check to make sure all of the requirements have been met
- Consolation prizes will be given for submissions that are good, but don’t meet all requirements.
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