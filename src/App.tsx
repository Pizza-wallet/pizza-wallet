import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useWeb3Auth, Web3AuthProvider } from "./providers/web3auth";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { WEB3AUTH_NETWORK_TYPE } from "./config/web3AuthNetwork";
import { CHAIN_CONFIG_TYPE } from "./config/chainConfig";
import { Layout, Spin } from "antd";
import "antd/dist/antd.css";
import PizzaWalletLogo from "./assets/pizza-wallet-logo.svg";
import styled from "styled-components";
import { ChainsTokensToolsProvider } from "./providers/chainsTokensToolsProvider";
import { IGroupedToken } from "./types";

const { Header, Sider, Content } = Layout;

const ERC20Transfers = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'ERC20Transfers'*/
      /*webpackPrefetch: true */ "./components/ERC20Transfers/utils"
    ),
);
const ERC20Balance = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'ERC20Balance'*/
      /*webpackPrefetch: true */ "./components/ERC20Balance/ERC20Balance"
    ),
);
const DEX = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'DEX'*/
      /*webpackPrefetch: true */ "./components/Dex-lifi"
    ),
);
const Account = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'Account'*/
      /*webpackPrefetch: true */ "./components/Account/Account"
    ),
);
const Transfer = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'Transfers'*/
      /*webpackPrefetch: true */ "./components/Wallet/components/Transfer"
    ),
);
const Onramper = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'Onramper'*/
      /*webpackPrefetch: true */ "./components/Onramper"
    ),
);
const TotalBalance = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'NativeBalance'*/
      /*webpackPrefetch: true */ "./components/TotalBalance"
    ),
);
const SignIn = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'SignIn'*/
      /*webpackPrefetch: true */ "./components/SignIn"
    ),
);
const MenuItems = React.lazy(
  () =>
    import(
      /* webpackChunkName: 'MenuItems'*/
      /*webpackPrefetch: true */ "./components/MenuItems"
    ),
);

const BackdropStyled = styled("div")`
  position: absolute;
  right: 2rem;
  top: 0.5rem;
  height: 7.3125rem;
  width: 13.4375rem;
  border: 0.125rem solid #3e389f;
  background-color: var(--layout-white);
  border-radius: 0.9375rem;
`;

const BalanceContainerStyled = styled("div")`
  width: 13.75rem;
  height: 7.5rem;
  border: 0.125rem solid #3e389f;
  border-radius: 0.9375rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background-color: var(--layout-white);
  margin-top: 2.1875rem;
`;

const BalanceTitleStyled = styled("div")`
  height: 2.5rem;
  background-color: rgba(77, 195, 89, 0.7);
  border-top-left-radius: 0.9375rem;
  border-top-right-radius: 0.9375rem;
  border: 0.125rem solid #3e389f;
  border-bottom: 0.125rem solid #3e389f;
  margin: -0.125rem;
`;

const BalanceTextStyled = styled("p")`
  font-weight: bold;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 1.5rem;
  color: #3e389f;
  padding-top: 0.125em;
  padding-left: 0.5375em;
  -webkit-text-stroke: thin;
`;

const GridLayout = styled(Layout)`
  height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;
  background: var(--layout-blue);
`;

const StyledContent = styled(Content)`
  overflow-y: auto;
  padding-bottom: 1.25rem;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
  }
`;

const styles = {
  content: {
    padding: "0.625rem",
    width: "100%",
  },
  errorDiv: {
    width: "100%",
    display: "flex",
    marginTop: "1em",
    justifyContent: "center",
  },
};

const App = () => {
  const { provider } = useWeb3Auth();
  const [web3AuthNetwork, setWeb3AuthNetwork] =
    useState<WEB3AUTH_NETWORK_TYPE>("mainnet");
  const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("ethereum");
  const [collapsedSideBar, setCollapsedSideBar] = useState(false);
  const [totalBalance, setTotalBalance] = useState<string>();
  const [balances, setBalances] = useState<IGroupedToken[]>([]);
  const [showDashBoard, setShowDashboard] = useState(true);

  useEffect(() => {
    !provider ? setShowDashboard(false) : setShowDashboard(true);
  }, [provider]);

  if (!showDashBoard) {
    return (
      <GridLayout>
        <React.Suspense
          fallback={<Spin size="large" style={{ color: "#3e389f" }}></Spin>}
        >
          <SignIn />
        </React.Suspense>
      </GridLayout>
    );
  } else {
    return (
      <Web3AuthProvider web3AuthNetwork={"mainnet"} chain={"ethereum"}>
        <ChainsTokensToolsProvider>
          <Layout style={{ height: "100vh" }} hasSider>
            <React.Suspense
              fallback={
                <GridLayout>
                  <Spin size="large" style={{ color: "#3e389f" }}></Spin>
                </GridLayout>
              }
            >
              <Router>
                <Sider
                  width={293}
                  breakpoint="md"
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
                    width: "18.3125rem",
                    backgroundColor: "#F8F2ED",
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
                      <TotalBalance totalBalance={totalBalance} />
                    </BalanceContainerStyled>
                  </div>
                  <MenuItems />
                </Sider>
                <Layout
                  style={{
                    marginLeft: collapsedSideBar ? 0 : 293,
                    backgroundColor: "#2F2A75",
                  }}
                >
                  <Header
                    style={{
                      marginTop: "2rem",
                      padding: 0,
                      backgroundColor: "#2F2A75",
                    }}
                  >
                    <div style={{ float: "right", marginRight: "0.625rem" }}>
                      <Account />
                    </div>
                  </Header>
                  <StyledContent>
                    <div style={styles.content}>
                      <Switch>
                        <Route path="/dashboard">
                          <ERC20Balance
                            setTotalBalance={setTotalBalance}
                            setBalances={setBalances}
                            balances={balances}
                          />
                        </Route>
                        <Route path="/transfer">
                          <Transfer />
                        </Route>
                        <Route path="/activity">
                          <ERC20Transfers />
                        </Route>
                        <Route path="/dex">
                          <DEX />
                        </Route>
                        <Route path="/onramper">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
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
                  </StyledContent>
                </Layout>
              </Router>
            </React.Suspense>
          </Layout>
        </ChainsTokensToolsProvider>
      </Web3AuthProvider>
    );
  }
};

export const Logo = () => (
  <div
    style={{
      display: "flex",
      padding: "0.625rem",
      width: "14.6875rem",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "1.5625rem",
    }}
  >
    <img src={PizzaWalletLogo} alt="logo" />
  </div>
);

export default App;
