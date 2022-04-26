# Jackpot-Strike

Jackpot Strike – Prediction markets

Hackathon: Grants Round 10 – VITE LABS

Introduction:

Any trader strives for volatile assets and can really make a big difference in the generated profits. most of the projects that rely on margin trading gives a chance for traders to magnify their profit/loss with always a risk of liquidations that the traders can tolerate if they are too sure about the next move. What if there is a mechanism that allow traders to cancel out these protocols and allow participants to bid on LONG or SHORT for the next move? That is where Jackpot Strike came from!
Plan:

In Jackpot Strike, participants can bid on more than 80 cryptocurrencies markets, either long or short towards 10% range (subject to change: since bigger market caps tends to move slower than smaller ones) from the starting price. We will rely on Chainlink Oracle Feeds that allow retrieving accurate and real-time data feed, the price updates (round) on average on either of the 2 conditions:

- price movement of 0.5% on average.
- 2 hours timeout (when previous condition is invalid).

Participants can bid on the current on-going CYCLE, which consists of 80 ROUNDs, the latter represents a price feed data update. Anyone can check the status of any valid CYCLE, which can display either Pending, Tie, Long, or Short. 

To reduce the chance of a malicious actor to manipulate the system, we will enforce a locking range of 2% near either targets; to elaborate more, let’s say ADA is trading at 1$ so that’s makes targeted prices (6%): 1.06$ (Long) and 0.94$ (Short) so in case someone wants to wait for the price to reach 1.099$ and then bid big on it, he won’t be able to bid except if the price is within 0.9612$ - 1.0388$. 

When a cycle status is determined, there are 3 cases:

- CASE 1: Price keeps fluctuating within the range: All participants refunded back their funds.
- CASE 2: Hits either targets:The winning side wins the liquidated assets of the other side, each participant wins a portion according to the participation %.
- CASE 3: Hits either targets but no one participated in one of positions: The participants refunded back their money.

To be Added:
- add a fee deduction on each bid : e.g: regularly 40% of fees will be burned, the rest will be used to organize prizes and for project development...
- integrate it into trust wallet dapps.
- improve UX.
- make dapp mobile responsive.

To use this dapp:

- you need to have some rinkeby eth faucet, which can be found here :https://faucet.rinkeby.io/
- you have to mint VITE ERC20 tokens in the following smart contract : https://rinkeby.etherscan.io/address/0xa0228a6c2e57a3fcaae1d12f33bf478e42ef9a49#writeContract
- run "npm i" and "npm run start", now you can bid on 9 available markets in rinkeby testnet.
- also for unit testing, please use the following repo, https://github.com/appswarehouse/Jackpot-Strike-TESTING
Have fun!
