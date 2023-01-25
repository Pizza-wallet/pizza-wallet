import React from "react";
import { Spin, List } from "antd";
import { useSwapRoutes } from "../../../hooks/useSwapRoutes";
import styled from "styled-components";
import { SwapRouteCard } from "./SwapRouteCard";
import type { Route } from "@lifi/sdk";

const CenterLayout = styled("div")`
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

interface ISwapRoutes {
  fromChainId: number;
  fromTokenAddress: string;
  toChainId: number;
  toTokenAddress: string;
  toAddress: string;
  fromAmount: number;
  handleSelectRoute: (route: Route) => void;
}

export const SwapRoutesPage: React.FC<ISwapRoutes> = ({
  fromChainId,
  fromTokenAddress,
  toChainId,
  toTokenAddress,
  toAddress,
  fromAmount,
  handleSelectRoute,
}) => {
  const {
    routes,
    isLoading,
    isFetching,
    isFetched,
    dataUpdatedAt,
    refetchTime,
    refetch,
  } = useSwapRoutes(
    fromChainId,
    fromTokenAddress,
    toChainId,
    toTokenAddress,
    toAddress,
    fromAmount,
  );

  const currentRoute = routes?.[0];

  if (!currentRoute && !isLoading && !isFetching && !isFetched) {
    return null;
  }

  const routeNotFound = !currentRoute && !isLoading && !isFetching;

  if (isLoading)
    return (
      <div style={{ height: 528, overflow: "auto" }}>
        <CenterLayout>
          <Spin size="large" style={{ color: "#3e389f" }}></Spin>
        </CenterLayout>
      </div>
    );
  return (
    <div style={{ height: 528, overflow: "auto" }}>
      <p>{routeNotFound ? "No routes found" : null}</p>
      <List style={{ height: "100%" }}>
        {routes?.length &&
          routes?.map((route, i) => {
            return (
              <div key={i}>
                <SwapRouteCard
                  toToken={{ ...route.toToken, amount: "" }}
                  toAmount={route.toAmount}
                  route={route}
                  handleSelectRoute={handleSelectRoute}
                />
              </div>
            );
          })}
      </List>
    </div>
  );
};
