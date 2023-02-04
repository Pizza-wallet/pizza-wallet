import axios from "axios";
//import { ApiInfo, apiList } from "../helpers/explorerApis";

// todo: connect to user account
const address = process.env.REACT_APP_TEST_ACCOUNT;

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
    apikey: process.env.REACT_APP_EXPLORER_API_ETH,
    chainId: "1",
  },
  {
    endpoint: "https://api.polygonscan.com/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_EXPLORER_API_POLYGON,
    chainId: "137",
  },
  {
    endpoint: "https://api.ftmscan.com/api",
    action: ["tokentx", "txlist"],
    apikey: process.env.REACT_APP_EXPLORER_API_FANTOM,
    chainId: "250",
  },
  {
    endpoint: "https://api.snowtrace.io/api",
    action: ["tokentx", "tokennfttx", "token1155tx", "txlist"],
    apikey: process.env.REACT_APP_EXPLORER_API_AVALANCHE,
    chainId: "43114",
  },
  {
    endpoint: "https://api-optimistic.etherscan.io/api",
    action: ["tokentx", "txlist"],
    apikey: process.env.REACT_APP_EXPLORER_API_OPTIMISM,
    chainId: "10",
  },
  {
    endpoint: "https://api.arbiscan.io/api",
    action: ["tokentx", "txlist"],
    apikey: process.env.REACT_APP_EXPLORER_API_ARBITRUM,
    chainId: "42161",
  },
  {
    endpoint: "https://api.bscscan.com/api",
    action: ["tokentx", "txlist"],
    apikey: process.env.REACT_APP_EXPLORER_API_BSC,
    chainId: "56",
  },
  {
    endpoint: "https://api.gnosisscan.io/api",
    action: ["tokentx", "txlist"],
    apikey: process.env.REACT_APP_EXPLORER_API_GNOSIS,
    chainId: "100",
  },
];

// todo: refactor so that the same query is not repeated twice
// mike if you could take a look i'd appreciate it
export const queryTransactions = async (
  api: ApiInfo,
  actions: Array<string>,
) => {
  const requests = actions.map((action) =>
    axios.get(api.endpoint, {
      params: {
        module: "account",
        action,
        sort: "desc",
        address: `${address}`,
        apikey: api.apikey,
      },
    }),
  );

  const responses = await Promise.all(requests);
  const data = responses.map((response) => response.data.result);

  return { [api.chainId]: data };
};

export const allTransactionsData = async () => {
  const dataFromAllApis = await Promise.all(apiList.map(api => queryTransactions(api, api.action)));
  return dataFromAllApis.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};
console.log(allTransactionsData());
