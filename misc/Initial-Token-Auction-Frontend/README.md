# GR__ Hackathon - Initial Token Auction Frontend

## Purpose
The Vite ecosystem needs a dapp for distributing an allotted amount of tokens to the highest bidders. This will enable:
1. More efficient price discovery of new tokens
2. Funding for teams in exchange for equity of their token
3. Community engagement

## Features
- Anyone can start an auction by locking up a fixed amount of tokens and specifying an end date
- To place a bid, users lock up however much Vite they want to spend and specify the unit price (in terms of Vite) that they are willing to pay per token.
- Users can place/withdraw as many bids as they want before the end date
- On the end date, the contract will halt bid placing/withdrawing and go down the list of bids from highest to lowest unit price. At each bid, the Vite amount is divided by the unit price to get the token amount which is then sent to the placer of the bid and Vite amount is sent to the auction starter. This process continues until the locked tokens are depleted (the last bid may possibly only receive a fraction of what they bid for).
- All bidders who didn't specify a high enough unit price will have their Vite sent back to them. If the last winning bid could only get a fraction of what they were willing to pay for, the difference in Vite is sent back to them.

## Frontend Requirements
- Takes into account "Features" listed above
- Project is based off of [Vite Express](https://github.com/vitelabs/vite-express)
- Uses contract from our previous [Initial Token Auction bounty](https://gitcoin.co/issue/28533)
	- The winning submission was from [samuelemarro](https://github.com/samuelemarro/gr13-vite-token-auction), but feel free to modify it or take inspiration from other submissions.

## Prizes
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