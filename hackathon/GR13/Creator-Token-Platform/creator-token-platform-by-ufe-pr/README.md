# Vite Creator Token Platform

This is smart contract written in solidity++ to support 
Creator tokens on the Vite Blockchain.

Every address has a respective token which is minted on a bonding curve. 
Users can mint/burn/swap tokens as they provided that 
the action doesn't take the token supply below the base supply.
Every creator is assigned a fixed amount of their own token initially.

## Setup
Clone the project and run `yarn` in the project folder to install the required packages.

Follow the instructions [here](https://docs.vite.org/vite-docs/tutorial/sppguide/introduction/installation.html#deploying-your-first-contract) 
to install the Soliditypp VSCode extension and deploy the contract.

## Tests
Run `yarn test` to run the tests for the contract.
