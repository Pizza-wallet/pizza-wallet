import LIFI from "@lifi/sdk";
import React, { createContext, useContext, useMemo } from "react";

let lifi: LIFI;

const LIFIContext = createContext<LIFI>(null!);

export const useLiFi = (): LIFI => useContext(LIFIContext);

export const LIFIProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const value = useMemo(() => {
    const config = {};
    if (!lifi) {
      lifi = new LIFI({
        disableVersionCheck: true,
        ...config,
      });
    }
    lifi.setConfig(config);
    return lifi;
  }, []);

  return <LIFIContext.Provider value={value}>{children}</LIFIContext.Provider>;
};
