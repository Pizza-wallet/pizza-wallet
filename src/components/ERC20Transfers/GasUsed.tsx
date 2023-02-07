import { useChain } from "../../hooks/useChain";
import { useToken } from "../../hooks/useToken";
import { Avatar, Image } from "antd";
import styled from "styled-components";
import { limitDigits, weiToEth } from "../../helpers/formatters";

interface IGasUsed {
  chainId: number;
  tokenAddress: string;
  gasUsed: any;
}

const StyledP = styled("p")`
  font-family: "Rubik", sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0.04em;
  margin-left: 40px;
`;

export function GasUsed({ chainId, tokenAddress, gasUsed }: IGasUsed) {
  const { chain, isLoading: isChainLoading } = useChain(chainId);
  const { token, isLoading: isTokenLoading } = useToken(chainId, tokenAddress);

  let gasAmount = weiToEth(gasUsed, token?.decimals);
  // let gasUsedInDollars = limitDigits(
  //   Number(gasAmount) * Number(token?.priceUSD),
  // );
  let gasUsedInDollars = limitDigits(
    Number(Number.parseFloat(gasAmount).toFixed(4)),
  );
  return (
    <>
      <StyledP>${gasUsedInDollars} gas fee</StyledP>
    </>
  );
}

export default GasUsed;
