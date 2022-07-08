import { Chain, ChainKey, getChainByKey } from "../../types";
import { Avatar, Select } from "antd";

interface SwapFormProps {
  availableChains: Array<Chain>;
  selectedFromChain?: ChainKey;
  onChangeFromChain: (v: ChainKey) => void;
}

function SwapForm({
  availableChains,
  selectedFromChain,
  onChangeFromChain,
}: SwapFormProps) {
  const chain = selectedFromChain
    ? getChainByKey(selectedFromChain)
    : undefined;
  console.log("chain - ", chain);
  const disabled = false;
  const positionFixed = true;
  return (
    <>
      <div>
        {/* TODO: Extract selects to their own components as they will be re-used*/}
        <Select
          style={{ width: 200, position: "relative" }}
          disabled={disabled}
          placeholder="Select Chain"
          value={selectedFromChain}
          onChange={(v: ChainKey) => onChangeFromChain(v)}
          dropdownStyle={{
            minWidth: 300,
            position: positionFixed ? "fixed" : "relative",
          }}
          bordered={true}
          optionLabelProp="data-label"
        >
          <Select.OptGroup label="Supported Chains">
            {availableChains.map((chain) => (
              <Select.Option
                key={chain.key}
                value={chain.key}
                data-label={chain.name}
              >
                <div>
                  <span role="img" aria-label={chain.name}>
                    <Avatar
                      size="small"
                      src={chain.logoURI}
                      alt={chain.key}
                      style={{ marginRight: 10 }}
                    >
                      {chain.name[0]}
                    </Avatar>
                  </span>
                  <span>{chain.name}</span>
                </div>
              </Select.Option>
            ))}
          </Select.OptGroup>
        </Select>
      </div>
    </>
  );
}

export default SwapForm;
