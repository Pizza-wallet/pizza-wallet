# Pizza Wallet

## Table of contents
- [Description](#description)
    - [Integrations](#integrations)
    - [Supported Chains](#supported-chains)
- [Development Guide](#development-guide)
    - [Requirements](#requirements)
    - [Install all dependencies](#install-all-dependencies)
    - [Create a Moralis Testnet Server](#create-a-moralis-testnet-server)
    - [Create an Alchemy App](#create-an-alchemy-app)
    - [Start a Development Server](#start-the-webpack-development-server)
    - [Build App](#build-app)
    - [Docker](#docker)
- [Contribute](#contribute)

## Description

Self custodial, decentralized, chain agnostic, service aggregator wallet. The one stop shop for web3 users

### Integrations

- [Moralis](https://moralis.io/) - Web3 API for Auth and other Utils
- [Web3Auth](https://web3auth.io/) - Social and Email Login <br>
    Note: For security reasons, web3auth only authorizes requests from our app's domain (app.pizzawallet.io). If you need to use web3auth in remote development environments, you need to create your own web3auth key.
    1. Go here to generate a key: https://dashboard.web3auth.io/
    2. Replace the value in "clientId" in both of this components: App.tsx and SignIn.jsx
- [LI.FI](https://li.fi/) - Cross Chain Swap
- [Onramper](https://onramper.com/) - Fiat Onramp & Offramp

### Supported Chains

- Ethereum
- Polygon
- Fantom
- Avalanche
- Optimism
- Arbitrum
- BNB Smart Chain
- Gnosis
- Celo

## Development Guide

### Requirements

It is recommended to be running a Debian or Ubuntu based Linux distribution. <br>
In order to install the requirements for another OS, please refer to the official guides.  

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
2. Click View Details for your newly created instance and copy both the "Server URL" and "Application ID" <br>
3. Create a .env.local file with the following content<br>
```sh
REACT_APP_MORALIS_SERVER_URL=[Insert your Server URL]
REACT_APP_MORALIS_APPLICATION_ID=[Insert your Application ID]
```

### Create an Alchemy App

1. Go to Alchemy and create an app on the Goerli testnet
2. Click View Key and Copy the HTTPS URL
3. Add it to your .env.local file <br>
```sh
REACT_APP_PROVIDER_URL=[Insert your App URL]
```

### Start the Webpack Development Server:

```sh
yarn start
```

or

### Build App:

```sh
yarn build
```

### Docker

We recommend developing with Docker. This ensures you're development environment is isolated from the rest of your machine. Refer to the official documentation to install Docker. ([Docs](https://docs.docker.com/desktop/linux/install/))

```sh
docker-compose -f docker-compose-dev.yml up --build
```

## Contribute

- We love builders! Here's how you can help.

#### The Builder:
- Check github's [issues](https://github.com/Pizza-Wallet-Development-team/pizza-wallet/issues) to see what needs to be done.

#### The Bug Hunter:
- Found a bug? Either contact us at `info@pizzawallet.io` or create a new issue [here](https://github.com/Pizza-Wallet-Development-team/pizza-wallet/issues/new?assignees=&labels=&template=bug_report.md&title=).

#### Request new feature
- We'd love to hear your idea! Submit a feature request [here](https://github.com/Pizza-Wallet-Development-team/pizza-wallet/issues/new?assignees=&labels=&template=feature_request.md&title=).

#### Want to be more involved?
- Either contact `info@pizzawallet.io` or `nunomiguelcg#9270` on Discord to see where you can be the most useful.
