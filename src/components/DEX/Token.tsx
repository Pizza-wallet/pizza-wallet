import React from "react";
import { useChain } from "../../hooks/useChain";
import { Avatar, Image } from "antd";
import styled from "styled-components";
import {
  formatTokenAmount,
  formatTokenPrice,
  limitDigits,
} from "../../helpers/formatters";
import type { Step as StepType } from "@lifi/sdk";
import { LIFIToken } from "../../types/client";

const Flex = styled("div")`
  display: flex;
  justify-content: start;
  justify-content: ${(props: {
    justifyContent?: string;
    marginBottom?: string;
    marginLeft?: string;
  }) => props.justifyContent};

  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
`;

const SymbolText = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 18px;
  font-weight: bold;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
`;

const Text2 = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 13px;
  line-height: 1.5rem;
`;

interface TokenProps {
  token: LIFIToken;
  step?: StepType;
  dense?: boolean;
}

export const Token: React.FC<TokenProps> = ({ token, step, dense }) => {
  const { chain } = useChain(token.chainId);
  const formattedTokenAmount = formatTokenAmount(token.amount, token.decimals);
  const formattedTokenPrice = formatTokenPrice(
    formattedTokenAmount,
    token.priceUSD,
  );
  return (
    <>
      <Flex>
        <Avatar.Group>
          <Avatar
            style={{ marginLeft: "10px" }}
            src={<Image src={token?.logoURI} style={{ width: 32 }} />}
          >
            {token?.symbol[0]}
          </Avatar>
          <Avatar
            style={{ marginTop: "15px" }}
            size={20}
            src={chain?.logoURI}
          />
        </Avatar.Group>
        <div style={{ marginLeft: "10px", display: "flex" }}>
          <div>
            <SymbolText>{formattedTokenAmount}</SymbolText>
            <Text2>${limitDigits(formattedTokenPrice)}</Text2>
          </div>
          {!dense && step ? (
            <Flex marginLeft={"5px"}>
              <div>
                <Avatar
                  src={step.toolDetails.logoURI}
                  alt={step.toolDetails.name}
                  size={"small"}
                >
                  {step.toolDetails.name[0]}
                </Avatar>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  marginTop: "5px",
                  color: "grey",
                }}
              >
                {step.toolDetails.name}
              </p>
            </Flex>
          ) : null}
        </div>
      </Flex>
    </>
  );
};
