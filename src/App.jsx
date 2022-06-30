import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Web3 from "web3";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import ERC20Balance from "components/ERC20Balance";
import NFTBalance from "components/NFTBalance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import Bridge from "components/Bridge";
import Onramp from "components/Onramp";
import Wallet from "components/Wallet";
import SignIn from "components/SignIn";
import { Layout, Tabs, Alert } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import MenuItems from "./components/MenuItems";
import { Web3AuthCore } from "@web3auth/core";
import { CHAIN_NAMESPACES, ADAPTER_EVENTS } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import {
  AvaxLogo,
  PolygonLogo,
  BSCLogo,
  ETHLogo,
} from "./components/Chains/Logos";

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

const App = () => {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    authError,
  } = useMoralis();

  const [web3AuthCore, setWeb3AuthCore] = useState("");
  const [selected, setSelected] = useState({});
  const [chain, setchain] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  async function fetchUserData() {
    // connecting to web3AuthCore provider here
    const web3 = new Web3(web3AuthCore.provider);
    console.log("conncted to web3 - ", web3);
    console.log("is web3 enabled - ", isWeb3Enabled);

    const accounts = await web3.eth.getAccounts();
 
    // need to wrap above web3 somehow like below - 
    //const moralis = new Moralis(web3)
    console.log("user accounts from web3 - ", accounts);

  }
  useEffect(() => {
    console.log("web3authCore here - ", web3AuthCore);

    const connectorId = window.localStorage.getItem("connectorId");
    if (authenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({
        provider: connectorId,
        clientId:
          "BE2p8-JooSSoekLwDP-cdFgGLrCDGOC_5F-VgtHYY1I7BG0OzuVbDlNQVZJlC-b37ZI_rnVNt4Q2gAVQovvY3CI",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, isWeb3Enabled]);

  const subscribeAuthEvents = (web3auth) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, (data) => {
      console.log("Yeah!, you are successfully logged in", data);
      setAuthenticated(true);
    });

    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log("connecting");
    });

    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log("disconnected");
      setAuthenticated(false);
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
        // extraLoginOptions: {
        //   login_hint: email,
        // },
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
    setWeb3AuthCore(web3Auth);
  }, [chain]);

  console.log("provider - ", web3AuthCore.provider);

  if (!isAuthenticated) {
    return (
      <Layout className="fade" style={styles.bglogin}>
        <button onClick={fetchUserData}>fetch user data</button>
        <SignIn
          web3AuthCore={web3AuthCore}
          chain={chain}
          setchain={setchain}
          setAuthenticated={setAuthenticated}
          selected={selected}
        />
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
                  <Route path="/1inch">
                    <div id="floater-dex">
                      <Tabs
                        defaultActiveKey="1"
                        style={{ alignItems: "center" }}
                      >
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
                    </div>
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
                  <Route path="/bridge">
                    <Bridge />
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
