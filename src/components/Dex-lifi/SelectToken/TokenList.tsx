import { useRef, useState, useEffect } from "react";
import type { FC } from "react";
import type { LIFIToken } from "../../../types/client";
import { useTokenBalances } from "../../../hooks/useTokenBalances";
import { List, Spin } from "antd";
import styled from "styled-components";
import { TokenListItem } from "./TokenListItem";
import InfiniteScroll from "react-infinite-scroll-component";

const CenterLayout = styled("div")`
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

interface ITokenList {
  navigateBack: () => void;
  setToken: (x: string) => void;
  selectedChainId: number;
  tokenSearchFilter: string;
}

export const TokenList: FC<ITokenList> = ({
  navigateBack,
  setToken,
  selectedChainId,
  tokenSearchFilter,
}) => {
  const parentRef = useRef(null);
  const {
    tokens: chainTokens,
    tokensWithBalance,
    isLoading: isTokensLoading,
    isBalanceLoading,
  } = useTokenBalances(selectedChainId);

  let filteredTokens = (tokensWithBalance ?? chainTokens ?? []) as LIFIToken[];
  const searchFilter = tokenSearchFilter?.toUpperCase() ?? "";
  filteredTokens = tokenSearchFilter
    ? filteredTokens.filter(
        (token) =>
          token.name.toUpperCase().includes(searchFilter) ||
          token.symbol.toUpperCase().includes(searchFilter) ||
          token.address.toUpperCase().includes(searchFilter),
      )
    : filteredTokens;

  const isLoading = isTokensLoading;

  const [dataForInfiniteScroll, setDataForInfiniteScroll] = useState<
    LIFIToken[]
  >(filteredTokens.slice(0, 50));

  useEffect(() => {
    // Set tokens when filter changes
    setDataForInfiniteScroll(filteredTokens.slice(0, 50));
  }, [filteredTokens]);

  const handleTokenClick = (tokenAddress: string) => {
    setToken(tokenAddress);
    navigateBack();
  };

  const fetchMoreData = () => {
    // fetch 50 more tokens from filteredTokens
    const showFiftyTokensMore = dataForInfiniteScroll.length + 50;
    setDataForInfiniteScroll(filteredTokens.slice(0, showFiftyTokensMore));
  };

  console.log(
    "tokens with balance - ",
    tokensWithBalance?.filter((token) => token.amount !== "0"),
  );

  if (isLoading)
    return (
      <CenterLayout>
        <Spin size="large" style={{ color: "#3e389f" }}></Spin>
      </CenterLayout>
    );
  return (
    <div
      ref={parentRef}
      id="scrollableDiv"
      style={{ height: 280, overflow: "auto" }}
    >
      {!filteredTokens.length && !isLoading ? <p>No tokens found</p> : null}
      <InfiniteScroll
        dataLength={dataForInfiniteScroll.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<></>}
        scrollableTarget="scrollableDiv"
      >
        {dataForInfiniteScroll &&
          dataForInfiniteScroll
            .filter((token) => token.amount !== "0")
            .map((item: LIFIToken, i: number) => {
              const token = item;
              return (
                <div key={i}>
                  <TokenListItem
                    onClick={handleTokenClick}
                    token={token}
                    isBalanceLoading={isBalanceLoading}
                    showBalance={true}
                  />
                </div>
              );
            })}
      </InfiniteScroll>
    </div>
  );
};
