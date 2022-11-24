import axios from "axios";

export async function getPricesForTokens(
  chainId: string,
  addressList?: string,
) {
  try {
    const prices = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/${chainId}?contract_addresses=${addressList}&vs_currencies=usd,eur,gbp`,
    );
    return prices.data;
  } catch (e) {
    // TODO: Hook up to some sort of error alert
    console.log("Error fetching token prices - ", e);
    return [];
  }
}

export async function getCoinGeckoChains() {
  try {
    const chains = await axios.get(
      "https://api.coingecko.com/api/v3/asset_platforms",
    );
    return chains.data;
  } catch (e) {
    // TODO: Hook up to some sort of error alert
    console.log("Error fetching coin gecko chains - ", e);
    return [];
  }
}

export async function getCoinGeckoTokens() {
  try {
    const coinGeckoTokenList: any = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list",
    );
    return coinGeckoTokenList.data;
  } catch (e) {
    // TODO: Hook up to some sort of error alert
    console.log("Error fetching coin gecko tokens - ", e);
    return [];
  }
}

export async function getIndividualTokenPrice(tokenId: string) {
  try {
    const individualTokenPrice = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=" +
        tokenId +
        "&vs_currencies=usd,eur,gbp",
    );
    return individualTokenPrice.data;
  } catch (e) {
    // TODO: Hook up to some sort of error alert
    console.log("Error fetching individual token price - ", e);
    return {};
  }
}
