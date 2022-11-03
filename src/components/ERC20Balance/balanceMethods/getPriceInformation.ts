import {
  getPricesForTokens,
  getCoinGeckoChains,
} from "../../../services/PriceService";
import { getChainDetails } from "../../../helpers/getChainDetails";

interface IBalance {
  address: string;
  amount: string;
  blockNumber: number;
  chainId: number;
  decimals: number;
  logoURI: string;
  name: string;
  symbol: string;
}

interface IChainsWithId {
  chain_identifier?: string;
  id: string;
  name: string;
  shortname: string;
}

interface IPrice {
  usd: number;
  eur: number;
  gbp: number;
}
type IPriceInfo = Record<string, IPrice>;

const updateTokensWithPriceInfo = (
  balances: IBalance[],
  priceInfo: IPriceInfo,
) => {
  return balances.map((token) => {
    const price = priceInfo[token.address.toLowerCase()].usd;
    return {
      ...token,
      price: price,
      value: Number(token.amount) * price,
      prices: priceInfo[token.address],
      balance: Number(token.amount),
      chainLogoUri: getChainDetails(token.chainId)?.logoUri,
      type: "token",
    };
  });
};

export const getPriceInformation = async (
  balances: IBalance[],
  chainId: string,
) => {
  let chainsWithId: IChainsWithId[] = await getCoinGeckoChains();
  const coinGeckoId = chainsWithId.filter(
    (chain) => chainId === chain.chain_identifier,
  )[0].id;

  const tokenAddresses = balances
    .reduce((arr: string[], token) => {
      arr.push(token.address);
      return arr;
    }, [])
    .join(",");

  // call api to get price information
  const prices = await getPricesForTokens(coinGeckoId, tokenAddresses);

  // add price information and return values
  const balancesWithValues = updateTokensWithPriceInfo(balances, prices);
  console.log("balancesWith Values - ", balancesWithValues);
  return balancesWithValues;
};
