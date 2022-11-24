import {
  getPricesForTokens,
  getCoinGeckoChains,
  getCoinGeckoTokens,
  getIndividualTokenPrice,
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

const getNativeTokenPrice = async (nativeToken: IToken) => {
  // get token list to get id's
  const coinGeckoTokenList: any = await getCoinGeckoTokens();
  const tokenWithId = coinGeckoTokenList.find(
    (token: any) => token.symbol === nativeToken.symbol.toLowerCase(),
  );

  // get price for native token and return
  const getNativeTokenPrice = await getIndividualTokenPrice(tokenWithId.id);
  return getNativeTokenPrice[tokenWithId.id];
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

  const userHasNativeToken = balances?.filter(
    (val) => val.address === "0x0000000000000000000000000000000000000000",
  );

  // call api to get price information
  const prices = await getXOrHandleError(() => {
    return getPricesForTokens(coinGeckoId, tokenAddresses);
  });

  // If user has native tokens they need to be fetched in a different way (coin gecko)
  if (userHasNativeToken?.length) {
    // get native token price here
    const nativeToken = userHasNativeToken[0];
    const nativeTokenPrice = await getNativeTokenPrice(nativeToken);
    prices[nativeToken.address] = nativeTokenPrice;
  }

  console.log("prices from coingecko api - ", prices);
  // add price information and return values
  const balancesWithValues = updateTokensWithPriceInfo(balances, prices);
  return balancesWithValues;
};
