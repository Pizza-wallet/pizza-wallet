import BigNumber from "bignumber.js";
import { fetchDataUsingMulticall } from "./multicall";
import { getPriceInformation } from "./getPriceInformation";
import { getChainDetails } from "../../../helpers/getChainDetails";

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

export const isZeroAddress = (address) => {
  if (address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee") {
    return true;
  }
  return false;
};

export const getBalances = async (walletAddress, tokens) => {
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

  const multicallAddress = process.env.REACT_APP_MULTICALL_ADDRESS;
  if (tokens.length > 0) {
    return executeMulticall(walletAddress, tokens, multicallAddress, chainId);
  }
};

const executeMulticall = async (
  walletAddress,
  tokens,
  multicallAddress,
  chainId,
) => {
  // Collect calls we want to make
  const calls = [];
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
    const decimals = token.name === "USD Coin" ? 6 : 18;
    const amount = new BigNumber(res[i].amount.toString() || "0")
      .shiftedBy(-decimals)
      .toFixed();

    return {
      ...token,
      amount: amount || "0",
      blockNumber: res[i].blockNumber,
    };
  });
};

const fetchViaMulticall = async (calls, abi, chainId, multicallAddress) => {
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

export const getBalanceAndPriceInformation = async (account, tokenList) => {
  // TODO: optimize this code to reduce load time
  // get balances with tokenlist and multicall contract
  let balances = {};
  for (let chain in tokenList) {
    // get and set balances above zero
    balances[chain] = returnBalancesAboveZero(
      await getBalances(account, tokenList[chain]),
    );
  }

  // Get price info for each token
  const tokensWithPriceInfo = [];

  for (let chain in balances) {
    const userHasTokensOnChain = balances[chain].length;
    if (userHasTokensOnChain) {
      const chainId = balances[chain][0].chainId;
      const tokenInfo = await getPriceInformation(balances[chain], chainId);
      tokensWithPriceInfo.push(...tokenInfo);
    }
  }

  // group tokens together by token name -
  const groupByTokenName = tokensWithPriceInfo.reduce((group, token) => {
    const { name } = token;
    group[name] = group[name] ?? [];
    group[name].push(token);
    return group;
  }, {});

  const balancesWithPriceInfo = [];
  for (let tokenName in groupByTokenName) {
    balancesWithPriceInfo.push(groupByTokenName[tokenName]);
  }

  console.log("newest array - ", balancesWithPriceInfo);
  // Set token info and save in state
  const usersBalances = balancesWithPriceInfo.map((tokens) => {
    const tokenInfo = tokens[0];

    const chainLogoUri = [];
    tokens.forEach((val) => {
      const chainId = val.chainId;
      chainLogoUri.push(getChainDetails(chainId).logoUri);
    });

    return {
      name: tokenInfo.name,
      type: "chain",
      id: tokenInfo.name,
      chainLogoUri: chainLogoUri,
      logoURI: tokenInfo.logoURI,
      price: tokenInfo.price,
      balance: tokens.reduce((acc, obj) => (acc += Number(obj.amount)), 0),
      value: tokens.reduce((acc, obj) => (acc += obj.value), 0),
      tokens: tokens,
    };
  });

  console.log("what we are returning for token table - ", usersBalances);
  return usersBalances;
};

const returnBalancesAboveZero = (balances) => {
  return balances.filter((token) => token.amount !== "0");
};
