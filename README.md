# Pizza Wallet

## Table of contents

- [Description](#description)
  - [Integrations](#integrations)
  - [Supported Chains](#supported-chains)
- [Development Guide](#development-guide)
  - [Requirements](#requirements)
  - [Install all dependencies](#install-all-dependencies)
  - [Create a Moralis Testnet Server](#create-a-moralis-testnet-server-deprecating-soon)
  - [Environment Variables](#environment-variables)
  - [Start a Development Server](#start-the-webpack-development-server)
  - [Build App](#build-app)
  - [Docker](#docker)
- [Contribute](#contribute)

## Description

Self custodial, decentralized, chain agnostic, service aggregator wallet. The one stop shop for web3 users

### Integrations

- [Moralis](https://moralis.io/) - Web3 API for Auth and other Utils (Deprecating Soon)
- [Web3Auth](https://web3auth.io/) - Social and Email Login
  Note: For security reasons, web3auth only authorizes requests from our app's domain.
  If you need to use web3auth in remote development environments, you need to create your own web3auth key.
  1. Go [here](https://dashboard.web3auth.io/) to generate a key.
  2. Replace the value in "clientId" in both of this components: ``App.tsx`` and ``SignIn.jsx``
- [LI.FI SDK](https://li.fi/sdk/) - Cross Chain Swap
- [Onramper Widget](https://onramper.com/) - Fiat Onramp & Offramp

### Supported Chains

- Ethereum
- Fantom
- Polygon
- Avalanche
- Arbitrum
- Optimism
- Binance

## Development Guide

### Requirements

It is recommended to be running a Debian or Ubuntu based Linux distribution.
In order to install the requirements for another OS, please refer to the official guides.

1.NVM

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash && source ~/.nvm/nvm.sh
```

2.Node

```sh
nvm use --lts
```

3.Yarn

```sh
npm install --global yarn
```

### Install all dependencies

```sh
yarn install
```

### Create a Moralis Testnet Server (Deprecating Soon)

1. Go to Moralis and create a testnet server with the following test chains: Eth (Kovan), Polygon (Mumbai), Bsc (Testnet), Avax (Testnet)
2. Click View Details for your newly created instance and copy both the "Server URL" and "Application ID"

### Environment Variables

1. Rename ``.env.local.template`` to ``env.local`` and add your variables.

```sh
REACT_APP_MORALIS_SERVER_URL=[Insert your Server URL]
REACT_APP_MORALIS_APPLICATION_ID=[Insert your Application ID]
REACT_APP_MULTICALL_ADDRESS=[Multicall Contract Address]
REACT_APP_RPC_PROVIDER_ETH=[Ethereum RPC]
REACT_APP_RPC_PROVIDER_FANTOM=[Fantom RPC]
REACT_APP_RPC_PROVIDER_POLYGON=[Polygon RPC]
REACT_APP_RPC_PROVIDER_AVALANCHE=[Avalanche RPC]
REACT_APP_RPC_PROVIDER_ARBITRUM=[Arbitrum RPC]
REACT_APP_RPC_PROVIDER_OPTIMISM=[Optimism RPC]
REACT_APP_RPC_PROVIDER_BSC=[BSC RPC]
```

### Start the Webpack Development Server

```sh
yarn start
```

or

### Build App

```sh
yarn build
```

### Docker

We recommend developing with Docker. This ensures you're development environment is isolated from the rest of your machine. Refer to the official [documentation](https://docs.docker.com/desktop/linux/install/) to install Docker.

```sh
docker-compose -f docker-compose-dev.yml up --build
```

## Contribute

- We love builders! Here's how you can help.

### The Builder

- Check github's [issues](https://github.com/Pizza-Wallet-Development-team/pizza-wallet/issues) to see what needs to be done.

### The Bug Hunter

- Found a bug? Either contact us at `info@pizzawallet.io` or create a new issue [here](https://github.com/Pizza-Wallet-Development-team/pizza-wallet/issues/new?assignees=&labels=&template=bug_report.md&title=).

### Request new feature

- We'd love to hear your idea! Submit a feature request [here](https://github.com/Pizza-Wallet-Development-team/pizza-wallet/issues/new?assignees=&labels=&template=feature_request.md&title=).

### Want to be more involved?

- Either contact `info@pizzawallet.io` or `nunomiguelcg#9270` on Discord to see where you can be the most useful.
