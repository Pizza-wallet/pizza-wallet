import { useChain } from "../../hooks/useChain";
import { useToken } from "../../hooks/useToken";
import { Avatar, Image } from "antd";
import styled from "styled-components";
import { limitDigits, weiToEth } from "../../helpers/formatters";
import EmptyNft from "./icons/nft.svg";

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
  font-style: normal;
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.3125rem;
  letter-spacing: 0.04rem;
  color: #000000;
  margin-right: 0.3125rem;
`;

const DollarAmount = styled("p")`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.0625rem;
  letter-spacing: 0.04rem;
  color: grey;
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

  let readableAmount = weiToEth(value, token?.decimals);

  if (type === "nft") {
    return (
      <Flex>
        {!tokenUri ? (
          <Image
            src={EmptyNft}
            style={{ width: 54, height: 54, borderRadius: "5px" }}
          />
        ) : (
          <Image
            src={tokenUri}
            preview={true}
            onError={() => EmptyNft}
            style={{ width: 54, height: 54, borderRadius: "5px" }}
          />
        )}
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
          src={
            <Image
              src={!token?.logoURI ? EmptyNft : token?.logoURI}
              preview={false}
              style={{ width: 32 }}
            />
          }
          size={"large"}
        >
          {token?.symbol[0]}
        </Avatar>
        <Avatar
          style={{ marginTop: "1.1875rem" }}
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
          <SymbolText>
            {limitDigits(Number(Number.parseFloat(readableAmount).toFixed(4)))}
          </SymbolText>{" "}
          <SymbolText>{token?.symbol}</SymbolText>
        </div>
        <div
          style={{
            marginLeft: "0.625rem",
            display: "flex",
          }}
        >
          <DollarAmount>
            ${limitDigits(Number(readableAmount) * Number(token?.priceUSD))}
          </DollarAmount>
        </div>
      </div>
    </Flex>
  );
}

export default Event;
