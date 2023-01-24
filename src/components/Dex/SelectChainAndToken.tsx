import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { SelectChainTokenBtn } from "./SelectChainTokenBtn";
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
  handleSelectToken: Dispatch<SetStateAction<string>>;
  setFormType: Dispatch<SetStateAction<string>>;
  fromChain: number;
  toChain: number;
  fromToken: string;
  toToken: string;
}

export const SelectChainAndToken: React.FC<ISelectChainAndToken> = ({
  handleSelectToken,
  setFormType,
  fromChain,
  toChain,
  fromToken,
  toToken,
}) => {
  return (
    <>
      <SelectChainTokenBtn
        handleClick={handleSelectToken}
        setFormType={setFormType}
        formType={"From"}
        chainId={fromChain}
        tokenAddress={fromToken}
      />
      <IconContainer>
        <IconCircle>
          <FontAwesomeIconStyled icon={faExchange} />
        </IconCircle>
      </IconContainer>
      <SelectChainTokenBtn
        handleClick={handleSelectToken}
        setFormType={setFormType}
        formType={"To"}
        chainId={toChain}
        tokenAddress={toToken}
      />
    </>
  );
};
