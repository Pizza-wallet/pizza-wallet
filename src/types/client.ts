import type { TokenAmount } from "@lifi/sdk";

export interface LIFIToken extends TokenAmount {
  featured?: boolean;
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
