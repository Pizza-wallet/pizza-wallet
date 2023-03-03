import { Avatar, Image, Button, InputNumber } from "antd";
import { useToken } from "../../hooks/useToken";
import { useChain } from "../../hooks/useChain";
import { useTokenBalances } from "../../hooks/useTokenBalances";
import { PizzaWalletCard } from "../reusable/PizzaWalletCard";
import styled from "styled-components";

const Text = styled("p")`
  color: #000000;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
  margin: 10px 0 0.625rem 10px;
`;

const Flex = styled("div")`
  display: flex;
  justify-content: start;
`;

const StyledInput = styled(InputNumber)`
  font-size: 26px;
  font-weight: 700;
  box-shadow: none;
  color: #000000;
  width: ${({ width }: { width: string }) => width};
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
    <PizzaWalletCard height={"115px"}>
      <Text>Amount</Text>
      <Flex>
        <>
          {token && chain ? (
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
          ) : (
            <Avatar.Group>
              <Avatar
                style={{
                  marginLeft: "10px",
                  color: "#f56a00",
                  backgroundColor: "#e8e8e8",
                }}
              ></Avatar>
              <Avatar
                style={{
                  marginTop: "15px",
                  color: "#f56a00",
                  backgroundColor: "#e8e8e8",
                }}
                size={20}
              />
            </Avatar.Group>
          )}
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
            width={"100%"}
          />
          {/* <InputNumber min={1} max={10} defaultValue={3} onChange={onChange} /> */}
          <StyledMaxButton onClick={() => handleChange(maxAmount)}>
            Max
          </StyledMaxButton>
        </>
      </Flex>
      <div
        style={{
          marginLeft: "60px",
          color: "grey",
          position: "absolute",
          bottom: "10px",
        }}
      >
        {token && value > 0 ? (
          <p>${Math.round(value * Number(token.priceUSD))}</p>
        ) : (
          <p>$0</p>
        )}
      </div>
    </PizzaWalletCard>
  );
};
