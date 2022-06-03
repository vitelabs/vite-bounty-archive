# GR14 Hackathon - Joint Account Frontend

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

## Frontend Requirements
- Takes into account "Features" listed above
- Uses contract from our previous [Joint Account bounty](https://gitcoin.co/issue/28534)
	- The winning submission was from [samuelemarro](https://github.com/samuelemarro/gr13-vite-joint-account), but feel free to modify it or take inspiration from other submissions.
- Project is based off of [Vite Express](https://github.com/vitelabs/vite-express)
- Feel free to use any design aesthetic but it must be consistent throughout the whole dapp

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