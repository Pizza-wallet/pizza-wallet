import { useERC20Balances, useMoralis } from "react-moralis";
import Table from "./reusable/Table";
import styled from "styled-components";
import { limitDigits } from "../helpers/formatters";

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
`;

function ERC20Balance(props) {
  const { Moralis } = useMoralis();
  const { data: assets } = useERC20Balances(props);

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
        parseFloat(Moralis?.Units?.FromWei(value, 18)).toFixed(7),
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
      balance: "800000000000000000",
      id: "bit",
      type: "chain",
      tokens: [
        {
          type: "token",
          name: "Btc",
          balance: "10000000000000000000",
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
      balance: "600000000000000000",
      type: "chain",
      tokens: [
        {
          type: "token",
          name: "Eth",
          balance: "3000000000000000000",
          logo: "",
          price: 1714.3,
          value: 5142.9,
        },
        {
          type: "token",
          name: "Eth",
          balance: "3000000000000000000",
          logo: "",
          price: 1714.3,
          value: 5142.9,
        },
      ],
    },
  ];

  console.log("assets - ", assets);
  return (
    // <div style={{ width: "65vw", padding: "15px" }}>
    //   <h1>Token Balances</h1>
    //   <Skeleton active loading={!assets}>
    //     <AntDTableStyled
    //       dataSource={assets}
    //       columns={columns}
    //       rowKey={(record) => {
    //         return record.token_address;
    //       }}
    //     />
    //   </Skeleton>
    // </div>
    <div
      style={{
        margin: "0 50px 50px 50px",
        height: "100%",
      }}
    >
      <Table
        tableData={mockData}
        columns={columns}
        tableTitle={"Token"}
        expandableRow={true}
      />
    </div>
  );
}
export default ERC20Balance;
