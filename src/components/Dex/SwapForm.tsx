import { Chain, ChainKey, TokenWithAmounts, TokenAmount } from "../../types";
import { useRef } from "react";
import { Row, Col } from "antd";
import { RefSelectProps } from "antd/lib/select";
import ChainSelect from "./ChainSelect";
import TokenSelect from "./TokenSelect";

interface SwapFormProps {
  availableChains: Array<Chain>;
  selectedFromChain?: ChainKey;
  onChangeFromChain: (chainKey: ChainKey) => void;
  setFromToken: (tokenAddress: string) => void;
  fromToken: string;
  tokens: { [ChainKey: string]: Array<TokenWithAmounts> };
  balances: { [ChainKey: string]: Array<TokenAmount> } | undefined;
}

function SwapForm({
  availableChains,
  selectedFromChain,
  onChangeFromChain,
  setFromToken,
  fromToken,
  tokens,
  balances,
}: SwapFormProps) {
  const fromSelectRef = useRef<RefSelectProps>();
  const onChangeFromToken = (tokenAddress: string) => {
    // unselect
    fromSelectRef?.current?.blur();
    setFromToken(tokenAddress);
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
          <div className="form-input-wrapper"></div>
        </Col>
      </Row>
    </>
  );
}

export default SwapForm;
