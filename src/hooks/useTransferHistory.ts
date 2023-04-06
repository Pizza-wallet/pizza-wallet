import { useEffect, useState } from "react";
import { allTransactionsData } from "./useExplorersApis";
import { allNftData } from "./useMoralisWeb3";
import { useSwapHistory } from "../stores/routes";

export const useTransferHistory = () => {
  const swapHistory = useSwapHistory(process.env.REACT_APP_TEST_ACCOUNT);
  const [transferHistory, setTransferHistory] = useState<any>();

  useEffect(() => {
    const init = async () => {
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
      // TODO: check how to identify NFT here (is tokenID the best way?)
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

        // For now if allNftData returns unknown then add empty metadata for NFT
        nftMetadata
          ? nftMetadataArr.push(nftMetadata)
          : nftMetadataArr.push({
              token_id: nftTransaction.tokenID,
              normalized_metadata: { name: "unknown", image: "" },
            });
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

      setTransferHistory(transactionsNftSwapData);
      // setLoading(false);
    };

    init();
  }, []);

  return { transferHistory };
};
