import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { useState } from "react";

// Using HTTPS
export const useWeb3 = () => {
  const [account, setAccount] = useState();
  const web3 = createAlchemyWeb3(process.env.REACT_APP_PROVIDER_URL);

  web3.eth.getAccounts((err, res) => {
    if (err) {
      console.log("Error in web3 accounts", err);
    }
    setAccount(res[0]);
  });
  return { web3, account };
};
