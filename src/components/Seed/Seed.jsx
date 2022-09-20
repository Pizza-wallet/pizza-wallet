import { Input, Modal, Select, Spin, notification } from "antd";
import { useContext, useState } from "react";
import Text from "antd/lib/typography/Text";
import styled from "styled-components";
import { ethers } from "ethers";

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

const StyledSelect = styled(Select)`
  border: 2px solid #3e389f;
  border-radius: 15px;
  width: 100%;
`;

const StyledInput = styled(Input)`
  border: 2px solid #3e389f;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const selectTextArray = ["Private Key", "Seed Phrase"];

function Seed() {
  const { setWallet } = useContext(WalletContext);
  const [isPvKey, setIsPvKey] = useState(true);
  const [privateText, setPrivateText] = useState("");
  const [isPvKeyModalVisible, setIsPvKeyModalVisible] = useState(false);

  return (
    <>
      <div onClick={() => setIsPvKeyModalVisible(true)}>
        <p style={styles.text}>Import Wallet</p>
      </div>
      <Modal
        visible={isPvKeyModalVisible}
        footer={null}
        onCancel={() => setIsPvKeyModalVisible(false)}
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
          <Text strong>Import Type:</Text>
          <StyledSelect
            onChange={(value) => {
              if (value === 0) {
                setIsPvKey(true);
              } else {
                setIsPvKey(false);
              }
            }}
            value={isPvKey ? 0 : 1}
            size="large"
          >
            {selectTextArray.map((item, index) => (
              <Select.Option value={index} key={index}>
                <p>{item}</p>
              </Select.Option>
            ))}
          </StyledSelect>
          <Text strong>{isPvKey ? "Private key" : "Seed Phrase"}</Text>
          <StyledInput
            size="large"
            placeholder={isPvKey ? "Private key" : "Seed Phrase"}
            autoFocus
            onChange={(e) => {
              setPrivateText(e.target.value);
            }}
            value={privateText}
          />
          <PrimaryButton
            onClick={() => {
              const provider = ethers.getDefaultProvider();
              let wallet;
              try {
                if (isPvKey) {
                  //private key import methode.
                  wallet = new ethers.Wallet(privateText, provider); // create wallet from private key
                  window.localStorage.setItem("walletType", "private");
                  window.localStorage.setItem("privateText", privateText);
                } else {
                  //seed phrase import methode.
                  wallet = ethers.Wallet.fromMnemonic(privateText); // create wallet from seed phrase
                  window.localStorage.setItem("walletType", "seed");
                  window.localStorage.setItem("privateText", privateText);
                }
              } catch (e) {
                console.log(e);
                notification["error"]({
                  message: isPvKey
                    ? "Please check private key"
                    : "Please check seed phrase",
                  style: {
                    backgroundColor: "#3e389f",
                    fontFamily: '"Gloria Hallelujah", sans-serif',
                    fontSize: "22px",
                  },
                });
              }
              if (wallet) {
                setWallet(wallet); //setup wallet.
                setIsPvKeyModalVisible(false);
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
