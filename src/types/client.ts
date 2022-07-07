import { TokenWithAmounts } from "@lifinance/sdk";

// all reusable interfaces here -
export interface TokenAmountList {
  [ChainKey: string]: Array<TokenWithAmounts>;
}
