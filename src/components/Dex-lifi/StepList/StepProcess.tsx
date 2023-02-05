import React from "react";
import type { Process, Step } from "@lifi/sdk";
import { useProcessMessage } from "../../../hooks/useProcessMessage";
import { Spin } from "antd";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const Typography = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 18px;
  line-height: 1.5rem;
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 1.75rem;
`;

export const StepProcess: React.FC<{
  step: Step;
  process: Process;
}> = ({ step, process }) => {
  const { title, message } = useProcessMessage(step, process);
  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {process.status === "STARTED" || process.status === "PENDING" ? (
          <Spin
            size="large"
            style={{ color: "#3e389f", marginRight: "5px" }}
          ></Spin>
        ) : null}
        <Typography>{title}</Typography>
        {process.txLink ? (
          <div
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "flex-end",
            }}
          >
            <a href={process.txLink} target="_blank" rel="noreferrer">
              <FontAwesomeIconStyled icon={faLink} />
            </a>
          </div>
        ) : null}
      </div>
      {message ? <Typography>{message}</Typography> : null}
    </div>
  );
};
