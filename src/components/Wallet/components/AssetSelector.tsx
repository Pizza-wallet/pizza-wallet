import { useERC20Balance } from "../../../hooks/useERC20Balance";
import { useMoralis, useNativeBalance } from "react-moralis";
import { Image, Select } from "antd";
import { useMemo } from "react";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  border: 0.125rem solid #3e389f;
  border-radius: 0.9375rem;
`;

export default function AssetSelector({
  setAsset,
  style,
}: {
  setAsset: any;
  style: any;
}) {
  const { assets } = useERC20Balance();
  const { data: nativeBalance, nativeToken } = useNativeBalance();
  const { Moralis } = useMoralis();

  const fullBalance = useMemo(() => {
    try {
      if (!assets || !nativeBalance) return null;
      return [
        ...assets,
        {
          balance: nativeBalance?.balance || 0,
          decimals: nativeToken?.decimals || 18,
          name: nativeToken?.name,
          symbol: nativeToken?.symbol,
          logo: "",
          token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        },
      ];
    } catch (error) {
      console.log(error);
    }
  }, [assets, nativeBalance, nativeToken]);

  function handleChange(value: any) {
    const token = fullBalance?.find((token) => token.token_address === value);
    setAsset(token);
  }

  return (
    <StyledSelect onChange={handleChange} size="large" style={style}>
      {fullBalance &&
        fullBalance.map((item) => {
          console.log(item);
          return (
            <Select.Option
              value={item["token_address"]}
              key={item["token_address"]}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "0.5rem",
                }}
              >
                <Image
                  src={
                    item.logo ||
                    "https://etherscan.io/images/main/empty-token.png"
                  }
                  alt="nologo"
                  width="1.5rem"
                  height="1.5rem"
                  preview={false}
                  style={{ borderRadius: "0.9375rem" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                  }}
                >
                  <p>{item.symbol}</p>
                  <p style={{ alignSelf: "right" }}>
                    (
                    {parseFloat(
                      Moralis?.Units?.FromWei(
                        item.balance,
                        Number(item.decimals),
                      ),
                    )?.toFixed(6)}
                    )
                  </p>
                </div>
              </div>
            </Select.Option>
          );
        })}
    </StyledSelect>
  );
}
