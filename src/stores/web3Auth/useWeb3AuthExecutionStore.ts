import { strict } from "assert";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Web3AuthExecutionStore } from "./types";

// todo: add chain global state
export const useWeb3AuthExecutionStore = create<Web3AuthExecutionStore>()(
  persist(
    (set) => ({
      provider: null,
      web3auth: null,
      chain: null,
      address: null,
      setProvider: (provider: any) => set(() => ({ provider: provider })),
      setWeb3auth: (web3auth: any) => set(() => ({ web3auth: web3auth })),
      setChain: (chain: any) => set(() => ({ chain: chain })),
      setAddress: (address: any) => set(() => ({ address: address })),
    }),
    {
      name: "pizza-wallet-web3Auth",
      version: 1,
    },
  ),
);
