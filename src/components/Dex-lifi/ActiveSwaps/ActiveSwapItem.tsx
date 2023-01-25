import React from "react";
import { useRouteExecution } from "../../../hooks/useRouteExecution";
import { useProcessMessage } from "../../../hooks/useProcessMessage";
import { RouteExecutionStatus } from "../../../stores";
import { StepTimer } from "../StepList/StepTimer";
import { Token } from "../Token";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import type { Route } from "@lifi/sdk";

const Typography = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: ${(props: { fontSize?: string }) => props.fontSize};
  line-height: 1.5rem;
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 10px;
  color: #3e389f;
  margin: 5px;
`;

interface IActiveSwapItem {
  routeId: string;
  setSelectedRoute?: (val: Route) => void;
  setPage?: (val: string) => void;
}

export const ActiveSwapItem: React.FC<IActiveSwapItem> = ({
  routeId,
  setSelectedRoute,
  setPage,
}) => {
  const { route, status } = useRouteExecution({
    routeId,
    executeInBackground: true,
  });

  // TODO: replace with ES2023 findLast
  const lastActiveStep = route?.steps
    .slice()
    .reverse()
    .find((step) => step.execution);
  const lastActiveProcess = lastActiveStep?.execution?.process.at(-1);

  const { title } = useProcessMessage(lastActiveStep, lastActiveProcess);

  if (!route || !lastActiveStep) {
    return null;
  }

  const handleClick = () => {
    // you need to change state in main component so this is the active swap
    // navigate(navigationRoutes.swapExecution, { state: { routeId } });
    // and also navigate to the correct page
    if (setSelectedRoute && setPage) {
      setSelectedRoute(route);
      setPage("selectedRoute");
    }
  };

  const getStatusComponent = () => {
    switch (lastActiveProcess?.status) {
      case "ACTION_REQUIRED":
        return <p>Action required</p>;
      case "FAILED":
        return <p>Error</p>;
      default:
        return (
          <Typography>
            <StepTimer step={lastActiveStep} hideInProgress />
          </Typography>
        );
    }
  };

  return (
    <div style={{ marginTop: "20px" }} onClick={handleClick}>
      <div style={{ display: "flex" }}>
        <Token
          token={{ ...route.fromToken, amount: "" }}
          step={lastActiveStep}
          dense={true}
        />
        <Token
          token={{ ...route.toToken, amount: "" }}
          step={lastActiveStep}
          dense={true}
        />
      </div>

      <div style={{ marginTop: "20px", paddingLeft: "10px" }}>
        <Typography
          fontSize={"14px"}
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 2,
            height: 16,
          }}
        >
          {route.fromToken.symbol}
          <FontAwesomeIconStyled icon={faArrowRight} />
          {route.toToken.symbol}
        </Typography>
        {status !== RouteExecutionStatus.Done ? (
          <Typography fontSize={"14px"}>Status: {title}</Typography>
        ) : null}
      </div>
      {getStatusComponent()}
    </div>
  );
};
