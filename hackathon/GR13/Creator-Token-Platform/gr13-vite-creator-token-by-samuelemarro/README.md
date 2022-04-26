# GR13 Hackathon - Vite Creator Token Contract

This contract is my submission to GitCoin's Round 13 Hackathon "Creator Token Platform" bounty.

## Features

- Transfer tokens
- Mint and burn tokens using a linear bonding curve
- Swap tokens for other tokens
- View the number of holders
- View holders in descending order of ownership
- Customizable bonding curve coefficient
- Getters for UIs

## Installing

`git clone https://github.com/samuelemarro/gr13-vite-creator-token`

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

## Version Info

This contract was written with gvite-v2.12.0-vm-nightly-202202090645