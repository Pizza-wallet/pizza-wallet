import axios from "axios";

export { default } from "./ERC20Transfers";

const address = "0x052D1f06cC98AAe6c4D2e9D06c286143E22dB612";

interface ApiInfo {
  endpoint: string;
  apikey: any;
}

const apiList: ApiInfo[] = [
  {
    endpoint: "https://api.polygonscan.com/api",
    apikey: process.env.REACT_APP_POLY_BLOCKCHAIN_API,
  },
  {
    endpoint: "https://api.etherscan.io/api",
    apikey: process.env.REACT_APP_ETH_BLOCKCHAIN_API,
  },
  {
    endpoint: "https://api.bscscan.com/api",
    apikey: process.env.REACT_APP_BSC_BLOCKCHAIN_API,
  },
  {
    endpoint: "https://api.ftmscan.com/api",
    apikey: process.env.REACT_APP_FTM_BLOCKCHAIN_API,
  },
  {
    endpoint: "https://api.gnosisscan.io/api",
    apikey: process.env.REACT_APP_GNO_BLOCKCHAIN_API,
  },
  {
    endpoint: "https://api.snowtrace.io/api",
    apikey: process.env.REACT_APP_AVA_BLOCKCHAIN_API,
  },
  {
    endpoint: "https://api.arbiscan.io/api",
    apikey: process.env.REACT_APP_ARBI_BLOCKCHAIN_API,
  },
  {
    endpoint: "https://api-optimistic.etherscan.io/api",
    apikey: process.env.REACT_APP_OP_BLOCKCHAIN_API,
  },
];

export const data = async (api: ApiInfo) => {
  try {
    const response = await axios.get(api.endpoint, {
      params: {
        module: "account",
        action: "tokentx",
        address: `${address}`,
        apikey: api.apikey,
      },
    });
    const data = response.data.result;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchNftData = async () => {
  const apiPromises = apiList.map((api) => data(api));
  const dataFromAllApis = await Promise.all(apiPromises);
  console.log(dataFromAllApis);
  return dataFromAllApis;
};
