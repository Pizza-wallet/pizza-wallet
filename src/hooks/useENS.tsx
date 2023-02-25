import { useEffect, useState } from "react";
import { getDefaultProvider } from "ethers";

const useENSName = (address: string | undefined): string => {
  const [ensName, setENSName] = useState<string>("");

  useEffect(() => {
    const getENSName = async () => {
      if (address) {
        const providerENS = getDefaultProvider();
        const name = await providerENS.lookupAddress(address);
        setENSName(name || address);
      }
    };

    getENSName();
  }, [address]);

  return ensName;
};

export default useENSName;
