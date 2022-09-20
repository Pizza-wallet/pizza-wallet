import { useMoralis } from "react-moralis";
import { Spin, Alert } from "antd";
import { getEllipsisTxt } from "../../helpers/formatters";
import Blockie from "../Blockie";
import { Button, Card, Modal } from "antd";
import { useState, useContext, useEffect } from "react";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./config";
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

function Account() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    account,
    chainId,
    logout,
  } = useMoralis();

  const { wallet, setWallet } = useContext(WalletContext);
  const [walletAddress, setWalletAddress] = useState(account);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  useEffect(() => {
    if (wallet) {
      setWalletAddress(wallet.address); //update walletAddress when wallet changes.
    }
  }, [wallet]);

  if (!wallet) {
    //if wallet is not null, don't need to show connect wallet.
    if (!isAuthenticated || !account) {
      return (
        <>
          <div onClick={() => setIsAuthModalVisible(true)}>
            <p style={styles.text}>Connect Wallet</p>
          </div>
          <Modal
            visible={isAuthModalVisible}
            footer={null}
            onCancel={() => setIsAuthModalVisible(false)}
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
              <Spin spinning={isAuthenticating}> Connect Wallet </Spin>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {connectors.map(({ title, icon, connectorId }, key) => (
                <div
                  style={styles.connector}
                  key={key}
                  onClick={async () => {
                    try {
                      await authenticate({
                        provider: connectorId,
                        signingMessage: "Pizza Authentication",
                      });
                      window.localStorage.setItem("connectorId", connectorId);
                      setIsAuthModalVisible(false);
                    } catch (e) {
                      console.log(e);
                      <Alert message={e.message} type="warning" closable />;
                    }
                  }}
                >
                  <img src={icon} alt={title} style={styles.icon} />
                  <Text style={{ fontSize: "14px" }}>{title}</Text>
                </div>
              ))}
            </div>
          </Modal>
        </>
      );
    }
  }

  return (
    <>
      <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <p style={{ marginRight: "5px", ...styles.text }}>
          {getEllipsisTxt(walletAddress, 6)}
        </p>
        <Blockie address={walletAddress} scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${walletAddress}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#3e389f" }}
            >
              <SelectOutlined
                style={{ marginRight: "5px", color: "#3e389f" }}
              />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
            backgroundColor: "#3e389f",
            border: "0px",
            color: "white",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
            if (wallet) {
              //remove all wallet object when logout.
              setWallet(null);
              window.localStorage.removeItem("walletType");
              window.localStorage.removeItem("privateText");
            }
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
