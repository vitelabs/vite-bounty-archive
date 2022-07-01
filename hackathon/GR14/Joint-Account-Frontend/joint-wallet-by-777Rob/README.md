# A dapp for holding funds between multiple accounts in the Vite ecosystem.

# The app is able to:

- Protect funds of compromised accounts
- Allow funds to only move by majority vote
- Enable escrow services

# Features:

- Anyone can create a joint account
- Joint account makers can specify who can vote and the approval threshold to move funds
- Joint accounts can hold multiple token types
- Joint account members can propose a motion to move a specific token type and amount to a specific address
- Joint account members can vote to pass the motion or not (not voting counts as rejecting the motion)
- If the approval threshold to pass the motion is met, the transfer is executed and then the motion and votes are reset
- Motions can be replaced or removed at any time by any joint account member; when this happens, votes are reset.

# Details:

- Smart contract used is from [samuelemarro-github-repository](https://github.com/samuelemarro/gr13-vite-joint-account) It was developed for - [contract-bounty](https://gitcoin.co/issue/28534)
- Project is based off of [Vite Express](https://github.com/vitelabs/vite-express)
- Contract data is fetched in graphql server
- [GR14-issue](https://gitcoin.co/issue/28943)

# Getting Started

```
# install all dependancies

npm run install

# open 2 terminals
# terminal 1 - start frontend
npm run website

# terminal 2 - start graph
npm run graph
```

# Create account page

![Create account page](https://github.com/777Rob/joint-wallet/blob/main/images/CreateJointAccount.png)

# Landing page

![Landing 1](https://github.com/777Rob/joint-wallet/blob/main/images/Landing.png)
![Landing 2](https://github.com/777Rob/joint-wallet/blob/main/images/Landing2.png)
![Landing 3](https://github.com/777Rob/joint-wallet/blob/main/images/Landing3.png)

# Select Account page

![Select page](https://github.com/777Rob/joint-wallet/blob/main/images/SelectJointAccount.png)
![Select bottom](https://github.com/777Rob/joint-wallet/blob/main/images/SelectBottom.png)
![Select darkmode](https://github.com/777Rob/joint-wallet/blob/main/images/SelectDarkMode.png)

# Connect with wallet page

![Create account page](https://github.com/777Rob/joint-wallet/blob/main/images/ConnectWithVite.png)

# Dashboard

## Overview

![Dashboard Overview](https://github.com/777Rob/joint-wallet/blob/main/images/DashboardOverview.png)

## Motions

![Dashboard Motions](https://github.com/777Rob/joint-wallet/blob/main/images/DashBoardMotions.png)

# GraphQL Endpoint

![GraphQL](https://github.com/777Rob/joint-wallet/blob/main/images/Gql.png)
![GraphQL Token Info](https://github.com/777Rob/joint-wallet/blob/main/images/GqlTokenInfo.png)
![GraphQL Account](https://github.com/777Rob/joint-wallet/blob/main/images/GqlJointAccount.png)
![GraphQL Queries](https://github.com/777Rob/joint-wallet/blob/main/images/GraphQueries.png)

# Getting Started

```
npm install

# run unit test for test/*.spec.ts
npx vuilder test

# deploy contract
# edit scripts/deploy.config.json && run deploy scripts
npx ts-node scripts/deploy.ts

# stake quota for contract(by web-wallet)

```

## Getting Started with the Frontend

A frontend created with [create-react-app](https://create-react-app.dev/) using [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/) has been created under the `frontend` folder.

Features frontend implements out of the box:

- Routing with [react-router-dom v6](https://reactrouter.com/)
  - Implemented in [Router.tsx](frontend/src/components/Router.tsx)
- Global state management using a [higher-order component](https://reactjs.org/docs/higher-order-components.html) called `connect` which connects the passed in component to a single [context](https://reactjs.org/docs/context.html).
  - Implemented in [globalContext.tsx](frontend/src/utils/globalContext.tsx)
  - The initial global state is set in [App.tsx](frontend/src/components/App.tsx)
  - To mutate the global state, a `setState` function is passed to all connected components as a prop.
    - Pass an object to it and its properties will be shallow merged with the current global state
      - e.g. `setState({ networkType: network })`
      - To deep merge, pass a second meta object to `setState` like:
        ```ts
        setState({ a: { b: 'c' } }, { deepMerge: true });
        // { a: { d: 3 } } => { a: { d: 3, b: 'c' } }
        ```
  - Note: all non-page component that are connected go in the `containers` folder, else they go in the `components` folder.
  - The `State` type can be modified in [types.ts](frontend/src/utils/types.ts)
- [ViteConnect](https://github.com/vitelabs/vite-connect-client) for signing transactions with the Vite Wallet [iOS](https://apps.apple.com/us/app/vite-multi-chain-wallet/id1437629486) / [Android](https://play.google.com/store/apps/details?id=net.vite.wallet) app
  - Implemented in [viteConnect.ts](frontend/src/utils/viteConnect.ts)
    - This handles saving the ViteConnect session to a browsers `localStorage` to persist it after reloading the page
    - To call a contract, a `callContract` function is passed to all connected components as a prop.
    - Contracts should be stored in the `contracts` folder.
      - e.g. [coffee_abi.json](contracts/coffee_abi.json) and [coffee_contract.json](contracts/coffee_contract.json)
- internationalization (i18n)
  - Translation changes when `languageType` is updated in [PageContainer.tsx](frontend/src/components/PageContainer.tsx)
  - English translation: [en.json](frontend/src/i18n/en.json)
- Light, Dark, and System themes
  - Theme is updated in [PageContainer.tsx](frontend/src/components/PageContainer.tsx)
  - Theme is persists via `localStorage` in [theme.ts](frontend/src/styles/theme.ts)
  - Light and dark theme colors can be changed in [colors.css](frontend/src/styles/colors.css) and [tailwind.config.js](frontend/tailwind.config.js)
- Toast alerts
  - Implemented in [Toast.tsx](frontend/src/containers/Toast.tsx)
  - To use, call `setState({ toast: 'message' })` in a connected component.

This is a fork of [dapp-buymeacoffee](https://github.com/vitelabs/dapp-buymeacoffee)
