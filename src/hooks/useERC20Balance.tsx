import { useEffect, useState } from "react";

interface IBalance {
  token_address: string;
  name: string;
  symbol: string;
  logo?: string | undefined;
  thumbnail?: string | undefined;
  decimals: string;
  balance: string;
}

export const useERC20Balance = (params?: any) => {
  // todo: set authentication state variables
  //const { account } = useMoralisWeb3Api();
  //const { isInitialized, chainId, account: walletAddress } = useMoralis();

  const [assets, setAssets] = useState<IBalance[]>();

  //useEffect(() => {
  //  if (isInitialized) {
  //    fetchERC20Balance().then((balance: IBalance[] | undefined) =>
  //      setAssets(balance),
  //    );
  //  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, [isInitialized, chainId, walletAddress]);

  //const fetchERC20Balance = async () => {
  //  if (walletAddress) {
  //    return await account
  //      .getTokenBalances({
  //        address: walletAddress,
  //        chain: params?.chain || chainId,
  //      })
  //      .then((result: any) => result);
  //  } else {
  //    console.log("No wallet address to get token balances");
  //  }
  //};

  //return { fetchERC20Balance, assets };
};
