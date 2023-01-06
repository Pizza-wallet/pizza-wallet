import axios from "axios";

export { default } from "./ERC20Transfers";

export const fetchNftData = async () => {
  try {
    const response = await axios.get("https://api.polygonscan.com/api", {
      params: {
        module: "account",
        action: "tokentx",
        address: "0x052D1f06cC98AAe6c4D2e9D06c286143E22dB612",
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 300,
        sort: "desc",
        apikey: process.env.REACT_APP_BLOCKCHAIN_API,
      },
    });
    const data = response.data.result;
    return data;
  } catch (error) {
    console.error(error);
  }
};
