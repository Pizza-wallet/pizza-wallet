import "./dex.css";
import { useState, useEffect, useCallback, useRef } from "react";
import { useMoralis, useChain } from "react-moralis";
import {
  Form,
  Row,
  Typography,
  Col,
  Button,
  Popconfirm,
  Modal,
  Tooltip,
} from "antd";
import { LoadingOutlined, SwapOutlined, SyncOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
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
  // getChainByKey,
  findDefaultToken,
  getChainById,
  isSwapStep,
} from "../../types";
import {
  formatTokenAmountOnly,
  formatTokenAmount,
  deepClone,
  getBalance,
} from "../../services/utils";
import SwapForm from "./SwapForm";
import Swapping from "./Swapping";
import BigNumber from "bignumber.js";
import RouteList from "./RouteList";

const TOTAL_SLIPPAGE_GUARD_MODAL = new BigNumber(0.9);
let currentRouteCallId: number;

function DEX() {
  const { web3, account } = useMoralis();
  const { switchNetwork, chainId } = useChain();
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
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

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
    setRoutes([]);
    setHighlightedIndex(-1);
    // find same deposit token
    if (selectedFromChain) {
      const symbol = tokens[selectedFromChain]?.find(
        (token) => token.address === fromTokenAddress,
      )?.symbol;
      const tokenAddress = tokens[chainKey]?.find(
        (token) => token.symbol === symbol,
      )?.address;

      setFromTokenAddress(tokenAddress || "");
    }
  };

  const onChangeToChain = (chainKey: ChainKey) => {
    const newToChain = getChain(chainKey);
    setToTokenAddress("");
    setSelectedToChain(newToChain?.key);
    setRoutes([]);
    setHighlightedIndex(-1);
    // find same withdraw token
    if (selectedToChain) {
      const symbol = tokens[selectedToChain].find(
        (token) => token.address === toTokenAddress,
      )?.symbol;
      const tokenAddress = tokens[chainKey].find(
        (token) => token.symbol === symbol,
      )?.address;
      setToTokenAddress(tokenAddress || "");
    }
  };

  const updateBalances = useCallback(async () => {
    if (account) {
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

  const getSelectedWithdraw = () => {
    if (highlightedIndex === -1) {
      return {
        estimate: "0.0",
      };
    } else {
      const selectedRoute = routes[highlightedIndex];
      const lastStep = selectedRoute?.steps[selectedRoute.steps.length - 1];
      return {
        estimate: formatTokenAmountOnly(
          lastStep?.action.toToken,
          lastStep?.estimate?.toAmount,
        ),
        min: formatTokenAmount(
          lastStep?.action.toToken,
          lastStep?.estimate?.toAmountMin,
        ),
      };
    }
  };

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
        setHighlightedIndex(result.routes.length === 0 ? -1 : 0);
        setNoRoutesAvailable(result.routes.length === 0);
        setRoutesLoading(false);
        // transactionInfoRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [routeCallResult, currentRouteCallId]);

  const openModal = () => {
    // deepClone to open new modal without execution info of previous transfer using same route card
    setSelectedRoute(deepClone(routes[highlightedIndex]));
  };

  const hasSufficientBalance = () => {
    if (!fromTokenAddress || !selectedFromChain) {
      return true;
    }

    return fromAmount.lte(
      getBalance(balances, selectedFromChain, fromTokenAddress),
    );
  };

  const hasSufficientGasBalanceOnStartChain = (route?: RouteType) => {
    if (!route) {
      return true;
    }

    const fromChain = getChainById(route.fromChainId);
    const token = findDefaultToken(fromChain.coin, fromChain.id);
    const balance = getBalance(balances, fromChain.key, token.address);

    const requiredAmount = route.steps
      .filter((step) => step.action.fromChainId === route.fromChainId)
      .map(
        (step) =>
          step.estimate.gasCosts &&
          step.estimate.gasCosts.length &&
          step.estimate.gasCosts[0].amount,
      )
      .map((amount) => new BigNumber(amount || "0"))
      .reduce((a, b) => a.plus(b), new BigNumber(0))
      .shiftedBy(-18);
    return !balance.isZero() && balance.gte(requiredAmount);
  };

  const hasSufficientGasBalanceOnCrossChain = (route?: RouteType) => {
    if (!route) {
      return true;
    }
    const lastStep = route.steps[route.steps.length - 1];
    if (!isSwapStep(lastStep)) {
      return true;
    }

    const crossChain = getChainById(lastStep.action.fromChainId);
    const token = findDefaultToken(crossChain.coin, crossChain.id);
    const balance = getBalance(balances, crossChain.key, token.address);

    const gasEstimate =
      lastStep.estimate.gasCosts &&
      lastStep.estimate.gasCosts.length &&
      lastStep.estimate.gasCosts[0].amount;
    const requiredAmount = new BigNumber(gasEstimate || 0).shiftedBy(-18);
    return !balance.isZero() && balance.gte(requiredAmount);
  };

  const submitButton = () => {
    if (!account) {
      return "Connect button here";
    }
    // Below now works if we need to add it in at later date
    // if (selectedFromChain && chainId) {
    //   const fromChain = getChainByKey(selectedFromChain);
    //   if (fromChain.id !== Number(chainId)) {
    //     console.log("fromChain - ", fromChain);
    //     console.log("chainId to string - ", fromChain?.id.toString());
    //     return (
    //       <Button
    //         shape="round"
    //         type="primary"
    //         icon={<SwapOutlined />}
    //         size={"large"}
    //         htmlType="submit"
    //         onClick={() => switchNetwork(fromChain?.metamask.chainId)}
    //       >
    //         Switch Network to {fromChain?.name}
    //       </Button>
    //     );
    //   }
    // }
    if (routesLoading) {
      return (
        <Button
          disabled={true}
          shape="round"
          type="primary"
          icon={<SyncOutlined spin />}
          size={"large"}
          style={{ cursor: "pointer" }}
        >
          Searching Routes...
        </Button>
      );
    }
    if (noRoutesAvailable) {
      return (
        <Button disabled={true} shape="round" type="primary" size={"large"}>
          No Route Found
        </Button>
      );
    }

    if (!hasSufficientGasBalanceOnStartChain(routes[highlightedIndex])) {
      return (
        <Button disabled={true} shape="round" type="primary" size={"large"}>
          Insufficient Gas on Start Chain
        </Button>
      );
    }

    if (!hasSufficientGasBalanceOnCrossChain(routes[highlightedIndex])) {
      return (
        <Tooltip title="The selected route requires a swap on the chain you are tranferring to. You need to have gas on that chain to pay for the transaction there.">
          <Button disabled={true} shape="round" type="primary" size={"large"}>
            Insufficient Gas on Destination Chain
          </Button>
        </Tooltip>
      );
    }
    if (!hasSufficientBalance()) {
      return (
        <Button disabled={true} shape="round" type="primary" size={"large"}>
          Insufficient Funds
        </Button>
      );
    }
    const fromAmountUSD = new BigNumber(
      routes[highlightedIndex]?.fromAmountUSD,
    );
    const toAmountUSD = new BigNumber(routes[highlightedIndex]?.toAmountUSD);

    const gasCostUSD = new BigNumber(
      routes[highlightedIndex]?.gasCostUSD || -1,
    ); // gasprices might be too low for correct USD /Cents rounding so might end up being 0.00

    const allValuesAvailable =
      !fromAmountUSD.isZero() &&
      !toAmountUSD.isZero() &&
      !gasCostUSD.isNegative();

    const totalExpenditure = gasCostUSD.isNegative()
      ? fromAmountUSD
      : fromAmountUSD.plus(gasCostUSD);
    const amountReceivedPercentage = toAmountUSD.dividedBy(totalExpenditure);
    const receivedAmountTooLow = amountReceivedPercentage.isLessThan(
      TOTAL_SLIPPAGE_GUARD_MODAL,
    );

    const swapButton = (clickHandler?: () => void) => {
      return (
        <Button
          disabled={highlightedIndex === -1}
          shape="round"
          type="primary"
          icon={<SwapOutlined />}
          size={"large"}
          onClick={() => clickHandler?.()}
        >
          Swap
        </Button>
      );
    };
    const popoverContent = (
      <div
        style={{
          maxWidth: "100px !important",
        }}
      >
        {allValuesAvailable && receivedAmountTooLow ? (
          <Typography.Paragraph>
            The value of the received tokens is significantly lower than the
            cost required to execute the transaction. Do you still want to
            proceed?
          </Typography.Paragraph>
        ) : !allValuesAvailable && receivedAmountTooLow ? (
          <Typography.Paragraph>
            The value of the received tokens is significantly lower than the
            cost required to execute the transaction. Also, we could not fetch
            the FIAT price of one or more of the listed values. Do you still
            want to proceed?
          </Typography.Paragraph>
        ) : (
          <Typography.Paragraph>
            We could not fetch the FIAT price of one or more of the listed
            values. Do you still want to proceed?
          </Typography.Paragraph>
        )}
        <Typography.Paragraph>
          Swapped token value:{" "}
          {!fromAmountUSD.isZero() ? `${fromAmountUSD.toFixed(2)} USD` : "~"}{" "}
          <br />
          Gas costs:{" "}
          {!gasCostUSD.isNegative() ? `${gasCostUSD.toFixed(2)} USD` : "~"}{" "}
          <br />
          Received token value:{" "}
          {!toAmountUSD.isZero() ? `${toAmountUSD.toFixed(2)} USD` : "~"}
        </Typography.Paragraph>
      </div>
    );
    return receivedAmountTooLow || !allValuesAvailable ? (
      <Popconfirm onConfirm={() => openModal()} title={popoverContent}>
        {swapButton()}
      </Popconfirm>
    ) : (
      swapButton(openModal)
    );
  };

  return (
    <>
      <Content
        style={{
          marginTop: "0",
          minHeight: "auto",
        }}
      >
        <div className="swap-view">
          <Row gutter={[16, 96]} justify="space-around">
            <Col sm={23} lg={23} xl={10} className="swap-form">
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
                  estimatedToAmount={getSelectedWithdraw().estimate}
                  estimatedMinToAmount={getSelectedWithdraw().min}
                />
              </Form>
              <Row style={{ marginTop: 24 }} justify={"center"}>
                {submitButton()}
              </Row>
            </Col>

            <Col sm={23} lg={23} xl={14}>
              <div ref={transactionInfoRef}>
                {routesLoading || noRoutesAvailable || routes.length ? (
                  <Row style={{ paddingTop: 25 }}>
                    <RouteList
                      highlightedIndex={highlightedIndex}
                      routes={routes}
                      routesLoading={routesLoading}
                      noRoutesAvailable={noRoutesAvailable}
                      setHighlightedIndex={setHighlightedIndex}
                    />
                  </Row>
                ) : (
                  <Row style={{ paddingTop: 25 }}>
                    <Typography.Title level={4} disabled>
                      To get available routes, input your desired tokens to
                      swap.
                    </Typography.Title>
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </div>

        {selectedRoute && !!selectedRoute.steps.length && (
          <Modal
            className="swapModal"
            visible={selectedRoute.steps.length > 0}
            onOk={() => {
              setSelectedRoute(undefined);
              updateBalances();
            }}
            onCancel={() => {
              setSelectedRoute(undefined);
              updateBalances();
            }}
            destroyOnClose={true}
            width={700}
            footer={null}
          >
            <Swapping
              route={selectedRoute}
              // settings={{
              //   infiniteApproval: optionInfiniteApproval,
              // }}
              updateRoute={() => {
                // TODO: add later
                // setActiveRoutes(readActiveRoutes());
                // setHistoricalRoutes(readHistoricalRoutes());
              }}
              onSwapDone={() => {
                // TODO: add later
                // setActiveRoutes(readActiveRoutes());
                // setHistoricalRoutes(readHistoricalRoutes());
                updateBalances();
              }}
            ></Swapping>
          </Modal>
        )}
      </Content>
    </>
  );
}

export default DEX;
