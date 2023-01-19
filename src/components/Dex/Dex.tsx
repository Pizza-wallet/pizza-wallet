import { useState } from "react";
import styled from "styled-components";
import { SelectChainAndToken } from "./SelectChainAndToken";
import { SelectTokenPage } from "./SelectToken/SelectTokenPage";
import { SwapInput } from "./SwapInput";
import { SwapButton } from "./SwapButton";
import { SwapRoutesPage } from "./SwapRoutes/SwapRoutesPage";
import { SelectedRoutePage } from "./SelectedRoutePage";
import { useRouteExecution } from "../../hooks/useRouteExecution";
import type { Route } from "@lifi/sdk";
import { getStepList } from "./StepList/StepList";

const Card = styled("div")`
  width: 28em;
  margin-left: auto;
  margin-right: auto;
  border: 0.125rem solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 2.75rem;
  padding: 0.425rem;
  height: 100%;
`;

const InnerCard = styled("div")`
  position: relative;
  border: 0.125rem solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 2.5625rem;
  padding: 1.25rem;
  width: 26.8em;
`;

const Header = styled("div")`
  color: #3e389f;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 1.5rem;
  padding: 0.625rem 0 0.625rem 1.25rem;
  -webkit-text-stroke: thin;
`;

function Dex() {
  const [page, setPage] = useState("main");
  const [formType, setFormType] = useState("");

  // Might be better to abstract this to global state (maybe use context)
  // Swap From chain and token
  const [fromChain, setFromChain] = useState(1);
  const [fromToken, setFromToken] = useState("");
  const [fromTokenAmount, setFromTokenAmount] = useState(0);
  // Swap To chain and token
  const [toChain, setToChain] = useState(1);
  const [toToken, setToToken] = useState("");

  // Swap route
  const [selectedRoute, setSelectedRoute] = useState<Route>();

  // UI state
  const [openSwapRoutes, setOpenSwapRoutes] = useState(false);

  const { route, status, executeRoute, restartRoute, deleteRoute } =
    useRouteExecution({
      routeId: selectedRoute?.id || "",
      // onAcceptExchangeRateUpdate: exchangeRateBottomSheetRef.current?.open,
    });

  const handleSelectRoute = (route: any) => {
    console.log("route selected - ", route);
    setSelectedRoute(route);
    setOpenSwapRoutes(false);
    setPage("selectedRoute");
  };

  const handleSetFromTokenAmount = (val: any) => {
    setFromTokenAmount(val);
    setOpenSwapRoutes(true);
  };

  const executeSwap = () => {
    console.log("execute swap!");
    if (route) {
      executeRoute();
    }
  };

  const renderCorrectPage = () => {
    if (page === "main") {
      return (
        <>
          <SelectChainAndToken
            handleSelectToken={() => setPage("selectToken")}
            setFormType={setFormType}
            fromChain={fromChain}
            toChain={toChain}
            fromToken={fromToken}
            toToken={toToken}
          />
          <SwapInput
            tokenAddress={fromToken}
            chainId={fromChain}
            value={fromTokenAmount}
            handleChange={(val: number) => handleSetFromTokenAmount(val)}
            selectedChainId={fromChain}
          />
          <SwapButton page={page} onClick={() => {}} />
        </>
      );
    } else if (page === "selectedRoute") {
      return (
        <>
          {!status && <SelectedRoutePage route={selectedRoute} />}
          {route && status ? (
            <div style={{ marginTop: "20px" }}>{getStepList(route)}</div>
          ) : null}
          <SwapButton
            page={page}
            statusOfSwap={status}
            navigateBack={() => setPage("main")}
            onClick={executeSwap}
          />
        </>
      );
    } else {
      return (
        <SelectTokenPage
          formType={formType}
          navigateBack={() => setPage("main")}
          fromChain={fromChain}
          setFromChain={setFromChain}
          toChain={toChain}
          setToChain={setToChain}
          setFromToken={setFromToken}
          setToToken={setToToken}
        />
      );
    }
  };

  console.log("Selectedroute from Dex component -> ", selectedRoute);
  console.log("Route from Dex component -> ", route);
  console.log("Status -> ", status);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Card>
          <Header>
            <p>Swap</p>
          </Header>
          <InnerCard>{renderCorrectPage()}</InnerCard>
        </Card>
        {openSwapRoutes ? (
          <Card>
            <Header>
              <p>Swap routes</p>
            </Header>
            <InnerCard>
              <SwapRoutesPage
                fromChainId={fromChain}
                fromTokenAddress={fromToken}
                toChainId={toChain}
                toTokenAddress={toToken}
                toAddress={""}
                fromAmount={fromTokenAmount}
                handleSelectRoute={handleSelectRoute}
              />
            </InnerCard>
          </Card>
        ) : null}
      </div>
    </>
  );
}

export default Dex;
