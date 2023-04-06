import { SafeEventEmitterProvider } from "@web3auth/base";
import EthereumRPC from "./ethersRPC";

export interface IWalletProvider {
  getAccounts: () => Promise<any>;
  signAndSendTransaction: () => Promise<void>;
  signTransaction: () => Promise<void>;
  signMessage: () => Promise<void>;
}

export const getWalletProvider = (provider: SafeEventEmitterProvider): IWalletProvider => {
  return EthereumRPC(provider);
};