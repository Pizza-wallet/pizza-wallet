import {
  ethereumMainnet,
  polygonMainnet,
  IPriceFeedAddress,
} from "./priceFeedAddresses";

interface PriceFeedInterface {
  1: IPriceFeedAddress;
  137?: IPriceFeedAddress;
  56?: IPriceFeedAddress;
  42161?: IPriceFeedAddress;
  43114?: IPriceFeedAddress;
  250?: IPriceFeedAddress;
}

// TOKEN - USD PRICE FEEDS
const priceFeedAddress = {
  1: ethereumMainnet,
  // initialize the rest as empty for now
  137: polygonMainnet,
  56: polygonMainnet,
  42161: polygonMainnet,
  43114: polygonMainnet,
  250: polygonMainnet,
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
