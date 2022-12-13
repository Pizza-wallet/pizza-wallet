import {
  groupTokensWithPriceInfo,
  getTokenBalanceForEachChain,
  checkWrappedToken,
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
        price: 1,
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
        price: 1,
        symbol: "USDC",
      },
    ],
  };

  const expectedOutput = {
    address: "",
    balance: 40,
    chainId: 1,
    chainLogoUri: [
      "https://gateway.pinata.cloud/ipfs/QmcZFEnPv3ah7rbuf5FsaFZYjePHeUMAA2ESJG5miASzDd/media/chainLogos/ethereum.png",
      "https://gateway.pinata.cloud/ipfs/Qme7UTgWc2AF5fBPcuyWA96WsULUrqa2soQa8EsGq1sHkW/media/chainLogos/polygon.webp",
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
          "https://gateway.pinata.cloud/ipfs/QmcZFEnPv3ah7rbuf5FsaFZYjePHeUMAA2ESJG5miASzDd/media/chainLogos/ethereum.png",
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
        chainLogoUri:
          "https://gateway.pinata.cloud/ipfs/Qme7UTgWc2AF5fBPcuyWA96WsULUrqa2soQa8EsGq1sHkW/media/chainLogos/polygon.webp",
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

  // Fixing the price and value as these will fluctuate (it's calling price feeds in the test)
  expectedOutput.price = testBalanceAndPriceInfo[0].tokens[0].price!;
  expectedOutput.value = testBalanceAndPriceInfo[0].value;
  expectedOutput.tokens[0].price = testBalanceAndPriceInfo[0].tokens[0].price!;
  expectedOutput.tokens[1].price = testBalanceAndPriceInfo[0].tokens[1].price!;

  expectedOutput.tokens[0].value = testBalanceAndPriceInfo[0].tokens[0].value!;
  expectedOutput.tokens[1].value = testBalanceAndPriceInfo[0].tokens[1].value!;

  expect(testBalanceAndPriceInfo[0]).toEqual(expectedOutput);
});

it("getBalances/checkWrappedToken - Check symbol, if wrapped check if user has native token if so return native token symbol", async () => {
  const mockTokens = [
    {
      address: "0x0000000000000000000000000000000000000000",
      amount: "0.00351057073462642",
      balance: 0.00351057073462642,
      blockNumber: 16167914,
      chainId: 1,
      chainLogoUri:
        "https://gateway.pinata.cloud/ipfs/QmcZFEnPv3ah7rbuf5FsaFZYjePHeUMAA2ESJG5miASzDd/media/chainLogos/ethereum.png",
      coinKey: "ETH",
      decimals: 18,
      logoURI:
        "https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png",
      name: "ETH",
      price: 1252.18,
      priceUSD: "1250.52",
      symbol: "ETH",
      type: "token",
      value: 4.395866462484511,
    },
    {
      address: "0x0000000000000000000000000000000000000000",
      amount: "0.00351057073462642",
      balance: 0.00351057073462642,
      blockNumber: 16167914,
      chainId: 1,
      chainLogoUri:
        "https://gateway.pinata.cloud/ipfs/QmcZFEnPv3ah7rbuf5FsaFZYjePHeUMAA2ESJG5miASzDd/media/chainLogos/ethereum.png",
      coinKey: "DAI",
      decimals: 18,
      logoURI:
        "https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png",
      name: "DAI",
      price: 1252.18,
      priceUSD: "1250.52",
      symbol: "DAI",
      type: "token",
      value: 4.395866462484511,
    },
  ];

  const symbol = checkWrappedToken("WETH", [mockTokens[0]]);
  const symbol2 = checkWrappedToken("WETH", [mockTokens[1]]);
  expect(symbol).toEqual("ETH");
  expect(symbol2).toEqual("WETH");
});
