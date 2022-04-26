[![GitHub contributors](https://img.shields.io/github/contributors/nilesh46/Sunk-Cost-Game-Vite?style=for-the-badge)](https://github.com/nilesh46/Sunk-Cost-Game-Vite/contributors)
[![GitHub issues](https://img.shields.io/github/issues/nilesh46/Sunk-Cost-Game-Vite?style=for-the-badge)](https://github.com/nilesh46/Sunk-Cost-Game-Vite/issues)
[![GitHub forks](https://img.shields.io/github/forks/nilesh46/Sunk-Cost-Game-Vite?style=for-the-badge)](https://github.com/nilesh46/Sunk-Cost-Game-Vite/network)
[![GitHub stars](https://img.shields.io/github/stars/nilesh46/Sunk-Cost-Game-Vite?style=for-the-badge)](https://github.com/nilesh46/Sunk-Cost-Game-Vite/stargazers)
[![GitHub license](https://img.shields.io/github/license/nilesh46/Sunk-Cost-Game-Vite?style=for-the-badge)](https://github.com/nilesh46/Sunk-Cost-Game-Vite/blob/main/LICENSE)


<!-- PROJECT LOGO -->
<br />
<p align="center">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  <h3 align="center">Sunk Cost Game</h3>
  <p align="center">
    <a href="https://gitcoin.co/issue/vitelabs/bounties/25/100028535">Vite Hackathon</a>
    ·
    <a href="https://fomo-pot.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/nilesh46/Sunk-Cost-Game-Vite/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#structure">Structure</a></li>
    <li>
        <a href="#installation">Installation</a>
        <ul>
        <li>
            <a href="#testing-contracts">Testing Contracts</a>
        </li>
        <li>
            <a href="#running-frontend">Running Frontend</a>
        </li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Sunk Cost Game is a fun DAPP similar to Fomo3D for rewarding lucky Vite users.

<i>It's a Work In Progress.</i>

#### Built With

* Solidity++
* ViteJS
* Mocha
* Chai
* React

<!-- ABOUT THE PROJECT -->
## Structure

##### Contract Details

<p>At the time of contract deployment the owner/creator sets a PotCreation Fee (Amount to be given to create a Pot).
This fee can be seen as the protocol incentives.
</p>
<p>
The contract consists of mainly 3 restricted owner functions
<li> setOwner - To change the owner of contract</li>
<li> setFee - To change the Pot Creation Fee</li>
<li> claimFee - To claim the protocol fee</li>
</p>

##### Game Details
<p>The game mainly consists of 3 functions
<li>createPot  -To create a pot by any user by spending the Pot Creation Fee</li>
<li> buyPot - To buy the pot by spending the current buy in ammount of Pot</li>
<li> claimReward - To claim the reward of a Pot by the winner</li>
</p>

##### Pot Structure
```
struct Pot {
      address PotOwner; //Pot Creator address
      uint256 maxTimerLimit; // max limit by which players can extend the expiration time of Pot by buying in the pot
      uint256 buyInIncrementAmount; //Increment Amount of pot value at each buy in
      uint256 burnAmount; //amount of token burned at each buy in
      uint256 extensionAmount; //Time period extension at each buy in
      address winner; //current winner or buyer of Pot
      uint256 potAmount; //Current Pot Reward
      uint256 currentPrice; //Current Amount required to buy the pot
      vitetoken tokenId; //Token Used for buying the pot
      uint256 start; //start timestamp og Pot
      uint256 end; //end or expiration timestamp of pot
      bool claimed; //claimed status of pot which tells if its reward has been claimed by winner or not
    }
```

<!-- Installation -->
## Installation

Clone the repo
   ```sh
   git clone https://github.com/nilesh46/Sunk-Cost-Game-Vite.git
   ```

   ##### Testing Contracts
   ```sh
   npm install
   ```
   ```sh
   npm test
   ```
##### Running Frontend
   ```sh
   cd frontend
   ```
   ```sh
   npm install
   ```
   ```sh
   npm start
   ```