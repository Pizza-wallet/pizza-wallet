import { useState, useEffect, useCallback } from "react";
import { useMoralis, useChain } from "react-moralis";
import { Form } from "antd";
import LiFi from "./LiFi";
import { useChainsTokensTools } from "./providers/chainsTokensToolsProvider";
import { Chain, ChainKey, TokenAmountList, TokenAmount } from "../../types";
import SwapForm from "./SwapForm";

function DEX() {
  const { web3, account } = useMoralis();
  const { switchNetwork } = useChain();
  const chainsTokensTools = useChainsTokensTools();
  const [availableChains, setAvailableChains] = useState<Chain[]>(
    chainsTokensTools.chains,
  );
  const [tokens, setTokens] = useState<TokenAmountList>(
    chainsTokensTools.tokens,
  );
  const [balances, setBalances] = useState<{
    [ChainKey: string]: Array<TokenAmount>;
  }>();

  // From
  const [selectedFromChain, setSelectedFromChain] = useState<ChainKey>();
  const [fromToken, setFromToken] = useState<string>("");

  useEffect(() => {
    // get chains
    setAvailableChains(chainsTokensTools.chains);
  }, [chainsTokensTools.chains]);

  useEffect(() => {
    // get tokens
    setTokens(chainsTokensTools.tokens);
  }, [chainsTokensTools.tokens]);

  useEffect(() => {
    // get balances
    updateBalances();
  }, [account, tokens]);

  // Do we want chain to change here if changed in the header and vice versa?
  // useEffect(() => {
  //   if (chain && chainId) {
  //     const newFromChain = availableChains.find(
  //       (chain) => chain.id === Number(chainId),
  //     );
  //     setSelectedChain(newFromChain?.key);
  //   }
  // }, [chain]);

  const onChangeFromChain = (chainKey: ChainKey) => {
    const newFromChain = availableChains.find(
      (chain) => chain.key === chainKey,
    );
    setSelectedFromChain(newFromChain?.key);
  };

  const updateBalances = useCallback(async () => {
    if (account) {
      console.log("calling update balances with account - ", account);
      // one call per chain to show balances as soon as the request comes back
      Object.entries(tokens).forEach(([chainKey, tokenList]) => {
        LiFi.getTokenBalances(account, tokenList).then((portfolio: any) => {
          setBalances((balances) => {
            if (!balances) balances = {};
            return {
              ...balances,
              [chainKey]: portfolio,
            };
          });
        });
      });
    }
  }, [account, tokens]);

  const switchChainHook = (requiredChainId: number) => {
    // temporary fix this function should return type SwitchChainHook (check lifi code)
    type SwitchChainHook = any;
    switchNetwork(requiredChainId.toString());
    const signer: SwitchChainHook = web3?.getSigner();
    // return the associated Signer
    return signer;
  };

  const handleExecuteRoute = async () => {
    // example of how a route could be executed
    const routesRequestTest = {
      fromChainId: 3, // Ropsten
      fromAmount: "10000000000000000000", // 1
      fromTokenAddress: "0xe71678794fff8846bff855f716b0ce9d9a78e844", // TEST Token
      toChainId: 4, // Rinkeby
      toTokenAddress: "0x9ac2c46d7acc21c881154d57c0dc1c55a3139198", // TEST Token
    };

    const signer = web3?.getSigner();
    const routeResponse = await LiFi.getRoutes(routesRequestTest);
    console.log("routeResponse - ", routeResponse);
    const route = routeResponse.routes[0];
    console.log(">> Got Route");
    console.log(route);

    if (route && signer) {
      try {
        await LiFi.executeRoute(signer, route, { switchChainHook });
      } catch (e) {
        // Handle error here and show info to user
        console.log("error with executeRoute - ", e);
      }
    } else {
      console.log("cant find route show error to user");
    }
  };

  console.log("chains - ", availableChains);

  console.log("balances - ", balances);

  return (
    <>
      <div>
        <button style={{ color: "black" }} onClick={handleExecuteRoute}>
          Execute example route
        </button>
        <Form>
          <SwapForm
            availableChains={availableChains}
            selectedFromChain={selectedFromChain}
            onChangeFromChain={onChangeFromChain}
            setFromToken={setFromToken}
            fromToken={fromToken}
            tokens={tokens}
            balances={balances}
          />
        </Form>
      </div>
    </>
  );
}

export default DEX;
