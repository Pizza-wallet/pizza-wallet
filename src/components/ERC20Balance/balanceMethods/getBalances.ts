import BigNumber from "bignumber.js";
import { fetchDataUsingMulticall } from "./multicall";
import { getPriceInformation } from "./getPriceInformation";
import { getChainDetails } from "../../../helpers/getChainDetails";
import { Fragment, JsonFragment } from "@ethersproject/abi";
import { mockBalances } from "./mockData";

const balanceAbi = [
  {
    constant: true,
    inputs: [{ name: "who", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ name: "addr", type: "address" }],
    name: "getEthBalance",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

interface IToken {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
  amount?: string;
  value?: number;
}

interface ITokenList {
  ethereum?: IToken[];
  polygon?: IToken[];
  avalanche?: IToken[];
  fantom?: IToken[];
  binance?: IToken[];
  arbitrum?: IToken[];
}

interface MultiCallData {
  address: string;
  name: string;
  params?: any[];
}

export const isZeroAddress = (address: string) => {
  if (address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    return true;
  }
  return false;
};

export const getBalances = async (walletAddress: string, tokens: IToken[]) => {
  if (tokens.length === 0) {
    return [];
  }
  const { chainId } = tokens[0];
  tokens.forEach((token) => {
    if (token.chainId !== chainId) {
      // eslint-disable-next-line no-console
      console.warn(`Requested tokens have to be on same chain.`);
      return [];
    }
  });

  const multicallAddress = process.env.REACT_APP_MULTICALL_ADDRESS || "";
  if (tokens.length > 0) {
    return executeMulticall(walletAddress, tokens, multicallAddress, chainId);
  }
};

const executeMulticall = async (
  walletAddress: string,
  tokens: IToken[],
  multicallAddress: string,
  chainId: number,
) => {
  // Collect calls we want to make
  const calls: Array<MultiCallData> = [];
  tokens.map((token) => {
    if (isZeroAddress(token.address)) {
      calls.push({
        address: multicallAddress,
        name: "getEthBalance",
        params: [walletAddress],
      });
    } else {
      calls.push({
        address: token.address,
        name: "balanceOf",
        params: [walletAddress],
      });
    }
  });

  const res = await fetchViaMulticall(
    calls,
    balanceAbi,
    chainId,
    multicallAddress,
  );
  if (!res.length) {
    return [];
  }

  return tokens.map((token, i) => {
    // usd coin showing decimals as 18 on eth chain even though it is 6
    // figure out coins that dont have 18 decimals and test here
    const decimals = token.decimals;
    const amount: any = new BigNumber(res[i].amount.toString() || "0")
      .shiftedBy(-decimals)
      .toFixed();

    return {
      ...token,
      amount: amount || "0",
      blockNumber: res[i].blockNumber,
    };
  });
};

const fetchViaMulticall = async (
  calls: Array<MultiCallData>,
  abi: ReadonlyArray<Fragment | JsonFragment | string>,
  chainId: number,
  multicallAddress: string,
) => {
  const result = await fetchDataUsingMulticall(
    calls,
    abi,
    chainId,
    multicallAddress,
  );

  return result.map(({ data, blockNumber }) => ({
    amount: data ? data : new BigNumber(0),
    blockNumber,
  }));
};

export const getBalanceAndPriceInformation = async (
  account: string,
  tokenList: ITokenList,
) => {
  // get balances with tokenlist and multicall contract
  let balances: ITokenList = {};

  for (let chain in tokenList) {
    // get and set balances above zero
    const tokens: IToken[] | undefined = tokenList[chain as keyof ITokenList];
    if (tokens) {
      balances[chain as keyof ITokenList] = returnBalancesAboveZero(
        await getBalances(account, tokens),
      );
    }
  }

  // Get price info for each token
  const tokensWithPriceInfo: any = [];

  for (let chain in balances) {
    const userHasTokensOnChain = balances[chain as keyof ITokenList]?.length;
    if (userHasTokensOnChain) {
      const chainId = balances[chain as keyof ITokenList]?.[0].chainId;
      const tokenInfo = await getPriceInformation(
        balances[chain as keyof ITokenList],
        chainId,
      );
      // we need to spread each array in to tokensWithPriceInfo
      tokenInfo?.forEach((token) => {
        tokensWithPriceInfo.push(token);
      });
      // tokensWithPriceInfo.push(...tokenInfo);
    }
  }

  // group tokens together by token name -
  const groupByTokenName = tokensWithPriceInfo.reduce(
    (group: any, token: any) => {
      const name = token?.name;
      group[name] = group[name] ?? [];
      group[name].push(token);
      return group;
    },
    {},
  );

  const balancesWithPriceInfo = [];
  for (let tokenName in groupByTokenName) {
    balancesWithPriceInfo.push(groupByTokenName[tokenName]);
  }

  // Set token info and save in state
  const usersBalances = balancesWithPriceInfo.map((tokens) => {
    const tokenInfo = tokens[0];

    const chainLogoUri: string[] = [];
    tokens.forEach((val: IToken) => {
      const chainId = val.chainId;
      chainLogoUri.push(getChainDetails(chainId)!.logoUri);
    });

    return {
      name: tokenInfo.name,
      type: "chain",
      symbol: tokenInfo.symbol,
      id: tokenInfo.name,
      chainLogoUri: chainLogoUri,
      logoURI: tokenInfo.logoURI,
      price: tokenInfo.price,
      balance: tokens.reduce(
        (acc: number, obj: IToken) => (acc += Number(obj.amount)),
        0,
      ),
      value: tokens.reduce(
        (acc: number, obj: IToken) => (acc += Number(obj.value)),
        0,
      ),
      tokens: tokens,
    };
  });

  console.log("what we are returning for token table - ", usersBalances);
  return usersBalances;
};

const returnBalancesAboveZero = (balances: IToken[] | undefined) => {
  return balances?.filter((token: IToken) => token.amount !== "0");
};