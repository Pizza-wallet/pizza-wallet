import { useRef } from "react";
import type { FC } from "react";
import type { LIFIToken } from "../../../types/client";
import { useTokenBalances } from "../../../hooks/useTokenBalances";
import { List, Spin } from "antd";
import styled from "styled-components";
import { TokenListItem } from "./TokenListItem";

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

  const handleTokenClick = (tokenAddress: string) => {
    setToken(tokenAddress);
    navigateBack();
  };

  if (isLoading)
    return (
      <CenterLayout>
        <Spin size="large" style={{ color: "#3e389f" }}></Spin>
      </CenterLayout>
    );
  return (
    <div ref={parentRef} style={{ height: 600, overflow: "auto" }}>
      {!filteredTokens.length && !isLoading ? <p>No tokens found</p> : null}
      <List style={{ height: "100%" }}>
        {filteredTokens.map((item: LIFIToken, i: number) => {
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
      </List>
    </div>
  );
};
