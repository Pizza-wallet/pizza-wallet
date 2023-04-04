import { useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useWeb3AuthExecutionStore } from "../stores/web3Auth";
import EthereumRpc from "../providers/ethersRPC";

export const useLogin = () => {
  const { setProvider, setWeb3auth, web3auth, address, setAddress } =
    useWeb3AuthExecutionStore((state: any) => state);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId:
            "BMMmqlFA6nK-t7M_AXK4swE7kNck-QCSBBONZWuwXXdY6nKRjT3uJugriq3o7mjMHA7bkMac9rygNmTrFv87h2Q",
          web3AuthNetwork: "mainnet", // mainnet, aqua, celeste, cyan or testnet
          authMode: "WALLET",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "optional", // Pass on the mfa level of your choice: default, optional, mandatory, none
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3auth(web3auth);

        await web3auth.initModal();

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const handleLogin = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    } else {
      try {
        const web3authProvider = await web3auth.connect();
        setProvider(web3authProvider);
        console.log("Logged in successfully.");

        // Get user address and store it in global state
        const ethereumRpc = new EthereumRpc(web3authProvider);
        const address = await ethereumRpc.getAccounts();
        setAddress(address[0]);
        console.log(`User Address is ${address}`);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { handleLogin };
};
