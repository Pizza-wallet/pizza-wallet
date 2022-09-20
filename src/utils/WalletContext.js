import { useState, createContext } from "react";

export const WalletContext = createContext();

export default function WalletContextProvider({ children }) {
  const [wallet, setWallet] = useState(null); // wallet object.

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
