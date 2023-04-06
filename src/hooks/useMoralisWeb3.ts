import axios from "axios";
import { moralisNftApi, moralisApi } from "../helpers/MoralisApi";

interface ChainInterface {
  1: string;
  137?: string;
  56?: string;
  42161?: string;
  43114?: string;
  250?: string;
}

const axiosInstance = axios.create({
  headers: {
    "X-API-Key": process.env.REACT_APP_MORALIS_WEB3_API || "",
  },
});

export const queryNftData = async (api: moralisApi, actionIndex: number) => {
  try {
    const response = await axiosInstance.get(api.endpoint, {
      params: {
        chain: api.chains[actionIndex],
        apiKey: process.env.REACT_APP_MORALIS_WEB3_API,
        normalizeMetadata: true,
      },
    });
    const data = response.data.result;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getNftMetadata = async (
  address: any,
  tokenId: any,
  chain: any,
) => {
  console.log("address - ", address);
  console.log("tokenId - ", tokenId);
  console.log("chain - ", chain);

  try {
    const response = await axiosInstance.get(
      `https://deep-index.moralis.io/api/v2/nft/${address}/${tokenId}`,
      {
        params: {
          chain: chain,
          apiKey: process.env.REACT_APP_MORALIS_WEB3_API,
          normalizeMetadata: true,
        },
      },
    );

    const data = response.data;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const allNftData = async (address: any, tokenId: any, chainId: any) => {
  try {
    const chains: ChainInterface = {
      1: "eth",
      137: "polygon",
      250: "fantom",
      43114: "avalanche",
      42161: "arbitrum",
      56: "bsc",
    };
    const chain = chains[chainId as keyof ChainInterface];
    const nftData = await getNftMetadata(address, tokenId, chain);

    return nftData;
  } catch (error) {
    console.error(error);
  }
};
