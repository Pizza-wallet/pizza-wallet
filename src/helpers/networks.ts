interface Network {
  currencySymbol?: string;
  blockExplorerUrl?: string;
  wrapped?: string;
  chainName?: string;
  currencyName?: string;
  chainId?: string;
  rpcUrl?: string;
}

interface NetworkConfigInterface {
  "0x1": Network;
  "0x3": Network;
  "0x4": Network;
  "0x2a": Network;
  "0x5": Network;
  "0x539": Network;
  "0xa86a": Network;
  "0x38": Network;
  "0x61": Network;
  "0x89": Network;
  "0x13881": Network;
}

export const networkConfigs = {
  "0x1": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://etherscan.io/",
    wrapped: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    chainId: 0,
    chainName: "",
    currencyName: "",
    rpcUrl: "",
  },
  "0x3": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://ropsten.etherscan.io/",
    chainId: 0,
    chainName: "",
    currencyName: "",
    rpcUrl: "",
    wrapped: "",
  },
  "0x4": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://kovan.etherscan.io/",
    chainId: 0,
    chainName: "",
    currencyName: "",
    rpcUrl: "",
    wrapped: "",
  },
  "0x2a": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://rinkeby.etherscan.io/",
    chainId: 0,
    chainName: "",
    currencyName: "",
    rpcUrl: "",
    wrapped: "",
  },
  "0x5": {
    currencySymbol: "ETH",
    blockExplorerUrl: "https://goerli.etherscan.io/",
    chainId: 0,
    chainName: "",
    currencyName: "",
    rpcUrl: "",
    wrapped: "",
  },
  "0x539": {
    chainId: 0,
    chainName: "Local Chain",
    currencyName: "ETH",
    currencySymbol: "ETH",
    rpcUrl: "http://127.0.0.1:7545",
    blockExplorerUrl: "",
    wrapped: "",
  },
  "0xa86a": {
    chainId: 43114,
    chainName: "Avalanche Mainnet",
    currencyName: "AVAX",
    currencySymbol: "AVAX",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    blockExplorerUrl: "https://cchain.explorer.avax.network/",
    wrapped: "",
  },
  "0x38": {
    chainId: 56,
    chainName: "Smart Chain",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    blockExplorerUrl: "https://bscscan.com/",
    wrapped: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
  },
  "0x61": {
    chainId: 97,
    chainName: "Smart Chain - Testnet",
    currencyName: "BNB",
    currencySymbol: "BNB",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    blockExplorerUrl: "https://testnet.bscscan.com/",
    wrapped: "",
  },
  "0x89": {
    chainId: 137,
    chainName: "Polygon Mainnet",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mainnet.maticvigil.com/",
    blockExplorerUrl: "https://explorer-mainnet.maticvigil.com/",
    wrapped: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  },
  "0x13881": {
    chainId: 80001,
    chainName: "Mumbai",
    currencyName: "MATIC",
    currencySymbol: "MATIC",
    rpcUrl: "https://rpc-mumbai.matic.today/",
    blockExplorerUrl: "https://mumbai.polygonscan.com/",
    wrapped: "",
  },
};

export const getNativeByChain = (chain: string) =>
  networkConfigs[chain as keyof NetworkConfigInterface]?.currencySymbol ||
  "NATIVE";

export const getChainById = (chain: string) =>
  networkConfigs[chain as keyof NetworkConfigInterface]?.chainId || null;

export const getExplorer = (chain: string) =>
  networkConfigs[chain as keyof NetworkConfigInterface]?.blockExplorerUrl;

export const getWrappedNative = (chain: string) =>
  networkConfigs[chain as keyof NetworkConfigInterface]?.wrapped || null;
