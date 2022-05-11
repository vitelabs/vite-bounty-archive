# Vuilder Hackathon Bounty: Bridgeswap Frontend

## Purpose
The Vite ecosystem needs an automated market maker like Uniswap so that:
1. Users have another decentralized exchange to arbitrage with [ViteX](https://vitex.net/)
2. Vite holders can earn dividends for providing liquidity
3. New tokens can be listed for free

## Frontend Requirements
1. Project is based off of [Vite Express](https://github.com/vitelabs/vite-express)
2. UI/UX similar to [Uniswap](https://uniswap.org/)
3. Has a homepage that displays top pools like on [this page](https://info.uniswap.org/#/)
4. Has a component that allows selecting the token to sell, the token to buy, the amount to sell, the amount to receive, and the maximum slippage. Component also displays the exchange rate and amount of each token in the pool.
5. Has a component that allows adding/removing liquidity from pools

## Contract Requirements
1. Uses Solidity++ 0.8
2. Unit tests for all contract functionality using the setup provided by [Vite Express](https://github.com/vitelabs/vite-express)
3. Takes into account "Frontend Requirements"
4. Each trading pair maintains separate accounting of deposited tokens/liquidity
5. Amount of liquidity provided by each user is stored in a mapping (see note 1 below)
6. Trading pairs must be unique (no duplicate pairs)
7. Users can swap tokens for any listed trading pair
8. Users can add/remove liquidity to any trading pair (the trading pair is created/removed if there is no liquidity)
9.  Adding liquidity is a multi-transaction process due to the limitation that only a single token type can be sent in a Vite transaction (see note 2 below)
10. Either a single token or both tokens can be added
11. Swap fees are applied to liquidity deposit if added token liquidity is not balanced based on the current swap rate
12. Swaps must have slippage limit (a minimum token received) and a deadline (swap not executed after a given snapshot height)
13. Swaps have fixed percent fee paid to liquidity providers
14. Feel free to use our past AMM bounty winner [bridgeswap](https://github.com/peyton/bridgeswap) for inspiration (it fulfills most, but not all contract requirements for this bounty)

## Notes
1. Tokens on Vite are native to the Vite protocol, and do not have many features/options that ERC-20 tokens have. As such, the amount of liquidity provided to the contract by an address should only be accounted internally by the contract state using a mapping (rather than with an additional contract-based token like in Uniswap).
2. In Vite, each transaction can only send a single native token. Providing liquidity to an AMM requires providing two different tokens, thus requiring two transactions. One way to get around this limitation is to allow deposits and withdrawals (of each token type) into a "holding pool", and then once those tokens are deposited, invoke a function to confirm providing liquidity with an additional function call.
3. There is no gas in Vite. Instead, contracts require Vite to be locked to provide quota for the contract. This allows the contract to have a certain throughput based on the amount of Vite staked. As such, keeping a contract consolidated rather than spread out among multiple contracts is often a better approach, so an operator does not need to split Vite reserves to provide quota among several contracts

## Prizes
- $4000 in Vite

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