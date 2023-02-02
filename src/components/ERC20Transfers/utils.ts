import axios from "axios";

// todo: connect to user account
const address = process.env.REACT_APP_TEST_ACCOUNT;

export { default } from "./ERC20Transfers";

interface ApiInfo {
  endpoint: string;
  apikey: any;
  chainId: string;
}

const apiList: ApiInfo[] = [
  {
    endpoint: "https://api.etherscan.io/api",
    apikey: process.env.REACT_APP_ETH_EXPLORER_API,
    chainId: "1",
  },
  {
    endpoint: "https://api.polygonscan.com/api",
    apikey: process.env.REACT_APP_POLY_EXPLORER_API,
    chainId: "137",
  },
  {
    endpoint: "https://api.ftmscan.com/api",
    apikey: process.env.REACT_APP_FTM_EXPLORER_API,
    chainId: "250",
  },
  {
    endpoint: "https://api.snowtrace.io/api",
    apikey: process.env.REACT_APP_AVAX_EXPLORER_API,
    chainId: "43114",
  },
  {
    endpoint: "https://api-optimistic.etherscan.io/api",
    apikey: process.env.REACT_APP_OP_EXPLORER_API,
    chainId: "10",
  },
  {
    endpoint: "https://api.arbiscan.io/api",
    apikey: process.env.REACT_APP_ARB_EXPLORER_API,
    chainId: "42161",
  },
  {
    endpoint: "https://api.bscscan.com/api",
    apikey: process.env.REACT_APP_BSC_EXPLORER_API,
    chainId: "56",
  },
  {
    endpoint: "https://api.gnosisscan.io/api",
    apikey: process.env.REACT_APP_GNOSIS_EXPLORER_API,
    chainId: "100",
  },
  {
    endpoint: "https://explorer.celo.org/mainnet/api",
    apikey: null,
    chainId: "42220",
  },
];

export const transaction = async (api: ApiInfo, transactionType: string) => {
  try {
    let action;
    switch (transactionType) {
      case "token":
        action = "tokentx";
        break;
      case "nft":
        action = "tokennfttx";
        break;
      case "1155":
        action = "token1155tx";
        break;
      case "normal":
        action = "txlist";
        break;
      default:
        throw new Error("Invalid transaction type");
    }
    const response = await axios.get(api.endpoint, {
      params: {
        module: "account",
        action,
        offset: 10000,
        sort: "desc",
        address: `${address}`,
        apikey: api.apikey,
      },
    });
    const data = response.data.result;
    return [api.chainId, ...data];
  } catch (error) {
    console.error(error);
  }
};

export const allTransactions = async (transactionType: string) => {
  try {
    const apiPromises = apiList.map((api) => transaction(api, transactionType));
  const dataFromAllApis = await Promise.all(apiPromises);
  return dataFromAllApis.map((data: any, index) => {
    return [apiList[index].chainId, ...data];
  });
  } catch (error) {
    console.log(error)
  }
};
