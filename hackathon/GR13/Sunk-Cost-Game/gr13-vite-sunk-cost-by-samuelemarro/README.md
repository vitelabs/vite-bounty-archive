# GR13 Hackathon - Vite Sunk Cost Game contract

This contract is my submission to GitCoin's Round 13 Hackathon "Sunk Cost Game" bounty.

## Features

- Customizable expiration increase
- Burn x tokens every time a player joins
- Increase the price every time a player joins
- Getters for UIs

## Installing

`git clone https://github.com/samuelemarro/gr13-vite-sunk-cost`

## Running

1. Download the [soliditypp 8.0.0 preview extension for VSCode](https://marketplace.visualstudio.com/items?itemName=ViteLabs.solppdebugger)
2. Follow the extension's guide to setup a launch.json file
3. Hit F5

## Testing

`npm run test`

Note: the current Vite node implementation has a nondeterministic response time. This means that the execution time can vary significantly between runs, leading to
some tests occasionally failing. In such cases:
1. Try launching the tests again, either as part of the whole test suite or on their own with `--grep`
2. Increase the timeout in mocharc.nightly.json

## IMPORTANT - Node timestamp hack

Since the node's timestamp cannot be set reliably, for testing purposes the contract uses a variable (which can be set) in place of the real block timestamp.
In order to obtain the production-ready contract code, simply comment and uncomment the lines as stated in SunkCost.solpp.