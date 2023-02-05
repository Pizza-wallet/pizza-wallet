import { useState, useEffect } from "react";
//import { getEllipsisTxt } from "../../helpers/formatters";
//import { getExplorer } from "../../helpers/networks";
import "antd/dist/antd.css";
import { useERC20Transfers } from "../../hooks/useERC20Transfers";
import Table from "../reusable/Table";
//import { limitDigits } from "../../helpers/formatters";
//import { getChainDetails } from "../../helpers/getChainDetails";
//import { CustomImg } from "../reusable/CustomImg";
import styled from "styled-components";
//import Blockie from "../Blockie";
import { allTransactionsData } from "../../hooks/useExplorersApis";
import { TransferColumns } from "./TransferColumns";
// import { allNftData } from "../../hooks/useMoralisWeb3";
//import { ConsoleSqlOutlined } from "@ant-design/icons";

interface IStyled {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
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

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
  top: ${(props: IStyled) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: ${(props) => props.width};
`;

function ERC20Transfers() {
  const [fetchData, setFetchData] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(false);

  // todo: rewrite - Mike
  const handleData = async () => {
    console.log("calling all transactions data");
    const data = await allTransactionsData();
    console.log("data from transfers component - ", data);
    let transactionHistory: ITransaction[] = [];
    for (const chain in data) {
      const chainTransactions = data[chain];

      //loop over chain transactions and collect transactions in an array.
      chainTransactions.forEach((val) => {
        if (val) {
          const valWithChainId = val.map((val2: any) => {
            return { ...val2, chainId: Number(chain) };
          });
          transactionHistory.push(...valWithChainId);
        }
      });
    }

    console.log("transaction history - ", transactionHistory);
    setFetchData(transactionHistory);
  };

  useEffect(() => {
    setLoading(true);
    handleData();
    //allNftData();
    setLoading(false);
  }, []);

  console.log("fetchData - ", fetchData);

  return (
    <div>
      <div
        style={{
          margin: "0 1.5625rem 3.125rem 1.5625rem",
          height: "100%",
        }}
      >
        <Table
          // todo: abstract columns and tableData
          tableData={fetchData}
          columns={TransferColumns}
          tableTitle={"Transactions History"}
          expandableRow={false}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default ERC20Transfers;
