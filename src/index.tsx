import type { FC, PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import type { QueryClientProviderProps } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/queryClient";
import { LIFIProvider } from "./providers/LIFIProvider";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const QueryProvider = QueryClientProvider as FC<
  PropsWithChildren<QueryClientProviderProps>
>;

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <QueryProvider client={queryClient}>
    <LIFIProvider>
      <App />,
    </LIFIProvider>
  </QueryProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
