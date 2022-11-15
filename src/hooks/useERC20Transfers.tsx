import { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

interface ITransfer {
  transaction_hash?: string;
  address?: string;
  block_timestamp?: string;
  block_number?: string;
  block_hash?: string;
  to_address?: string;
  from_address?: string;
  value?: string;
}

export const useERC20Transfers = () => {
  const { account } = useMoralisWeb3Api();
  const { isInitialized, account: walletAddress, chainId } = useMoralis();
  const [ERC20Transfers, setERC20Transfers] = useState<ITransfer[]>();

  useEffect(() => {
    if (isInitialized)
      fetchERC20Transfers().then((result: ITransfer[] | undefined) =>
        setERC20Transfers(result),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chainId, walletAddress]);

  const fetchERC20Transfers = async () => {
    if (walletAddress && chainId) {
      return await account
        .getTokenTransfers({ address: walletAddress, chain: chainId as any })
        .then((result) => result.result);
    }
  };
  return { fetchERC20Transfers, ERC20Transfers, chainId };
};
