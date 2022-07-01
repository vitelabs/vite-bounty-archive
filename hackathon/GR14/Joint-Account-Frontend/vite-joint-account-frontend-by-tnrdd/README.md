# Vite Joint Account Frontend

Dapp that enable the user to create an account holding funds between multiple addresses.
To transfer the funds a minimum threshold of votes must be reached, this enhance security and enables interesting use cases like escrow services.

A live demo is available [here](https://tnrdd-joint-account.vercel.app).

It is build with [Vite Express](https://github.com/vitelabs/vite-express) and uses the contract of [samuelemarro](https://github.com/samuelemarro/gr13-vite-joint-account).

## Features

- Anyone can create a joint account.
- Joint account makers can specify who can vote and the approval threshold to move funds.
- Joint accounts can hold multiple token types.
- Joint account members can propose a motion to move a specific token type and amount to a specific address.
- Joint account members can vote to pass the motion or not (not voting counts as rejecting the motion).
- If the approval threshold to pass the motion is met, the transfer is executed and then the motion and votes are reset.
- Motions can be replaced or removed at any time by any joint account member; when this happens, votes are reset.

## Install
```
git clone https://github.com/tnrdd/vite-joint-account-frontend.git`
cd vite-joint-account-frontend
npm install
cd frontend
npm install
```
## Run
```
cd frontend
npm run start
```
