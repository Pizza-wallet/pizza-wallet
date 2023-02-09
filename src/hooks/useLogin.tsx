import { useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";

export const useLogin = () => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null,
  );
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
