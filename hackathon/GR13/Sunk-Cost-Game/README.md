# Sunk Cost Game

## Purpose

The Vite ecosystem needs a fun dapp similar to [Fomo3D](https://fomo3d.hostedwiki.co/) for rewarding lucky Vite users. This should:
1. Increase TVL
2. Boost community engagement
3. Increase trading volume

## Features
- Anyone can create a pot after depositing the initial buy-in-amount
- Pot creators can specify the maximum timer limit, buy-in increment amount, burn amount, and extension amount.
- Creating a pot starts its timer and sets its token type id
- Players have a limited amount of time to buy into a pot
- Every time a player buys in, the timer is extended by the extension amount.
- Each new buy-in is incrementally more expensive than the last by the buy-in increment amount
- Players can buy in as many times as they want
- Part of each buy-in will be burnt if a burn amount is set
- The pot's balance goes to the last player to buy in before the timer ends
<!-- - We can call it Fomo3Vite, and make the deposit 3 Vite at a time -->

## Prizes
- 2000 USD in VITE for developing a smart contract
- 2000 USD in VITE for creating a UI design

## Contract Requirements
- Takes into account "Features" and "UI Requirements"
- Uses Solidity++ 0.8.0
- Unit tests for all contract functionality using [ViteJS](https://github.com/vitelabs/vite.js "https://github.com/vitelabs/vite.js") and your unit testing library of choice.
- Keeps track of all active and expired pots
- Additional features are welcome! Keep in mind that this contract will be interacted with from a GUI so getters and setters suitable for the UI described below should be implemented. For example, emitting events for various actions in the contract may be helpful for displaying joint account history.

## UI Requirements
- Takes into account "Features" and "Contract Requirements"
- Uses Figma or a similar design tool that makes copying color/pixel values easy
- Has a logo
- Allows users to log in with ViteConnect (i.e. scanning QR code with Vite mobile app)
- Is easy for anyone to understand and use - regardless of their experience with crypto.
- Be responsive to different screen sizes
- Has a light and dark mode with a component to choose between dark/light/system themes
- Has a homepage that describes what the dapp is, how to use it, and why it exists.
- Has a page that shows all active/expired pots and pots the logged-in account has bought into
- Has a page for showing pot stats (timer, buy-ins, balance, etc.)
- Has a component for buying into an active pot
- Has a component for winners to redeem an expired pot
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