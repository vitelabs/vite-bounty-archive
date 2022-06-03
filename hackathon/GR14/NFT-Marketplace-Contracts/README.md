# GR14 Hackathon - NFT Marketplace Contracts

## Purpose
The Vite ecosystem needs several generic contracts for various NFT marketplace operations. This will:
1. Give users a variety of options to buy/sell their NFTs
2. Allow different frontends to use the same marketplace contracts for instant liquidity and smaller attack surface
3. Aggregate/Increase market depth for NFTs

## Features
- 2 independent contracts that can conduct the following auction types:
	- [English auction](https://en.wikipedia.org/wiki/English_auction) (highest bidder pays their bid)
		- Can have a reserve price for if the highest bid is accepted or not
	- [Dutch auction](https://en.wikipedia.org/wiki/Dutch_auction) (price descends until someone buys)
		- Can have a reserve price for when the auction is canceled
- The contracts should work with [ERC-721 tokens](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)
- An example user journey auctioning off an NFT could be:
	1. A user approves an auction contract to transfer the NFT(s) they would like to sell
	2. The user specifies which NFT to auction off and includes the auction parameters (e.g. starting price, reserve price, expiration date, minimum bid increase for English auctions, price decrease rate for Dutch auctions, date after which the seller can no longer cancel their auction, etc.)
	3. The auction contract transfers that NFT to itself and hold it in escrow while the auction is ongoing
	4. Other users bid on the auction
		- In the case of English auctions, new highest bids are held in escrow while the last highest bid is sent back to its bidder.
	5. Once the auction has ended, the NFT and funds from the winning bid are transferred to their rightful owner


## Contract Requirements
- Takes into account "Features" listed above
- Uses Solidity++ 0.8
- Unit tests for all contract functionality using [ViteJS](https://github.com/vitelabs/vite.js "https://github.com/vitelabs/vite.js") and/or [Vuilder](https://github.com/vitelabs/vuilder) and your unit testing library of choice.
	- Refer to [Vite Express](https://github.com/vitelabs/vite-express) for a contract testing (and frontend) template
- Contracts should have functions for reading/paginating through all ongoing and ended auctions and reading auction info (e.g. NFT and auction parameters)


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