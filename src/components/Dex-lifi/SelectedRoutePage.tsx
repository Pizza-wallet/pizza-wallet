import styled from "styled-components";
import { Token } from "./Token";
import { StepActions } from "./SwapRoutes/StepActions";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Route } from "@lifi/sdk";

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 15px;
  color: #3e389f;
`;

const Text = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
  margin: 10px 0 0.625rem 10px;
  font-weight: ${(props: { fontWeight?: string }) => props.fontWeight};
`;

interface ISelectedRoutePage {
  route: Route;
}

export const SelectedRoutePage = ({ route }: ISelectedRoutePage) => {
  const step = route.steps[0];
  const fromToken = { ...route.fromToken, amount: route.fromAmount };
  const toToken = { ...route.toToken, amount: route.toAmount };

  return (
    <>
      <Text fontWeight={"bold"}>Swap and bridge</Text>
      <div style={{ marginTop: "13px" }}>
        <Token token={fromToken} step={step} />
      </div>
      <div style={{ marginTop: "13px" }}>
        <StepActions _step={step} />
      </div>
      <div style={{ display: "flex", margin: "18px" }}>
        <FontAwesomeIconStyled style={{ marginTop: "13px" }} icon={faGasPump} />
        <div style={{ marginLeft: "5px" }}>
          <Text>Estimated gas cost - ${route.gasCostUSD}</Text>
        </div>
      </div>
      <Token token={toToken} step={step} />
    </>
  );
};
