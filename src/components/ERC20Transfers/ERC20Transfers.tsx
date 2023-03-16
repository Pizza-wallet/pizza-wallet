import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import Table from "../reusable/Table";
import { TransferColumns } from "./TransferColumns";
import styled from "styled-components";

interface INft {
  amount: string;
  block_number: string;
  block_number_minted: string;
  chainId: number;
  contract_type: string;
  last_metadata_sync: any;
  last_token_uri_sync: string;
  timeStamp: string;
  metadata: any;
  minter_address: string;
  name: string;
  owner_of: string;
  symbol: string;
  token_address: string;
  token_hash: string;
  token_id: string;
  token_uri: string;
}

interface ITransaction {
  blockHash: string;
  blockNumber: string;
  chainId: number;
  confirmations: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  hash: string;
  input: string;
  nonce: string;
  timeStamp: string;
  to: string;
  tokenDecimal: string;
  tokenName: string;
  tokenSymbol: string;
  transactionIndex: string;
  value: string;
}

const TableContainer = styled("div")`
  margin-left: auto;
  margin-right: auto;
  min-width: 1010px;
  max-width: 1084px;
`;

function ERC20Transfers({ transferHistory }: { transferHistory: any }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(transferHistory.length ? false : true);
  }, [transferHistory]);

  return (
    <div>
      <TableContainer>
        <Table
          tableData={transferHistory}
          columns={TransferColumns}
          tableTitle={"History"}
          expandableRow={false}
          loading={loading}
        />
      </TableContainer>
    </div>
  );
}

export default ERC20Transfers;
