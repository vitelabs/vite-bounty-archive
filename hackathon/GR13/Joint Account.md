# Joint Account

## Purpose

The Vite ecosystem needs a dapp for holding funds between multiple accounts. This will:
1. Protect funds of compromised accounts
2. Allow funds to only move by majority vote
3. Enable escrow services

## Features
- Anyone can create a joint account
- Joint account makers can specify who can vote and the approval threshold to move funds
- Joint accounts can hold multiple token types
- Joint account members can propose a motion to move a specific token type and amount to a specific address
- Joint account members can vote to pass the motion or not (not voting counts as rejecting the motion)
- If the approval threshold to pass the motion is met, the transfer is executed and then the motion and votes are reset
- Motions can be replaced or removed at any time by any joint account member; when this happens, votes are reset.

## Prizes
- 2000 USD in VITE for developing a smart contract
- 2000 USD in VITE for creating a UI design

## Contract Requirements
- Takes into account "Features" and "UI Requirements"
- Uses Solidity++ 0.8.0
- Unit tests for all contract functionality using [ViteJS](https://github.com/vitelabs/vite.js "https://github.com/vitelabs/vite.js") and your unit testing library of choice.
- Keeps track of all joint accounts
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
- Has a page that shows all joint accounts your Vite address is a member of
- Has a component for proposing/replacing/removing motions to move funds
- Has a component for voting on motions
- Has a component that shows all a joint account's history (sending/receiving funds, motion pass/reject/replace, etc.)
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