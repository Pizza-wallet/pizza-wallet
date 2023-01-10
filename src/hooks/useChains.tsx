import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useLiFi } from "../providers";

export const useChains = () => {
  const lifi = useLiFi();
  const { data, isLoading } = useQuery(
    ["chains"],
    async () => {
      const availableChains = await lifi.getChains();
      // const filteredChains = availableChains.filter((chain) =>
      //   isItemAllowed(chain.id),
      // );
      // const chainOrder = useChainOrderStore
      //   .getState()
      //   .initializeChains(filteredChains.map((chain) => chain.id));
      // const [fromChainValue, toChainValue] = getValues([
      //   SwapFormKey.FromChain,
      //   SwapFormKey.ToChain,
      // ]);
      // if (!fromChainValue) {
      //   setValue(SwapFormKey.FromChain, chainOrder[0]);
      // }
      // if (!toChainValue) {
      //   setValue(SwapFormKey.ToChain, chainOrder[0]);
      // }
      return { availableChains };
    },
    {
      refetchInterval: 180000,
      staleTime: 180000,
    },
  );

  const getChainById = useCallback(
    (chainId: number) => {
      const chain = data?.availableChains.find((chain) => chain.id === chainId);
      // if (!chain) {
      //   throw new Error('Chain not found or chainId is invalid.');
      // }
      return chain;
    },
    [data],
  );

  return { chains: data?.availableChains, getChainById, isLoading };
};
