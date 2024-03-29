import { useMoralis, useERC20Balances } from "react-moralis";
import Table from "./reusable/Table";

function ERC20Balance(props) {
  const { data: assets } = useERC20Balances(props);
  const { Moralis } = useMoralis();

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
            width="1.75rem"
            height="1.75rem"
          />
          <div style={{ marginLeft: "0.625rem", marginTop: "0.3125rem" }}>
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

  return (
    <div
      style={{
        margin: "0 3.125rem 3.125rem 3.125rem",
      }}
    >
      <Table tableData={assets} columns={columns} tableTitle={"Token"} />
    </div>
  );
}
export default ERC20Balance;
