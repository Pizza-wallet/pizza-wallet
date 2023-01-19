/* eslint-disable react/no-array-index-key */
import React from "react";
import type { Step as StepType, TokenAmount } from "@lifi/sdk";
import { StepActions } from "../SwapRoutes/StepActions";
import { Token } from "../Token";
import { StepProcess } from "./StepProcess";
import { StepTimer } from "./StepTimer";
import styled from "styled-components";

const Card = styled("div")`
  width: 95%;
  // height: 100px;
  border: 0.125rem solid #3e389f;
  border-radius: 10px;
  // cursor: pointer;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
`;

export const Step: React.FC<{
  step: StepType;
  fromToken?: TokenAmount;
  toToken?: TokenAmount;
  toAddress?: string;
}> = ({ step, fromToken, toToken, toAddress }) => {
  const getCardTitle = () => {
    switch (step.type) {
      case "lifi":
        if (step.includedSteps.every((step) => step.type === "cross")) {
          return "Step bridge";
        }
        if (step.includedSteps.every((step) => step.type === "swap")) {
          return "Swap step";
        }
        return "Swap step and bridge";
      case "swap":
        return "Swap step";
      case "cross":
        return "Bridge step";
      default:
        return "Swap step";
    }
  };

  console.log("to address - ", toAddress);

  return (
    <Card>
      <div
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        <div style={{ marginLeft: "auto" }}>
          <div>{getCardTitle()}</div>
          <div style={{ fontWeight: 500 }}>
            <StepTimer step={step} />
          </div>
        </div>
      </div>
      <div>
        {fromToken ? <Token token={fromToken} /> : null}
        <StepActions _step={step} />
        {step.execution?.process.map((process, index) => (
          <StepProcess key={index} step={step} process={process} />
        ))}

        {toToken ? <Token token={toToken} /> : null}
      </div>
    </Card>
  );
};
