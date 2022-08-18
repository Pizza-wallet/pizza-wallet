// import Moralis from "moralis";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

// const ethers = require("ethers");
// // @ts-ignore
// class WalletLinkConnector extends (Moralis === null || Moralis === void 0
//   ? void 0
//   : Moralis.AbstractWeb3Connector) {
//   constructor() {
//     super(...arguments);
//     // A name for the connector to reference it easy later on
//     this.type = "WalletLink";
//     this.account = null;
//     this.chainId = null;
//     this.provider = null;
//     this.coinbaseWallet = new CoinbaseWalletSDK({
//       appName: "appName",
//       appLogoUrl: "appLogoUrl",
//       darkMode: false,
//     });
//   }
//   /**
//    * A function to connect to the provider
//    * This function should return an EIP1193 provider (which is the case with most wallets)
//    * It should also return the account and chainId, if possible
//    */
//   async activate() {
//     const ethereum = this.coinbaseWallet.makeWeb3Provider(
//       `https://speedy-nodes-nyc.moralis.io/${process.env.REACT_APP_MORALIS_SPEEDY_NODES_KEY}/eth/kovan`,
//       42,
//     );
//     // Store the EIP-1193 provider, account and chainId
//     await ethereum.request({ method: "eth_requestAccounts" });
//     const provider = new ethers.providers.Web3Provider(ethereum);
//     const accounts = await provider.listAccounts();
//     this.account = accounts[0];
//     this.chainId = "0x2a"; // Should be in hex format
//     this.provider = ethereum;
//     // Call the subscribeToEvents from AbstractWeb3Connector to handle events like accountsChange and chainChange
//     // @ts-ignore
//     this.subscribeToEvents(this.provider);
//     // Return the provider, account and chainId
//     return {
//       provider: this.provider,
//       chainId: this.chainId,
//       account: this.account,
//     };
//   }
//   // Cleanup any references to torus
//   async deactivate() {
//     // Call the unsubscribeToEvents from AbstractWeb3Connector to handle events like accountsChange and chainChange
//     // @ts-ignore
//     this.unsubscribeToEvents(this.provider);
//     this.coinbaseWallet.disconnect();
//     this.account = null;
//     this.chainId = null;
//     this.provider = null;
//   }
// }
// export default WalletLinkConnector;
