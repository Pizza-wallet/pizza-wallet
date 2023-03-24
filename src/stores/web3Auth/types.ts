import { Web3Auth } from "@web3auth/modal";
import { SafeEventEmitterProvider } from "@web3auth/base";

// todo: add chain global state
export interface Web3AuthExecutionStore {
  provider: SafeEventEmitterProvider | null;
  web3auth: Web3Auth | null;
  chain: string | null;
  address: string | null;
  setProvider: (provider: any) => void;
  setWeb3auth: (provider: any) => void;
  setChain: any;
  setAddress: any;
}
