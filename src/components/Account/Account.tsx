import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import { useMoralis } from "react-moralis";
//import { Spin, Alert } from "antd";
import { Button, Card, Modal } from "antd";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "../../helpers/networks";
//import Text from "antd/lib/typography/Text";
import { CustomImg } from "../reusable/CustomImg";
import AccountLogo from "../../assets/account-logo.svg";
import styled from "styled-components";
import { useWeb3Auth } from "../../providers/web3Auth";

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
  const { logout } = useWeb3Auth();
  const { account, chainId } = useMoralis();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          onClick={logout}
        >
          Logout
        </Button>
      </Modal>
    </>
  );
}

export default Account;
