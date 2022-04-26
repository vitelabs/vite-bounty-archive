# ViteClout Social Token Platform

### View components for further documentation.

VIEW LIVE FRONTENT: [HERE](https://elegant-goldberg-2a9d8d.netlify.app/)

This is our submission for Grants Round 12 Hackathon: Social Token Project (ViteClout)

This submission will likely not be complete, but should give a very good representation of the core features and functionality for viteClout, in regards to interacting with the database, twitter authenticationand, viteConnect and vite protocol.

This Project is built with React on the frontend and uses MongoDB to keep a database of current Vuilders. ViteClout Vuilders can update profile information and profile pictures.

This project utilizes the following repositories:

1. [ViteClout Server](https://github.com/JithinKS97/viteclout-server)
2. [ViteConnect Client](https://github.com/vitelabs/vite-connect-client)
3. [ViteConnect Server](https://github.com/vitelabs/vite-connect-server)

## Installation
----------------
Clone this repository and create .env files with the .sample_env files provided

 ## 1. ViteClout Server

Install MongoDB Locally and have running as a service.
Download: [HERE](https://www.mongodb.com/try/download/community)

Next, 

CLONE REPOSITORY HERE: [ViteClout Server](https://github.com/DTIV/viteclout-server)

Install all dependancies and start

```
npm install
npm run dev
```
Until and admin is implemented,a dd all Vuilders to database using postman 

## 2. ViteConnect Server

If this repository does not contain the code for ViteConnect Server,

Clone the ViteConnect Server Repo: [HERE](https://github.com/vitelabs/vite-connect-server)

Development
```
yarn
yarn dev
```

Production
```
yarn build
yarn start
http://localhost:5000/hello
```

## 3. ViteClout Frontend

Install all dependancies and start

```
npm install
npm run dev
```

### ViteClout was built by myself and [JithinKS97](https://github.com/JithinKS97/)
