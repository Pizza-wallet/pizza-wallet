import { useWeb3AuthExecutionStore } from "../stores/web3Auth";

export const useLogout = () => {
  const { setProvider, web3Auth } = useWeb3AuthExecutionStore(
    (state: any) => state,
  );

  const handleLogout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
  };
  return { handleLogout };
};
