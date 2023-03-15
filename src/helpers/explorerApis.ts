export interface ApiInfo {
  endpoint: string;
  blockExplorerEndpoint: string;
  action: string[];
  apikey: any;
  chainId: string;
}

export const apiList: ApiInfo[] = [
  {
    endpoint: "https://api.etherscan.io",
    blockExplorerEndpoint: "https://etherscan.io",
    // action: ["tokentx", "tokennfttx", "token1155tx"],
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_ETH,
    chainId: "1",
  },
  {
    endpoint: "https://api.polygonscan.com",
    blockExplorerEndpoint: "https://polygonscan.com",
    // action: ["tokentx", "tokennfttx", "token1155tx"],
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_POLYGON,
    chainId: "137",
  },
  {
    endpoint: "https://api.ftmscan.com",
    blockExplorerEndpoint: "https://ftmscan.com",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_FANTOM,
    chainId: "250",
  },
  {
    endpoint: "https://api.snowtrace.io",
    blockExplorerEndpoint: "https://snowtrace.io",
    // action: ["tokentx", "tokennfttx", "token1155tx"],
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_AVALANCHE,
    chainId: "43114",
  },
  {
    endpoint: "https://api-optimistic.etherscan.io",
    blockExplorerEndpoint: "https://optimistic.etherscan.io",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_OPTIMISM,
    chainId: "10",
  },
  {
    endpoint: "https://api.arbiscan.io",
    blockExplorerEndpoint: "https://arbiscan.io",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_ARBITRUM,
    chainId: "42161",
  },
  {
    endpoint: "https://api.bscscan.com",
    blockExplorerEndpoint: "https://bscscan.com",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_BSC,
    chainId: "56",
  },
  {
    endpoint: "https://api.gnosisscan.io",
    blockExplorerEndpoint: "https://gnosisscan.io",
    action: ["tokentx"],
    apikey: process.env.REACT_APP_EXPLORER_API_GNOSIS,
    chainId: "100",
  },
];
