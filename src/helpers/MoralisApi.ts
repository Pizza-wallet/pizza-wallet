export interface moralisApi {
  endpoint: string;
  chains: string[];
}

// todo: connect to user account
const address = process.env.REACT_APP_TEST_ACCOUNT;

export const moralisNftApi: moralisApi[] = [
  {
    endpoint: `https://deep-index.moralis.io/api/v2/${address}/nft`,
    chains: ["eth", "polygon", "fantom", "avalanche", "arbitrum", "bsc"],
  },
];
