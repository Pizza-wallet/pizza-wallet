import {
  getPricesForTokens,
  getCoinGeckoChains,
} from "../../../services/PriceService";

const updateTokensWithPriceInfo = (balances, priceInfo) => {
  return balances.map((token) => {
    return {
      ...token,
      price: priceInfo[token.address].usd,
      value: Number(token.amount) * priceInfo[token.address].usd,
      prices: priceInfo[token.address],
      balance: Number(token.amount),
      type: "token",
    };
  });
};

export const getPriceInformation = async (balances, chainId) => {
  let chainsWithId = await getCoinGeckoChains();
  const coinGeckoId = chainsWithId.filter(
    (chain) => chainId === chain.chain_identifier,
  )[0].id;

  const tokenAddresses = balances
    .reduce((arr, token) => {
      arr.push(token.address);
      return arr;
    }, [])
    .join(",");

  // call api to get price information
  const prices = await getPricesForTokens(coinGeckoId, tokenAddresses);

  // add price information and return values
  const balancesWithValues = updateTokensWithPriceInfo(balances, prices);

  return balancesWithValues;
};
