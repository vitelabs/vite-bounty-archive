# Vite Joint Account

This is smart contract written in solidity++ to support 
Joint Accounts (like multisig) on the Vite Blockchain.

Any user can create a Joint Account and 
specify the members and the spend confirmation threshold. 
This threshold must be less than or equal to the number of members.

Any member of the Joint Account can propose a motion to spend the account's tokens, 
though only a single proposal can exist on a joint account 
at any time so any new proposal will replace the existing one, 
executing it if the threshold has been met.

## Setup
Clone the project and run `yarn` in the project folder to install the required packages.

Follow the instructions [here](https://docs.vite.org/vite-docs/tutorial/sppguide/introduction/installation.html#deploying-your-first-contract) 
to install the Soliditypp VSCode extension and deploy the contract.

## Tests
Run `yarn test` to run the tests for the contract.
