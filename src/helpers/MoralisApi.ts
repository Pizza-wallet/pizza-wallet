import { useWeb3AuthExecutionStore } from "../stores/web3Auth/useWeb3AuthExecutionStore";

export interface moralisApi {
  endpoint: string;
  chains: string[];
}

const { address } = useWeb3AuthExecutionStore((state: any) => state);

export const moralisNftApi: moralisApi[] = [
  {
    endpoint: `https://deep-index.moralis.io/api/v2/${address}/nft`,
    chains: ["eth", "polygon", "fantom", "avalanche", "arbitrum", "bsc"],
  },
];
