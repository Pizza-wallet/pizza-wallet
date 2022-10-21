interface Chain {
  rpc?: string;
  name: string;
  logoUri: string;
}
interface ChainInterface {
  1: Chain;
  137?: Chain;
  56?: Chain;
  42161?: Chain;
  43114?: Chain;
  250?: Chain;
}

const chainDetails: ChainInterface = {
  1: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_ETH,
    name: "Ethereum",
    logoUri:
      "https://storageapi.fleek.co/d1921602-c1d0-4d59-82e9-e36a2947b855-bucket/App/static/token-icons/weth.png",
  },
  137: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_POLYGON,
    name: "Polygon",
    logoUri: "https://wallet-asset.matic.network/img/tokens/matic.svg",
  },
  56: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_BSC,
    name: "Binance smart chain",
    logoUri:
      "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_binance.jpg&w=32&q=75",
  },
  42161: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_ARBITRUM,
    name: "Arbitrum",
    logoUri:
      "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_arbitrum.jpg&w=32&q=75",
  },
  43114: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_AVALANCHE,
    name: "Avalanche",
    logoUri:
      "https://chainlist.org/_next/image?url=https%3A%2F%2Fdefillama.com%2Fchain-icons%2Frsz_avalanche.jpg&w=32&q=75",
  },
  250: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_FANTOM,
    name: "Fantom",
    logoUri:
      "https://assets.coingecko.com/coins/images/4001/thumb/Fantom.png?1558015016",
  },
};

export const getChainDetails = (chainId: any) => {
  return chainDetails[chainId as keyof ChainInterface];
};
