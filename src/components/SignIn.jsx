import { useMoralis } from "react-moralis";
import "antd/dist/antd.css";
import "../style.css";
import { Spin, Dropdown, Button, Menu } from "antd";
import Text from "antd/lib/typography/Text";
import { DownOutlined } from "@ant-design/icons";
// import { connectors } from "./Account/config";
import Account from "components/Account/Account";
import apple from "./Account/WalletIcons/apple.svg";
import google from "./Account/WalletIcons/google.svg";
import twitter from "./Account/WalletIcons/twitter.svg";
import facebook from "./Account/WalletIcons/facebook.svg";
import github from "./Account/WalletIcons/github.svg";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Chains/Logos";
// import Logo from "./Account/WalletIcons/Web3Auth.svg";
import { useState, useEffect } from "react";

const styles = {
  account: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  web3: {
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    width: "350px",
    height: "450px",
  },
  card: {
    width: "350px",
    height: "520px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    justifyContent: "space-between",
    textAlign: "center",
  },
  topdiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  socialicons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "end",
    paddingBottom: "1em",
    cursor: "pointer",
  },
  buttonCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  loginButton: {
    padding: "10px",
    borderRadius: "20px",
    borderWidth: "0px",
    color: "white",
    backgroundImage: "linear-gradient(90deg, #0364ff, #1eb7ef)",
    width: "100%",
    cursor: "pointer",
    fontWeight: "600",
  },
  green: {
    color: "green",
  },
  img: {
    justifySelf: "center",
    objectFit: "contain",
  },
  input: {
    padding: "10px",
    borderRadius: "20px",
    marginBottom: "20px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
    margin: "12px",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
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
};

const menuItems = [
  {
    key: "0x2a",
    value: "Kovan Testnet",
    icon: <ETHLogo />,
  },
  {
    key: "0x61",
    value: "BSC Testnet",
    icon: <BSCLogo />,
  },
  {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
  },
  {
    key: "0xa869",
    value: "Avalanche Testnet",
    icon: <AvaxLogo />,
  },
];

export default function SignIn() {
  const { authenticate, authError, isAuthenticating } = useMoralis();
  const [selected, setSelected] = useState({});
  const [chain, setchain] = useState("");

  console.log("chain", chain);

  useEffect(() => {
    if (!chain) return null;
    const newSelected = menuItems.find((item) => item.key === chain);
    setSelected(newSelected);
    console.log("current chainId: ", chain);
  }, [chain]);

  const handleMenuClick = (e) => {
    setchain(e.key);
    console.log(`${chain}`);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: "5px" }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId:
        "BAlJwJl_Lq6hQodeCZZclImL8BGkXmE0rUxXXUvCzk38nRAu--EOTPAWueiAVkdBmj6tK2YPAYcR2WHEe4x5N1U",
      chainId: `${chain}` || "0x2a",
      appLogo: "pizza.svg",
    });
  };

  return (
    <div style={styles.account}>
      <div className="glass-card" style={styles.card}>
        <div style={styles.topdiv}>
          <div
            style={{
              marginTop: "-10px",
              paddingBottom: "10px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            <Spin spinning={isAuthenticating}> Login </Spin>
          </div>
          <img style={styles.img} src="pizza.svg" width={80} height={80} />
        </div>
        <div style={styles.topdiv}>
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              key={selected?.key}
              icon={selected?.icon}
              style={{ ...styles.button, ...styles.item }}
            >
              <span style={{ marginLeft: "5px" }}>
                {selected?.value || "Choose chain"}
              </span>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        {authError && alert(JSON.stringify(authError.message))}
        <div>
          <div style={styles.buttonCard}>
            <div style={styles.socialicons} onClick={handleCustomLogin}>
              <img src={apple} alt="logo" />
              <img src={google} alt="logo" />
              <img src={twitter} alt="logo" />
              <img src={facebook} alt="logo" />
              <img src={github} alt="logo" />
              <Text>and more</Text>
            </div>
            <button style={styles.loginButton} onClick={handleCustomLogin}>
              Social Login with Web3Auth
            </button>
          </div>
          <span style={{ fontSize: "1em", fontWeight: "600" }}>OR</span>
          <button style={styles.loginButton}>
            <Account />
          </button>
        </div>
      </div>

      {/* <div className="glass-card" style={styles.web3}>
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
                } catch (e) {
                  console.log(e);
                  alert(e.message);
                }
              }}
            >
              <img src={icon} alt={title} style={styles.icon} />
              <Text style={{ fontSize: "14px" }}>{title}</Text>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
