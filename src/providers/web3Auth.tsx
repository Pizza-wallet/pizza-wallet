import React, {
  FunctionComponent,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Web3Auth } from "@web3auth/modal";
import { ADAPTER_EVENTS, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { getWalletProvider, IWalletProvider } from "./walletProvider";
import { CHAIN_CONFIG, CHAIN_CONFIG_TYPE } from "../config/chainConfig";
import { WEB3AUTH_NETWORK_TYPE } from "../config/web3AuthNetwork";
import { IWeb3AuthContext } from "../types/web3Auth.types";

export function useWeb3Auth(): IWeb3AuthContext {
  return useContext(Web3AuthContext);
}

export const Web3AuthContext = createContext<IWeb3AuthContext>({
  web3Auth: null,
  provider: null,
  isLoading: false,
  user: null,
  chain: "",
  login: async () => {},
  logout: async () => {},
  getUserInfo: async () => {},
  signMessage: async () => {},
  getAccounts: async () => {},
  signTransaction: async () => {},
  signAndSendTransaction: async () => {},
});

interface IWeb3AuthState {
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: CHAIN_CONFIG_TYPE;
  children?: React.ReactNode;
}
interface IWeb3AuthProps {
  children?: ReactNode;
  web3AuthNetwork: WEB3AUTH_NETWORK_TYPE;
  chain: CHAIN_CONFIG_TYPE;
}

// all states are recorded in the web3auth session
// maybe: add everything to global state
export const Web3AuthProvider: FunctionComponent<IWeb3AuthState> = ({
  children,
  web3AuthNetwork,
  chain,
}: IWeb3AuthProps) => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<IWalletProvider | null>(null);
  const [user, setUser] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setWalletProvider = useCallback(
    (web3authProvider: SafeEventEmitterProvider) => {
      const walletProvider = getWalletProvider(web3authProvider);
      setProvider(walletProvider);
    },
    [chain],
  );

  // Subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
  useEffect(() => {
    const subscribeAuthEvents = (web3auth: Web3Auth) => {
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
        console.log("Successfully logged in", data);
        setUser(data);
        setWalletProvider(web3auth.provider!);
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
        setUser(null);
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
        console.log("some error or user has cancelled login request", error);
      });
    };

    const currentChainConfig = CHAIN_CONFIG[chain];

    async function init() {
      try {
        setIsLoading(true);
        const clientId = {
          testnet: `${process.env.REACT_APP_W3A_TESTNET_CLIENTID}`,
          mainnet: `${process.env.REACT_APP_W3A_MAINNET_CLIENTID}`,
        };
        const web3AuthInstance = new Web3Auth({
          chainConfig: currentChainConfig,
          clientId: clientId[web3AuthNetwork],
          // todo: config
          //uiConfig: {
          //  theme: "dark",
          //  loginMethodsOrder: ["github", "google"],
          //  defaultLanguage: "en",
          //  appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
          //}
        });
        const adapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "optional",
          },
          adapterSettings: {
            network: web3AuthNetwork,
            // todo: config
            //whiteLabel: {
            //  name: "Pizza wallet",
            //  logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
            //  logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
            //  defaultLanguage: "en",
            //  dark: true, // whether to enable dark mode. defaultValue: false
            //},
          },
        });
        web3AuthInstance.configureAdapter(adapter);
        subscribeAuthEvents(web3AuthInstance);
        setWeb3Auth(web3AuthInstance);
        await web3AuthInstance.initModal();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, [chain, web3AuthNetwork, setWalletProvider]);

  const login = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const localProvider = await web3Auth.connect();
    setWalletProvider(localProvider!);
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const user = await web3Auth.getUserInfo();
    console.log(user);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    await provider.getAccounts();
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    await provider.signMessage();
  };

  const signTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    await provider.signTransaction();
  };

  const signAndSendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    await provider.signAndSendTransaction();
  };

  const contextProvider = {
    web3Auth,
    chain,
    provider,
    user,
    isLoading,
    login,
    logout,
    getUserInfo,
    getAccounts,
    signMessage,
    signTransaction,
    signAndSendTransaction,
  };

  return (
    <Web3AuthContext.Provider value={contextProvider}>
      {children}
    </Web3AuthContext.Provider>
  );
};
