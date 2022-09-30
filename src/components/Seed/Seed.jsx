import { Input, Modal, Spin, notification } from "antd";
import { useContext, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import * as bip39 from "bip39";

import { PrimaryButton } from "../reusable/Buttons";
import { WalletContext } from "../../utils/WalletContext";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "#2C2A51",
    border: "1px solid #F8F2ED",
    color: "#F8F2ED",
    cursor: "pointer",
  },
  text: {
    color: "#ffffff",
    cursor: "pointer",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

const InnerCard = styled("div")`
  position: relative;
  border: 2px solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 41px;
  padding: 20px;
`;

const StyledInput = styled(Input)`
  border: 2px solid #3e389f;
  border-radius: 15px;
  margin-bottom: 15px;
`;

function Seed() {
  const { setWallet } = useContext(WalletContext);
  const [mnemonic, setMnemonic] = useState("");
  const [isImportModalVisible, setImportModalVisible] = useState(false);

  const isPrivateKeyType = () => {
    if (mnemonic.startsWith("0x")) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div onClick={() => setImportModalVisible(true)}>
        <p style={styles.text}>Import Wallet</p>
      </div>
      <Modal
        open={isImportModalVisible}
        footer={null}
        onCancel={() => setImportModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{
          fontSize: "16px",
          fontWeight: "500",
        }}
        width="340px"
        className="custom-modal-style"
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          <Spin spinning={false}>Import Wallet</Spin>
        </div>
        <InnerCard>
          <StyledInput
            size="large"
            placeholder={"Private key or seed phrase"}
            autoFocus
            onChange={(e) => {
              setMnemonic(e.target.value);
            }}
            value={mnemonic}
          />
          <PrimaryButton
            onClick={() => {
              if (mnemonic.length === 0) {
                notification["error"]({
                  message: "Please input private key or seed phase",
                  style: {
                    backgroundColor: "#3e389f",
                    fontFamily: '"Gloria Hallelujah", sans-serif',
                    fontSize: "22px",
                  },
                });
              }
              const provider = ethers.getDefaultProvider();
              let wallet;
              const isPrivateKey = !bip39.validateMnemonic(mnemonic);
              try {
                if (isPrivateKey) {
                  //private key import method.
                  wallet = new ethers.Wallet(mnemonic, provider); // create wallet from private key
                  window.localStorage.setItem("walletType", "private");
                  window.localStorage.setItem("mnemonic", mnemonic);
                } else {
                  //seed phrase import method.
                  wallet = ethers.Wallet.fromMnemonic(mnemonic); // create wallet from seed phrase
                  window.localStorage.setItem("walletType", "seed");
                  window.localStorage.setItem("mnemonic", mnemonic);
                }
              } catch (e) {
                notification["error"]({
                  message: isPrivateKeyType(mnemonic)
                    ? "Private key is invalid."
                    : "Seed phrase is invalid.",
                  style: {
                    backgroundColor: "#3e389f",
                    fontFamily: '"Gloria Hallelujah", sans-serif',
                    fontSize: "22px",
                  },
                });
              }
              if (wallet) {
                setWallet(wallet); //setup wallet.
                setImportModalVisible(false);
                notification["success"]({
                  message: "Imported wallet",
                  style: {
                    backgroundColor: "#3e389f",
                    fontFamily: '"Gloria Hallelujah", sans-serif',
                    fontSize: "22px",
                  },
                });
              }
            }}
          >
            Import
          </PrimaryButton>
        </InnerCard>
      </Modal>
    </>
  );
}

export default Seed;
