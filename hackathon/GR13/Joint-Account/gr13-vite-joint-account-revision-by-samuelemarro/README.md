# GR13 Hackathon - Vite Joint Account contract

This contract is my submission to GitCoin's Round 13 Hackathon "Joint Account" bounty.

## Features
- Create proposals to
 - Transfer tokens
 - Add or remove members
 - Change the vote threshold
- Create a static account (members cannot be added or removed, threshold cannot be changed)
- Create a member-only deposit account (only members can deposit)
- Cancel and re-vote as many times as you want
- Cancel entire proposals
- Getters for UIs

## Installing

`git clone https://github.com/samuelemarro/gr13-vite-joint-account`

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

## Design notes

In order to both save quota and provide a consistent contract interaction flow, some design decisions have been made:
- Removing a member doesn't change the approval threshold
- Removing a member doesn't remove that member's votes on motions
- Proposals cannot be edited; instead, a new proposal must be submitted (this prevents frontrunning attacks where the proposal is edited after the vote transaction is signed)
- A transfer from a joint account A to a member-only deposit joint account B can be performed only 
- All sanity checks for motions (e.g. sufficient balance for a transfer) are performed both at motion creation time and execution time.
  The only skipped checks are the ones regarding factors that cannot change between motion creation and execution (e.g. if a joint account is static)