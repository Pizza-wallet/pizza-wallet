import React, { useState } from "react";
import { connectWallet } from "./utils";

const Account = () => {
  const [address, setAddress] = useState("Connect Wallet");

  async function connectWalletHandler() {
    const address = await connectWallet();
    console.log("Happy", address);
    setAddress(address);
  }

  return (
    <div className="flex items-center bg-sky-700">
      <button
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out justify-end mx-auto"
        // eslint-disable-next-line react/no-unknown-property
        onClick={connectWalletHandler}
      >
        {address}
      </button>
    </div>
  );
};

export default Account;
