import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";

// todo: add all chains configs
export const CHAIN_CONFIG = {
  sepoliaTestnet: {
    displayName: "Sepolia Testnet",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7",
    rpcTarget: "https://eth-sepolia.g.alchemy.com/v2/mDga5Tn7WM6nfZJMv9Y_yefyfVRRhB2Q",
    blockExplorer: "https://sepolia.etherscan.io/",
    ticker: "SepoliaETH",
    tickerName: "Ethereum",
  } as CustomChainConfig,
  ethereumMainnet: {
    displayName: "Ethereum Mainnet",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1",
    rpcTarget: `https://mainnet.infura.io/v3/776218ac4734478c90191dde8cae483c`,
    blockExplorer: "https://etherscan.io/",
    ticker: "ETH",
    tickerName: "Ethereum",
  } as CustomChainConfig,
  polygonMainnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com/",
    chainId: "0x89",
    displayName: "Polygon Mainnet",
    ticker: "matic",
    tickerName: "Matic",
  } as CustomChainConfig,
} as const;

export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG;