import type { FC, PropsWithChildren } from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import type { QueryClientProviderProps } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";
import { LIFIProvider } from "./providers/LIFIProvider";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Wallet from "./components/Wallet";
import connectors from "./components/Account/connectors";
import { Web3ReactProvider } from "@web3-react/core";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const QueryProvider = QueryClientProvider as FC<
  PropsWithChildren<QueryClientProviderProps>
>;

const Application = () => {
  const isServerInfo = APP_ID && SERVER_URL ? true : false;
  //Validate
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
    );
  if (isServerInfo) {
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <Web3ReactProvider connectors={connectors}>
          <App />{" "}
        </Web3ReactProvider>
      </MoralisProvider>
    );
  } else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Wallet />
      </div>
    );
  }
};

ReactDOM.render(
  <StrictMode>
    <QueryProvider client={queryClient}>
      <LIFIProvider>
        <Application />,
      </LIFIProvider>
    </QueryProvider>
  </StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
