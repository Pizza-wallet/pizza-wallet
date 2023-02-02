import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

// Wagmi Client
const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

ReactDOM.render(
  <StrictMode>
    <WagmiConfig client={client}>
      <App />,
    </WagmiConfig>
  </StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
