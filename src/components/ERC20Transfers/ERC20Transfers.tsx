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
import { allNftData } from "../../hooks/useMoralisWeb3";
import { useSwapHistory } from "../../stores/routes";
//import { ConsoleSqlOutlined } from "@ant-design/icons";

interface IStyled {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
}

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
  const swapHistory = useSwapHistory(process.env.REACT_APP_TEST_ACCOUNT);
  const [fetchData, setFetchData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleData = async () => {
    console.log("swapHistory here - ", swapHistory);

    const usersSwapHistory = swapHistory.reduce((acc: any, val: any) => {
      acc.push({ ...val.route, type: "swap", to: "" });
      return acc;
    }, []);

    console.log("the swap history - ", usersSwapHistory);

    console.log("calling all transactions data");
    const data = await allTransactionsData();
    console.log("data from transfers component - ", data);
    let transactionHistory: any = [];
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

    // figure out which transactions are nft's then use api to get nft data
    // because current api only shows which ones are owned.
    // console.log("NFT data - ", await allNftData());
    // const keys = [1, 137, 250, 43114, 42161, 56];
    // const nftData = await allNftData();
    // const dataFromChains = nftData ? nftData[0].dataFromChains : [];
    // let usersNftData = [];
    // for (let i = 0; i < dataFromChains.length; i++) {
    //   console.log(dataFromChains[i]);
    //   if (dataFromChains[i].length) {
    //     // there is nft data on this chain loop and push to our new array
    //     for (let j = 0; j < dataFromChains[i].length; j++) {
    //       // TODO: need to figure out how to get metadata out of NFT string metadata
    //       usersNftData.push({
    //         ...dataFromChains[i][j],
    //         chainId: keys[i],
    //         timeStamp: dataFromChains[i][j].last_token_uri_sync,
    //         type: "nft",
    //       });
    //     }
    //   }
    // }

    // console.log("usersNftData  - ", usersNftData);
    const nftTransactions = transactionHistory.filter((val: any) => {
      if (val.tokenID) {
        return val;
      } else {
        return;
      }
    });

    let nftMetadataArr = [];
    for (let i = 0; i < nftTransactions.length; i++) {
      const nftTransaction = nftTransactions[i];
      const nftMetadata = await allNftData(
        nftTransaction.contractAddress,
        nftTransaction.tokenID,
        nftTransaction.chainId,
      );
      nftMetadataArr.push(nftMetadata);
    }

    console.log("nft transactions? - ", nftTransactions);
    console.log("nft metaData? - ", nftMetadataArr);
    console.log("transaction history - ", transactionHistory);
    console.log("usersSwap history - ", usersSwapHistory);
    setFetchData([...transactionHistory, ...usersSwapHistory]);
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
