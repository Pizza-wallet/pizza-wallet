import { useRef, useState, useEffect, useMemo, useCallback } from "react";
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
  formType: string;
  setTokenBalance: (x: any) => void;
}

export const TokenList: FC<ITokenList> = ({
  navigateBack,
  setToken,
  selectedChainId,
  tokenSearchFilter,
  formType,
  setTokenBalance,
}) => {
  const parentRef = useRef(null);
  const {
    tokens: chainTokens,
    tokensWithBalance,
    isLoading: isTokensLoading,
    isBalanceLoading,
  } = useTokenBalances(selectedChainId);

  let filteredTokens = useMemo(() => {
    const tokens = (tokensWithBalance ?? chainTokens ?? []) as LIFIToken[];
    const searchFilter = tokenSearchFilter?.toUpperCase() ?? "";
    return tokenSearchFilter
      ? tokens.filter(
          (token) =>
            token.name.toUpperCase().includes(searchFilter) ||
            token.symbol.toUpperCase().includes(searchFilter) ||
            token.address.toUpperCase().includes(searchFilter),
        )
      : tokens;
  }, [tokensWithBalance, chainTokens, tokenSearchFilter]);

  const isLoading = isTokensLoading;

  const [dataForInfiniteScroll, setDataForInfiniteScroll] = useState<
    LIFIToken[]
  >(filteredTokens.slice(0, 50));

  useEffect(() => {
    const tokens = new Set(filteredTokens); // create a Set from the filteredTokens array (to remove any possible duplicates)
    const first50Tokens = Array.from(tokens).slice(0, 50); // convert the Set back to an array and extract the first 50 items
    setDataForInfiniteScroll(first50Tokens);
  }, [filteredTokens]);

  const handleTokenClick = (token: LIFIToken) => {
    const tokenAddress = token.address;
    setToken(tokenAddress);

    // if this is formType - From then check if this tokens chainId is equal to current chain
    // if it isn't then make a call to function to switch the current chain.

    // set more information about the price etc
    const amount = token.amount;
    const priceUSD = token.priceUSD;
    setTokenBalance({ amount, priceUSD });

    navigateBack();
  };

  const fetchMoreData = () => {
    // fetch 50 more tokens from filteredTokens
    const showFiftyTokensMore = dataForInfiniteScroll.length + 50;
    setDataForInfiniteScroll(filteredTokens.slice(0, showFiftyTokensMore));
  };

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
            .filter((token) =>
              formType === "From" ? token.amount !== "0" : true,
            )
            .map((item: LIFIToken, i: number) => {
              const token = item;
              console.log("item - ", token);
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
