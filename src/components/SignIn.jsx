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
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Chains/Logos";
// import Logo from "./Account/WalletIcons/Web3Auth.svg";
import { useState, useEffect } from "react";
import { Web3AuthCore } from "@web3auth/core";
import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

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
  const { authError, isAuthenticating } = useMoralis();
  const [selected, setSelected] = useState({});
  const [chain, setchain] = useState("");
  const [web3AuthCore, setweb3AuthCore] = useState("");
  const [visible, setVisibility] = useState(false);

  console.log("chain", chain);

  const subscribeAuthEvents = (web3auth) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
      console.log("Yeah!, you are successfully logged in", data);
    });

    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log("connecting");
    });

    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log("disconnected");
    });

    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log("some error or user have cancelled login request", error);
    });
  };

  const configureAdapters = (web3Auth) => {
    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        network: "testnet", // detect environment and change between test and mainnet
        clientId:
          "BE2p8-JooSSoekLwDP-cdFgGLrCDGOC_5F-VgtHYY1I7BG0OzuVbDlNQVZJlC-b37ZI_rnVNt4Q2gAVQovvY3CI",
        uxMode: "popup",
      },
      loginSettings: {
        relogin: false,
      },
    });

    web3Auth.configureAdapter(openloginAdapter);
  };

  useEffect(() => {
    if (!chain) return null;
    const newSelected = menuItems.find((item) => item.key === chain);
    setSelected(newSelected);
    console.log("current chainId: ", chain);

    const web3Auth = new Web3AuthCore({
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155, // This should be selected based on chain selected
        chainId: `${chain}` || "0x2a",
      },
      authMode: "DAPP",
      clientId:
        "BE2p8-JooSSoekLwDP-cdFgGLrCDGOC_5F-VgtHYY1I7BG0OzuVbDlNQVZJlC-b37ZI_rnVNt4Q2gAVQovvY3CI",
    });

    // Initialize custom login each time the chain changes.
    subscribeAuthEvents(web3Auth);
    configureAdapters(web3Auth);
    web3Auth.init();

    // Then save instance in state -
    setweb3AuthCore(web3Auth);
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

  const handleSocialLogin = async (provider) => {
    try {
      await web3AuthCore.connectTo("openlogin", {
        loginProvider: provider,
      });
      window.localStorage.setItem("connectorId", "web3Auth");
    } catch (e) {
      // error handling here
      console.log("error from custom login - ", e);
    }
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
        <div style={styles.socialicons}>
          <img
            onClick={() => handleSocialLogin("apple")}
            src={apple}
            alt="logo"
          />
          <img
            onClick={() => handleSocialLogin("google")}
            src={google}
            alt="logo"
          />
          <img
            onClick={() => handleSocialLogin("twitter")}
            src={twitter}
            alt="logo"
          />
          <img
            onClick={() => handleSocialLogin("facebook")}
            src={facebook}
            alt="logo"
          />
          <img
            onClick={() => handleSocialLogin("github")}
            src={github}
            alt="logo"
          />
        </div>
      </Modal>
    </div>
  );
}
