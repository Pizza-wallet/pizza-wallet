import "./dex.css";
import { Chain, ChainKey, TokenWithAmounts, TokenAmount } from "../../types";
import { useRef, useState } from "react";
import { Row, Col, Input, Tooltip } from "antd";
import { RefSelectProps } from "antd/lib/select";
import ChainSelect from "./ChainSelect";
import TokenSelect from "./TokenSelect";
import BigNumber from "bignumber.js";

interface SwapFormProps {
  availableChains: Array<Chain>;
  selectedFromChain?: ChainKey;
  selectedToChain?: ChainKey;
  onChangeFromChain: (chainKey: ChainKey) => void;
  onChangeToChain: (chainKey: ChainKey) => void;
  setFromToken: (tokenAddress: string) => void;
  setToToken: (tokenAddress: string) => void;
  setFromAmount: (amount: BigNumber) => void;
  setToAmount: (amount: BigNumber) => void;
  fromToken: string;
  toToken: string;
  tokens: { [ChainKey: string]: Array<TokenWithAmounts> };
  balances: { [ChainKey: string]: Array<TokenAmount> } | undefined;
}

function SwapForm({
  availableChains,
  selectedFromChain,
  selectedToChain,
  onChangeFromChain,
  onChangeToChain,
  setFromToken,
  setToToken,
  setFromAmount,
  setToAmount,
  fromToken,
  toToken,
  tokens,
  balances,
}: SwapFormProps) {
  const [fromAmountString, setfromAmountString] = useState<string>("");
  const fromSelectRef = useRef<RefSelectProps>();
  const toSelectRef = useRef<RefSelectProps>();
  const onChangeFromToken = (tokenAddress: string) => {
    // unselect
    fromSelectRef?.current?.blur();
    setFromToken(tokenAddress);
  };

  const onChangeToToken = (tokenAddress: string) => {
    // unselect
    toSelectRef?.current?.blur();
    setToToken(tokenAddress);
  };

  const onChangeFromAmount = (amount: string) => {
    setfromAmountString(amount);
    setFromAmount(new BigNumber(amount));
  };

  const formatAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    return new BigNumber(e.currentTarget.value);
  };
  return (
    <div>
      <>
        <Row style={{ marginBottom: 8 }}>
          <Col span={10}>
            <div className="form-text">{"From:"}</div>
          </Col>
        </Row>

        <Row style={{ marginBottom: 8 }} gutter={[0, 0]}>
          <Col span={12}>
            <div className="form-input-wrapper chain-select">
              <ChainSelect
                availableChains={availableChains}
                selectedChain={selectedFromChain}
                onChangeSelectedChain={onChangeFromChain}
              />
            </div>
          </Col>
          <Col span={12}>
            <div
              className="form-input-wrapper token-select"
              style={{
                borderTopLeftRadius: "0px !important",
                borderBottomLeftRadius: "0px !important",
              }}
            >
              <TokenSelect
                tokens={tokens}
                selectedChain={selectedFromChain}
                balances={balances}
                selectedToken={fromToken}
                onChangeSelectedToken={onChangeFromToken}
                selectReference={fromSelectRef}
                grayed={false}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className="form-input-wrapper">
              <Input
                style={{ height: 50, color: "black" }}
                type="number"
                defaultValue={0.0}
                min={0}
                step={0.000000000000000001}
                value={fromAmountString}
                onChange={(event) =>
                  onChangeFromAmount(event.currentTarget.value)
                }
                placeholder="0.0"
                bordered={false}
                // className={!hasSufficientBalance() ? "insufficient" : ""}
              />
            </div>
          </Col>
        </Row>
      </>
      <>
        <Row style={{ marginBottom: 8 }}>
          <Col span={10}>
            <div className="form-text">{"To:"}</div>
          </Col>
        </Row>
        <Row gutter={[0, 0]} style={{ marginBottom: 8 }}>
          <Col span={12}>
            <div className="form-input-wrapper chain-select">
              <ChainSelect
                disabled={false}
                availableChains={availableChains}
                selectedChain={selectedToChain}
                onChangeSelectedChain={onChangeToChain}
              />
            </div>
          </Col>
          <Col span={12}>
            <div className="form-input-wrapper token-select">
              <TokenSelect
                disabled={false}
                tokens={tokens}
                balances={balances}
                selectedChain={selectedToChain}
                selectedToken={toToken}
                onChangeSelectedToken={onChangeToToken}
                selectReference={toSelectRef}
                grayed={false}
              />
            </div>
          </Col>
        </Row>

        <Row style={{ marginBottom: 8 }}>
          <Col span={24}>
            <div className="form-input-wrapper disabled">
              <Input
                style={{ height: 50 }}
                type="text"
                defaultValue={0.0}
                min={0}
                // value={estimatedToAmount}
                onChange={(event) => setToAmount(formatAmountInput(event))}
                placeholder="..."
                bordered={false}
                disabled
              />
              {/* {!!estimatedMinToAmount && (
                <Tooltip
                  color={"gray"}
                  title={`The final amount might change due to slippage but will not fall below ${estimatedMinWithdrawAmount}`}
                >
                  <span className="amountBadge">?</span>
                </Tooltip>
              )} */}
            </div>
          </Col>
        </Row>
      </>
    </div>
  );
}

export default SwapForm;
