import { useMoralis } from "react-moralis";

interface IAuthenticateArgs {
  provider?: string;
  clientId?: string;
  rpcTarget?: string;
  chainId?: string;
  appLogo?: string;
  signingMessage?: string;
}

export const useAuthenticateUser = () => {
  const { authenticate } = useMoralis();

  const authenticateUser = async (
    args: IAuthenticateArgs,
    connectorId: string,
  ) => {
    // can be swapped for web3auth later
    const auth: any = authenticate;
    await auth(args);
    window.localStorage.setItem("connectorId", connectorId);
    window.localStorage.setItem("chainId", "0x1");
  };

  return { authenticateUser };
};
