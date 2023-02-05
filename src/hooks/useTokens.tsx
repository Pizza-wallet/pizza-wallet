import { useQuery } from "@tanstack/react-query";
import { useLiFi } from "../providers";
import type { LIFIToken } from "../types/client";
import { useChains } from "./useChains";

export const useTokens = (selectedChainId?: number) => {
  const lifi = useLiFi();
  const {
    getChainById,
    isLoading: isSupportedChainsLoading,
    chains,
  } = useChains();
  // const { tokens, chains, disabledChains } = useWidgetConfig();
  const { data, isLoading } = useQuery(
    ["tokens", selectedChainId],
    async () => {
      const chainAllowed = selectedChainId && getChainById(selectedChainId);
      if (!chainAllowed) {
        return [];
      }

      const data = await lifi.getTokens({ chains: [selectedChainId] });
      const response = data.tokens?.[selectedChainId];

      return response;
    },
    {
      enabled: !isSupportedChainsLoading,
    },
  );
  console.log("are we getting chains? - ", chains);
  console.log("are we getting tokens? - ", data);
  return {
    tokens: data,
    isLoading,
  };
};
