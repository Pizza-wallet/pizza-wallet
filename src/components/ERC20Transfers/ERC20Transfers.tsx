import { getEllipsisTxt } from "../../helpers/formatters";
import { getExplorer } from "../../helpers/networks";
import "antd/dist/antd.css";
import Table from "../reusable/Table";

function ERC20Transfers() {

  const columns = [
    {
      title: "Token",
      dataIndex: "address",
      key: "address",
      render: (token: string) => getEllipsisTxt(token, 8),
    },
    {
      title: "From",
      dataIndex: "from_address",
      key: "from_address",
      render: (from: string) => getEllipsisTxt(from, 8),
    },
    {
      title: "To",
      dataIndex: "to_address",
      key: "to_address",
      render: (to: string) => getEllipsisTxt(to, 8),
    },
    //{
    //  title: "Value",
    //  dataIndex: "value",
    //  key: "value",
    //  render: (value: number, item: { decimals: number }) =>
        // todo: replace moralis unit conversion with ethers
    //  parseFloat(Moralis.Units.FromWei(value, item.decimals)).toFixed(6),
    //},
    {
      title: "Hash",
      dataIndex: "transaction_hash",
      key: "transaction_hash",
      render: (hash: string) => (
        <a
          //href={`${getExplorer(chainId ? chainId : "")}tx/${hash}`}
          target="_blank"
          rel="noreferrer"
        >
          View Transaction
        </a>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          margin: "0 3.125rem 3.125rem 3.125rem",
          height: "100%",
        }}
      >
        <Table
          loading={!ERC20Transfers}
          tableData={ERC20Transfers}
          columns={columns}
          tableTitle={"Transactions History"}
          expandableRow={false}
        />
      </div>
    </div>
  );
}

export default ERC20Transfers;
