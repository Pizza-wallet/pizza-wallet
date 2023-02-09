import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";

export const CHAIN_CONFIG = {
  ethereum: {
    displayName: "Ethereum Mainnet",
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1",
    rpcTarget: process.env.REACT_APP_RPC_PROVIDER_ETH,
    blockExplorer: "https://etherscan.io/",
  } as CustomChainConfig,
  polygon: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: process.env.REACT_APP_RPC_PROVIDER_POLYGON,
    blockExplorer: "https://polygonscan.com/",
    chainId: "0x89",
    displayName: "Polygon Mainnet",
  } as CustomChainConfig,
  fantom: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    rpcTarget: process.env.REACT_APP_RPC_PROVIDER_FANTOM,
    blockExplorer: "https://ftmscan.com/",
    chainId: "0x89",
    displayName: "Polygon Mainnet",
  } as CustomChainConfig,
} as const;

export type CHAIN_CONFIG_TYPE = keyof typeof CHAIN_CONFIG;
