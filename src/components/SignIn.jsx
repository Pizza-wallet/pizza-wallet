import { useMoralis } from "react-moralis";
import "antd/dist/antd.css";
import "../style.css";
import { Spin, Dropdown, Button, Menu, Alert } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import LoginChain from "./Chains/LoginChain";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Chains/Logos";
// import Logo from "./Account/WalletIcons/Web3Auth.svg";
import { useState, useEffect } from "react";

const styles = {
  card: {
    width: "250px",
    height: "250px",
    backgroundColor: "#434343",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    justifyContent: "space-between",
    textAlign: "center",
  },
  topdiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    backgroundImage: "linear-gradient(90deg, #0364ff, #1ac7fe)",
    width: "100%",
    cursor: "pointer",
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
      chainId: `${chain}`,
      appLogo: "pizza.svg",
    });
  };

  return (
    <div style={styles.card}>
      <div style={styles.topdiv}>
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
      {isAuthenticating && <Spin />}
      {authError && <Alert warning>{JSON.stringify(authError.message)}</Alert>}
      <div style={styles.buttonCard}>
        <button style={styles.loginButton} onClick={handleCustomLogin}>
          Login with Web3Auth
        </button>
      </div>
    </div>
  );
}
