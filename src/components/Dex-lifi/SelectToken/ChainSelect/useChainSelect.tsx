// import { useState } from "react";
// import type { EVMChain } from "@lifi/sdk";
// import { useController, useFormContext } from "react-hook-form";
import { useChains } from "../../../../hooks/useChains";
// import { SwapFormKey, SwapFormKeyHelper } from "../../providers";
// import { useChainOrder } from "../../stores";

// type SwapFormType = "from" | "to";

export const useChainSelect = (formType: string) => {
  // const chainKey = SwapFormKeyHelper.getChainKey(formType);
  // const {
  //   field: { onChange, onBlur },
  // } = useController({ name: chainKey });
  // const { setValue } = useFormContext();
  console.log("form type - ", formType);
  const { chains, isLoading } = useChains();
  // const [chainOrder, setChainOrder] = useState<number>();

  // const getChains = () => {
  //   if (!chains) {
  //     return [];
  //   }
  //   const selectedChains = chainOrder
  //     .map((chainId) => chains.find((chain) => chain.id === chainId))
  //     .filter((chain) => chain) as EVMChain[];

  //   return selectedChains;
  // };

  // const setCurrentChain = (chainId: number) => {
  //   // onChange(chainId);
  //   // onBlur();
  //   // setValue(SwapFormKeyHelper.getTokenKey(formType), "");
  //   // setValue(SwapFormKeyHelper.getAmountKey(formType), "");
  //   // setValue(SwapFormKey.TokenSearchFilter, "");
  //   // setChainOrder(chainId);
  // };

  return {
    // chainOrder,
    chains,
    // getChains,
    isLoading,
    // setChainOrder,
    // setCurrentChain,
  };
};
