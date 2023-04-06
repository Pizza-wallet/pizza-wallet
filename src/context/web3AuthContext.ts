import { createContext } from "react";
import { IWeb3AuthContext } from "../types/web3Auth.types";

export const Web3AuthContext = createContext<IWeb3AuthContext>({
    web3Auth: null,
    provider: null,
    isLoading: false,
    user: null,
    chain: "",
    login: async () => {},
    logout: async () => {},
    getUserInfo: async () => {},
    signMessage: async () => {},
    getAccounts: async () => {},
    signTransaction: async () => {},
    signAndSendTransaction: async () => {},
});