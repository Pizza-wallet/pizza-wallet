import { useEffect } from "react";
import { useERC20Balances, useMoralis } from "react-moralis";
import Table from "./reusable/Table";
import styled from "styled-components";
import { limitDigits } from "../helpers/formatters";
import { getBalances } from "../balances/getBalances";
import { useGetTokenListToQuery } from "../hooks/useGetTokenListToQuery.tsx";

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
`;

function ERC20Balance(props) {
  const { Moralis, account } = useMoralis();
  const { data: assets } = useERC20Balances(props);
  const tokenList = useGetTokenListToQuery();

  useEffect(() => {
    console.log("calling useEffect!");
    const getBalancesAsync = async () => {
      const balances = await getBalances(account, tokenList.ethereum);
      const balancesAboveZero = balances.filter(
        (token) => token.amount !== "0",
      );
      console.log("balances - ", balancesAboveZero);
    };

    if (tokenList && account) {
      getBalancesAsync();
    }
  }, [tokenList, account]);

  const columns = [
    {
      title: "Asset",
      dataIndex: "logo",
      key: "logo",
      render: (logo, item) => {
        const isToken = item.type === "token";
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
              <AbsoluteImgContainer>
                <img
                  src={
                    logo || "https://etherscan.io/images/main/empty-token.png"
                  }
                  alt="nologo"
                  width="28px"
                  height="28px"
                />
              </AbsoluteImgContainer>
              <div style={{ marginLeft: "1.875rem" }}>{item.name}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value) =>
        parseFloat(Moralis?.Units?.FromWei(value.toString(), 18)).toFixed(7),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => limitDigits(7, value),
    },

    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => limitDigits(7, value),
    },
  ];

  const mockData = [
    {
      name: "BTC",
      logo: "",
      price: 6,
      value: 60000,
      balance: 800000000000000000,
      id: "bit",
      type: "chain",
      tokens: [
        {
          type: "token",
          name: "Btc",
          balance: 10000000000000000000,
          logo: "",
          price: 1781520,
          value: 0.5,
        },
      ],
    },
    {
      name: "ETH",
      id: "eth",
      price: 1714.3,
      value: 15428.7,
      balance: 600000000000000000,
      type: "chain",
      tokens: [
        {
          type: "token",
          name: "Eth",
          balance: 3000000000000000000,
          logo: "",
          price: 1714.3,
          value: 5142.9,
        },
        {
          type: "token",
          name: "Eth",
          balance: 3000000000000000000,
          logo: "",
          price: 1714.3,
          value: 5142.9,
        },
      ],
    },
  ];

  const sumBalanceAndValuesForChains = (data) => {
    return data.map((chain) => {
      return {
        ...chain,
        balance: chain.tokens.reduce((acc, obj) => (acc += obj.balance), 0),
        value: chain.tokens.reduce((acc, obj) => (acc += obj.value), 0),
      };
    });
  };

  console.log("assets - ", assets);

  return (
    <div
      style={{
        margin: "0 3.125rem 3.125rem 3.125rem",
      }}
    >
      <Table
        tableData={sumBalanceAndValuesForChains(mockData)}
        columns={columns}
        tableTitle={"Token"}
        expandableRow={true}
      />
    </div>
  );
}
export default ERC20Balance;
