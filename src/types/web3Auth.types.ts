import { Web3Auth } from "@web3auth/modal";
import { IWalletProvider } from "../providers/walletProvider";

export interface IWeb3AuthContext {
    web3Auth: Web3Auth | null;
    provider: IWalletProvider | null;
    isLoading: boolean;
    user: unknown;
    chain: string;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    getUserInfo: () => Promise<any>;
    signMessage: () => Promise<any>;
    getAccounts: () => Promise<any>;
    signTransaction: () => Promise<void>;
    signAndSendTransaction: () => Promise<void>;
}