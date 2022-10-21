import { Fragment, Interface, JsonFragment } from "@ethersproject/abi";
import { Contract } from "@ethersproject/contracts";
import { providers } from "ethers";
import { BigNumber, Bytes } from "ethers";
import { getChainDetails } from "../helpers/getChainDetails";
import MULTICALL_ABI from "./multicallAbi.json";

const MAX_MULTICALL_SIZE = 100;

export type MultiCallData = {
  address: string;
  name: string;
  params?: any[];
};

type MultiCallAggregateResult = {
  blockNumber: BigNumber;
  returnData: { success: boolean; returnData: Bytes }[];
};

export const splitListIntoChunks = <T>(list: T[], chunkSize: number): T[][] =>
  list.reduce((resultList: T[][], item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultList[chunkIndex]) {
      resultList[chunkIndex] = []; // start a new chunk
    }

    resultList[chunkIndex].push(item);

    return resultList;
  }, []);

export const fetchDataUsingMulticall = async (
  calls: Array<MultiCallData>,
  abi: ReadonlyArray<Fragment | JsonFragment | string>,
  chainId: number,
  multicallAddress: string,
  requireSuccess = false,
): Promise<{ data: unknown; blockNumber: number }[]> => {
  // 1. create contract using multicall contract address and abi...
  console.log("chainId from multicall function - ", chainId);
  // Below should call a function to return a provider based on the chainId
  const rpcProvider = getChainDetails(chainId)?.rpc;
  console.log("getting rpc provider? - ", rpcProvider);
  const provider = new providers.StaticJsonRpcProvider(rpcProvider);

  const multicallContract = new Contract(
    multicallAddress,
    MULTICALL_ABI,
    provider,
  );
  const abiInterface = new Interface(abi);

  // split up lists into chunks to stay below multicall limit
  const chunkedList = splitListIntoChunks<MultiCallData>(
    calls,
    MAX_MULTICALL_SIZE,
  );

  const chunkedResults = await Promise.all(
    chunkedList.map(async (chunkedCalls: any) => {
      const callData = chunkedCalls.map((call: any) => [
        call.address.toLowerCase(),
        abiInterface.encodeFunctionData(call.name, call.params),
      ]);

      try {
        // 3. get bytes array from multicall contract by process aggregate method...
        const { blockNumber, returnData }: MultiCallAggregateResult =
          await multicallContract.tryBlockAndAggregate(
            requireSuccess,
            callData,
          );
        // 4. decode bytes array to useful data array...
        return returnData
          .map(({ success, returnData }, i: number) => {
            if (!success) {
              // requested function failed
              console.error(
                `Multicall unsuccessful for address "${chunkedCalls[i].address}", ` +
                  `function "${chunkedCalls[i].name}", chainId "${chainId}"`,
              );
              return [];
            }

            if (returnData.toString() === "0x") {
              // requested function does probably not exist
              console.error(
                `Multicall no response for address "${chunkedCalls[i].address}", ` +
                  `function "${chunkedCalls[i].name}", chainId "${chainId}"`,
              );
              return [];
            }

            try {
              return abiInterface.decodeFunctionResult(
                chunkedCalls[i].name,
                returnData,
              );
            } catch (e) {
              // requested function returns other data than expected
              console.error(
                `Multicall parsing unsuccessful for address "${chunkedCalls[i].address}", ` +
                  `function "${chunkedCalls[i].name}", chainId "${chainId}"`,
              );
              return [];
            }
          })
          .map((data) => {
            return {
              data: data[0],
              blockNumber: blockNumber.toNumber(),
            };
          });
      } catch (e) {
        // whole rpc call failed, probably an rpc issue
        console.error(
          `Multicall failed on chainId "${chainId}"`,
          chunkedList,
          e,
        );
        return [];
      }
    }),
  );

  return chunkedResults.flat();
};
