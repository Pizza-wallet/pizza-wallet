import React from "react";
import styled from "styled-components";
import { Avatar, Image } from "antd";
import { useChain } from "../../../hooks/useChain";
import { useToken } from "../../../hooks/useToken";

const Card = styled("div")`
  width: 95%;
  height: 115px;
  border: 0.125rem solid #3e389f;
  border-radius: 10px;
  cursor: pointer;
  margin: auto;
  margin-top: 30px;
`;

const Flex = styled("div")`
  display: flex;
  justify-content: start;
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

interface ISwapRouteCard {
  toToken: any;
  toAmount: any;
}

export const SwapRouteCard: React.FC<ISwapRouteCard> = ({
  toToken,
  toAmount,
}) => {
  const { chain } = useChain(toToken.chainId);
  const { token, isLoading } = useToken(toToken.chainId, toToken.address);
  return (
    <Card>
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
        <div style={{ marginLeft: "10px" }}>
          <SymbolText>{token?.symbol}</SymbolText>
          <Text2>On {chain?.name}</Text2>
        </div>
      </Flex>
      <p style={{ fontWeight: "bold" }}>{toAmount}</p>
    </Card>
  );
};
