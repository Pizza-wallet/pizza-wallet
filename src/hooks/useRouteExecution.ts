import type { ExchangeRateUpdateParams, Route } from "@lifi/sdk";
import { getChainById, MetaMaskProviderErrorCode } from "@lifi/sdk";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { shallow } from "zustand/shallow";
import { useLiFi } from "../providers";
import {
  getUpdatedProcess,
  isRouteActive,
  isRouteDone,
  isRouteFailed,
  useRouteExecutionStore,
} from "../stores";
// import { useWeb3React } from "@web3-react/core";
import { useWeb3AuthExecutionStore } from "../stores/web3Auth";
import { deepClone } from "../helpers/utils";

interface RouteExecutionProps {
  routeId: string;
  executeInBackground?: boolean;
  onAcceptExchangeRateUpdate?(
    resolver: (value: boolean) => void,
    data: ExchangeRateUpdateParams,
  ): void;
}

export const useRouteExecution = ({
  routeId,
  executeInBackground,
  onAcceptExchangeRateUpdate,
}: RouteExecutionProps) => {
  const lifi = useLiFi();

  // using web3React temporarily to get signer
  // const { provider } = useWeb3React();
  const { provider } = useWeb3AuthExecutionStore((state: any) => state);
  console.log("provider - ", provider);
  const signer = provider?.getSigner();

  const queryClient = useQueryClient();
  const resumedAfterMount = useRef(false);
  const routeExecution = useRouteExecutionStore(
    (state) => state.routes[routeId],
  );
  const [updateRoute, restartRoute, deleteRoute] = useRouteExecutionStore(
    (state) => [state.updateRoute, state.restartRoute, state.deleteRoute],
    shallow,
  );

  const updateCallback = (updatedRoute: Route) => {
    const routeExecution =
      useRouteExecutionStore.getState().routes[updatedRoute.id];
    if (!routeExecution) {
      return;
    }
    const clonedUpdatedRoute = deepClone(updatedRoute);
    updateRoute(clonedUpdatedRoute);
    const process = getUpdatedProcess(routeExecution.route, clonedUpdatedRoute);
    if (process) {
      // emitter.emit(WidgetEvent.RouteExecutionUpdated, {
      //   route: clonedUpdatedRoute,
      //   process,
      // });
      // Change a state route execution updated so can show in component
    }
    if (isRouteDone(clonedUpdatedRoute)) {
      // emitter.emit(WidgetEvent.RouteExecutionCompleted, clonedUpdatedRoute);
      // Change a state route execution complete so can show in component
    }
    if (isRouteFailed(clonedUpdatedRoute) && process) {
      // emitter.emit(WidgetEvent.RouteExecutionFailed, {
      //   route: clonedUpdatedRoute,
      //   process,
      // });
      // Change a state route execution failed so can show in component
    }
    console.log("Route updated.", clonedUpdatedRoute);
  };

  const switchChain = async (chainId: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const { ethereum } = window as any;
      const provider: any = ethereum;
      if (!provider) {
        resolve(false);
      }
      try {
        provider
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: getChainById(chainId).metamask?.chainId }],
          })
          .catch((error: any) => {
            if (error.code !== MetaMaskProviderErrorCode.userRejectedRequest) {
              addChain(chainId).then((result) => resolve(result));
            } else {
              reject(error);
            }
          });
        provider.once("chainChanged", (id: string) => {
          if (parseInt(id) === chainId) {
            resolve(true);
          }
        });
      } catch (error: any) {
        // const ERROR_CODE_UNKNOWN_CHAIN = 4902
        if (error.code !== MetaMaskProviderErrorCode.userRejectedRequest) {
          addChain(chainId).then((result) => resolve(result));
        } else {
          console.error(error);
          resolve(false);
        }
      }
    });
  };

  const addChain = async (chainId: number) => {
    const { ethereum } = window as any;
    const provider: any = ethereum;

    if (!provider) {
      return false;
    }

    const params = getChainById(chainId).metamask;
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [params],
      });
      return true;
    } catch (error: any) {
      console.error(`Error adding chain ${chainId}: ${error.message}`);
    }
    return false;
  };

  const switchChainHook = async (requiredChainId: number) => {
    console.log("Switch chain hook hit");
    if (!signer) {
      return signer;
    }
    const currentChainId = await signer.getChainId();
    if (currentChainId !== requiredChainId) {
      const switched = await switchChain(requiredChainId);
      if (!switched) {
        throw new Error("Chain was not switched.");
      }
    }
    return signer;
  };

  const acceptExchangeRateUpdateHook = async (
    params: ExchangeRateUpdateParams,
  ) => {
    if (!onAcceptExchangeRateUpdate) {
      return false;
    }

    const accepted = await new Promise<boolean>((resolve) =>
      onAcceptExchangeRateUpdate(resolve, params),
    );

    return accepted;
  };

  const executeRouteMutation = useMutation(
    () => {
      if (!signer) {
        throw Error("Account signer not found.");
      }
      if (!routeExecution?.route) {
        throw Error("Execution route not found.");
      }
      queryClient.removeQueries(["routes"]);
      return lifi.executeRoute(signer, routeExecution.route, {
        updateCallback,
        switchChainHook,
        acceptExchangeRateUpdateHook,
        infiniteApproval: false,
        executeInBackground,
      });
    },
    {
      onMutate: () => {
        console.log("Execution started.", routeId);
        if (routeExecution) {
          // emitter.emit(WidgetEvent.RouteExecutionStarted, routeExecution.route);
          // Change a state route execution started so can show in component
        }
      },
    },
  );

  const resumeRouteMutation = useMutation(
    (resumedRoute?: Route) => {
      if (!signer) {
        throw Error("Account signer not found.");
      }
      if (!routeExecution?.route) {
        throw Error("Execution route not found.");
      }
      return lifi.resumeRoute(
        signer as any,
        resumedRoute ?? routeExecution.route,
        {
          updateCallback,
          switchChainHook,
          acceptExchangeRateUpdateHook,
          infiniteApproval: false,
          executeInBackground,
        },
      );
    },
    {
      onMutate: () => {
        console.log("Resumed to execution.", routeId);
      },
    },
  );

  const executeRoute = useCallback(() => {
    executeRouteMutation.mutateAsync(undefined, {
      onError: (error) => {
        console.warn("Execution failed!", routeId, error);
        // Notification.showNotification(NotificationType.SwapExecution_ERROR);
      },
      onSuccess: (route: Route) => {
        console.log("Executed successfully!", route);
        // Notification.showNotification(NotificationType.TRANSACTION_SUCCESSFULL);
      },
    });
  }, [executeRouteMutation, routeId]);

  const resumeRoute = useCallback(
    (route?: Route) => {
      resumeRouteMutation.mutateAsync(route, {
        onError: (error) => {
          console.warn("Resumed execution failed.", routeId, error);
        },
        onSuccess: (route) => {
          console.log("Resumed execution successful.", route);
        },
      });
    },
    [resumeRouteMutation, routeId],
  );

  const restartRouteMutation = useCallback(() => {
    restartRoute(routeId);
    resumeRoute(routeExecution?.route);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeRoute, routeExecution?.route, routeId]);

  const deleteRouteMutation = useCallback(() => {
    deleteRoute(routeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeId]);

  // Resume route execution after page reload
  useEffect(() => {
    // Check if route is eligible for automatic resuming
    if (isRouteActive(routeExecution?.route) && !resumedAfterMount.current) {
      resumedAfterMount.current = true;
      resumeRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer]);

  useEffect(() => {
    return () => {
      const route = useRouteExecutionStore.getState().routes[routeId]?.route;
      if (!route || !isRouteActive(route)) {
        return;
      }
      lifi.updateRouteExecution(route, { executeInBackground: true });
      console.log("Move route execution to background.", routeId);
      resumedAfterMount.current = false;
    };
  }, [lifi, routeId]);

  return {
    executeRoute,
    restartRoute: restartRouteMutation,
    deleteRoute: deleteRouteMutation,
    route: routeExecution?.route,
    status: routeExecution?.status,
  };
};
