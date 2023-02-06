export interface ApiInfo {
  endpoint: string;
  action: string[];
  apikey: any;
  chainId: string;
}

export const apiList: ApiInfo[] = [
  {
    endpoint: "https://api.etherscan.io/api",
    action: ["tokentx", "tokennfttx", "token1155tx"],
    apikey: process.env.REACT_APP_EXPLORER_API_ETH,
    chainId: "1",
  },
  {
    endpoint: "https://api.polygonscan.com/api",
    action: ["tokentx", "tokennfttx", "token1155tx"],
    apikey: process.env.REACT_APP_EXPLORER_API_POLYGON,
    chainId: "137",
  },
  {
    endpoint: "https://api.ftmscan.com/api",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_FANTOM,
    chainId: "250",
  },
  {
    endpoint: "https://api.snowtrace.io/api",
    action: ["tokentx", "tokennfttx", "token1155tx"],
    apikey: process.env.REACT_APP_EXPLORER_API_AVALANCHE,
    chainId: "43114",
  },
  {
    endpoint: "https://api-optimistic.etherscan.io/api",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_OPTIMISM,
    chainId: "10",
  },
  {
    endpoint: "https://api.arbiscan.io/api",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_ARBITRUM,
    chainId: "42161",
  },
  {
    endpoint: "https://api.bscscan.com/api",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_BSC,
    chainId: "56",
  },
  {
    endpoint: "https://api.gnosisscan.io/api",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_GNOSIS,
    chainId: "100",
  },
];
