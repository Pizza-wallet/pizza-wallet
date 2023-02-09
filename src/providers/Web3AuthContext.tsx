import React, { createContext } from "react";
import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";

interface Web3AuthContextProps {
  web3auth: Web3Auth | null;
  provider: SafeEventEmitterProvider | null;
  setWeb3auth: React.Dispatch<React.SetStateAction<Web3Auth | null>>;
  setProvider: React.Dispatch<
    React.SetStateAction<SafeEventEmitterProvider | null>
  >;
}

export const Web3AuthContext = createContext<Web3AuthContextProps>({
  web3auth: null,
  provider: null,
  setWeb3auth: () => {},
  setProvider: () => {},
});
