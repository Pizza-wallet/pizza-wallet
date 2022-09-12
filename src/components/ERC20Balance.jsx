import { useERC20Balances } from "react-moralis";
import Table from "./reusable/Table";
import styled from "styled-components";

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
`;

function ERC20Balance(props) {
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
      // render: (value, item) =>
      //   parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
      render: (value) => value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => price,
    },

    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => value,
    },
  ];

  const mockData = [
    {
      name: "BTC",
      logo: "",
      price: 9028,
      value: 8028,
      balance: 3,
      id: "bit",
      type: "chain",
      tokens: [
        {
          type: "token",
          name: "Btc",
          balance: 3,
          logo: "",
          price: 20000,
          value: 60000,
        },
      ],
    },
    {
      name: "ETH",
      id: "eth",
      price: 900,
      value: 5000,
      balance: 6,
      type: "chain",
      tokens: [
        {
          type: "token",
          name: "Eth",
          balance: 2,
          logo: "",
          price: 2000,
          value: 4000,
        },
        {
          type: "token",
          name: "Eth",
          balance: 4,
          logo: "",
          price: 0.5,
          value: 100,
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
