# Vuilder Hackathon Bounty: SBP Reward Distributor

## Purpose
The Vite ecosystem needs a tool for SBPs to distribute their block creation	and voting rewards. This will:
1. Enable more equitable Vite inflation distribution
2. Give Vite holders more opportunities to earn yield
3. Increase community engagement

## Minimum Requirements
1. Existing nodes can run this program on the same machine
2. Keeps track of votes by address, amount, and time/history.
3. Step-by-step documentation for how to get the reward distributor running
4. SBP operators can define parameters including:
	1. A TypeScript function that retrieves and distributes SBP rewards
	2. Frequency for how often the TypeScript function gets called
	3. How much disk space the voting history can take up (if the limit is reached, the oldest records are discarded)
	4. Number of snapshots that should pass before calling the TypeScript function
5. The TypeScript function should have easy-to-set parameters (either at the top of the file or in a separate config file) for adjusting/disabling specific functionality. These parameters should include:
	1. Minimum/Maximum distribution size for specific/all voting addresses
	2. A mechanism that gives loyal voters more rewards
	3. Additional tokens to distribute to voters
6. The TypeScript function should be passed current and past voting stats as arguments and give SBP operators full control over how rewards are distributed. This should enable endless possibilities. For example, SBP operators could add custom functionality that:
	1. tweets when certain milestones or events happen
	2. DMs specific users on Telegram when an error occurs
	3. blacklists certain addresses
7. Unit tests


## Prizes
- 2,000 USD in either VITE or USDT

## Judging Criteria
- The Vite Labs team will check to make sure all of the requirements have been met
- Consolation prizes will be given for submissions that are good, but don’t meet all requirements
- If your submission is close to completion, but requires minor improvements, we may reach out to you to discuss revisions with you so you can get the full bounty prize.

## Winner Announcement
- After the bounty deadline, we will announce the winner when all submissions have been reviewed and the judge's scores tabulated.

## Resources
- Vite Documentation: [https://docs.vite.org/](https://docs.vite.org/ "https://docs.vite.org/")
- Vite Discord: [https://discord.com/invite/CsVY76q](https://discord.com/invite/CsVY76q "https://discord.com/invite/CsVY76q")

## Follow Vite on social media
- [https://twitter.com/vitelabs](https://twitter.com/vitelabs "https://twitter.com/vitelabs")
- [https://twitter.com/vitexexchange](https://twitter.com/vitexexchange "https://twitter.com/vitexexchange")
- [https://t.me/vite\_en](https://t.me/vite_en "https://t.me/vite_en")
- [https://t.me/vitexexchange](https://t.me/vitexexchange "https://t.me/vitexexchange")