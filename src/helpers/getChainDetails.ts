interface Chain {
  rpc?: string;
  name: string;
  logoUri: string;
}
interface ChainInterface {
  1: Chain;
  250?: Chain;
  137?: Chain;
  43114?: Chain;
  42161?: Chain;
  10?: Chain;
  56?: Chain;
}

const chainDetails: ChainInterface = {
  1: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_ETH,
    name: "Ethereum",
    logoUri:
      "https://gateway.pinata.cloud/ipfs/QmcZFEnPv3ah7rbuf5FsaFZYjePHeUMAA2ESJG5miASzDd/media/chainLogos/ethereum.png",
  },
  250: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_FANTOM,
    name: "Fantom",
    logoUri:
      "https://gateway.pinata.cloud/ipfs/Qme7UTgWc2AF5fBPcuyWA96WsULUrqa2soQa8EsGq1sHkW/media/chainLogos/fantom.webp",
  },
  137: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_POLYGON,
    name: "Polygon",
    logoUri:
      "https://gateway.pinata.cloud/ipfs/Qme7UTgWc2AF5fBPcuyWA96WsULUrqa2soQa8EsGq1sHkW/media/chainLogos/polygon.webp",
  },
  43114: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_AVALANCHE,
    name: "Avalanche",
    logoUri:
      "https://gateway.pinata.cloud/ipfs/Qme7UTgWc2AF5fBPcuyWA96WsULUrqa2soQa8EsGq1sHkW/media/chainLogos/avalanche.webp",
  },
  42161: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_ARBITRUM,
    name: "Arbitrum",
    logoUri:
      "https://gateway.pinata.cloud/ipfs/Qme7UTgWc2AF5fBPcuyWA96WsULUrqa2soQa8EsGq1sHkW/media/chainLogos/arbitrum.webp",
  },
  10: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_OPTIMISM,
    name: "Optimism",
    logoUri:
      "https://gateway.pinata.cloud/ipfs/Qme7UTgWc2AF5fBPcuyWA96WsULUrqa2soQa8EsGq1sHkW/media/chainLogos/optimism.webp",
  },
  56: {
    rpc: process.env.REACT_APP_RPC_PROVIDER_BSC,
    name: "Binance smart chain",
    logoUri:
      "https://gateway.pinata.cloud/ipfs/Qme7UTgWc2AF5fBPcuyWA96WsULUrqa2soQa8EsGq1sHkW/media/chainLogos/bsc.jpg",
  },
};

export const getChainDetails = (chainId: number) => {
  return chainDetails[chainId as keyof ChainInterface];
};
