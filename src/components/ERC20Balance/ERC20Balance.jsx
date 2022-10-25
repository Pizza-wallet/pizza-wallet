import { useEffect, useState } from "react";
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
  left: ${(props) => props.left};
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
    return chainIcons.map((icon) => (
      <CustomImg src={icon} height={"1.25rem"} width={"1.25rem"} />
    ));
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
                  width="28px"
                  height="28px"
                />
              </AbsoluteImgContainer>
              {isToken ? (
                <AbsoluteImgContainer left={"1.75rem"} top={"0.9375rem"}>
                  <CustomImg
                    src={item.chainLogoUri}
                    height={"1.25rem"}
                    width={"1.25rem"}
                  />
                </AbsoluteImgContainer>
              ) : (
                <AbsoluteImgContainer left={"-0.3125rem"} top={"1.5625rem"}>
                  <div style={{ display: "flex" }}>
                    {displayChainIconsForToken(item.chainLogoUri)}
                  </div>
                </AbsoluteImgContainer>
              )}
              {!isToken && (
                <div style={{ marginLeft: "1.875rem" }}>{item.name}</div>
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
      render: (value) => limitDigits(7, value),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => value,
    },

    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => limitDigits(7, value),
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
