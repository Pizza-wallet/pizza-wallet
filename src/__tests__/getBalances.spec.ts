import {
  groupTokensWithPriceInfo,
  getTokenBalanceForEachChain,
} from "../components/ERC20Balance/balanceMethods/getBalances";

it("getBalances/getTokenBalanceForEachChain - Get token balance for each chain from a list", async () => {
  const mockTokenList = {
    ethereum: [
      {
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        chainId: 1,
        coinKey: "USDC",
        decimals: 6,
        value: 0,
        logoURI:
          "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
        name: "USD Coin",
        priceUSD: "1",
        symbol: "USDC",
      },
    ],
    polygon: [
      {
        address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
        chainId: 137,
        coinKey: "USDC",
        decimals: 6,
        value: 0,
        logoURI:
          "https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png",
        name: "USD Coin",
        priceUSD: "1",
        symbol: "USDC",
      },
    ],
  };

  // This should be an environment variable with a test account
  const account = process.env.REACT_APP_TEST_ACCOUNT || "";
  const testBalanceForEachChain = await getTokenBalanceForEachChain(
    account,
    mockTokenList,
  );

  // Check that amount and blockNumber are returned for both tokens
  const firstAmount = testBalanceForEachChain?.ethereum?.[0].amount;
  const firstBlockNumber = testBalanceForEachChain?.ethereum?.[0].blockNumber;

  const secondAmount = testBalanceForEachChain?.polygon?.[0].amount;
  const secondBlockNumber = testBalanceForEachChain?.polygon?.[0].blockNumber;
  expect(typeof firstAmount).toMatch("string");
  expect(typeof firstBlockNumber).toMatch("number");

  expect(typeof secondAmount).toMatch("string");
  expect(typeof secondBlockNumber).toMatch("number");
});

it("getBalances/groupTokensWithPriceInfo - Groups tokens with price info", async () => {
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
