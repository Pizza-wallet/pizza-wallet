import { useEffect, useState } from "react";
import axios from "axios";

interface TokenListState {
  ethereum?: [];
  polygon?: [];
}
export function useGetTokenListToQuery() {
  const [tokenList, setTokenList] = useState<TokenListState>();

  useEffect(() => {
    // axios call here to get tokens
    const fetchTokens = async () => {
      const tokenSource = "https://tokens.coingecko.com/uniswap/all.json";
      const res = await axios.get(tokenSource);
      const tokenSourcePolygon =
        "https://api-polygon-tokens.polygon.technology/tokenlists/allTokens.tokenlist.json";
      const resPolygon = await axios.get(tokenSourcePolygon);
      // set tokens in state
      setTokenList({
        ethereum: res?.data.tokens,
        polygon: resPolygon?.data.tokens,
      });
    };

    fetchTokens();
  }, []);

  return tokenList;
}
