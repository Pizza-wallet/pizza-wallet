import { useEffect, useState, Dispatch } from "react";
import { useMoralis } from "react-moralis";
import Table from "../reusable/Table";
import styled from "styled-components";
import { limitDigits } from "../../helpers/formatters";
import { getBalanceAndPriceInformation } from "./balanceMethods/getBalances";
import { useGetTokenListToQuery } from "../../hooks/useGetTokenListToQuery";
import { useChainsTokensTools } from "../../providers/chainsTokensToolsProvider";
import { CustomImg } from "../reusable/CustomImg";

interface IAbsoluteImgContainer {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
}

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
  top: ${(props: IAbsoluteImgContainer) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  width: ${(props) => props.width};
`;

interface IToken {
  name: string;
  symbol: string;
  logoURI: string;
  amount?: string;
  value: number;
}

function ERC20Balance({
  setTotalBalance,
}: {
  setTotalBalance: Dispatch<number | undefined>;
}) {
  const { account } = useMoralis();
  const tokenList = useGetTokenListToQuery();
  const { tokens } = useChainsTokensTools();
  const [balances, setBalances] = useState<IToken[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getBalancesAsync = async () => {
      // get balances with tokenlist and multicall contract
      // get price info with coingecko api
      console.log("tokens here 2 - ", tokens);
      console.log("our token list - ", tokenList);

      // picking the chains we want to support
      const testTokenList: any = {
        arbitrum: tokens.arb,
        avalanche: tokens.ava,
        binance: tokens.bsc,
        ethereum: tokens.eth,
        fantom: tokens.ftm,
        polygon: tokens.pol,
      };
      const userBalances: IToken[] = await getBalanceAndPriceInformation(
        account!,
        testTokenList!,
      );

      const totalBalance = limitDigits(
        userBalances.reduce((total: number, val: IToken) => {
          total += val.value;
          return total;
        }, 0),
      );

      setTotalBalance(totalBalance === 0 ? -1 : totalBalance);
      setBalances(userBalances);
      setLoading(false);
    };

    console.log("tokens here 1 - ", tokens);
    if (tokenList && account && tokens) {
      getBalancesAsync();
    }
  }, [tokenList, account, tokens]);

  const displayChainIconsForToken = (chainIcons: string[]) => {
    // Logic to overlap icon images
    let num = 0;
    return chainIcons.map((icon, i) => {
      if (i > 0) {
        num = num - 5;
      }
      return (
        <div key={i} style={{ transform: `translateX(${num}px)` }}>
          <CustomImg
            src={icon}
            height={"1.25rem"}
            width={"1.25rem"}
            borderRadius={"50%"}
            display={"inline-block"}
          />
        </div>
      );
    });
  };

  const centerChainLogos = (logoAmount: number) => {
    // TODO: figure out a better way to center these icons
    switch (logoAmount) {
      case 1:
        return "0.6rem";
      case 2:
        return "-0rem";
      case 3:
        return "-0.3rem";
      case 4:
        return "-1rem";
      case 5:
        return "-1.25rem";
      default:
        return "-1.25rem";
    }
  };

  const columns = [
    {
      title: "Asset",
      dataIndex: "logo",
      key: "logo",
      render: (logo: any, item: any, num: number) => {
        console.log("logo here - ", logo);
        const isToken = item.type === "token";
        const logoURI = item.logoURI ? item.logoURI : "";
        const chainLogosForToken = item.chainLogoUri;
        const emptyTokenLogo =
          "https://etherscan.io/images/main/empty-token.png";
        return (
          <div
            style={{
              display: "flex",
              position: "relative",
              margin: isToken ? "auto" : "0",
              width: isToken ? "50%" : "auto",
            }}
          >
            <div>
              <AbsoluteImgContainer
                left={isToken ? "1.5625rem" : ""}
                top={"-0.3125rem"}
              >
                <CustomImg
                  src={logoURI || emptyTokenLogo}
                  alt="nologo"
                  width="2.5rem"
                  height="2.5rem"
                  borderRadius={"50%"}
                />
              </AbsoluteImgContainer>
              {isToken && (
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      borderBottom: "0.1875rem solid #a6a6a6",
                      borderLeft: "0.1875rem solid #a6a6a6",
                      height: num > 0 ? "4.7875rem" : "2.5rem",
                      position: "absolute",
                      top: num > 0 ? "-3.5625rem" : "-1.25rem",
                      left: "-1.7125rem",
                      width: "2.375rem",
                    }}
                  ></div>
                </div>
              )}
              {isToken ? (
                <AbsoluteImgContainer left={"3.9875rem"} top={"1.2375rem"}>
                  <CustomImg
                    src={item.chainLogoUri || emptyTokenLogo}
                    height={"1.25rem"}
                    width={"1.25rem"}
                    borderRadius={"50%"}
                  />
                </AbsoluteImgContainer>
              ) : (
                <AbsoluteImgContainer
                  left={centerChainLogos(chainLogosForToken.length)}
                  top={"2.2rem"}
                  width={"2.1875rem"}
                >
                  <div
                    style={{
                      minWidth: "max-content",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {displayChainIconsForToken(chainLogosForToken)}
                  </div>
                </AbsoluteImgContainer>
              )}
              {!isToken && (
                <div
                  style={{
                    marginLeft: "3.125rem",
                    fontSize: "1.5625rem",
                    lineHeight: "2.25rem",
                  }}
                >
                  {item.symbol}
                </div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value: number) => limitDigits(value),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value: number) =>
        value ? `$${limitDigits(value)}` : "Not available",
    },

    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value: number) =>
        value ? `$${limitDigits(value)}` : "Not available",
    },
  ];

  return (
    <div
      style={{
        margin: "0 3.125rem 3.125rem 3.125rem",
      }}
    >
      <Table
        loading={loading}
        tableData={balances && balances}
        columns={columns}
        tableTitle={"Token"}
        expandableRow={true}
      />
    </div>
  );
}
export default ERC20Balance;
