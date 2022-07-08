import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ChainsTokensToolsProvider } from "./components/Dex/providers/chainsTokensToolsProvider";
import Account from "./components/Account/Account";
import Chains from "./components/Chains";
import ERC20Balance from "./components/ERC20Balance";
import NFTBalance from "./components/NFTBalance";
import ERC20Transfers from "./components/ERC20Transfers";
import DEX from "./components/Dex/DEX";
import Onramp from "./components/Onramp";
import Wallet from "./components/Wallet";
import SignIn from "./components/SignIn";
import { Layout, Tabs, Alert } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "./components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import MenuItems from "./components/MenuItems";
const { Header, Sider, Content } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
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
    // borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    // boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  siderBalance: {
    margin: "15px",
    fontSize: "30px",
    borderRadius: "1em",
    backgroundColor: "#141414",
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

  useEffect(() => {
    type Web3ProviderType = any;
    const connectorId: Web3ProviderType =
      window.localStorage.getItem("connectorId");
    const chainId = Number(window.localStorage.getItem("chainId"));
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({
        provider: connectorId,
        clientId:
          "BE2p8-JooSSoekLwDP-cdFgGLrCDGOC_5F-VgtHYY1I7BG0OzuVbDlNQVZJlC-b37ZI_rnVNt4Q2gAVQovvY3CI",
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
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <Router>
          <Header className="fade" style={styles.header}>
            <div style={{ display: "flex" }}>
              <Logo />
              <p className="logotext">Pizza</p>
            </div>
            <div style={styles.headerRight}>
              <Chains />
              <Account />
            </div>
          </Header>
          <Layout className="fade" style={{ backgroundColor: "#1f1f1f" }}>
            <Sider width={"16em"}>
              <div style={styles.siderBalance}>
                <Text style={{ fontSize: "15px", margin: "10px" }} strong>
                  Balance
                </Text>
                <NativeBalance />
              </div>
              <MenuItems />
            </Sider>
            <Content id="internal">
              {authError && (
                <div style={styles.errorDiv}>
                  <Alert message={authError.message} type="error" closable />
                </div>
              )}
              <div style={styles.content}>
                <Switch>
                  <Route path="/wallet">
                    <Wallet />
                  </Route>
                  <Route path="/dex">
                    <ChainsTokensToolsProvider>
                      <DEX />
                    </ChainsTokensToolsProvider>
                  </Route>
                  <Route path="/erc20transfers">
                    <ERC20Transfers />
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
                  <Route path="/onramp">
                    <Onramp />
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
  <div style={{ display: "flex", paddingTop: "4px" }}>
    <img src="pizza.svg" alt="logo" />
  </div>
);

export default App;
