import { TokenWithAmounts } from "@lifi/sdk";

export interface TokenAmountList {
  [ChainKey: string]: Array<TokenWithAmounts>;
}
