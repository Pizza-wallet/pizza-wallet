import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Table from "./reusable/Table";
import styled from "styled-components";
import { limitDigits } from "../helpers/formatters";
import { getBalances } from "../balances/getBalances";
import { useGetTokenListToQuery } from "../hooks/useGetTokenListToQuery.tsx";
import {
  getPricesForTokens,
  getCoinGeckoChains,
} from "../services/PriceService";

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
`;

function ERC20Balance(props) {
  const { account } = useMoralis();
  const tokenList = useGetTokenListToQuery();
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const getBalancesAsync = async () => {
      // refactor later to abstract logic from this component
      // get balances with tokenlist and multicall contract
      const balancesEth = await getBalances(account, tokenList.ethereum);
      const balancesPolygon = await getBalances(account, tokenList.polygon);

      // get tokens with balance above 0
      const balancesAboveZeroEth = returnBalancesAboveZero(balancesEth);
      const balancesAboveZeroPolygon = returnBalancesAboveZero(balancesPolygon);

      if (balancesEth && balancesPolygon) {
        // get price information for each token
        const balancesWithPriceInfo = await getPriceInformation(
          balancesAboveZeroEth,
          balancesAboveZeroPolygon,
        );

        const chainNameMap = {
          1: "ethereum",
          137: "polygon",
          56: "Binance smart chain",
          42161: "Arbitrum",
        };

        const balances = balancesWithPriceInfo.map((tokens) => {
          return {
            chainId: tokens[0].chainId,
            name: chainNameMap[tokens[0].chainId],
            type: "chain",
            id: chainNameMap[tokens[0].chainId],
            balance: tokens.reduce(
              (acc, obj) => (acc += Number(obj.amount)),
              0,
            ),
            value: tokens.reduce((acc, obj) => (acc += obj.value), 0),
            tokens: tokens,
          };
        });

        console.log("balances - ", balances);
        setBalances(balances);
      }
    };

    if (tokenList && account) {
      getBalancesAsync();
    }
  }, [tokenList, account]);

  const returnBalancesAboveZero = (balances) => {
    return balances.filter((token) => token.amount !== "0");
  };

  const updateTokensWithPriceInfo = (balances, priceInfo) => {
    return balances.map((token) => {
      return {
        ...token,
        price: priceInfo[token.address].usd,
        value: Number(token.amount) * priceInfo[token.address].usd,
        prices: priceInfo[token.address],
        balance: Number(token.amount),
        type: "token",
      };
    });
  };

  const getPriceInformation = async (balancesEth, balancesPolygon) => {
    // Get coingecko chain data so we can query their api
    let chainsWithId = await getCoinGeckoChains();
    const coinGeckoIdEth = chainsWithId.data.filter(
      (chain) => balancesEth[0].chainId === chain.chain_identifier,
    )[0].id;
    const coinGeckoIdPoly = chainsWithId.data.filter(
      (chain) => balancesPolygon[0].chainId === chain.chain_identifier,
    )[0].id;

    // list of token addresses for eth and polygon
    const ethTokenAddresses = balancesEth
      .reduce((arr, token) => {
        arr.push(token.address);
        return arr;
      }, [])
      .join(",");

    const polyTokenAddresses = balancesPolygon
      .reduce((arr, token) => {
        arr.push(token.address);
        return arr;
      }, [])
      .join(",");

    // call api to get price information
    const ethPrices = await getPricesForTokens(
      coinGeckoIdEth,
      ethTokenAddresses,
    );
    const polyPrices = await getPricesForTokens(
      coinGeckoIdPoly,
      polyTokenAddresses,
    );

    // add price information and return values
    const ethBalancesWithValues = updateTokensWithPriceInfo(
      balancesEth,
      ethPrices.data,
    );
    const polyBalancesWithValues = updateTokensWithPriceInfo(
      balancesPolygon,
      polyPrices.data,
    );

    return [ethBalancesWithValues, polyBalancesWithValues];
  };

  const columns = [
    {
      title: "Asset",
      dataIndex: "logo",
      key: "logo",
      render: (logo, item) => {
        const isToken = item.type === "token";
        return (
          <div
            style={{
              display: "flex",
              position: "relative",
              margin: isToken && "auto",
              width: isToken && "50%",
            }}
          >
            <div>
              <AbsoluteImgContainer>
                <img
                  src={
                    logo || "https://etherscan.io/images/main/empty-token.png"
                  }
                  alt="nologo"
                  width="28px"
                  height="28px"
                />
              </AbsoluteImgContainer>
              <div style={{ marginLeft: "1.875rem" }}>{item.name}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value) => limitDigits(7, value),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => value,
    },

    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => limitDigits(7, value),
    },
  ];

  return (
    <div
      style={{
        margin: "0 3.125rem 3.125rem 3.125rem",
      }}
    >
      <Table
        tableData={balances && balances}
        columns={columns}
        tableTitle={"Token"}
        expandableRow={true}
      />
    </div>
  );
}
export default ERC20Balance;
