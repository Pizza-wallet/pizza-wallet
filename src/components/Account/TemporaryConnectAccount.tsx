import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import ConnectButton from "./ConnectButton";
import { metaMask } from "./connectors/metamask";
import { Button } from "antd";
import metamask_Logo from "./WalletIcons/metamaskWallet.png";
import { getAddChainParameters } from "./connectors/networks";
import PizzawalletModal from "../reusable/PizzawalletModal";
import Address from "../Address/Address";
import styled from "styled-components";
import ChainSelect from "../Dex-lifi/SelectToken/ChainSelect/ChainSelect";

const Header = styled("div")`
  color: #3e389f;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 1.5rem;
  padding: 0.625rem 0 0.625rem 0;
  -webkit-text-stroke: thin;
`;

const StyledP = styled(`p`)`
  font-family: Rubik;
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0.04em;
`;

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

        <PizzawalletModal
          modalOpen={isAuthModalOpen}
          setModalOpen={setIsAuthModalOpen}
          width={"26.75rem"}
        >
          <>
            <Header>Account</Header>

            <div
              style={{
                border: "2px solid #3e389f",
                borderRadius: "41px",
                height: "402px",
              }}
            >
              <div style={{ margin: "20px" }}>
                <Address
                  avatar="left"
                  size={6}
                  copyable
                  style={{ fontSize: "1.25rem", margin: "20px" }}
                />

                <div style={{ margin: "50px 0 20px 0", textAlign: "center" }}>
                  <StyledP>Block Explorers</StyledP>
                </div>

                <ChainSelect chainId={1} setChain={() => {}} />
                {/* <ConnectButton
                  label="MetaMask"
                  image={metamask_Logo}
                  onClick={async () => {
                    await metaMask.activate(getAddChainParameters(chain!));
                    window.localStorage.setItem("connectorId", "injected");
                    setIsAuthModalOpen(false);
                  }}
                /> */}
              </div>
            </div>
          </>
        </PizzawalletModal>

        <br />
      </div>
    </>
  );
};

export default TemporaryConnectAccount;
