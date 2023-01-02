import { ethers } from "ethers";

export async function connectWallet() {
  try {
    await window.ethereum.enable();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = window.ethereum.selectedAddress;
    // console.log(address);

    const name = await provider.lookupAddress(address);

    // console.log(name);
    return name || address;
  } catch (error) {
    console.log(error);
  }
}
