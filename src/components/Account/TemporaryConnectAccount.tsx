import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import ConnectButton from "./ConnectButton";
import { metaMask } from "./connectors/metamask";
import { Button, Divider, Modal } from "antd";
import metamask_Logo from "./WalletIcons/metamaskWallet.png";
import { getAddChainParameters } from "./connectors/networks";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "7px",
    backgroundColor: "black",
    cursor: "pointer",
  },
  button: {
    height: "40px",
    padding: "0 20px",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: "0.2px",
    fontSize: "15px",
    margin: "20px 20px",
    border: "none",
    background: "black",
    color: "white",
  },
  text: {
    color: "white",
  },
  modalTitle: {
    marginBottom: "20px",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "20px",
  },
} as const;

interface WantedChain {
  chain?: number;
}

const TemporaryConnectAccount: React.FC<WantedChain> = (props) => {
  const { account, chainId } = useWeb3React();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const chain = props.chain !== undefined ? props.chain : chainId;

  return (
    <>
      <div>
        {account ? (
          <p style={{ color: "white" }}>Connected</p>
        ) : (
          <Button
            shape="round"
            type="primary"
            style={styles.button}
            onClick={() => setIsAuthModalOpen(true)}
          >
            Connect Wallet
          </Button>
        )}

        <Modal
          visible={isAuthModalOpen}
          footer={null}
          onCancel={() => setIsAuthModalOpen(false)}
          bodyStyle={{
            width: "350px",
            margin: "auto",
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
          }}
        >
          <div style={styles.modalTitle}>Connect Your Wallet</div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <ConnectButton
              label="MetaMask"
              image={metamask_Logo}
              onClick={async () => {
                await metaMask.activate(getAddChainParameters(chain!));
                window.localStorage.setItem("connectorId", "injected");
                setIsAuthModalOpen(false);
              }}
            />

            <Divider />
          </div>
        </Modal>

        <br />
      </div>
    </>
  );
};

export default TemporaryConnectAccount;
