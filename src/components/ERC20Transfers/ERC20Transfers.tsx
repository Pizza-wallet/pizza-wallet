import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "../../helpers/formatters";
import { getExplorer } from "../../helpers/networks";
import { useERC20Transfers } from "../../hooks/useERC20Transfers";
import Table from "../reusable/Table";

function ERC20Transfers() {
  const { ERC20Transfers, chainId } = useERC20Transfers();
  const { Moralis } = useMoralis();

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
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value: number, item: { decimals: number }) =>
        parseFloat(Moralis.Units.FromWei(value, item.decimals)).toFixed(6),
    },
    {
      title: "Hash",
      dataIndex: "transaction_hash",
      key: "transaction_hash",
      render: (hash: string) => (
        <a
          href={`${getExplorer(chainId ? chainId : "")}tx/${hash}`}
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
          tableData={ERC20Transfers}
          columns={columns}
          tableTitle={"Transactions History"}
        />
      </div>
    </div>
  );
}

export default ERC20Transfers;
