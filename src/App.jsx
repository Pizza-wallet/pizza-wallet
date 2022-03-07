import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import ERC20Balance from "components/ERC20Balance";
import NFTBalance from "components/NFTBalance";
import DEX from "components/DEX";
import Wallet from "components/Wallet";
import { Layout, Tabs, Alert } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import MenuItems from "./components/MenuItems";
const { Header, Sider, Content } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    zIndex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
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

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <div style={{ display: "flex" }}>
            <Logo />
            <p
              style={{
                fontSize: "4em",
                margin: "15px",
                fontFamily: "Lobster Two",
              }}
              className="logotext"
            >
              Pizza
            </p>
          </div>
          <div style={styles.headerRight}>
            <Chains />
            <Account />
          </div>
        </Header>
        <Layout>
          <Sider width={"16em"}>
            <div
              style={{
                marginBottom: "5px",
                fontSize: "30px",
                bgcolor: "#434343",
              }}
            >
              <Text style={{ fontSize: "15px", margin: "10px" }} strong>
                Balance
              </Text>
              <NativeBalance />
            </div>
            <MenuItems />
          </Sider>
          <Content>
            {authError && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Alert message={authError.message} type="error" closable />
              </div>
            )}
            <div style={styles.content}>
              <Switch>
                <Route path="/wallet">
                  <Wallet />
                </Route>
                <Route path="/1inch">
                  <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                    <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                      <DEX chain="eth" />
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={<span>Binance Smart Chain</span>}
                      key="2"
                    >
                      <DEX chain="bsc" />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                      <DEX chain="polygon" />
                    </Tabs.TabPane>
                  </Tabs>
                </Route>
                <Route path="/dashboard">
                  <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                    <Tabs.TabPane tab={<span>Tokens</span>} key="1">
                      <ERC20Balance />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<span>NFTs</span>} key="2">
                      <NFTBalance />
                    </Tabs.TabPane>
                  </Tabs>
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
};

export const Logo = () => (
  <div style={{ display: "flex", paddingTop: "4px" }}>
    <img src="pizza.svg" alt="logo" />
  </div>
);

export default App;
