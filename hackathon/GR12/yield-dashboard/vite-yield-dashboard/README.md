<h1 align="center">
  <!--<img src="https://raw.githubusercontent.com/ZachDolph/vite-yield-dashboard/master/src/assets/img/logos/vite-cover-milltay-1.jpg" width="1060px"/><br/>-->
  Vite Yield Dashboard
</h1>
<p align="center">Yield dashboard that shows various ways to earn in the Vite ecosystem.<br>Users can use this information to decide where to commit their capital.<br><a href="https://vite-yield-dashboard.web.app">https://vite-yield-dashboard.web.app</a>
<br>* STILL A WORK IN PROGRESS *</p>

<p align="center"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />&nbsp;<img src="https://img.shields.io/tokei/lines/github/zachdolph/vite-yield-dashboard?logoColor=purple" alt="Lines of Code" /><br><img src="https://img.shields.io/badge/version-v0.0.0-green?style=for-the-badge&logo=none" alt="Yield Dashboard Version" /></a>

## 💎 Features 💎
<p>
  Calculates APR from the following methods to earn rewards:<br>
  - Staking VITE for VX<br>
  - Staking VX for dividends from ViteX<br>
  - SBP Voting Rewards (in progress)<br>
</p>
<br>

## ⚒️ Installation ⚒️

1. Create a directory to clone the project into:

    ```
    mkdir vite-yield-dashboard && cd vite-yield-dashboard
    ```

2. Clone into the directory:

    ```
    git clone git://github.com/ZachDolph/vite-yield-dashboard.git .
    ```

> We recommend you use yarn

3. Install all packages

   ```
   yarn

   # npm install [for npm]
   ```

4. Run development server

   ```
   yarn dev

   # npm run dev [for npm]
   ```

5. Generate build files for deployment

   ```
   yarn build

   # npm run build [for npm]
   ```

<p>
  That's all it takes to get started! 🎉
</p>
<br>

## ❓ FAQ ❓

<br>
<p>
  How do I stake VITE?
</p>
<p>A user can stake VITE at ViteX and get daily rewards in VX, find more info about VX: <a href="https://vitex.net/faq/">https://vitex.net/faq/</a>.</p><br>
<p>
  How do I retrieve my staking rewards?
</p>
<p>
  Staking VITE rewards distribution daily at 12 pm UTC+8, distribution is made by a smart contract. You can retrieve your staking VITE after 3 days of staking.<br>
  After retrieving rewards, there is a 7 day waiting period for your funds to arrive at your ViteX account. No rewards are distributed during the waiting period.<br>
</p><br>
<p>
  How do I calculate my VITE staking reward amount?
</p>
<p>
  VITE staking rewards depends on daily VX release for staking and total VITE staking amount, which can be seen at ViteX.net.<br>
  Reward amount = (Your staking amount * Daily VX release for staking) / Total staking amount. The minimum amount that you can stake is 134 VITE.
</p>
<br>
<p>
  How do I receive dividends?
</p>
<p>
  A minimum of 10 VX must be staked in the exchange account. Please note that VX held in a wallet or exchange account will
  not make you eligible for dividends; Participant is entitled to receive dividends starting with the next distribution
  immediately after submission of staking request; Staked VX will be released after the 7-day (7 complete cycles) waiting
  period once retrieved. No dividend will be received during this waiting period. Users can enable automatic staking.
  Mined VX will be automatically staked once enabled, purchased VX is not subject to this function.
</p>
<br>
<p>
  How do I get VX dividends?
</p>
<p>
  You will only receive dividends after staking your VX<br>
  1. A minimum 10 VX must be staked in the exchange account to receive dividends.<br>
  2. Once a staking request is submitted, the user will receive dividend payments starting the same day at 12 pm (UTC+8), or the next day at 12 pm (UTC+8) if the staking request is submitted after 12 pm (UTC+8) on that particular day.<br>
  3. Once an unstaking request for VX is submitted, that VX will be released after seven days.<br>No dividends will be distributed during that period.<br>
</p>
<p>
  Users can enable automatic staking. After enabling, the VX obtained from mining will be automatically staked, whereas purchased VX will not be automatically staked.<br>
</p>
<br>
<p>
  How much is paid out in dividends each day?
</p>
<p>
  The system distributes 1% of the total pool to all VX stakers proportional to the VX they have staked in the exchange.
  The initial dividend pool starts at 0 and will increase with fees collected by ViteX. Dividends are paid out in BTC, ETH,
  and USDT only.  For any given day, the total fees collected during that day will be fully distributed by the 100th day.
</p>
<p>
  BTC dividend:<br>
  a = 1% BTC dividends => BTC pool / 100<br>
  b = Then dividends => (a) / total VX staking<br>
  Your dividends in BTC = your VX staking amount * (b)<br>
</p>
<p>
  ETH dividend:<br>
  a = 1% ETH dividends => ETH pool / 100<br>
  b = Then dividends => (a) / total VX staking<br>
  Your dividends in ETH = your VX staking amount * (b)<br>
</p>
<p>
  USDT dividend:<br>
  a = 1% USDT dividends => USDT pool / 100<br>
  b = Then dividends => (a) / total VX staking<br>
  Your dividends in USDT = your VX staking amount * (b)<br>
</p>
<br>
<p>
  How are VX dividends generated?
</p>
<p>
  All trading fees charged by the ViteX platform will be put into a shared dividend pool and distributed at a rate of 1% daily.
  For any given day, the fees collected of the day will be distributed completely in the next 100 days. Trading fees charged
  by operator (Operator Fee) are excluded from dividends.
</p>
<br>
<p>
  How do I vote for an SBP?
</p>
<p>
  1) Open Vite app<br>
  2) Click VITE<br>
  3) Click Vote<br>
  4) Select the SBP you'd like to vote for from the list and press vote (you'll have to run POW for quota)<br>
</p><br>
<p>
  How much in rewards will I receive after voting?
</p>
<p>
  The more VITE you have in your wallet the higher rewards you get. The number of total votes has an effect on your reward amount.<br>
  The higher number of total votes the smaller rewards you will receive. The total reward amount is shared between all voters.<br>
</p>
<br>

## ⭐️ Social ⭐️

If you want to say **thank you** or/and support active development of` ` `Vite Yield Dashboard`:

- Add a [GitHub Star](https://github.com/zachdolph/vite-yield-dashboard) to the project.
- Learn more about the [Vite protocol](https://www.vite.org/whatIsVite).
- Write interesting articles about project on [Medium](https://medium.com/) or personal blog.
- Find Vite related announcements on [on Twitter](https://twitter.com/vitelabs).

Together, we can make the DeFi revolution **reality**! 💖
<p></p>
<br>

## ⚖️ License ⚖️

`Vite Yield Dashboard` is free and open-source software licensed under the [M.I.T. License](https://github.com/ZachDolph/vite-yield-dashboard/blob/master/LICENSE).
