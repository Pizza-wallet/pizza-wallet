import "./dex.css";
import { Chain, ChainKey, TokenWithAmounts, TokenAmount } from "../../types";
import { useRef, useState } from "react";
import { Row, Col, Input } from "antd";
import { RefSelectProps } from "antd/lib/select";
import ChainSelect from "./ChainSelect";
import TokenSelect from "./TokenSelect";
import BigNumber from "bignumber.js";

interface SwapFormProps {
  availableChains: Array<Chain>;
  selectedFromChain?: ChainKey;
  onChangeFromChain: (chainKey: ChainKey) => void;
  setFromToken: (tokenAddress: string) => void;
  setFromAmount: (amount: BigNumber) => void;
  fromToken: string;
  tokens: { [ChainKey: string]: Array<TokenWithAmounts> };
  balances: { [ChainKey: string]: Array<TokenAmount> } | undefined;
}

function SwapForm({
  availableChains,
  selectedFromChain,
  onChangeFromChain,
  setFromToken,
  setFromAmount,
  fromToken,
  tokens,
  balances,
}: SwapFormProps) {
  const [fromAmountString, setfromAmountString] = useState<string>("");
  const fromSelectRef = useRef<RefSelectProps>();
  const onChangeFromToken = (tokenAddress: string) => {
    // unselect
    fromSelectRef?.current?.blur();
    setFromToken(tokenAddress);
  };

  const onChangeDepositAmount = (amount: string) => {
    setfromAmountString(amount);
    setFromAmount(new BigNumber(amount));
  };
  return (
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
                onChangeDepositAmount(event.currentTarget.value)
              }
              placeholder="0.0"
              bordered={false}
              // className={!hasSufficientBalance() ? "insufficient" : ""}
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default SwapForm;
