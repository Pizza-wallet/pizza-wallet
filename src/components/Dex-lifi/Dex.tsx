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
import { GasSufficiencyMessage } from "./GasSufficiencyMessage";
import PizzawalletModal from "../reusable/PizzawalletModal";
import { useRouteExecution } from "../../hooks/useRouteExecution";
import type { Route } from "@lifi/sdk";
import { getStepList } from "./StepList/StepList";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PoweredByLifi } from "./icons/PoweredByLifi";

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 1.75rem;
  margin-top: 8px;
  color: #3e389f;
  cursor: pointer;
`;

const DexContainer = styled("div")`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function Dex() {
  const [page, setPage] = useState("main");
  const [formType, setFormType] = useState("");

  // Swap From chain and token
  const [fromChain, setFromChain] = useState(1);
  const [fromToken, setFromToken] = useState("");
  const [fromTokenAmount, setFromTokenAmount] = useState<number>(0);
  // Swap To chain and token
  const [toChain, setToChain] = useState(1);
  const [toToken, setToToken] = useState("");

  // Swap route
  const [selectedRoute, setSelectedRoute] = useState<Route>();

  // UI state
  const [openSwapRoutes, setOpenSwapRoutes] = useState(false);

  const { route, status, executeRoute, restartRoute } = useRouteExecution({
    routeId: selectedRoute?.id || "",
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
    setSelectedRoute(undefined);
    setOpenSwapRoutes(true);
    setPage("main");
  };

  const switchFromAndTo = () => {
    const requiredInputsFilled = toChain && fromChain && toToken && fromToken;
    if (requiredInputsFilled) {
      setFromChain(toChain);
      setToChain(fromChain);
      setFromToken(toToken);
      setToToken(fromToken);
    }
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
          <GasSufficiencyMessage
            route={selectedRoute!}
            fromChainId={fromChain}
            fromTokenAddress={fromToken}
            toChainId={toChain}
            toTokenAddress={toToken}
            toAddress={""}
            fromAmount={fromTokenAmount}
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
            restartRoute={restartRoute}
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
      <DexContainer>
        <PizzawalletModal header={"Swap"} logo={<PoweredByLifi />}>
          {renderCorrectPage()}
        </PizzawalletModal>
        {openSwapRoutes && fromToken && toToken && fromTokenAmount ? (
          <div style={{ marginLeft: "0.625rem" }}>
            <PizzawalletModal header={"Swap routes"}>
              <SwapRoutesPage
                fromChainId={fromChain}
                fromTokenAddress={fromToken}
                toChainId={toChain}
                toTokenAddress={toToken}
                toAddress={""}
                fromAmount={fromTokenAmount}
                handleSelectRoute={handleSelectRoute}
              />
            </PizzawalletModal>
          </div>
        ) : null}
      </DexContainer>
    </>
  );
}

export default Dex;
