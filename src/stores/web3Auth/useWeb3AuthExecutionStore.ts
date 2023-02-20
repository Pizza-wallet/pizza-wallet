import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Web3AuthExecutionStore } from "./types";

export const useWeb3AuthExecutionStore = create<Web3AuthExecutionStore>()(
  persist(
    (set) => ({
      provider: null,
      web3Auth: null,
      setProvider: (provider: any) => set(() => ({ provider: provider })),
      setWeb3Auth: (web3Auth: any) => set(() => ({ web3Auth: web3Auth })),
    }),
    {
      name: "pizza-wallet-web3Auth",
      version: 1,
    },
  ),
);
