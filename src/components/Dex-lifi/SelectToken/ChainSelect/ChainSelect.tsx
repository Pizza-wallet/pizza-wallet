/* eslint-disable react/no-array-index-key */
import type { EVMChain } from "@lifi/sdk";
import { Avatar, Skeleton, Tooltip, Typography } from "antd";
import styled from "styled-components";
import { useChains } from "../../../../hooks/useChains";

const ChainCard = styled("div")`
  position: relative;
  display: grid;
  place-items: center;
  width: 56px;
  height: 52px;
  cursor: pointer;
  border-radius: 12px;
  border: ${(props: { selected?: boolean; centerItems?: boolean }) =>
    props.selected ? "1px solid blue" : "1px solid grey"};
  margin: ${(props: { centerItems?: boolean }) =>
    props.centerItems ? "5px" : ""};
  &:hover {
    border: 1px solid black;
    background: rgb(220, 220, 220, 0.8);
  }
`;

const ChainContainer = styled("div")`
  ${(props: { centerItems?: boolean }) =>
    props.centerItems
      ? `
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    `
      : `
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 56px;
    justify-content: space-between;
    gap: 1.5;
    
  `}
`;

interface IChainSelect {
  chainId: number;
  setChain: (x: number) => void;
  centerItems?: boolean;
}

const maxChainToOrder = 16;

export default function ChainSelect({
  chainId,
  setChain,
  centerItems,
}: IChainSelect) {
  const { chains, isLoading } = useChains();
  const chainsToHide = (chains?.length ?? 0) - maxChainToOrder;

  return (
    <ChainContainer centerItems={centerItems}>
      {isLoading
        ? Array.from({ length: maxChainToOrder + 1 }).map((_, index) => (
            <Skeleton key={index} />
          ))
        : chains?.map((chain: EVMChain) => (
            <Tooltip key={chain.id} title={chain.name} placement="top">
              <ChainCard
                onClick={() => setChain(chain.id)}
                selected={chainId === chain.id}
                centerItems={centerItems}
              >
                <Avatar
                  src={chain.logoURI}
                  alt={chain.key}
                  style={{ width: "40px", height: "40px" }}
                >
                  {chain.name[0]}
                </Avatar>
              </ChainCard>
            </Tooltip>
          ))}
      {chainsToHide > 0 ? (
        <ChainCard>
          <div
            style={{
              width: "40px",
              height: "40px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography>+{chainsToHide}</Typography>
          </div>
        </ChainCard>
      ) : null}
    </ChainContainer>
  );
}
