import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "./components/Account/Account";
import ERC20Balance from "./components/ERC20Balance";
// import NFTBalance from "./components/NFTBalance";
import ERC20Transfers from "./components/ERC20Transfers";
import DEX from "./components/DEX";
import Wallet from "./components/Wallet";
import SignIn from "./components/SignIn";
import Onramper from "./components/Onramper";
import { Layout, Alert } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "./components/NativeBalance";
import "./style.css";
import MenuItems from "./components/MenuItems";
import PizzaWalletLogo from "./assets/pizza-wallet-logo.svg";
import styled from "styled-components";

const { Header, Sider, Content } = Layout;

const BackdropStyled = styled("div")`
  position: absolute;
  right: 32px;
  top: 8px;
  height: 117px;
  width: 215px;
  border: 1.5px solid #3e389f;
  background: white;
  border-radius: 15px;
`;

const BalanceContainerStyled = styled("div")`
  width: 220px;
  height: 120px;
  border: 1.5px solid #3e389f;
  border-radius: 15px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background-color: #faf5ef;
  margin-top: 35px;
`;

const BalanceTitleStyled = styled("div")`
  height: 40px;
  background-color: #3e389f;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const BalanceTextStyled = styled("p")`
  font-weight: bold;
  font-size: 18px;
  color: #faf5ef;
  padding: 5px;
`;

const styles = {
  content: {
    padding: "10px",
    height: "100vh",
    width: "100%",
  },
  header: {
    zIndex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    // borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    // boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    float: "right",
    gap: "8px",

    fontSize: "15px",
    fontWeight: "600",
  },
  errorDiv: {
    width: "100%",
    display: "flex",
    marginTop: "1em",
    justifyContent: "center",
  },
  bglogin: {
    height: "100vh",
    display: "grid",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(90deg, #1eb7ef, #b114fb)",
  },
};

const App = () => {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    authError,
  } = useMoralis();

  const [collapsedSideBar, setCollapsedSideBar] = useState(false);

  useEffect(() => {
    type Web3ProviderType = any;
    const connectorId: Web3ProviderType =
      window.localStorage.getItem("connectorId");
    const chainId: number = Number(window.localStorage.getItem("chainId"));
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({
        provider: connectorId,
        clientId:
          "BKHvc6j0wd4pp3KVIMfHBjGPkz-4gQo5HA7LjLzRmzxV2cWVkjf1gyhmZwQAIKmezaq5mVhnphnkK-H29vrAEY4",
        // rpcTarget:
        //   "https://kovan.infura.io/v3/f79f2eecc6f1408692098c78dcbdf228",
        chainId: chainId,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  if (!isAuthenticated) {
    return (
      <Layout className="fade" style={styles.bglogin}>
        <SignIn />
      </Layout>
    );
  } else {
    return (
      <Layout style={{ height: "100vh" }} hasSider>
        <Router>
          <Sider
            width={293}
            breakpoint="sm"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
              setCollapsedSideBar(!collapsedSideBar);
            }}
            style={{
              zIndex: "1",
              height: "100vh",
              position: "fixed",
              width: "293px",
              backgroundColor: "#FFF5CE",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <div style={{ display: "flex" }}>
              <Logo />
            </div>
            <div style={{ position: "relative" }}>
              <BackdropStyled></BackdropStyled>
              <BalanceContainerStyled>
                <BalanceTitleStyled>
                  <BalanceTextStyled>Balance</BalanceTextStyled>
                </BalanceTitleStyled>
                <NativeBalance />
              </BalanceContainerStyled>
            </div>
            <MenuItems />
          </Sider>
          <Layout
            style={{
              marginLeft: collapsedSideBar ? 0 : 293,
              backgroundColor: "#2C2A51",
            }}
          >
            <Header
              style={{
                marginTop: "32px",
                padding: 0,
                backgroundColor: "#2C2A51",
              }}
            >
              <div style={{ float: "right", marginRight: "10px" }}>
                <Account />
              </div>
            </Header>
            <Content
              style={{
                overflowY: "scroll",
                height: "100vh",
                paddingBottom: "20px",
                paddingTop: "70px",
              }}
            >
              {authError && (
                <div style={styles.errorDiv}>
                  <Alert message={authError.message} type="error" closable />
                </div>
              )}
              <div style={styles.content}>
                <Switch>
                  <Route path="/dashboard">
                    <ERC20Balance />
                  </Route>
                  <Route path="/transfer">
                    <Wallet />
                  </Route>
                  <Route path="/activity">
                    <ERC20Transfers />
                  </Route>
                  <Route path="/dex">
                    <DEX />
                  </Route>
                  <Route path="/onramper">
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Onramper />
                    </div>
                  </Route>
                  <Route path="/">
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route path="/home">
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route path="/nonauthenticated">
                    <>Please login using the "Authenticate" button</>
                  </Route>
                </Switch>
              </div>
            </Content>
          </Layout>
        </Router>
      </Layout>
    );
  }
};

export const Logo = () => (
  <div
    style={{
      display: "flex",
      padding: "10px",
      width: "235px",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "25px",
    }}
  >
    <img src={PizzaWalletLogo} alt="logo" />
  </div>
);

export default App;
