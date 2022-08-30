import { useERC20Balances } from "react-moralis";
// import { Skeleton, Table } from "antd";
// import { getEllipsisTxt } from "../helpers/formatters";
import Table from "./reusable/Table";
import styled from "styled-components";

const CustomTableData = styled("div")`
  position: ${(props) => (props.type ? "absolute" : "relative")};
  margin-left: ${(props) => (props.type ? "10px" : "0")};
  padding-left: ${(props) => (props.type ? "80px" : "0")};
  border-left: ${(props) => (props.type ? "1px solid black" : "0")};
  display: flex;

  ${(props) =>
    props.type &&
    ` &:before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40%;
    border-top: 1px solid black;
  }`}
`;

function ERC20Balance(props) {
  const { data: assets } = useERC20Balances(props);
  // const { Moralis } = useMoralis();

  const columns = [
    {
      title: "Asset",
      dataIndex: "logo",
      key: "logo",
      render: (logo, item) => (
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <CustomTableData type={item.type === "token"}>
            <img
              src={logo || "https://etherscan.io/images/main/empty-token.png"}
              alt="nologo"
              width="28px"
              height="28px"
            />
            <div style={{ marginLeft: "10px", marginTop: "5px" }}>
              {item.name}
            </div>
          </CustomTableData>
        </div>
      ),
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
      name: "Bitcoin",
      logo: "",
      price: 9028,
      value: 8028,
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
      name: "Ethereum",
      id: "eth",
      price: 900,
      value: 5000,
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
          name: "BAT",
          balance: 200,
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
