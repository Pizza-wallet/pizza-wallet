import { useEffect } from "react";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { useWeb3AuthExecutionStore } from "../stores/web3Auth";

export const useLogin = () => {
  const { setProvider, setWeb3Auth, web3Auth } = useWeb3AuthExecutionStore(
    (state: any) => state,
  );

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId:
            "BMMmqlFA6nK-t7M_AXK4swE7kNck-QCSBBONZWuwXXdY6nKRjT3uJugriq3o7mjMHA7bkMac9rygNmTrFv87h2Q",
          web3AuthNetwork: "mainnet", // mainnet, aqua, celeste, cyan or testnet
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x13881",
            rpcTarget: "https://rpc-mumbai.maticvigil.com", // This is the public RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "optional", // Pass on the mfa level of your choice: default, optional, mandatory, none
          },
        });
        web3auth.configureAdapter(openloginAdapter);
        setWeb3Auth(web3auth);

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
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3Auth.connect();
    setProvider(web3authProvider);
  };
  return { handleLogin };
};
