import { useState } from "react";
import styled from "styled-components";
import { SelectChainAndToken } from "./SelectChainAndToken";
import { SelectTokenPage } from "./SelectToken/SelectTokenPage";
import { SwapInput } from "./SwapInput";
import { SwapButton } from "./SwapButton";
import { SwapRoutesPage } from "./SwapRoutes/SwapRoutesPage";
import { SelectedRoutePage } from "./SelectedRoutePage";
import { ActiveSwapsExpanded } from "./ActiveSwaps/ActiveSwapsExpanded";
import { ActiveSwaps } from "./ActiveSwaps/ActiveSwaps";
import { useRouteExecution } from "../../hooks/useRouteExecution";
import type { Route } from "@lifi/sdk";
import { getStepList } from "./StepList/StepList";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 1.75rem;
  margin-top: 8px;
  color: #3e389f;
  cursor: pointer;
`;

function Dex() {
  const [page, setPage] = useState("main");
  const [formType, setFormType] = useState("");

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

  const handleSelectRoute = (route: Route) => {
    setSelectedRoute(route);
    setOpenSwapRoutes(false);
    setPage("selectedRoute");
  };

  const handleSetFromTokenAmount = (val: number) => {
    setFromTokenAmount(val);
    setOpenSwapRoutes(true);
  };

  const executeSwap = () => {
    if (route) {
      executeRoute();
    }
  };

  const openMainPageAndSwapRoutes = () => {
    setOpenSwapRoutes(true);
    setPage("main");
  };

  const switchFromAndTo = () => {
    setFromChain(toChain);
    setToChain(fromChain);
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const renderCorrectPage = () => {
    if (page === "main") {
      return (
        <>
          <ActiveSwaps navigate={setPage} />
          <SelectChainAndToken
            handleSelectToken={setPage}
            setFormType={setFormType}
            fromChain={fromChain}
            toChain={toChain}
            fromToken={fromToken}
            toToken={toToken}
            switchFromAndTo={switchFromAndTo}
          />
          <SwapInput
            tokenAddress={fromToken}
            chainId={fromChain}
            value={fromTokenAmount}
            handleChange={(val: number) => handleSetFromTokenAmount(val)}
            selectedChainId={fromChain}
          />
          <SwapButton page={page} onClick={() => {}} navigateBack={() => {}} />
        </>
      );
    } else if (page === "selectedRoute") {
      return (
        <>
          <div style={{ display: "inline-block" }}>
            <FontAwesomeIconStyled
              onClick={
                !status ? openMainPageAndSwapRoutes : () => setPage("main")
              }
              icon={faArrowLeft}
            />
          </div>
          {!status && selectedRoute && (
            <SelectedRoutePage route={selectedRoute} />
          )}
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
    } else if (page === "activeSwapsPage") {
      return (
        <ActiveSwapsExpanded
          setPage={setPage}
          setSelectedRoute={setSelectedRoute}
        />
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
