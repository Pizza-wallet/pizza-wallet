import { useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";

export const useLogout = async () => {
  const [web3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null,
  );
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  setProvider(null);
};
