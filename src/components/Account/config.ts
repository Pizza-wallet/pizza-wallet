import { ethers } from "ethers";
import { getDefaultProvider } from "@ethersproject/providers";
import Metamask from "./WalletIcons/metamaskWallet.png";
import Coin98 from "./WalletIcons/Coin98.png";
import WalletConnect from "./WalletIcons/wallet-connect.svg";
import MathWallet from "./WalletIcons/MathWallet.svg";
import TrustWallet from "./WalletIcons/TrustWallet.png";

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: "injected",
    priority: 3,
  },
  {
    title: "MathWallet",
    icon: MathWallet,
    connectorId: "injected",
    priority: 999,
  },

  {
    title: "Coin98",
    icon: Coin98,
    connectorId: "injected",
    priority: 999,
  },
];

export const getAddress = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const connectedAddress = await signer.getAddress();
    console.log(connectedAddress);
    const providerENS = getDefaultProvider();
    const ensName = await providerENS.lookupAddress(connectedAddress);

    return { ensName, connectedAddress };
  } catch (error) {
    console.log(error);
  }
};
