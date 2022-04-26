# Vite Joint Account dApp Backend

JointAccount is a Solidity++ payable contract that designates an immutable list of accounts and an immutable voting threshold that allows accounts to propose and disburse funds.

JointAccountManager is a companion contract that tracks deployed JointAccount contracts.

## Getting Started

### Developing the Contracts

This project uses `Solidity++ 0.8 Preview` vscode extension to build and run the contracts. The included `launch.json` will launch the soliditypp debugger through vscode.

### Testing the Contracts

Tests are written in Typescript and use mocha/chai to test assertions. Use `npm` to install dependencies and run tests.

```console
lesserhatch@localhost:~$ npm install
lesserhatch@localhost:~$ npm run test-on-nightly
```

## Project Background

This project fulfills the backend requirements and features specified by [vitelabs/bounties#24](https://github.com/vitelabs/bounties/issues/24). I wrote this contract and test to help open source software and to get real blockchain development experience.
