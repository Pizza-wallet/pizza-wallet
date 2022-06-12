# Pizza Wallet

[![CircleCI](https://circleci.com/gh/Pizza-Wallet-Development-team/pizza-wallet/tree/main.svg?style=svg)](https://circleci.com/gh/Pizza-Wallet-Development-team/pizza-wallet/tree/main)

## Table of contents
- [Description](#description)
    - [Integrations](#integrations)
    - [Supported Chains](#supported-chains)
- [Development Guide](#development-guide)
    - [Requirements](#requirements)
    - [Install all dependencies](#install-all-dependencies)
    - [Create a Moralis Testnet Server](#create-a-moralis-testnet-server)
    - [Start a Development Server](#start-the-webpack-development-server)
    - [Build App](#build-app)
- [Contribute](#contribute)

## Description

A self custodial user focused wallet with built in DeFi features.

### Integrations

- [Moralis](https://moralis.io/) - Web3 Tools
- [Connext](https://www.connext.network/) - Bridge
- [Rubic](https://rubic.exchange/) - Cross Chain Swaps
- [Transak](https://transak.com/) - Fiat Onramp

### Supported Chains

- Ethereum
- Polygon
- Avalanche
- Binance Smart Chain

## Development Guide

### Requirements

It is recommended to be running a Debian or Ubuntu based Linux distribution. <br>
In order to install the requirements for an other OS, please refer to the official guides.  

1. NVM
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash && source ~/.nvm/nvm.sh
```
2. Node
```sh
nvm use --lts
```
3. Yarn
```sh
npm install --global yarn
```

### Install all dependencies:

```sh
yarn install
```

### Create a Moralis Testnet Server

1. Go to Moralis and create a testnet server with the following test chains: Eth (Kovan), Polygon (Mumbai), Bsc (Testnet), Avax (Testnet)

2. Set Environment variables <br>
2.1 Click View Details for your newly created instance <br>
2.2 Copy and save both "Server URL" and "Application ID" <br>
2.3 Export environment variables
```sh
export REACT_APP_MORALIS_SERVER_URL=[Insert your Server URL] && export REACT_APP_MORALIS_APPLICATION_ID=[Insert your Application ID]
```
or
2.4 Create a .env file
2.5 Edit the .env file
```shell
REACT_APP_MORALIS_SERVER_URL=[Insert your Server URL]
REACT_APP_MORALIS_APPLICATION_ID=[Insert your Application ID]
```

### Start the Webpack Development Server:

```sh
yarn run
```

or

### Build App:

```sh
yarn build
```

## Contribute

We love builders! Here's how you can help:
- Bug fixer - Check github's [issues](https://github.com/Pizza-Wallet-Development-team/pizza-wallet/issues) to see what needs to be fixed.
- The dev - Want to help build new features? Check our board on [ClickUp](https://sharing.clickup.com/36638099/b/h/7-36638099-2/26df81f54e08e7a) and start building!