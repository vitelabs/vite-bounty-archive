# Joint-Account-Frontend
Protect funds of compromised accounts Allow funds to only move by majority vote Enable escrow services
Dapp that enable the user to create an account holding funds between multiple addresses. To transfer the funds a minimum threshold of votes must be reached, this enhance security and enables interesting use cases like escrow services.

It is uses the contract of samuelemarro.

Features

It includes all the frontend features
Anyone can create a joint account.
Joint account makers can specify who can vote and the approval threshold to move funds.
Joint accounts can hold multiple token types.
Joint account members can propose a motion to move a specific token type and amount to a specific address.
Joint account members can vote to pass the motion or not (not voting counts as rejecting the motion).
If the approval threshold to pass the motion is met, the transfer is executed and then the motion and votes are reset.
Motions can be replaced or removed at any time by any joint account member; when this happens, votes are reset.
75% complete

Install
git clone https://github.com/Haqqaa/Joint-Account-Frontend.git

cd joint-account-frontend
npm run compile:sass
npm install
Open html file and base.scss
Run using live-server
