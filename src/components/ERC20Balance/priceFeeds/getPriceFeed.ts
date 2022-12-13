import { ethers, BigNumber } from "ethers";
import { getChainDetails } from "../../../helpers/getChainDetails";
import { priceFeedMap } from "./priceFeedMap";

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export const getPriceFeed = async (
  chainId: number,
  symbol: string,
): Promise<number | undefined> => {
  // chain details would need to be passed in
  const rpcProvider = getChainDetails(chainId)?.rpc;
  const provider = new ethers.providers.JsonRpcProvider(rpcProvider);

  // Map symbol of token and chainId to priceFeed contract address
  const addr = priceFeedMap(symbol, chainId);

  if (!addr) {
    // There is no chainlink price feed use a different api
    return undefined;
  }

  const priceFeed = new ethers.Contract(
    addr,
    aggregatorV3InterfaceABI,
    provider,
  );

  let price: any;
  try {
    price = await priceFeed.latestRoundData();
  } catch (e) {
    console.log(
      `Error fetching price feed from contract ${addr} with eror ${e}`,
    );
    // Error handling here
  }

  const hexString = price.answer._hex;
  const bigNumberFromHexString = BigNumber.from(hexString);
  const fixedPrice = ethers.utils.formatUnits(bigNumberFromHexString, 8);
  console.log(`fixed price from chainlink for ${symbol} - `, fixedPrice);
  return Number(fixedPrice);
};
