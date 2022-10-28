import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Table from "../reusable/Table";
import styled from "styled-components";
import { limitDigits } from "../../helpers/formatters";
import { getBalanceAndPriceInformation } from "./balanceMethods/getBalances";
import { useGetTokenListToQuery } from "../../hooks/useGetTokenListToQuery.tsx";
import { CustomImg } from "../reusable/CustomImg";

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: ${(props) => props.width};
`;

function ERC20Balance(props) {
  const { account } = useMoralis();
  const tokenList = useGetTokenListToQuery();
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getBalancesAsync = async () => {
      // get balances with tokenlist and multicall contract
      // get price info with coingecko api
      const userBalances = await getBalanceAndPriceInformation(
        account,
        tokenList,
      );

      setBalances(userBalances);
      setLoading(false);
    };

    if (tokenList && account) {
      getBalancesAsync();
    }
  }, [tokenList, account]);

  const displayChainIconsForToken = (chainIcons) => {
    // Logic to overlap icon images
    let num = 0;
    return chainIcons.map((icon, i) => {
      if (i > 0) {
        num = num - 5;
      }
      return (
        <div key={i} style={{ transform: `translateX(${num}px)` }}>
          <CustomImg
            src={icon}
            height={"1.25rem"}
            width={"1.25rem"}
            borderRadius={"50%"}
            display={"inline-block"}
          />
        </div>
      );
    });
  };

  const columns = [
    {
      title: "Asset",
      dataIndex: "logo",
      key: "logo",
      render: (logo, item) => {
        const isToken = item.type === "token";
        const logoURI = item.logoURI ? item.logoURI : "";
        return (
          <div
            style={{
              display: "flex",
              position: "relative",
              margin: isToken && "auto",
              width: isToken && "50%",
            }}
          >
            <div>
              <AbsoluteImgContainer top={"-0.3125rem"}>
                <img
                  src={
                    logoURI ||
                    "https://etherscan.io/images/main/empty-token.png"
                  }
                  alt="nologo"
                  width="35px"
                  height="35px"
                />
              </AbsoluteImgContainer>
              {isToken ? (
                <AbsoluteImgContainer left={"2.15rem"} top={"0.9375rem"}>
                  <CustomImg
                    src={item.chainLogoUri}
                    height={"1.25rem"}
                    width={"1.25rem"}
                    borderRadius={"50%"}
                  />
                </AbsoluteImgContainer>
              ) : (
                <AbsoluteImgContainer
                  left={"-0.1rem"}
                  top={"2.2rem"}
                  width={"35px"}
                >
                  <div
                    style={{
                      minWidth: "max-content",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {displayChainIconsForToken(item.chainLogoUri)}
                  </div>
                </AbsoluteImgContainer>
              )}
              {!isToken && (
                <div style={{ marginLeft: "2.8125rem" }}>{item.symbol}</div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value) => limitDigits(value),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => `$${limitDigits(value)}`,
    },

    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => `$${limitDigits(value)}`,
    },
  ];

  return (
    <div
      style={{
        margin: "0 3.125rem 3.125rem 3.125rem",
      }}
    >
      <Table
        loading={loading}
        tableData={balances && balances}
        columns={columns}
        tableTitle={"Token"}
        expandableRow={true}
      />
    </div>
  );
}
export default ERC20Balance;
