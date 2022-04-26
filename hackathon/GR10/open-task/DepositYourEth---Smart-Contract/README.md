# DepositYourEth---Smart-Contract
DepositYourEth is a smart contract that can be used to transact ether between metamask accounts. It is run on the rinkeby test network using an infura api, no real ether is transacted.
For this case I have used deposits sent from tenants to a landlord. The ether can only be withdrawn from the landlord address.
Steps to Reproduce:

- run npm install
- get rinekby infura api from infura webpage --> insert rinkeby api & 12 word mnemonic in deploy.js and web3.js
- run: node compile and node deploy 
- copy deployed address to deposits.js
- to run on localhost: npm run dev
