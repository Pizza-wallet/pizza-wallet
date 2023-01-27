import { isAddress } from "@ethersproject/address";
import { LifiErrorCode } from "@lifi/sdk";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Big from "big.js";
import { useToken } from "./useToken";
import { useLiFi } from "../providers";

const refetchTime = 60_000;
const defaultSlippage = "0.5";

// interface IUseSwapRoutes {
//   fromChainId: any;
//   fromTokenAddress: any;
//   toChainId: any;
//   toTokenAddress: any;
//   toAddress: any;
//   fromAmount: any;
// }

export const useSwapRoutes = (
  fromChainId: any,
  fromTokenAddress: any,
  toChainId: any,
  toTokenAddress: any,
  toAddress: any,
  fromAmount: any,
) => {
  const lifi = useLiFi();
  // const { variant, sdkConfig } = useWidgetConfig();
  // const { account, provider } = useWallet();
  const account = process.env.REACT_APP_TEST_ACCOUNT;
  const queryClient = useQueryClient();
  // const { slippage, enabledBridges, enabledExchanges, routePriority } =
  //   useSettings([
  //     'slippage',
  //     'routePriority',
  //     'enabledBridges',
  //     'enabledExchanges',
  //   ]);
  // const [fromChainId, fromTokenAddress, toChainId, toTokenAddress, toAddress] =
  //   useWatch({
  //     name: [
  //       SwapFormKey.FromChain,
  //       SwapFormKey.FromToken,
  //       SwapFormKey.ToChain,
  //       SwapFormKey.ToToken,
  //       SwapFormKey.ToAddress,
  //     ],
  //   });
  const fromTokenAmount = fromAmount;
  const { token: fromToken } = useToken(fromChainId, fromTokenAddress);
  const { token: toToken } = useToken(toChainId, toTokenAddress);
  const isEnabled =
    // Boolean(account.address) &&
    !isNaN(fromChainId) &&
    !isNaN(toChainId) &&
    Boolean(fromToken?.address) &&
    Boolean(toToken?.address) &&
    !isNaN(fromTokenAmount) &&
    Number(fromTokenAmount) > 0;
  const queryKey = [
    "routes",
    account,
    fromChainId,
    fromToken?.address,
    fromTokenAmount,
    toChainId,
    toToken?.address,
    toAddress,
    // slippage,
    // enabledBridges,
    // enabledExchanges,
    // routePriority,
    // variant,
    // sdkConfig?.defaultRouteOptions?.allowSwitchChain,
  ];
  const previousDataUpdatedAt =
    queryClient.getQueryState(queryKey)?.dataUpdatedAt;
  const refetchInterval = previousDataUpdatedAt
    ? Math.min(
        Math.abs(refetchTime - (Date.now() - previousDataUpdatedAt)),
        refetchTime,
      )
    : refetchTime;
  const { data, isLoading, isFetching, isFetched, dataUpdatedAt, refetch } =
    useQuery(
      queryKey,
      async ({
        queryKey: [
          _,
          fromAddress,
          fromChainId,
          fromTokenAddress,
          fromTokenAmount,
          toChainId,
          toTokenAddress,
          toAddress,
          // slippage,
          // enabledBridges,
          // enabledExchanges,
          // routePriority,
          // variant,
          // allowSwitchChain,
        ],
        signal,
      }) => {
        let toWalletAddress = isAddress(toAddress) ? toAddress : fromAddress;
        // try {
        //   toWalletAddress =
        //     (await provider?.resolveName(toAddress)) ?? isAddress(toAddress)
        //       ? toAddress
        //       : fromAddress;
        // } catch {
        //   toWalletAddress = isAddress(toAddress) ? toAddress : fromAddress;
        // }
        const fromAmount = Big(fromTokenAmount)
          .mul(10 ** (fromToken?.decimals ?? 0))
          .toString();
        const formattedSlippage = parseFloat(defaultSlippage) / 100;
        return lifi.getRoutes(
          {
            fromChainId,
            fromAmount,
            fromTokenAddress,
            toChainId,
            toTokenAddress,
            fromAddress,
            toAddress: toWalletAddress,
            options: {
              slippage: formattedSlippage,
              integrator: "pizza-wallet", // string telling us who you are
              fee: 0.1, // 0.1 refers to 10% of the transaction volume
              // bridges: {
              //   allow: enabledBridges,
              // },
              // exchanges: {
              //   allow: enabledExchanges,
              // },
              // order: routePriority,
              // allowSwitchChain: variant === "refuel" ? false : allowSwitchChain,
            },
          },
          { signal },
        );
      },
      {
        enabled: isEnabled,
        refetchInterval,
        staleTime: refetchTime,
        cacheTime: refetchTime,
        retry(failureCount, error: any) {
          console.log("failure count from useSwapRoutes - ", failureCount);
          if (error?.code === LifiErrorCode.NotFound) {
            return false;
          }
          return true;
        },
      },
    );

  return {
    routes: data?.routes,
    isLoading: isEnabled && isLoading,
    isFetching,
    isFetched,
    dataUpdatedAt,
    refetchTime,
    refetch,
  };
};
