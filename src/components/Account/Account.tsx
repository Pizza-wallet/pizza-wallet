import React, { useState, useEffect } from "react";

import { ethers } from "ethers";
import { getDefaultProvider, ExternalProvider } from "@ethersproject/providers";

const Account = () => {
  const [addressLens, setAddressLens] = useState("Connect Wallet");
  const [addr, setAddr] = useState("");
  const styles = {
    connectButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      paddingBlock: "5px",
      marginBottom: "10px",
    },
    connectButtonText: {
      fontWeight: "600",
      paddingLeft: "30px",
    },
  } as const;
  // };

  async function getAddress() {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as any,
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const connectedAddress = await signer.getAddress();
      console.log(connectedAddress);
      const providerENS = getDefaultProvider();
      const ensName = await providerENS.lookupAddress(connectedAddress);

      setAddressLens(ensName || connectedAddress);
    } catch (error) {
      // console.log(error);
    }
  }

  return (
    <>
      <div>
        <button style={styles.connectButton} onClick={() => getAddress()}>
          {addressLens}
        </button>
      </div>
    </>
  );
};

export default Account;
