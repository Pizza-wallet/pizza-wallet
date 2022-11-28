import { groupTokensWithPriceInfo } from "../components/ERC20Balance/balanceMethods/getBalances";

it("Groups tokens with price info", async () => {
  const mockTokenList = {
    ethereum: [
      {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        chainId: 1,
        coinKey: "USDC",
        decimals: 6,
        value: 0,
        amount: "15",
        logoURI:
          "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
        name: "USD Coin",
        priceUSD: "1",
        symbol: "USDC",
      },
    ],
    polygon: [
      {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        chainId: 137,
        coinKey: "USDC",
        decimals: 6,
        value: 0,
        amount: "25",
        logoURI:
          "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
        name: "USD Coin",
        priceUSD: "1",
        symbol: "USDC",
      },
    ],
  };

  const expectedOutput = {
    address: "",
    balance: 40,
    chainId: 1,
    chainLogoUri: [
      "https://storageapi.fleek.co/d1921602-c1d0-4d59-82e9-e36a2947b855-bucket/App/static/token-icons/weth.png",
      "https://wallet-asset.matic.network/img/tokens/matic.svg",
    ],
    decimals: 6,
    id: "USD Coin",
    logoURI:
      "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
    name: "USD Coin",
    price: 1,
    symbol: "USDC",
    tokens: [
      {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        amount: "15",
        balance: 15,
        chainId: 1,
        chainLogoUri:
          "https://storageapi.fleek.co/d1921602-c1d0-4d59-82e9-e36a2947b855-bucket/App/static/token-icons/weth.png",
        coinKey: "USDC",
        decimals: 6,
        logoURI:
          "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
        name: "USD Coin",
        price: 1,
        priceUSD: "1",
        symbol: "USDC",
        type: "token",
        value: 15,
      },
      {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        amount: "25",
        balance: 25,
        chainId: 137,
        chainLogoUri: "https://wallet-asset.matic.network/img/tokens/matic.svg",
        coinKey: "USDC",
        decimals: 6,
        logoURI:
          "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
        name: "USD Coin",
        price: 1,
        priceUSD: "1",
        symbol: "USDC",
        type: "token",
        value: 25,
      },
    ],
    type: "groupedTokens",
    value: 40,
  };

  const testBalanceAndPriceInfo = await groupTokensWithPriceInfo(mockTokenList);
  expect(testBalanceAndPriceInfo[0]).toEqual(expectedOutput);
});
