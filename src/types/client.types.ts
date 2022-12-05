import { TokenWithAmounts } from "@lifi/sdk";

export interface TokenAmountList {
  [ChainKey: string]: Array<TokenWithAmounts>;
}

export interface IToken {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  amount?: string;
  value: number;
  priceUSD: string;
  blockNumber?: number;
  price?: number;
}

export interface IGroupedToken {
  name: string;
  type: string;
  symbol: string;
  id: string;
  chainLogoUri: string[];
  logoURI: string;
  price: number;
  balance: number;
  value: number;
  tokens: IToken[];
}

export interface ITokenList {
  ethereum?: IToken[];
  polygon?: IToken[];
  avalanche?: IToken[];
  fantom?: IToken[];
  binance?: IToken[];
  arbitrum?: IToken[];
  optimism?: IToken[];
}
