import { getChainDetails } from "../../../helpers/getChainDetails";
import { getPriceFeed } from "../priceFeeds/getPriceFeed";
import { IToken } from "../../../types";

export const getPriceInformation = async (
  balances: IToken[],
  chainId: number,
) => {
  let balancesWithPriceInfo: IToken[] = [];

  for (let i = 0; i < balances.length; i++) {
    const tokenSymbol = balances[i].symbol;
    const priceFeed = await getPriceFeed(chainId, tokenSymbol);
    let token = balances[i];
    token.price = priceFeed;

    balancesWithPriceInfo.push(token);
  }

  // add price information from chainlink or LIFI and return values
  return balances?.map((token) => {
    const price = token.price ? Number(token.price) : Number(token.priceUSD);
    return {
      ...token,
      price: price ? price : 0,
      value: price ? Number(token.amount) * price : 0,
      // prices: priceInfo?.[token.address],
      balance: Number(token.amount),
      chainLogoUri: getChainDetails(token.chainId)?.logoUri,
      type: "token",
    };
  });
};
