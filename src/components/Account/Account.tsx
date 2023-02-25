import { useMoralis } from "react-moralis";
import { Spin, Alert } from "antd";
import { Button, Card, Modal } from "antd";
import { useState } from "react";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./config";
import { CustomImg } from "../reusable/CustomImg";
import AccountLogo from "../../assets/account-logo.svg";
import styled from "styled-components";
import { useAuthenticateUser } from "../../hooks/useAuthenticateUser";
import TemporaryConnectAccount from "./TemporaryConnectAccount.tsx";

const AccountLogoContainer = styled("div")`
  cursor: pointer;
  margin-right: 3.125rem;
`;

const StyledConnector = styled("div")`
  alignitems: center;
  display: flex;
  flexdirection: column;
  height: auto;
  justifycontent: center;
  marginleft: auto;
  marginright: auto;
  padding: 1.25rem 0.3125rem;
  cursor: pointer;
`;

const styles = {
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
    padding: "1.25rem 0.3125rem",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "0.5rem",
    height: "1.875rem",
  },
};

function Account() {
  const { isAuthenticated, isAuthenticating, account, chainId, logout } =
    useMoralis();
  const { authenticateUser } = useAuthenticateUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated || !account) {
    return (
      <>
        <div>
          <TemporaryConnectAccount chain={1} />
          {/* <p style={styles.text}>Connect Wallet</p> */}
        </div>
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "0.9375rem",
            fontSize: "1.0625rem",
            fontWeight: "500",
          }}
          style={{
            fontSize: "1rem",
            fontWeight: "500",
          }}
          width="21.25rem"
          className="custom-modal-style"
        >
          <div
            style={{
              padding: "0.625rem",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "1.25rem",
            }}
          >
            <Spin spinning={isAuthenticating}> Connect Wallet </Spin>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => {
              const provider: any = connectorId;
              return (
                <StyledConnector
                  key={key}
                  onClick={async () => {
                    try {
                      await authenticateUser(
                        {
                          provider: provider,
                          signingMessage: "Pizza Authentication",
                        },
                        connectorId,
                      );

                      setIsAuthModalVisible(false);
                    } catch (e: any) {
                      console.log(e);
                      <Alert message={e.message} type="warning" closable />;
                    }
                  }}
                >
                  <img src={icon} alt={title} style={styles.icon} />
                  <Text style={{ fontSize: "0.875rem" }}>{title}</Text>
                </StyledConnector>
              );
            })}
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <AccountLogoContainer onClick={() => setIsModalVisible(true)}>
        <CustomImg width={"2.4375rem"} height={"2.4375rem"} src={AccountLogo} />
      </AccountLogoContainer>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "0.9375rem",
          fontSize: "1.0625rem",
          fontWeight: "500",
        }}
        style={{ fontSize: "1rem", fontWeight: "500" }}
        width="25rem"
      >
        Account
        <Card
          style={{
            marginTop: "0.625rem",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "0.9375rem" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "1.25rem" }}
          />
          <div style={{ marginTop: "0.625rem", padding: "0 0.625rem" }}>
            <a
              href={`${getExplorer(chainId ? chainId : "")}/address/${account}`}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#3e389f" }}
            >
              <SelectOutlined
                style={{ marginRight: "0.3125rem", color: "#3e389f" }}
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
            marginTop: "0.625rem",
            borderRadius: "0.5rem",
            fontSize: "1rem",
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
