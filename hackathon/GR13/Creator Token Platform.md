# Creator Token Platform

## Purpose

The Vite ecosystem needs a platform that allows anyone to have their own [tradeable token](https://blog.relevant.community/how-to-make-bonding-curves-for-continuous-token-models-3784653f8b17) via a [bonding curve](https://medium.com/coinmonks/token-bonding-curves-explained-7a9332198e0e). This will enable:
1. Financial compensation for creators
2. Equity in other people's success
3. Instant liquidity for any buy/sell/swap

## Features
- By default, all Vite addresses are allocated 10,000 of their own tokens
- Tokens after the first 10,000 are minted and burned on a bonding curve
- All creator tokens are backed with Vite
- Creator tokens can be swapped for other creator tokens and traded with other accounts

## Prizes
- 2000 USD in VITE for developing a smart contract
- 2000 USD in VITE for creating a UI design

## Contract Requirements
- Takes into account "Features" and "UI Requirements"
- Uses Solidity++ 0.8.0
- Unit tests for all contract functionality using [ViteJS](https://github.com/vitelabs/vite.js "https://github.com/vitelabs/vite.js") and your unit testing library of choice.
- Keeps track of all the creator tokens and their holders
- Token holders may transfer any number of their holdings to another address.
- Because the first 10,000 tokens are allocated to the address of the token, the slope of the bonding curve should be something like `price = 2 * supply - 10000`.
- Swaps between creator tokens calculates the price/supply change if you were to sell the first token for Vite and buy the second token with the same Vite
- Ensures that the supply of a particular token never goes below 10,000
- Additional features are welcome! Keep in mind that this contract will be interacted with from a GUI so getters and setters suitable for the UI described below should be implemented. For example, a linked list sorting token holders from biggest to smallest is probably needed for displaying them.

## UI Requirements
- Takes into account "Features" and "Contract Requirements"
- Uses Figma or a similar design tool that makes copying color/pixel values easy
- Has a logo
- Allows users to log in with ViteConnect (i.e. scanning QR code with Vite mobile app)
- Is easy for anyone to understand and use - regardless of their experience with crypto.
- Be responsive to different screen sizes
- Has a light and dark mode with a component to choose between dark/light/system themes
- Has a homepage that describes what the dapp is, how to use it, and why it exists.
- Shows the price in terms of Vite and USD for lists and trading
- Has a page that shows an address' bonding curve (i.e. a line graph) and associated links (similar to [linktr.ee](https://linktr.ee/), this will be populated by a second contract not part of this bounty).
- Has a page that shows the total number of creator tokens with supplies over 10,000 and lists all of them from highest to lowest supply and vice versa
- Has a component for buying (i.e. minting), selling (i.e. burning), and swapping tokens.
- Has a component that shows a token's total holders, a list of token holders sorted from biggest to smallest and vice versa.
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