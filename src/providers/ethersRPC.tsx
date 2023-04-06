import { SafeEventEmitterProvider } from "@web3auth/base";
import { ethers } from "ethers";
import { IWalletProvider } from "./walletProvider";

const ethProvider = (provider: SafeEventEmitterProvider): IWalletProvider => {
  const getAccounts = async () => {
    try {
      const providerInstance = new ethers.providers.Web3Provider(provider);
      const accounts = await providerInstance.listAccounts();
      console.log("Eth accounts", accounts);
    } catch (error) {
      console.log("Error", error);
    }
  };

  // todo: generalise for user input
  const signMessage = async () => {
    try {
      const pubKey = (await provider.request({
        method: "eth_accounts",
      })) as string[];
      const providerInstance = new ethers.providers.Web3Provider(provider);
      const signer = providerInstance.getSigner(pubKey[0]);
      const message =
        "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
      const signature = await signer.signMessage(message);
      console.log("Eth sign message => true", signature);
    } catch (error) {
      console.log("error", error);
    }
  };

  // todo: generalise for user input
  const signAndSendTransaction = async () => {
    try {
      const providerInstance = new ethers.providers.Web3Provider(provider);
      const signer = providerInstance.getSigner();
      const accounts = await providerInstance.listAccounts();
      const txRes = await signer.sendTransaction({
        to: accounts[0],
        value: ethers.utils.parseEther("0.01"),
      });
      console.log("txRes", txRes);
    } catch (error) {
      console.log("error", error);
    }
  };

  // todo: generalise for user input
  const signTransaction = async () => {
    try {
      const providerInstance = new ethers.providers.Web3Provider(provider);
      const signer = providerInstance.getSigner();
      const accounts = await providerInstance.listAccounts();
      const tx = {
        to: accounts[0],
        value: ethers.utils.parseEther("0.01"),
      };
      // only supported with social logins (openlogin adapter)
      const txRes = await signer.signTransaction(tx);
      console.log("txRes", txRes);
    } catch (error) {
      console.log("error", error);
    }
  };
  return {
    getAccounts,
    signMessage,
    signAndSendTransaction,
    signTransaction,
  };
};

export default ethProvider;
