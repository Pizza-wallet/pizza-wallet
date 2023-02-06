import { useChain } from "../../hooks/useChain";
import { useToken } from "../../hooks/useToken";
import { Avatar, Image } from "antd";
import styled from "styled-components";
import { utils } from "ethers";
import BigNumber from "bignumber.js";
import { limitDigits, formatTokenAmount } from "../../helpers/formatters";

interface IEvent {
  chainId: number;
  tokenAddress: string;
  value: string;
  type: string;
  name: string;
  tokenUri: string;
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

export function Event({
  chainId,
  tokenAddress,
  value,
  type,
  name,
  tokenUri,
}: IEvent) {
  const { chain, isLoading: isChainLoading } = useChain(chainId);
  const { token, isLoading: isTokenLoading } = useToken(chainId, tokenAddress);

  // const amount: any = token
  //   ? new BigNumber(value || "0").shiftedBy(-token?.decimals || 0).toFixed()
  //   : "0";
  const amount = token ? Number(value) ** token.decimals : 0;

  let ethValue: any = token ? utils.formatEther(value) : 0;

  // const priceUsd = token
  //   ? Number(value) ** token.decimals * Number(token.priceUSD)
  //   : 0;

  // console.log("priceUsd - ", priceUsd);

  // ethValue = Math.round(ethValue * 1e6) / 1e6;
  // ethValue = truncate(ethValue, 4);

  if (type === "nft") {
    return (
      <Flex>
        <Image
          src={tokenUri}
          style={{ width: 54, height: 54, borderRadius: "5px" }}
        />
        <Avatar
          style={{ marginTop: "2.4rem", marginLeft: "-8px" }}
          size={20}
          src={chain?.logoURI}
        />

        <div>
          <div
            style={{
              marginLeft: "0.625rem",
            }}
          >
            <SymbolText>#{value.substring(0, 4)}</SymbolText>
          </div>
          <div
            style={{
              marginLeft: "0.625rem",
            }}
          >
            <DollarAmount>{name}</DollarAmount>
          </div>
        </div>
      </Flex>
    );
  }

  return (
    <Flex>
      <Avatar.Group>
        <Avatar
          style={{ marginLeft: "0.625rem" }}
          src={<Image src={token?.logoURI} style={{ width: 32 }} />}
          size={"large"}
        >
          {token?.symbol[0]}
        </Avatar>
        <Avatar
          style={{ marginTop: "0.9375rem" }}
          size={20}
          src={chain?.logoURI}
        />
      </Avatar.Group>
      <div>
        <div
          style={{
            marginLeft: "0.625rem",
            display: "flex",
          }}
        >
          <SymbolText>{ethValue}</SymbolText>{" "}
          <SymbolText>{token?.symbol}</SymbolText>
        </div>
        <div
          style={{
            marginLeft: "0.625rem",
            display: "flex",
          }}
        >
          <DollarAmount>$1290 USD</DollarAmount>
        </div>
      </div>
    </Flex>
  );
}

export default Event;
