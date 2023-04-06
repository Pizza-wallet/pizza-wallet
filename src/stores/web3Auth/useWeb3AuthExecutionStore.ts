import { strict } from "assert";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Web3AuthExecutionStore } from "./types";

export const useWeb3AuthExecutionStore = create<Web3AuthExecutionStore>()(
  persist(
    (set) => ({
      provider: null,
      web3auth: null,
      setProvider: (provider: any) => set(() => ({ provider: provider })),
      setWeb3auth: (web3auth: any) => set(() => ({ web3auth: web3auth })),
    }),
    {
      name: "pizza-wallet-web3Auth",
      version: 1,
    },
  ),
);
