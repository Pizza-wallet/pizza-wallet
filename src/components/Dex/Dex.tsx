import { useState } from "react";
import styled from "styled-components";
import { SelectChainAndToken } from "./SelectChainAndToken";
import { SelectTokenPage } from "./SelectToken/SelectTokenPage";
import { SwapInput } from "./SwapInput";
import { SwapButton } from "./SwapButton";
import { SwapRoutesPage } from "./SwapRoutes/SwapRoutesPage";

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

  console.log("amount - ", Number(fromTokenAmount));
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
          <InnerCard>
            {page === "main" ? (
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
                  handleChange={(val: number) => setFromTokenAmount(val)}
                  selectedChainId={fromChain}
                />
                <SwapButton />
              </>
            ) : (
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
            )}
          </InnerCard>
        </Card>
        {Number(fromTokenAmount) > 0 ? (
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
              />
            </InnerCard>
          </Card>
        ) : null}
      </div>
    </>
  );
}

export default Dex;
