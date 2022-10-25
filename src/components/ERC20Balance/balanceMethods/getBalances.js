import BigNumber from "bignumber.js";
import { fetchDataUsingMulticall } from "./multicall";

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
    const amount = new BigNumber(res[i].amount.toString() || "0")
      .shiftedBy(-token.decimals)
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
