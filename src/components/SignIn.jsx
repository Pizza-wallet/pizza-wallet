import { useMoralis } from "react-moralis";
import "antd/dist/antd.css";
import "../style.css";
import { Spin, Dropdown, Button, Menu, Modal } from "antd";
import Text from "antd/lib/typography/Text";
import { DownOutlined } from "@ant-design/icons";
// import { connectors } from "./Account/config";
import Account from "components/Account/Account";
import apple from "./Account/WalletIcons/apple.svg";
import google from "./Account/WalletIcons/google.svg";
import twitter from "./Account/WalletIcons/twitter.svg";
import facebook from "./Account/WalletIcons/facebook.svg";
import github from "./Account/WalletIcons/github.svg";
import discord from "./Account/WalletIcons/discord.svg";
import reddit from "./Account/WalletIcons/reddit.svg";
import twitch from "./Account/WalletIcons/twitch.svg";
import linked from "./Account/WalletIcons/linked.svg";
import line from "./Account/WalletIcons/line.svg";
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Chains/Logos";
// import Logo from "./Account/WalletIcons/Web3Auth.svg";
import { useState } from "react";
// import { Web3AuthCore } from "@web3auth/core";
// import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
// import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { validateEmail } from "../helpers/utils";

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

export default function SignIn({ web3AuthCore, chain, setchain, selected }) {
  const { authError, isAuthenticating } = useMoralis();
  // const [selected, setSelected] = useState({});
  // const [chain, setchain] = useState("");
  // const [web3AuthCore, setweb3AuthCore] = useState("");
  const [visible, setVisibility] = useState(false);
  const [email, setEmail] = useState("");
  const [viewMoreOptions, setViewMoreOptions] = useState(false);

  const socialOptions = [
    { name: "apple", src: apple },
    { name: "google", src: google },
    { name: "twitter", src: twitter },
    { name: "facebook", src: facebook },
    { name: "github", src: github },
  ];
  const moreSocialOptions = [
    // different social logins to go here
    { name: "discord", src: discord },
    { name: "reddit", src: reddit },
    { name: "twitch", src: twitch },
    { name: "linkedin", src: linked },
    { name: "line", src: line },
  ];

  console.log("chain", chain);

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

  const handleSocialLogin = async (provider) => {
    try {
      if (provider == "email_passwordless") {
        // check email and provide error message if invalid.
        if (validateEmail(email)) {
          // re-initialise web3 with email here?
          await web3AuthCore.connectTo("openlogin", {
            loginProvider: provider,
            extraLoginOptions: {
              login_hint: email,
            },
          });
        } else {
          // show pop-up need to add valid email
        }
      } else {
        await web3AuthCore.connectTo("openlogin", {
          loginProvider: provider,
        });
      }

      window.localStorage.setItem("connectorId", "web3Auth");
    } catch (e) {
      // error handling here
      console.log("error from custom login - ", e);
    }
  };

  const showSocialOptions = (options) => {
    return options.map((val) => (
      <img
        onClick={() => handleSocialLogin(val.name)}
        src={val.src}
        alt="logo"
        width={40}
        height={40}
      />
    ));
  };

  const handleLogout = async () => {
    await web3AuthCore.logout();
  };

  console.log("web3AuthCore from SignIn - ", web3AuthCore);
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
            <div style={styles.socialicons} onClick={() => setVisibility(true)}>
              <img src={apple} alt="logo" />
              <img src={google} alt="logo" />
              <img src={twitter} alt="logo" />
              <img src={facebook} alt="logo" />
              <img src={github} alt="logo" />
              <Text>and more</Text>
            </div>
            <button
              style={styles.loginButton}
              onClick={() => setVisibility(true)}
            >
              Social Login with Web3Auth
            </button>
          </div>
          <span style={{ fontSize: "1em", fontWeight: "600" }}>OR</span>
          <button style={styles.loginButton}>
            <Account />
          </button>
        </div>
      </div>
      <button onClick={handleLogout}>logout</button>
      <Modal
        title={
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "10px", marginTop: "5px" }}>
              <img style={styles.img} src="pizza.svg" width={35} height={35} />
            </div>
            <div>
              <h3>Signin</h3>
              <h5>Select one of the following to continue</h5>
            </div>
          </div>
        }
        visible={visible}
        width={375}
        onCancel={() => setVisibility(false)}
        footer={
          <div
            style={{
              float: "left",
              fontSize: "11px",
              marginBottom: "10px",
              marginLeft: "10px",
            }}
          >
            <p>Terms of use | Privacy policy</p>
          </div>
        }
      >
        <div style={styles.socialicons}>{showSocialOptions(socialOptions)}</div>

        {viewMoreOptions && (
          <div style={styles.socialicons}>
            {showSocialOptions(moreSocialOptions)}
          </div>
        )}

        <p
          style={{
            float: "right",
            fontSize: "12px",
            cursor: "pointer",
            marginRight: "20px",
            marginTop: "10px",
          }}
          onClick={() => setViewMoreOptions(!viewMoreOptions)}
        >
          View {viewMoreOptions ? "less" : "more"} options
        </p>
        <div style={{ marginTop: "40px" }}>
          <div
            style={{
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "1.5em",
              marginBottom: "8px",
            }}
          >
            EMAIL
          </div>
          <input
            style={{
              background: "#393938",
              border: "1px solid #27282d",
              boxSizing: "border-box",
              boxShadow: "inset 2px 2px 10px rgba(0, 0, 0, 0.4)",
              borderRadius: "24px",
              padding: "0 28px",
              height: "48px",
              width: "100%",
              fontSize: "16px",
              marginBottom: "16px",
            }}
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div
            style={{
              backgroundColor: "#2f3136",
              border: "1px solid #404145",
              boxSizing: "border-box",
              boxShadow: "2px 2px 12px rgb(3 100 255 / 5%)",
              borderRadius: "24px",
              height: "48px",
              width: "100%",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#65676f",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={() => handleSocialLogin("email_passwordless")}
          >
            <div
              style={{
                textAlign: "center",
                verticalAlign: "middle",
                lineHeight: "45px",
                cursor: "pointer",
              }}
            >
              Continue with Email
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
