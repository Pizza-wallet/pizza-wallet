import React from "react";
import { Avatar, Image, Input, Button, InputNumber } from "antd";
import { useToken } from "../../hooks/useToken";
import { useChain } from "../../hooks/useChain";
import { useTokenBalances } from "../../hooks/useTokenBalances";
import styled from "styled-components";

const Text = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
  margin: 10px 0 0.625rem 10px;
`;

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

const StyledInput = styled(InputNumber)`
  font-size: 26px;
  font-weight: 700;
  box-shadow: none;
  color: #3e389f;
  width: 100%;
`;

const StyledMaxButton = styled(Button)`
  font-size: 16px;
  box-shadow: none;
  border: 0.125rem solid #3e389f;
  border-radius: 10px;
  background: none;
  margin-right: 10px;
  margin-left: auto;
  line-height: 1;
  margin-top: 5px;
  color: #3e389f;
  &:hover {
    border: 0.125rem solid #3e389f;
    color: #3e389f;
  }
`;

interface ISwapInput {
  tokenAddress: string;
  chainId: number;
  handleChange: (val: number) => void;
  value: number;
  selectedChainId: number;
}

export const SwapInput = ({
  tokenAddress,
  chainId,
  handleChange,
  value,
  selectedChainId,
}: ISwapInput) => {
  const { chain, isLoading: isChainLoading } = useChain(chainId);
  const { token, isLoading: isTokenLoading } = useToken(chainId, tokenAddress);

  const { tokensWithBalance, isBalanceLoading } =
    useTokenBalances(selectedChainId);

  const maxAmount = !tokenAddress
    ? 0
    : Number(
        tokensWithBalance?.filter((val) => {
          return val.address === tokenAddress;
        })[0].amount,
      );

  return (
    <Card>
      <Text>You pay</Text>
      <Flex>
        {token && chain ? (
          <>
            <Avatar.Group>
              <Avatar
                style={{ marginLeft: "10px" }}
                src={<Image src={token.logoURI} style={{ width: 32 }} />}
              >
                {token.symbol[0]}
              </Avatar>
              <Avatar
                style={{ marginTop: "15px" }}
                size={20}
                src={chain.logoURI}
              />
            </Avatar.Group>
            <StyledInput
              size="small"
              autoComplete="off"
              placeholder="0"
              bordered={false}
              controls={false}
              onChange={(value: any) => handleChange(value)}
              value={value === 0 ? "" : value}
              required
              type="number"
            />
            {/* <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} /> */}
            <StyledMaxButton onClick={() => handleChange(maxAmount)}>
              Max
            </StyledMaxButton>
          </>
        ) : (
          <>
            <Avatar
              style={{
                color: "#f56a00",
                backgroundColor: "#e8e8e8",
                marginLeft: "20px",
              }}
            ></Avatar>
          </>
        )}
      </Flex>
      <div style={{ marginLeft: "60px", color: "grey" }}>
        {token && value > 0 ? (
          <p>${Math.round(value * Number(token.priceUSD))}</p>
        ) : null}
      </div>
    </Card>
  );
};
