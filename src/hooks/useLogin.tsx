import { useContext } from "react";
import { Web3AuthContext } from "../providers/Web3AuthContext";

export const useLogin = () => {
  const { web3auth, provider, setWeb3auth, setProvider } =
    useContext(Web3AuthContext);
  const handleLogin = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };
  return { provider, handleLogin };
};
