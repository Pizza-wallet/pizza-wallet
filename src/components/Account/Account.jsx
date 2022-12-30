import React, { useState } from "react";
import { ethers } from "ethers";
// import Lens from "./lens.jsx";

const Account = () => {
  const [address, setAddress] = useState("Connect Wallet");

  async function connectWallet() {
    try {
      await window.ethereum.enable();

      // const address = window.ethereum.selectedAddress;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = window.ethereum.selectedAddress;
      console.log(address);

      const name = await provider.lookupAddress(address);
      await provider.lookupAddress(address);

      setAddress(name || address);
      // setAddress(address);
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(address);
  // console.log(setAddress);
  return (
    <div className="flex items-center bg-sky-700">
      <button
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out justify-end mx-auto"
        // eslint-disable-next-line react/no-unknown-property
        onClick={connectWallet}
      >
        {address}
      </button>
    </div>
  );
};

export default Account;
