import { useState } from "react";
import { useMoralis } from "react-moralis";
import "antd/dist/antd.css";
import "../style.css";
import { Spin } from "antd";
import Text from "antd/lib/typography/Text";
import apple from "./Account/WalletIcons/apple.svg";
import google from "./Account/WalletIcons/google.svg";
import twitter from "./Account/WalletIcons/twitter.svg";
import facebook from "./Account/WalletIcons/facebook.svg";
import github from "./Account/WalletIcons/github.svg";

const styles = {
  account: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  web3: {
    width: "350px",
    height: "450px",
  },
  card: {
    width: "350px",
    height: "300px",
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
    padding: "10px",
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

export default function SignIn() {
  const { authenticate, isAuthenticating } = useMoralis();
  const [chain] = useState("");

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId:
        "BE2p8-JooSSoekLwDP-cdFgGLrCDGOC_5F-VgtHYY1I7BG0OzuVbDlNQVZJlC-b37ZI_rnVNt4Q2gAVQovvY3CI",
      chainId: `${chain}` || "0x2a",
      appLogo: "pizza.svg",
    });
    window.localStorage.setItem("connectorId", "web3Auth");
    window.localStorage.setItem("chainId", chain || "0x1");
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
          <img style={styles.img} src="pizza.svg" width={100} height={100} />
        </div>
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
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
