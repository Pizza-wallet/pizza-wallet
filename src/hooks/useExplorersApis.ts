import axios from "axios";
import { ApiInfo, apiList } from "../helpers/explorerApis";

// todo: connect to user account
const address = process.env.REACT_APP_TEST_ACCOUNT;

export const queryTransactions = async (api: ApiInfo, actionIndex: number) => {
  try {
    const response = await axios.get(api.endpoint, {
      params: {
        module: "account",
        action: api.action[actionIndex],
        offset: 10000,
        sort: "desc",
        address: `${address}`,
        apikey: api.apikey,
      },
    });
    const data = response.data.result;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const allTransactionsData = async () => {
  try {
    const dataFromAllApis = [];
    // iterate through each array element
    for (let i = 0; i < apiList.length; i++) {
      for (let j = 0; j < apiList[i].action.length; j++) {
        const api = apiList[i];
        const data = await queryTransactions(api, j);
        dataFromAllApis.push([api.chainId, { ...data }]);
      }
    }
    return dataFromAllApis;
  } catch (error) {
    console.log(error);
  }
};
console.log(allTransactionsData());
