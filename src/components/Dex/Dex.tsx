import { useState } from "react";
import styled from "styled-components";
import { SelectChainAndToken } from "./SelectChainAndToken";
import { SelectTokenPage } from "./SelectToken/SelectTokenPage";
import { SwapInput } from "./SwapInput";
import { SwapButton } from "./SwapButton";

const Card = styled("div")`
  width: 28em;
  margin-left: auto;
  margin-right: auto;
  border: 0.125rem solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 2.75rem;
  padding: 0.425rem;
  // height: 633px;
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

  return (
    <>
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
              />
              <SwapInput />
              <SwapButton />
            </>
          ) : (
            <SelectTokenPage
              formType={formType}
              navigateBack={() => setPage("main")}
            />
          )}
        </InnerCard>
      </Card>
    </>
  );
}

export default Dex;
