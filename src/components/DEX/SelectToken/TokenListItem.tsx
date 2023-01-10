import { Avatar, Skeleton, Typography } from "antd";
import React, { memo } from "react";
import styled from "styled-components";
import { formatTokenPrice } from "../../../helpers/formatters";

const { Text, Title } = Typography;

const ListItem = styled("div")`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background: #e8e8e8;
  }
`;
const ListItemButton = styled("div")`
  width: 100%;
`;

const ListItemSymbol = styled("div")`
  font-weight: bold;
  font-size: 18px;
`;
const ListItemName = styled("div")`
  font-size: 14px;
  color: grey;
`;

const Flex = styled("div")`
  display: flex;
  justify-content: start;
`;

interface ITokenListItem {
  onClick: any;
  token: any;
  showBalance: any;
  isBalanceLoading: any;
}

interface ITokenListItemButton {
  onClick: any;
  token: any;
  showBalance: any;
  isBalanceLoading: any;
}

export const TokenListItem: React.FC<ITokenListItem> = memo(
  ({ onClick, token, showBalance, isBalanceLoading }) => {
    const handleClick = () => onClick?.(token.address);
    return (
      <ListItem>
        <TokenListItemButton
          token={token}
          showBalance={showBalance}
          isBalanceLoading={isBalanceLoading}
          onClick={handleClick}
        />
      </ListItem>
    );
  },
);

export const TokenListItemButton: React.FC<ITokenListItemButton> = ({
  onClick,
  token,
  showBalance,
  isBalanceLoading,
}) => {
  const tokenPrice = formatTokenPrice(token.amount, token.priceUSD);
  console.log("onClick - ", onClick);
  return (
    <ListItemButton onClick={onClick}>
      <>
        <Flex>
          <Avatar src={token.logoURI} alt={token.symbol}>
            {token.symbol[0]}
          </Avatar>

          <div style={{ marginLeft: "10px" }}>
            <ListItemSymbol>{token.symbol}</ListItemSymbol>
            <ListItemName>{token.name}</ListItemName>
          </div>
          {showBalance ? (
            isBalanceLoading ? (
              <TokenAmountSkeleton />
            ) : (
              <div style={{ marginLeft: "auto", height: "30px" }}>
                {Number(token.amount) ? (
                  <Title level={5}>{token.amount}</Title>
                ) : null}
                {tokenPrice ? (
                  <Text style={{ float: "right" }} type="secondary">
                    ${Math.round(token.amount * token.priceUSD)}
                  </Text>
                ) : null}
              </div>
            )
          ) : null}
        </Flex>
      </>
    </ListItemButton>
  );
};

export const TokenListItemSkeleton = () => {
  return (
    <ListItem>
      <Avatar>
        <Skeleton />
      </Avatar>
    </ListItem>
  );
};

export const TokenAmountSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton active />
    </>
  );
};

TokenListItem.displayName = "TokenListItem";
export default TokenListItem;
