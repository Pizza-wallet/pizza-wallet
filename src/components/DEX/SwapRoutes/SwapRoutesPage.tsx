import React from "react";
import { Card, Spin, List } from "antd";
// import { ProgressToNextUpdate } from "../../components/ProgressToNextUpdate";
// import {
//   SwapRouteCard,
//   SwapRouteCardSkeleton,
//   SwapRouteNotFoundCard,
// } from "../../components/SwapRouteCard";
import { useSwapRoutes } from "../../../hooks/useSwapRoutes";
import styled from "styled-components";
import { SwapRouteCard } from "./SwapRouteCard";
// import { navigationRoutes } from "../../utils";
// import { Stack } from "./SwapRoutes.style";
// import { useSetRecommendedRoute } from "./useSetRecommendedRoute";

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
}

export const SwapRoutesPage: React.FC<ISwapRoutes> = ({
  fromChainId,
  fromTokenAddress,
  toChainId,
  toTokenAddress,
  toAddress,
  fromAmount,
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

  console.log("routes - ", routes);
  console.log("current route - ", currentRoute);

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
                />
              </div>
            );
          })}
      </List>
      {/* <ProgressToNextUpdate
        updatedAt={dataUpdatedAt || new Date().getTime()}
        timeToUpdate={refetchTime}
        isLoading={isFetching}
        onClick={() => refetch()}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      /> */}

      {/* <Stack
        direction="row"
        spacing={2}
        my={2}
        ml={2}
        mr={onlyRecommendedRoute || routeNotFound ? 2 : 1}
        sx={{
          borderRightWidth:
            !onlyRecommendedRoute &&
            !routeNotFound &&
            (isFetching || (routes && routes.length > 1))
              ? 1
              : 0,
        }}
      >
        {isLoading || isFetching ? (
          <>
            <SwapRouteCardSkeleton
              minWidth={!onlyRecommendedRoute ? "80%" : "100%"}
              variant="dense"
            />
            {!onlyRecommendedRoute ? (
              <SwapRouteCardSkeleton minWidth="80%" variant="dense" />
            ) : null}
          </>
        ) : !currentRoute ? (
          <SwapRouteNotFoundCard />
        ) : (
          <>
            <SwapRouteCard
              minWidth={
                !onlyRecommendedRoute && routes.length > 1 ? "80%" : "100%"
              }
              route={currentRoute}
              variant="dense"
              active
            />
            {!onlyRecommendedRoute && routes.length > 1 ? (
              <SwapRouteCard
                minWidth="80%"
                route={routes[1]}
                variant="dense"
                pointerEvents="none"
              />
            ) : null}
          </>
        )}
      </Stack> */}

      {/* {!onlyRecommendedRoute && !routeNotFound ? (
        <>
          <IconButton
            // onClick={handleCardClick}
            size="medium"
            disabled={isValidating || !isValid}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </>
      ) : null} */}
    </div>
  );
};
