import {
  ethereumMainnet,
  polygonMainnet,
  binanceSmartChain,
  arbitrumOne,
  avalanche,
  fantom,
  optimism,
  IPriceFeedAddress,
} from "./priceFeedAddresses";

interface PriceFeedInterface {
  1: IPriceFeedAddress;
  137?: IPriceFeedAddress;
  56?: IPriceFeedAddress;
  42161?: IPriceFeedAddress;
  43114?: IPriceFeedAddress;
  250?: IPriceFeedAddress;
  10?: IPriceFeedAddress;
}

// TOKEN - USD PRICE FEEDS
const priceFeedAddress = {
  1: ethereumMainnet,
  137: polygonMainnet,
  56: binanceSmartChain,
  42161: arbitrumOne,
  43114: avalanche,
  250: fantom,
  10: optimism,
};

// Given the symbol of a token and the chainId returns price feed contract address
// will return string if we have the address, if not then it returns undefined (use LIFI / coingecko)
export const priceFeedMap = (
  symbol: string,
  chainId: number,
): string | undefined => {
  const addressKey = symbol.toLowerCase();
  return priceFeedAddress[chainId as keyof PriceFeedInterface][
    addressKey as keyof IPriceFeedAddress
  ];
};
