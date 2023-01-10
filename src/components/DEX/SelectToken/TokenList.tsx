import { useState, useRef } from "react";
import type { FC } from "react";
import type { LIFIToken } from "../../../types/client";
import { useTokenBalances } from "../../../hooks/useTokenBalances";
// import { SwapFormKey, SwapFormKeyHelper, useWallet } from "../../providers";
// import type { Token } from "../../types";
import { List, Spin } from "antd";
import styled from "styled-components";
import { TokenListItem } from "./TokenListItem";

interface ITokenList {
  formType: string;
  navigateBack: any;
}

const CenterLayout = styled("div")`
  display: grid;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  // background: var(--layout-blue);
`;

export const TokenList: FC<ITokenList> = ({ formType, navigateBack }) => {
  const parentRef = useRef(null);
  // const { account } = useWallet();
  // const [selectedChainId] = useWatch({
  //   name: [SwapFormKeyHelper.getChainKey(formType)],
  // });
  // const [tokenSearchFilter]: string[] = useDebouncedWatch(
  //   [SwapFormKey.TokenSearchFilter],
  //   320,
  // );

  console.log("formType -", formType);

  const [selectedChainId, setSelectedChainId] = useState(1);

  const {
    tokens: chainTokens,
    tokensWithBalance,
    isLoading: isTokensLoading,
    isBalanceLoading,
  } = useTokenBalances(selectedChainId);

  let filteredTokens = (tokensWithBalance ?? chainTokens ?? []) as LIFIToken[];
  // const searchFilter = tokenSearchFilter?.toUpperCase() ?? "";
  // filteredTokens = tokenSearchFilter
  //   ? filteredTokens.filter(
  //       (token) =>
  //         token.name.toUpperCase().includes(searchFilter) ||
  //         token.symbol.toUpperCase().includes(searchFilter) ||
  //         token.address.toUpperCase().includes(searchFilter),
  //     )
  //   : filteredTokens;

  // const tokenSearchEnabled =
  //   !isTokensLoading &&
  //   !filteredTokens.length &&
  //   !!tokenSearchFilter &&
  //   !!selectedChainId;

  // const { token: searchedToken, isLoading: isSearchedTokenLoading } =
  //   useTokenSearch(selectedChainId, tokenSearchFilter, tokenSearchEnabled);

  // const isLoading =
  //   isTokensLoading || (tokenSearchEnabled && isSearchedTokenLoading);

  const isLoading = isTokensLoading;

  // const tokens = filteredTokens.length
  //   ? filteredTokens
  //   : searchedToken
  //   ? [searchedToken]
  //   : filteredTokens;

  // const handleTokenClick = useTokenSelect(formType, onClick);
  const handleTokenClick = () => {
    console.log("handle token click!");
    // handle token select with formType (from or to) and navigate back.
    navigateBack();
  };

  console.log("tokens with balance - ", tokensWithBalance);

  if (filteredTokens.length < 1)
    return (
      <CenterLayout>
        <Spin size="large" style={{ color: "#3e389f" }}></Spin>
      </CenterLayout>
    );
  return (
    <div ref={parentRef} style={{ height: 600, overflow: "auto" }}>
      {!filteredTokens.length && !isLoading ? <p>No tokens found</p> : null}
      <List style={{ height: "100%" }}>
        {filteredTokens.map((item: any, i: number) => {
          const token = item;
          return (
            <div key={i}>
              <TokenListItem
                onClick={handleTokenClick}
                key={item.key}
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
