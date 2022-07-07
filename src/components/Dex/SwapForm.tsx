import { Chain, ChainKey, getChainByKey } from "../../types";
import { Avatar, Select } from "antd";

interface SwapFormProps {
  availableChains: Array<Chain>;
  selectedChain?: ChainKey;
}

function SwapForm({ availableChains, selectedChain }: SwapFormProps) {
  const chain = selectedChain ? getChainByKey(selectedChain) : undefined;
  console.log("chain - ", chain);
  const disabled = false;
  const positionFixed = true;
  return (
    <>
      <div>
        <Select
          style={{ width: 200, position: "relative" }}
          disabled={disabled}
          placeholder="Select Chain"
          value={selectedChain}
          // onChange={(v: ChainKey) => onChangeSelectedChain(v)}
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
