/* eslint-disable react/no-array-index-key */
import type { EVMChain } from "@lifi/sdk";
import { Avatar, Skeleton, Tooltip, Typography, Card } from "antd";
// import { useWatch } from "react-hook-form";
// import type { SwapFormTypeProps } from "../../providers";
// import { SwapFormKeyHelper } from "../../providers";
// import { maxChainToOrder } from "../../stores";
// import { navigationRoutes } from "../../utils";
import styled from "styled-components";
// import { ChainCard, ChainContainer } from "./ChainSelect.style";
import { useChainSelect } from "./useChainSelect";

const ChainCard = styled("div")`
  position: relative;
  display: grid;
  place-items: center;
  width: 56px;
  height: 52px;
  cursor: pointer;
  border-radius: 12px;
  border: ${(props: { selected?: boolean }) =>
    props.selected ? "1px solid blue" : "1px solid grey"};
  &:hover {
    border: 1px solid black;
    background: rgb(220, 220, 220, 0.8);
  }
`;

const ChainContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridAutoRows: "56px",
  justifyContent: "space-between",
  gap: 1.5,
});

// type SwapFormType = "from" | "to";

interface IChainSelect {
  chainOrder?: any;
  chains?: any;
  getChains?: any;
  isLoading?: any;
  setChainOrder?: any;
  setCurrentChain?: any;
  formType: string;
  chainId: any;
  setChain: any;
}

const maxChainToOrder = 16;

export default function ChainSelect({
  formType,
  chainId,
  setChain,
}: IChainSelect) {
  const {
    // chainOrder,
    chains,
    // getChains,
    isLoading,
    // setChainOrder,
    // setCurrentChain,
  } = useChainSelect(formType);
  // const [chainId] = useWatch({
  //   name: [SwapFormKeyHelper.getChainKey(formType)],
  // });

  // const hasChainInOrderedList = chainOrder.includes(chainId);

  // If we don't have a chain in the ordered chain list we should add it.
  // if (!hasChainInOrderedList) {
  //   setChainOrder(chainId);
  // }

  const showAllChains = () => {
    // show all chains within modal (because user expanded by clicking on button)
  };

  const chainsToHide = (chains?.length ?? 0) - maxChainToOrder;

  return (
    <ChainContainer>
      {isLoading
        ? Array.from({ length: maxChainToOrder + 1 }).map((_, index) => (
            <Skeleton
              key={index}
              // variant="rectangular"
              // width={56}
              // height={56}
              // sx={{ borderRadius: 1 }}
            />
          ))
        : chains?.map((chain: EVMChain) => (
            <Tooltip
              key={chain.id}
              title={chain.name}
              placement="top"
              // enterDelay={400}
              // arrow
            >
              <ChainCard
                onClick={() => setChain(chain.id)}
                selected={chainId === chain.id}
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
        <ChainCard onClick={showAllChains}>
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
