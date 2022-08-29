import { useMoralis, useERC20Balances } from "react-moralis";
// import { Skeleton, Table } from "antd";
// import { getEllipsisTxt } from "../helpers/formatters";
import Table from "./reusable/Table";

function ERC20Balance(props) {
  const { data: assets } = useERC20Balances(props);
  const { Moralis } = useMoralis();

  // const columns = [
  //   {
  //     title: "",
  //     dataIndex: "logo",
  //     key: "logo",
  //     render: (logo) => (
  //       <img
  //         src={logo || "https://etherscan.io/images/main/empty-token.png"}
  //         alt="nologo"
  //         width="28px"
  //         height="28px"
  //       />
  //     ),
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //     render: (name) => name,
  //   },
  //   {
  //     title: "Symbol",
  //     dataIndex: "symbol",
  //     key: "symbol",
  //     render: (symbol) => symbol,
  //   },
  //   {
  //     title: "Balance",
  //     dataIndex: "balance",
  //     key: "balance",
  //     render: (value, item) =>
  //       parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
  //   },
  //   {
  //     title: "Address",
  //     dataIndex: "token_address",
  //     key: "token_address",
  //     render: (address) => getEllipsisTxt(address, 5),
  //   },
  // ];

  const columns = [
    {
      title: "Asset",
      dataIndex: "logo",
      key: "logo",
      render: (logo, item) => (
        <div style={{ display: "flex" }}>
          <img
            src={logo || "https://etherscan.io/images/main/empty-token.png"}
            alt="nologo"
            width="28px"
            height="28px"
          />
          <div style={{ marginLeft: "10px", marginTop: "5px" }}>
            {item.name}
          </div>
        </div>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value, item) =>
        parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
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
      }}
    >
      <Table tableData={assets} columns={columns} tableTitle={"Token"} />
    </div>
  );
}
export default ERC20Balance;
