# GR14 Hackathon - DAO Governance Tool

## Purpose
The Vite ecosystem needs a dapp for governing an arbitrary number of DAO projects. This will enable:
1. Decentralized on-chain/off-chain governance of DAOs
2. A single platform for users to vote in the various DAOs they're a part of
3. Increased community engagement

## Features
- Inspired by [Snapshot](https://snapshot.org/)
- Anyone can create their own DAO "space"
- Users can join a space
- Users can submit proposals to a space
- Users vote on proposals with the token specified during proposal creation
- Displays voting results for ongoing and expired polls
- Proposals are voted on via weighted voting where token holders can spread their votes over any number of options
- Voting involves locking up governance tokens in the DAO governance contract
- Proposals include a title, description, expiration date (or ongoing until a certain number of votes have been reached), token id used for voting, and optionally a contract to call with the proposal results when the proposal closes.


## Frontend Requirements
- Takes into account "Features" listed above
- Project is based off of [Vite Express](https://github.com/vitelabs/vite-express)
- Feel free to use any design aesthetic but it must be consistent throughout the whole dapp


## Contract Requirements
- Takes into account "Features" listed above
- Uses Solidity++ 0.8
- Unit tests for all contract functionality using [ViteJS](https://github.com/vitelabs/vite.js "https://github.com/vitelabs/vite.js") and/or [Vuilder](https://github.com/vitelabs/vuilder) and your unit testing library of choice.
	- Refer to [Vite Express](https://github.com/vitelabs/vite-express) for a contract testing (and frontend) template
- Contract should have functions for reading/paginating through all spaces and proposals (both ongoing and ended) for each space

## Reward
- $5000 in Vite

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