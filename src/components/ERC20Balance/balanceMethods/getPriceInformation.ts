import {
  getPricesForTokens,
  getCoinGeckoChains,
} from "../../../services/PriceService";
import { getChainDetails } from "../../../helpers/getChainDetails";

interface IToken {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  amount?: string;
  value?: number;
}

interface IChainsWithId {
  chain_identifier?: number;
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

const getXOrHandleError = async (apiCall?: any) => {
  try {
    return await apiCall();
  } catch (e) {
    // handle error
    console.log("coin gecko getPricesForTokens failed", e);
    return {};
  }
};

const updateTokensWithPriceInfo = (
  balances?: IToken[],
  priceInfo?: IPriceInfo,
) => {
  return balances?.map((token) => {
    const price = priceInfo?.[token.address.toLowerCase()]?.usd;
    return {
      ...token,
      price: price ? price : 0,
      value: price ? Number(token.amount) * price : 0,
      prices: priceInfo?.[token.address],
      balance: Number(token.amount),
      chainLogoUri: getChainDetails(token.chainId)?.logoUri,
      type: "token",
    };
  });
};

export const getPriceInformation = async (
  balances?: IToken[],
  chainId?: number,
) => {
  let chainsWithId: IChainsWithId[] = await getCoinGeckoChains();

  if (!chainsWithId.length) {
    console.log("getCoinGeckoChains failed!");
    return updateTokensWithPriceInfo(balances, {});
  }

  const coinGeckoId = chainsWithId.filter(
    (chain) => chainId === chain.chain_identifier,
  )[0].id;

  const tokenAddresses = balances
    ?.reduce((arr: string[], token) => {
      arr.push(token.address);
      return arr;
    }, [])
    .join(",");

  // call api to get price information
  const prices = await getXOrHandleError(() => {
    return getPricesForTokens(coinGeckoId, tokenAddresses);
  });

  // add price information and return values
  const balancesWithValues = updateTokensWithPriceInfo(balances, prices);
  console.log("balancesWith Values - ", balancesWithValues);
  return balancesWithValues;
};
