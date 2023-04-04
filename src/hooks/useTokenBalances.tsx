/* eslint-disable consistent-return */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLiFi } from "../providers";
import type { LIFIToken } from "../types/client";
import { formatTokenAmount } from "../helpers/formatters";
import { useTokens } from "./useTokens";
import { useWeb3AuthExecutionStore } from "../stores/web3Auth/useWeb3AuthExecutionStore";

const defaultRefetchInterval = 60_000;
const minRefetchInterval = 1000;

export const useTokenBalances = (selectedChainId?: number) => {
  const lifi = useLiFi();
  // const { account } = useWallet();
  const { address } = useWeb3AuthExecutionStore((state: any) => state);
  //const account = { address: process.env.REACT_APP_TEST_ACCOUNT };
  const { tokens, isLoading } = useTokens(selectedChainId);
  const [refetchInterval, setRefetchInterval] = useState(
    defaultRefetchInterval,
  );

  const isBalanceLoadingEnabled =
    Boolean(address.address) &&
    Boolean(tokens?.length) &&
    Boolean(selectedChainId);

  const {
    data: tokensWithBalance,
    isLoading: isBalanceLoading,
    refetch,
  } = useQuery(
    //["token-balances", account.address, selectedChainId, tokens?.length],
    ["token-balances", address, selectedChainId, tokens?.length],
    async ({ queryKey: [, address] }) => {
      const tokenBalances = await lifi.getTokenBalances(
        address as string,
        tokens!,
      );

      console.log("Are we receiving token balances - ", tokenBalances);

      if (!tokenBalances?.length) {
        // Sometimes RPCs (e.g. Arbitrum) don't return balances on first call
        // TODO: fix and remove backplane
        setRefetchInterval((interval) =>
          interval === defaultRefetchInterval
            ? minRefetchInterval
            : interval * 2,
        );
        throw Error("Could not get tokens balance.");
      }

      const sortFn = (a: LIFIToken, b: LIFIToken) =>
        parseFloat(b.amount ?? "0") * parseFloat(b.priceUSD ?? "0") -
        parseFloat(a.amount ?? "0") * parseFloat(a.priceUSD ?? "0");

      const formattedTokens = (
        (tokenBalances.length === 0 ? tokens : tokenBalances) as LIFIToken[]
      ).map((token) => {
        token.amount = formatTokenAmount(token.amount);
        return token;
      });
      const result = [
        ...formattedTokens.filter((token) => token.amount !== "0").sort(sortFn),
        ...formattedTokens.filter((token) => token.amount === "0"),
        ...formattedTokens.filter((token) => token.amount !== "0").sort(sortFn),
        ...formattedTokens.filter((token) => token.amount === "0"),
      ];
      return result;
    },
    {
      enabled: isBalanceLoadingEnabled,
      refetchInterval,
      staleTime: refetchInterval,
    },
  );

  return {
    tokens,
    tokensWithBalance,
    isLoading,
    isBalanceLoading: isBalanceLoading && isBalanceLoadingEnabled,
    refetch,
  };
};
