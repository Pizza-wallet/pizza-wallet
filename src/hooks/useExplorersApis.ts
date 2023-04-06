import axios from "axios";
import { ApiInfo, apiList } from "../helpers/explorerApis";

// todo: connect to user account
const address = process.env.REACT_APP_TEST_ACCOUNT;

// todo: refactor so that the same query is not repeated twice
// mike if you could take a look i'd appreciate it
export const queryTransactions = async (
  api: ApiInfo,
  actions: Array<string>,
) => {
  const requests = actions.map((action) =>
    axios.get(`${api.endpoint}/api`, {
      params: {
        module: "account",
        action,
        sort: "desc",
        address: `${address}`,
        apikey: api.apikey,
      },
    }),
  );

  const responses = await Promise.all(requests);
  const data = responses.map((response) => response.data.result);

  return { [api.chainId]: data };
};

export const allTransactionsData = async () => {
  const dataFromAllApis = await Promise.all(
    apiList.map((api) => queryTransactions(api, api.action)),
  );
  return dataFromAllApis.reduce((acc, curr) => ({ ...acc, ...curr }), {});
};
