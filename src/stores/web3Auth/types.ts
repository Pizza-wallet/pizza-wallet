export interface Web3AuthExecutionStore {
  provider: any;
  web3Auth: any;
  setProvider: (provider: any) => void;
  setWeb3Auth: (provider: any) => void;
}
