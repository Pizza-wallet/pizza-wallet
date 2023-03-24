import { useWeb3AuthExecutionStore } from "../stores/web3Auth";

export const useAddChain = () => {
  const { web3auth } = useWeb3AuthExecutionStore(
    (state: any) => state,
  );

  const handleAddChain = async () => {
    if (!web3auth) {
        console.log("web3auth not initialized yet");
        return;
    } else {
        try {
            // todo add dynamic chain config logic
            await web3auth.addChain(
                {}
            );
            console.log("Added chain successfully.")
        } catch(error) {
            console.log(error);
        }
    };
  };
  return { handleAddChain };
};