import React from "react";

import { useAccount, useConnect, useDisconnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { Button } from "@nextui-org/react";

const Account = () => {
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  // for connect the wallet
  //
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  // for disconnect the wallet
  // const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        {isConnected ? (
          <Button>
            <span>{ensName ? ensName : address}</span>
          </Button>
        ) : (
          <Button onClick={() => connect()}>Connect Wallet</Button>
        )}
      </div>
    </>
  );
};

export default Account;
