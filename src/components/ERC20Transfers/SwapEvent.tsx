import { useChain } from "../../hooks/useChain";
import { Avatar, Image } from "antd";
import styled from "styled-components";
import { limitDigits, weiToEth } from "../../helpers/formatters";

interface IEvent {
  fromToken: any;
  toToken: any;
  toAmount: any;
  toAmountUSD: any;
  decimals: any;
}

const Flex = styled("div")`
  display: flex;
  justify-content: start;
`;

const SymbolText = styled("p")`
  font-family: "Rubik", sans-serif;
  font-size: 18px;
  color: #000000;
  font-weight: 400;
  line-height: 1.333rem;
  letter-spacing: 0.02em;
  margin-right: 5px;
`;

const DollarAmount = styled("p")`
  font-family: "Rubik", sans-serif;
  font-size: 14px;
  color: grey;
  font-weight: 400;
  line-height: 1.333rem;
  letter-spacing: 0.02em;
`;

export function SwapEvent({
  fromToken,
  toToken,
  toAmount,
  toAmountUSD,
  decimals,
}: IEvent) {
  const { chain: fromChainInfo, isLoading: isChainLoading } = useChain(
    fromToken.chainId,
  );

  const { chain: toChainInfo, isLoading: isChainLoading2 } = useChain(
    toToken.chainId,
  );

  const formattedTokenAmount = weiToEth(toAmount, decimals);

  return (
    <Flex>
      <Avatar.Group>
        <Avatar src={<Image src={fromToken?.logoURI} style={{ width: 32 }} />}>
          {fromToken?.symbol[0]}
        </Avatar>
        <Avatar
          style={{ marginTop: "0.9375rem", zIndex: "1" }}
          size={20}
          src={fromChainInfo?.logoURI}
        />

        <Avatar src={<Image src={toToken?.logoURI} style={{ width: 32 }} />}>
          {toToken?.symbol[0]}
        </Avatar>
        <Avatar
          style={{ marginTop: "0.9375rem", zIndex: "1" }}
          size={20}
          src={toChainInfo?.logoURI}
        />
      </Avatar.Group>
      <div>
        <div
          style={{
            marginLeft: "0.625rem",
            display: "flex",
          }}
        >
          <SymbolText>{limitDigits(Number(formattedTokenAmount))}</SymbolText>
        </div>
        <div
          style={{
            marginLeft: "0.625rem",
            display: "flex",
          }}
        >
          <DollarAmount>${toAmountUSD} USD</DollarAmount>
        </div>
      </div>
    </Flex>
  );
}

export default SwapEvent;
