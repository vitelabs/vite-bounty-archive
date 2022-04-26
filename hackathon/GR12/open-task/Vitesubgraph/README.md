# vite-subgraph

![License](https://img.shields.io/badge/license-MIT-green)
[![GitHub issues](https://img.shields.io/github/issues/binsta/vite-subgraph.svg?style=flat-rounded)](https://github.com/binsta/vite-subgraph)

This subgraph focuses on tracking set vault tokens transfers of Vite. This supgraph powers the [Vite API](https://docs.vite.org/)

# [SubGraph](https://thegraph.com/hosted-service/subgraph/binsta/vitesubgraph)

## Initial setup

Generate graphql entities and contracts:

```bash
yarn prepare:mainnet
yarn codegen
```

## Deploying a Subgraph

Prepare deployment:

```
yarn prepare:<network>
```

Deploy

```
yarn deploy:<network>
```
Check the [example](https://github.com/binsta/Vitesubgraph/tree/main/example)
