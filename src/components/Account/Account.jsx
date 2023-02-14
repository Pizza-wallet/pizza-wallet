import React, { useState, useEffect } from "react";
import { createClient } from "urql";

import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Button } from "@nextui-org/react";
// import { client, getDefaultProfile } from "./utils";

const Account = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const [addressLens, setAddressLens] = useState(null);

  // for connect the wallet
  //
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  // for disconnect the wallet
  // const { disconnect } = useDisconnect();

  // Lens implementation start here
  const API_URL = "https://api.lens.dev";

  const client = createClient({
    url: API_URL,
  });

  const lensAddress = address;
  console.log(lensAddress);
  const getDefaultProfile = `
query DefaultProfile {
  defaultProfile(request: { ethereumAddress: "${lensAddress}"}) {
    handle
  }
}`;

  async function getAddress() {
    try {
      if (address) {
        console.log("inside", address);
        const response = await client.query(getDefaultProfile).toPromise();
        const defaultProfile = response.data.defaultProfile;

        // if (defaultProfile) {
        setAddressLens(defaultProfile.handle);
        console.log("profi", setAddressLens);
        // }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      <div>
        {isConnected ? (
          <Button>
            <span>{addressLens || ensName || address}</span>
          </Button>
        ) : (
          <Button onClick={() => connect()}>Connect Wallet</Button>
        )}
      </div>
    </>
  );
};

export default Account;
