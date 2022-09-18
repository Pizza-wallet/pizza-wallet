import { useMoralis } from "react-moralis";
import { Spin, Alert } from "antd";
import { getEllipsisTxt } from "../../helpers/formatters";
import Blockie from "../Blockie";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./config";
import {SignClient }from "@walletconnect/sign-client";

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

//The necessary parts to connect to a Dapp with the URI input of the desired site, this part is used from the Wallet Connect document.
async function wl(uri){
   const signClient = await SignClient.init({
    projectId: "2c0ac2fce55be6677c4c5329273ddfac"
  });
  console.log(uri);
  try {
     await signClient.pair({ uri })
  } catch (err) {
    alert(err)
  } 

// Approve session proposal, use id from session proposal event and respond with namespace(s) that satisfy dapps request and contain approved accounts
const { topic, acknowledged } = await signClient.approve({
  id: 123,
  namespaces: {
    eip155: {
      accounts: ["eip155:1:0x0000000000..."],
      methods: ["personal_sign", "eth_sendTransaction"],
      events: ["accountsChanged"],
      extension: [
        {
          accounts: ["eip:137"],
          methods: ["eth_sign"],
          events: [],
        },
      ],
    },
  },
});

// Optionally await acknowledgement from dapp
const session = await acknowledged();

// Or reject session proposal
await signClient.reject({ 
  id: 123,  
  reason: {
    code: 1,
    message: "rejected", 
  },
});

// signClient.on("session_proposal", (event) => {
//   // Show session proposal data to the user i.e. in a modal with options to approve / reject it
//   console.log("connected");
  
// });
}
function Account() {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    account,
    chainId,
    logout,
  } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

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
                    if(connectorId=="walletconnect"){
                      wl("wc:98ba1b0e-4337-4355-a203-30957cdbd5b7@1?bridge=https%3A%2F%2Fj.bridge.walletconnect.org&key=e3de16ef8fbbcd59736f3a8bc2fe5ffac768b669fa67cbadb2132e0680792669");//if connectId is walletconnect execute wl function with a example uri , input can change

                    }
                    else{
                        await authenticate({
                          provider: connectorId,
                          signingMessage: "Pizza Authentication",
                        });
                        window.localStorage.setItem("connectorId", connectorId);
                        setIsAuthModalVisible(false);
                    }
                  
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

  return (
    <>
      <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <p style={{ marginRight: "5px", ...styles.text }}>
          {getEllipsisTxt(account, 6)}
        </p>
        <Blockie currentWallet scale={3} />
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
              href={`${getExplorer(chainId)}/address/${account}`}
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
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}

export default Account;
