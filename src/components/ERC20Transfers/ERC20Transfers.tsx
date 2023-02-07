import { useState, useEffect } from "react";
import "antd/dist/antd.css";
import Table from "../reusable/Table";
import { allTransactionsData } from "../../hooks/useExplorersApis";
import { TransferColumns } from "./TransferColumns";
import { allNftData } from "../../hooks/useMoralisWeb3";
import { useSwapHistory } from "../../stores/routes";

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

function ERC20Transfers() {
  const swapHistory = useSwapHistory(process.env.REACT_APP_TEST_ACCOUNT);
  const [fetchData, setFetchData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleData = async () => {
    // get swap history (from local history to start)
    const usersSwapHistory = swapHistory.reduce((acc: any, val: any) => {
      // converting 13 digit unix to 10 (so we can sort by date with other tranactions)
      const timeStamp = Math.round(
        val.route.steps[0].execution.process[0].doneAt / 1000,
      );
      acc.push({
        ...val.route,
        type: "swap",
        timeStamp: timeStamp.toString(),
      });
      return acc;
    }, []);

    // get all transaction data
    const data = await allTransactionsData();
    let transactionHistory: any = [];
    for (const chain in data) {
      const chainTransactions = data[chain];
      // loop over chain transactions and collect transactions in an array.
      chainTransactions.forEach((val) => {
        if (val) {
          const valWithChainId = val.map((val2: any) => {
            return { ...val2, chainId: Number(chain) };
          });
          transactionHistory.push(...valWithChainId);
        }
      });
    }

    // get metadata for each nft transaction
    const nftTransactions = transactionHistory.filter((val: any) => {
      if (val.tokenID) {
        return val;
      } else {
        return;
      }
    });

    let nftMetadataArr: any = [];
    for (let i = 0; i < nftTransactions.length; i++) {
      const nftTransaction = nftTransactions[i];
      const nftMetadata = await allNftData(
        nftTransaction.contractAddress,
        nftTransaction.tokenID,
        nftTransaction.chainId,
      );
      nftMetadataArr.push(nftMetadata);
    }

    // add the metadata to the nftTransactions and then hook up the data to the table
    const transactionHistoryWithNftMetadata = transactionHistory.map(
      (transaction: any) => {
        const tokenID = transaction.tokenID;
        return {
          ...transaction,
          nftMetadata: tokenID
            ? nftMetadataArr.find((val: any) => val.token_id === tokenID)
            : null,
          type: tokenID ? "nft" : "transaction",
        };
      },
    );

    // Sort by newest date first and save in state
    const transactionsNftSwapData = [
      ...transactionHistoryWithNftMetadata,
      ...usersSwapHistory,
    ].sort(function (x, y) {
      return (
        new Date(Number(y.timeStamp)).getTime() -
        new Date(Number(x.timeStamp)).getTime()
      );
    });

    setFetchData(transactionsNftSwapData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    handleData();
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
