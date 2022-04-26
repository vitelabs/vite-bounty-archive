# Vite Initial Token Auction

This is smart contract written in solidity++ to support 
token auctions on the Vite Blockchain.

Any user can create an auction and 
have people bid on the tokens locked.
The highest bidders get the tokens and 
the revenue from the auction is sent to 
the seller. 
Bid ranking is calculated by unit price (price per token) 
rather than total value.

## Setup
Clone the project and run `yarn` in the project folder to install the required packages.

Follow the instructions [here](https://docs.vite.org/vite-docs/tutorial/sppguide/introduction/installation.html#deploying-your-first-contract) 
to install the Soliditypp VSCode extension and deploy the contract.

## Tests
Run `yarn test` to run the tests for the contract.
