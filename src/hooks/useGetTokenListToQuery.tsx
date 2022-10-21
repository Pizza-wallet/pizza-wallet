import { useEffect, useState } from "react";
import axios from "axios";

interface TokenListState {
  ethereum?: [];
  polygon?: [];
  avalanche?: [];
  fantom?: [];
  binance?: [];
  arbitrum?: [];
}

interface IChainIdNameMap {
  1: string;
  137: string;
  56: string;
  42161: string;
  43114: string;
  250: string;
}
export function useGetTokenListToQuery() {
  const [tokenList, setTokenList] = useState<TokenListState>();

  const chainIdNameMap = {
    1: "ethereum",
    137: "polygon",
    56: "binance",
    42161: "arbitrum",
    43114: "avalanche",
    250: "fantom",
  };

  useEffect(() => {
    // axios call here to get tokens
    // const fetchTokens = async () => {
    //   // token source could be aggregated lists or maybe goplus?
    //   const tokenSource = "https://tokens.coingecko.com/uniswap/all.json";
    //   const res = await axios.get(tokenSource);
    //   const tokenSourcePolygon =
    //     "https://api-polygon-tokens.polygon.technology/tokenlists/allTokens.tokenlist.json";
    //   const resPolygon = await axios.get(tokenSourcePolygon);
    //   // set tokens in state
    //   setTokenList({
    //     ethereum: res?.data.tokens,
    //     polygon: resPolygon?.data.tokens,
    //   });
    // };

    // fetchTokens();

    const fetchTokensDemo = async () => {
      // token source could be aggregated lists or maybe goplus?
      const tokenSource =
        "https://storageapi.fleek.co/d1921602-c1d0-4d59-82e9-e36a2947b855-bucket/App/token-list/token-list.json";
      const res = await axios.get(tokenSource);

      // add tokens so I can test -
      const testTokens = [
        {
          address: "0x0000000000000000000000000000000000001010",
          blockNumber: 34611024,
          chainId: 137,
          decimals: 18,
          logoURI: "https://wallet-asset.matic.network/img/tokens/matic.svg",
          name: "Matic Token",
          symbol: "MATIC",
        },
        {
          address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          blockNumber: 34611024,
          chainId: 137,
          decimals: 6,
          logoURI: "https://wallet-asset.matic.network/img/tokens/usdc.svg",
          name: "USD Coin",
          symbol: "USDC",
        },
      ];

      const tokenList = [...res.data.tokens, ...testTokens];

      let newTokenState: any = {
        ethereum: [],
        polygon: [],
        avalanche: [],
        fantom: [],
        binance: [],
        arbitrum: [],
      };

      for (let token of tokenList) {
        // build object to set in state
        newTokenState[
          chainIdNameMap[token.chainId as keyof IChainIdNameMap]
        ].push(token);
      }

      setTokenList(newTokenState);
    };

    fetchTokensDemo();
  }, []);

  return tokenList;
}
