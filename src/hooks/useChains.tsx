import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useLiFi } from "../providers";

export const useChains = () => {
  const lifi = useLiFi();
  const { data, isLoading } = useQuery(
    ["chains"],
    async () => {
      const availableChains = await lifi.getChains();
      const unsupportedChains = [
        "OKXChain",
        "Moonriver",
        "Moonbeam",
        "FUSE",
        "Cronos",
        "Velas",
        "Aurora",
      ];
      const filteredChains = availableChains.filter(
        (chain) => !unsupportedChains.includes(chain.name),
      );

      return { filteredChains };
    },
    {
      refetchInterval: 180000,
      staleTime: 180000,
    },
  );

  const getChainById = useCallback(
    (chainId: number) => {
      const chain = data?.filteredChains.find((chain) => chain.id === chainId);
      if (!chain) {
        // throw new Error('Chain not found or chainId is invalid.');
        console.log("Chain not found or chainId is invalid.");
      }
      return chain;
    },
    [data],
  );

  return { chains: data?.filteredChains, getChainById, isLoading };
};
