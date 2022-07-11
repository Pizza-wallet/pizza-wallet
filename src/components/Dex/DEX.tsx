import "./dex.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { useMoralis, useChain } from "react-moralis";
import { Form, Row, Typography } from "antd";
import LiFi from "./LiFi";
import { useChainsTokensTools } from "./providers/chainsTokensToolsProvider";
import {
  Chain,
  ChainKey,
  TokenAmountList,
  TokenAmount,
  RoutesRequest,
  Route as RouteType,
  RoutesResponse,
} from "../../types";
import SwapForm from "./SwapForm";
import BigNumber from "bignumber.js";
import RouteList from "./RouteList";

let currentRouteCallId: number;

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

  const transactionInfoRef = useRef<null | HTMLDivElement>(null);

  // Routes
  const [routes, setRoutes] = useState<Array<RouteType>>([]);
  const [routesLoading, setRoutesLoading] = useState<boolean>(false);
  const [noRoutesAvailable, setNoRoutesAvailable] = useState<boolean>(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteType | undefined>();
  const [routeCallResult, setRouteCallResult] = useState<{
    result: RoutesResponse;
    id: number;
  }>();

  // From
  const [selectedFromChain, setSelectedFromChain] = useState<ChainKey>();
  const [fromTokenAddress, setFromTokenAddress] = useState<string>("");
  const [fromAmount, setFromAmount] = useState<BigNumber>(new BigNumber(0));

  // To
  const [selectedToChain, setSelectedToChain] = useState<ChainKey>();
  const [toTokenAddress, setToTokenAddress] = useState<string>("");
  const [toAmount, setToAmount] = useState<BigNumber>(new BigNumber(Infinity));

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

  const getChain = (chainKey: ChainKey) => {
    return availableChains.find((chain) => chain.key === chainKey);
  };

  const onChangeFromChain = (chainKey: ChainKey) => {
    const newFromChain = getChain(chainKey);
    setFromTokenAddress("");
    setSelectedFromChain(newFromChain?.key);
  };

  const onChangeToChain = (chainKey: ChainKey) => {
    const newToChain = getChain(chainKey);
    setToTokenAddress("");
    setSelectedToChain(newToChain?.key);
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

  // const handleExecuteRoute = async () => {
  //   // example of how a route could be executed
  //   const routesRequestTest = {
  //     fromChainId: 3, // Ropsten
  //     fromAmount: "10000000000000000000", // 1
  //     fromTokenAddress: "0xe71678794fff8846bff855f716b0ce9d9a78e844", // TEST Token
  //     toChainId: 4, // Rinkeby
  //     toTokenAddress: "0x9ac2c46d7acc21c881154d57c0dc1c55a3139198", // TEST Token
  //   };

  //   const signer = web3?.getSigner();
  //   const routeResponse = await LiFi.getRoutes(routesRequestTest);
  //   console.log("routeResponse - ", routeResponse);
  //   const route = routeResponse.routes[0];
  //   console.log(">> Got Route");
  //   console.log(route);

  //   if (route && signer) {
  //     try {
  //       await LiFi.executeRoute(signer, route, { switchChainHook });
  //     } catch (e) {
  //       // Handle error here and show info to user
  //       console.log("error with executeRoute - ", e);
  //     }
  //   } else {
  //     console.log("cant find route show error to user");
  //   }
  // };

  const findToken = useCallback(
    (chainKey: ChainKey, tokenId: string) => {
      const token = tokens[chainKey].find((token) => token.address === tokenId);
      if (!token) {
        throw new Error("Token not found");
      }
      return token;
    },
    [tokens],
  );

  // get transfer routes
  useEffect(() => {
    const getTransferRoutes = async () => {
      setRoutes([]);
      // setHighlightedIndex(-1);
      setNoRoutesAvailable(false);

      if (
        fromAmount.gt(0) &&
        selectedFromChain &&
        fromTokenAddress &&
        selectedToChain &&
        toTokenAddress
      ) {
        setRoutesLoading(true);
        const fromToken = findToken(selectedFromChain, fromTokenAddress);
        const toToken = findToken(selectedToChain, toTokenAddress);
        const request: RoutesRequest = {
          fromChainId: fromToken.chainId,
          fromAmount: new BigNumber(fromAmount)
            .shiftedBy(fromToken.decimals)
            .toFixed(0),
          fromTokenAddress,
          toChainId: toToken.chainId,
          toTokenAddress,
          fromAddress: account || undefined,
          toAddress: account || undefined,
          // advanced options to add later
          // options: {
          //   order: optionOrder,
          //   slippage: optionSlippage / 100,
          //   bridges: {
          //     allow: optionEnabledBridges,
          //   },
          //   exchanges: {
          //     allow: optionEnabledExchanges,
          //   },
          // },
        };

        const id = Math.random();
        try {
          currentRouteCallId = id;
          const result = await LiFi.getRoutes(request);
          setRouteCallResult({ result, id });
        } catch {
          if (id === currentRouteCallId || !currentRouteCallId) {
            setNoRoutesAvailable(true);
            setRoutesLoading(false);
          }
        }
      }
    };

    getTransferRoutes();
  }, [
    fromAmount,
    selectedFromChain,
    fromTokenAddress,
    selectedToChain,
    toTokenAddress,
    // optionOrder,
    // optionSlippage,
    // optionEnabledBridges,
    // optionEnabledExchanges,
    findToken,
  ]);

  // set route call results
  useEffect(() => {
    if (routeCallResult) {
      const { result, id } = routeCallResult;
      if (id === currentRouteCallId) {
        setRoutes(result.routes);
        // setHighlightedIndex(result.routes.length === 0 ? -1 : 0);
        setNoRoutesAvailable(result.routes.length === 0);
        setRoutesLoading(false);
        transactionInfoRef.current?.scrollIntoView({ behavior: "smooth" });
        // setActiveTransactionInfoTabKey("1");
      }
    }
  }, [routeCallResult, currentRouteCallId]);

  console.log("chains - ", availableChains);

  console.log("balances - ", balances);

  return (
    <>
      <div>
        <Row>
          <Form>
            <SwapForm
              availableChains={availableChains}
              selectedFromChain={selectedFromChain}
              selectedToChain={selectedToChain}
              onChangeFromChain={onChangeFromChain}
              onChangeToChain={onChangeToChain}
              setFromToken={setFromTokenAddress}
              setToToken={setToTokenAddress}
              setFromAmount={setFromAmount}
              setToAmount={setToAmount}
              fromToken={fromTokenAddress}
              toToken={toTokenAddress}
              tokens={tokens}
              balances={balances}
            />
          </Form>
        </Row>

        <Row>
          <div ref={transactionInfoRef}>
            {routesLoading || noRoutesAvailable || routes.length ? (
              <RouteList
                // highlightedIndex={highlightedIndex}
                routes={routes}
                routesLoading={routesLoading}
                noRoutesAvailable={noRoutesAvailable}
                // setHighlightedIndex={setHighlightedIndex}
              />
            ) : (
              <Row style={{ paddingTop: 48 }}>
                <Typography.Title level={4} disabled>
                  To get available routes, input your desired tokens to swap.
                </Typography.Title>
              </Row>
            )}
          </div>
        </Row>
      </div>
    </>
  );
}

export default DEX;
