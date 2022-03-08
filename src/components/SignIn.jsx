import { useMoralis } from "react-moralis";
import "antd/dist/antd.css";
// import styles from "../styles/Home.module.css";
import Logo from "./Account/WalletIcons/Web3Auth.svg";
// import { useState } from "react";

const styles = {
  backgroundParent: {
    height: "100vh",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(90deg, #1ac7fe, #b114fb)",
  },
  card: {
    width: "250px",
    height: "250px",
    backgroundColor: "white",
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    justifyContent: "space-between",
    textAlign: "center",
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
  error: {
    color: "red",
    fontSize: "10px",
  },
  green: {
    color: "green",
  },
  img: {
    objectFit: "contain",
  },
  input: {
    padding: "10px",
    borderRadius: "20px",
    marginBottom: "20px",
  },
};

export default function SignIn() {
  const { authenticate, authError, isAuthenticating, Moralis } = useMoralis();

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId: "",
      chainId: Moralis.Chains.ETH_KOVAN,
    });
  };

  return (
    <div className={styles.card}>
      <img className={styles.img} src={Logo} width={80} height={80} />
      {isAuthenticating && <p className={styles.green}>Authenticating</p>}
      {authError && (
        <p className={styles.error}>{JSON.stringify(authError.message)}</p>
      )}
      <div className={styles.buttonCard}>
        <button className={styles.loginButton} onClick={handleCustomLogin}>
          Login with Web3Auth
        </button>
      </div>
    </div>
  );
}
