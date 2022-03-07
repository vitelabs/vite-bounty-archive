# Initial token auction

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

## Prizes
- 2000 USD in VITE for developing a smart contract
- 2000 USD in VITE for creating a UI design

## Contract Requirements
- Takes into account "Features" and "UI Requirements"
- Uses Solidity++ 0.8.0
- Unit tests for all contract functionality using [ViteJS](https://github.com/vitelabs/vite.js "https://github.com/vitelabs/vite.js") and your unit testing library of choice.
- Keeps track of all current and past auctions
- Additional features are welcome! Keep in mind that this contract will be interacted with from a GUI so getters and setters suitable for the UI described below should be implemented. For example, a linked list sorting bids from highest to lowest might be useful for displaying them and sending winning bidders tokens.

## UI Requirements
- Takes into account "Features" and "Contract Requirements"
- Uses Figma or a similar design tool that makes copying color/pixel values easy
- Has a logo
- Allows users to log in with ViteConnect (i.e. scanning QR code with Vite mobile app)
- Is easy for anyone to understand and use - regardless of their experience with crypto.
- Be responsive to different screen sizes
- Has a light and dark mode with a component to choose between dark/light/system themes
- Has a homepage that describes what the dapp is, how to use it, and why it exists.
- Shows the price in terms of Vite and USD for bidding and auction stats
- Has a page that shows all ongoing auctions
- Has a page that shows all ended auctions
- Has a page that shows auction details like end date, total Vite locked, average bid, highest bid, list of bids
- Has a component for placing and withdrawing bids
- Has a component that shows token info like tti, total supply, amount being auctioned off, etc.
- Additional features are welcome!

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