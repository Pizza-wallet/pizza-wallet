import axios from "axios";
import { ApiInfo, apiList } from "../helpers/explorerApis";

// todo: connect to user account
const address = process.env.REACT_APP_TEST_ACCOUNT;

export const queryTransactions = async (api: ApiInfo, actions: Array<string>) => {
  try {
    const requests = actions.map((action) =>
      axios.get(api.endpoint, {
        params: {
          module: "account",
          action,
          offset: 10000,
          sort: "desc",
          address: `${address}`,
          apikey: api.apikey,
        },
      })
    );
    const responses = await Promise.all(requests);
    const data = responses.map((response) => response.data.result);
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
      const api = apiList[i];
      const data = await queryTransactions(api, api.action);
      dataFromAllApis.push([api.chainId, { ...data }]);
    }
    return dataFromAllApis;
  } catch (error) {
    console.log(error);
  }
};
console.log(allTransactionsData());
