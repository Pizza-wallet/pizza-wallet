import { useEffect } from "react";
import Lifi from "@lifinance/sdk";
import { useMoralis, useChain } from "react-moralis";

function DEX() {
  const { web3 } = useMoralis();
  const { switchNetwork } = useChain();
  // Testnets are only enabled on the staging environment
  const config = {
    apiUrl: "https://staging.li.quest/v1/",
  };
  const lifi = new Lifi(config);

  useEffect(() => {
    async function fetchData() {
      // You can pass config in to getPossibilities to limit number of chains/bridges etc.
      const possibilities = await lifi.getPossibilities();
      // We should show this information in a dropdown menu?
      console.log("possibilities - ", possibilities);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchChainHook = (requiredChainId) => {
    switchNetwork(requiredChainId);
    const signer = web3.getSigner();
    // return the associated Signer
    return signer;
  };

  const handleExecuteRoute = async () => {
    // example of how a route could be executed
    const routesRequestTest = {
      fromChainId: 3, // Ropsten
      fromAmount: "1000000000000000000", // 1
      fromTokenAddress: "0x0000000000000000000000000000000000000000", // TEST Token
      toChainId: 4, // Rinkeby
      toTokenAddress: "0x0000000000000000000000000000000000000000", // TEST Token
    };

    const signer = web3.getSigner();
    const routeResponse = await lifi.getRoutes(routesRequestTest);
    console.log("routeResponse - ", routeResponse);
    const route = routeResponse.routes[0];
    console.log(">> Got Route");
    console.log(route);

    if (route) {
      try {
        await lifi.executeRoute(signer, route, { switchChainHook });
      } catch (e) {
        // Handle error here and show info to user
        console.log("error with executeRoute - ", e);
      }
    } else {
      console.log("cant find route show error to user");
    }
  };

  return (
    <>
      <div>
        <button style={{ color: "black" }} onClick={handleExecuteRoute}>
          Execute example route
        </button>
      </div>
      <iframe
        src="https://transferto.xyz/embed"
        title="lifi"
        className="iframe"
        frameBorder="no"
        style={{
          width: "450px",
          height: "690px",
          boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
          border: "1px solid #e7eaf3",
          background: "white",
          borderRadius: "1rem",
          marginTop: "-5em",
        }}
      />
    </>
  );
}

export default DEX;
