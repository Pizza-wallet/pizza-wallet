import React from "react";
import styled from "styled-components";
import { SelectTokenButton } from "./SelectTokenButton";
import { faExchange } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconContainer = styled("div")`
  position: relative;
  width: 95%;
  margin: auto;
`;

const IconCircle = styled("div")`
  z-index: 2;
  position: absolute;
  cursor: pointer;
  left: 42%;
  top: -10px;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  border: 1px solid #3e389f;
  background-color: #f8f2ed;
  text-align: center;
  &:hover {
    background: #e8e8e8;
  }
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 1.75rem;
  rotate: 90deg;
  margin-top: 8px;
  color: #3e389f;
`;

interface ISelectChainAndToken {
  handleSelectToken: any;
  setFormType: any;
}

export const SelectChainAndToken: React.FC<ISelectChainAndToken> = ({
  handleSelectToken,
}) => {
  return (
    <>
      <SelectTokenButton handleClick={handleSelectToken} formType={"from"} />
      <IconContainer>
        <IconCircle>
          <FontAwesomeIconStyled icon={faExchange} />
        </IconCircle>
      </IconContainer>
      <SelectTokenButton handleClick={handleSelectToken} formType={"to"} />
    </>
  );
};
