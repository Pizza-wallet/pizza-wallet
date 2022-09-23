import { createAlchemyWeb3 } from "@alch/alchemy-web3";

// Using HTTPS
export const useWeb3 = () => {
  const web3 = createAlchemyWeb3(process.env.REACT_APP_PROVIDER_URL);
  return { web3 };
};
