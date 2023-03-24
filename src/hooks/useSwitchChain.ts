import { useWeb3AuthExecutionStore } from "../stores/web3Auth";

export const useSwitchChain = () => {
  const { web3auth, setChain } = useWeb3AuthExecutionStore(
    (state: any) => state,
  );

  const handleSwitchChain = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    } else {
      try {
          // todo: connect to trigger switch chain hook
          await web3auth.switchChain(
              {}
          );
          // todo: set ``setChain`` to chainId returned from the trigger switch chain hook
          setChain()
          console.log("Switched chain successfully.")
      } catch(error) {
          console.log(error);
      }
    };
  };
  return { handleSwitchChain };
};