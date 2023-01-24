import React from "react";
import type { LifiStep, Step as StepType } from "@lifi/sdk";
import { Typography, Avatar, Steps } from "antd";
import { useChains } from "../../../hooks/useChains";
import { LiFiToollogo } from "../icons/LiFiToolLogo";
import { formatTokenAmount } from "../../../helpers/formatters";
import styled from "styled-components";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Step: AntStep } = Steps;

const Flex = styled("div")`
  display: flex;
  justify-content: start;
  justify-content: ${(props: {
    justifyContent?: string;
    marginTop?: string;
    marginLeft?: string;
  }) => props.justifyContent};

  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 10px;
  color: #3e389f;
  margin: 5px;
`;

interface IStepActionsProps {
  _step: StepType;
}

export const StepActions: React.FC<IStepActionsProps> = ({ _step }) => {
  const step = _step as LifiStep;
  return (
    <div>
      <div style={{ marginLeft: "10px", display: "flex" }}>
        <Avatar
          src={_step.type !== "lifi" ? _step.toolDetails.logoURI : undefined}
          alt={_step.toolDetails.name}
        >
          {_step.type === "lifi" ? <LiFiToollogo /> : _step.toolDetails.name[0]}
        </Avatar>
        <Typography style={{ marginTop: "10px", marginLeft: "5px" }}>
          {_step.type === "lifi"
            ? "LI.FI Smart Contract"
            : _step.toolDetails.name}
        </Typography>
      </div>

      <div style={{ marginLeft: "20px" }}>
        <Steps
          direction="vertical"
          progressDot
          current={step.includedSteps.length}
        >
          {step.includedSteps.map((step: any, index: number) => (
            <AntStep
              key={index}
              title={step.name}
              description={<StepDetailsContent step={step} />}
            />
          ))}
        </Steps>
      </div>
    </div>
  );
};

export const StepDetailsContent: React.FC<{ step: StepType }> = ({ step }) => {
  return (
    <>
      <div style={{ marginTop: "6px" }}>
        {step.type === "cross" || step.type === "lifi" ? (
          <CrossStepDetailsLabel step={step} />
        ) : (
          <SwapStepDetailsLabel step={step} />
        )}
      </div>
      <Flex marginTop={"6px"}>
        <p style={{ fontSize: "12px" }}>
          {formatTokenAmount(
            step.estimate.fromAmount,
            step.action.fromToken.decimals,
          )}
          {step.action.fromToken.symbol}
        </p>

        <FontAwesomeIconStyled icon={faArrowRight} />
        <p style={{ fontSize: "12px" }}>
          {formatTokenAmount(
            step.execution?.toAmount ?? step.estimate.toAmount,
            step.execution?.toToken?.decimals ?? step.action.toToken.decimals,
          )}
          {step.execution?.toToken?.symbol ?? step.action.toToken.symbol}
        </p>
      </Flex>
    </>
  );
};

export const CrossStepDetailsLabel: React.FC<{ step: StepType }> = ({
  step,
}) => {
  // const { t } = useTranslation();
  const { getChainById } = useChains();
  return (
    <Typography>
      Bridge from {getChainById(step.action.fromChainId)?.name} to{" "}
      {getChainById(step.action.toChainId)?.name} via {step.toolDetails.name}
    </Typography>
  );
};

export const SwapStepDetailsLabel: React.FC<{ step: StepType }> = ({
  step,
}) => {
  const { getChainById } = useChains();
  return (
    <Typography>
      Swap on {getChainById(step.action.fromChainId)?.name} via{" "}
      {step.toolDetails.name}
    </Typography>
  );
};
