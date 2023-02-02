export interface ApiInfo {
  endpoint: string;
  action: string[];
  apikey: any;
  chainId: string;
}

export const apiList: ApiInfo[] = [
  {
    endpoint: "https://api.etherscan.io/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_ETH_EXPLORER_API,
    chainId: "1",
  },
  {
    endpoint: "https://api.polygonscan.com/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_POLY_EXPLORER_API,
    chainId: "137",
  },
  {
    endpoint: "https://api.ftmscan.com/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_FTM_EXPLORER_API,
    chainId: "250",
  },
  {
    endpoint: "https://api.snowtrace.io/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_AVAX_EXPLORER_API,
    chainId: "43114",
  },
  {
    endpoint: "https://api-optimistic.etherscan.io/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_OP_EXPLORER_API,
    chainId: "10",
  },
  {
    endpoint: "https://api.arbiscan.io/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_ARB_EXPLORER_API,
    chainId: "42161",
  },
  {
    endpoint: "https://api.bscscan.com/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_BSC_EXPLORER_API,
    chainId: "56",
  },
  {
    endpoint: "https://api.gnosisscan.io/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_GNOSIS_EXPLORER_API,
    chainId: "100",
  },
];
