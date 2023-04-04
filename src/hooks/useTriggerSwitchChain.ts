// todo

import { useWeb3AuthExecutionStore } from "../stores/web3Auth";

export const useTriggerSwitchChain = () => {
  const { web3auth } = useWeb3AuthExecutionStore(
    (state: any) => state,
  );

  // logic handling
};