import { useState, useEffect } from "react";
import { useMoralis, useChain } from "react-moralis";
import LiFi from "./LiFi";
import { useChainsTokensTools } from "./providers/chainsTokensToolsProvider";
import { Chain } from "../../types";

function DEX() {
  const { web3 } = useMoralis();
  const { switchNetwork } = useChain();
  const chainsTokensTools = useChainsTokensTools();
  const [availableChains, setAvailableChains] = useState<Chain[]>(
    chainsTokensTools.chains,
  );

  useEffect(() => {
    // get chains
    setAvailableChains(chainsTokensTools.chains);
  }, [chainsTokensTools.chains]);

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

  return (
    <>
      <div>
        <button style={{ color: "black" }} onClick={handleExecuteRoute}>
          Execute example route
        </button>
      </div>
    </>
  );
}

export default DEX;
