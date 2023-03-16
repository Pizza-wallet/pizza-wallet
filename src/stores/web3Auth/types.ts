import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";

export interface Web3AuthExecutionStore {
  provider: SafeEventEmitterProvider | null;
  web3Auth: Web3Auth | null;
  setProvider: (provider: any) => void;
  setWeb3Auth: (provider: any) => void;
}
