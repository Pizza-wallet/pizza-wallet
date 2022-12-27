import { IToken } from "../../../types";

// populated from top 100 coinmarketcap
export const variantsToCheck = [
  "SOL",
  "MATIC",
  "ETH",
  "BTC",
  "USDT",
  "USDC",
  "BNB",
  "XRP",
  "BUSD",
  "DOGE",
  "ADA",
  "DOT",
  "DAI",
  "LTC",
  "TRX",
  "SHIB",
  "UNI",
  "AVAX",
  "LEO",
  "LINK",
  "TON",
  "ATOM",
  "XMR",
  "ETC",
  "XLM",
  "BCH",
  "CRO",
  "ALGO",
  "QNT",
  "APE",
  "OKB",
  "FIL",
  "NEAR",
  "VET",
  "HBAR",
  "ICP",
  "EOS",
  "EGLD",
  "LUNC",
  "HT",
  "USDP",
  "FLOW",
  "BSV",
  "TWT",
  "XTZ",
  "CHZ",
  "AAVE",
  "THETA",
  "SAND",
  "AXS",
  "TUSD",
  "ZEC",
  "USDD",
  "MANA",
  "XCN",
  "KCS",
  "BIT",
  "FTM",
  "BTT",
  "GUSD",
  "APT",
  "CAKE",
  "MKR",
  "GRT",
  "XET",
  "NEO",
  "KLAY",
  "MIOTA",
  "DASH",
  "PAXG",
  "RUNE",
  "SNX",
  "GMX",
  "OSMO",
  "FEI",
  "MINA",
  "USDN",
  "NEXO",
  "GT",
  "STX",
  "LDO",
  "IMX",
  "ZIL",
  "CRV",
  "1INCH",
  "BAT",
  "LRC",
  "DCR",
  "CSPR",
  "XDC",
  "KAVA",
  "XEM",
  "HOT",
  "ENJ",
  "COMP",
  "CELO",
  "AR",
  "BAL",
];

function between(x: number, min: number, max: number) {
  return x >= min && x <= max;
}
export const checkVariants = (token: IToken, tokens: IToken[]) => {
  // Check if symbol contains a native symbol (stETH, WETH)
  // lowercase all comparisons
  const symbol = token.symbol.toLowerCase();
  const nativeSymbol: string[] = variantsToCheck.filter((val) => {
    const substring = val.toLowerCase();
    return symbol.includes(substring);
  });

  if (nativeSymbol.length > 0) {
    const userHasNativeToken: IToken[] = tokens.filter((val: any) => {
      return val.symbol === nativeSymbol[0];
    });

    if (userHasNativeToken.length > 0) {
      // user has native token so group with this if the price is similar
      const currentTokenPrice = Number(token.priceUSD);
      const nativeTokenPrice = Number(userHasNativeToken[0].priceUSD);
      // check price is within 5 dollars either side
      const priceIsSimilar = between(
        currentTokenPrice,
        nativeTokenPrice - 10,
        nativeTokenPrice + 10,
      );
      if (priceIsSimilar) {
        // price is similar likely to be variant
        return nativeSymbol[0];
      }
      // price is not similar likely not to be a variant
      return symbol;
    }
    // user doesnt have native token no need to group
    return symbol;
  }

  // doesnt contain native symbol so likely not a variant
  return symbol;
};
