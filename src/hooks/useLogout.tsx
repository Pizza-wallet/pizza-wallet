import { useWeb3AuthExecutionStore } from "../stores/web3Auth";

export const useLogout = () => {
  const { setProvider, web3auth } = useWeb3AuthExecutionStore(
    (state: any) => state,
  );

  const handleLogout = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    } else {
      try {
        await web3auth.logout();
        setProvider(null);
        console.log("Logged out successfully.")
      } catch(error) {
        console.log(error);
      }
    };
  };
  return { handleLogout };
};
