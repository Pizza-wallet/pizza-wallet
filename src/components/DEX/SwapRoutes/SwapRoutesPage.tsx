import React from "react";
import { Spin, List } from "antd";
import { useSwapRoutes } from "../../../hooks/useSwapRoutes";
import styled from "styled-components";
import { SwapRouteCard } from "./SwapRouteCard";

const CenterLayout = styled("div")`
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

interface ISwapRoutes {
  fromChainId: any;
  fromTokenAddress: any;
  toChainId: any;
  toTokenAddress: any;
  toAddress: any;
  fromAmount: any;
  handleSelectRoute: any;
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

  // useSetRecommendedRoute(currentRoute, isFetching);

  if (!currentRoute && !isLoading && !isFetching && !isFetched) {
    return null;
  }

  // const handleCardClick = () => {
  //   navigate(navigationRoutes.swapRoutes);
  // };

  const routeNotFound = !currentRoute && !isLoading && !isFetching;
  // const onlyRecommendedRoute = variant === "refuel" || useRecommendedRoute;

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
            console.log("route from map - ", route);
            return (
              <div key={i}>
                <SwapRouteCard
                  toToken={route.toToken}
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
