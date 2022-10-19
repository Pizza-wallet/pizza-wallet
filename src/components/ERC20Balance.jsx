import { useEffect } from "react";
import { useERC20Balances, useMoralis } from "react-moralis";
import Table from "./reusable/Table";
import styled from "styled-components";
import { limitDigits } from "../helpers/formatters";
import { getBalances } from "../balances/getBalances";
import { useGetTokenListToQuery } from "../hooks/useGetTokenListToQuery.tsx";
import axios from "axios";

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
`;

function ERC20Balance(props) {
  const { Moralis, account } = useMoralis();
  const { data: assets } = useERC20Balances(props);
  const tokenList = useGetTokenListToQuery();

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
        console.log("balancesWithPriceInfo - ", balancesWithPriceInfo);
      }
    };

    if (tokenList && account) {
      getBalancesAsync();
    }
  }, [tokenList, account]);

  const returnBalancesAboveZero = (balances) => {
    return balances.filter((token) => token.amount !== "0");
  };

  const getPriceInformation = async (balancesEth, balancesPolygon) => {
    // Get coingecko chain data so we can query their api
    const url = "https://api.coingecko.com/api/v3/asset_platforms";
    let chainsWithId = await axios.get(url);
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
    const ethPrices = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/${coinGeckoIdEth}?contract_addresses=${ethTokenAddresses}&vs_currencies=usd,eur,gbp`,
    );
    const polyPrices = await axios.get(
      `https://api.coingecko.com/api/v3/simple/token_price/${coinGeckoIdPoly}?contract_addresses=${polyTokenAddresses}&vs_currencies=usd,eur,gbp`,
    );

    // add price information and return values
    const ethBalancesWithValues = balancesEth.map((token) => {
      return {
        ...token,
        value: ethPrices.data[token.address],
      };
    });

    const polyBalancesWithValues = balancesPolygon.map((token) => {
      return {
        ...token,
        value: polyPrices.data[token.address],
      };
    });

    return {
      ethereum: ethBalancesWithValues,
      polygon: polyBalancesWithValues,
    };
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
      render: (value) =>
        parseFloat(Moralis?.Units?.FromWei(value.toString(), 18)).toFixed(7),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => limitDigits(7, value),
    },

    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) => limitDigits(7, value),
    },
  ];

  const mockData = [
    {
      name: "BTC",
      logo: "",
      price: 6,
      value: 60000,
      balance: 800000000000000000,
      id: "bit",
      type: "chain",
      tokens: [
        {
          type: "token",
          name: "Btc",
          balance: 10000000000000000000,
          logo: "",
          price: 1781520,
          value: 0.5,
        },
      ],
    },
    {
      name: "ETH",
      id: "eth",
      price: 1714.3,
      value: 15428.7,
      balance: 600000000000000000,
      type: "chain",
      tokens: [
        {
          type: "token",
          name: "Eth",
          balance: 3000000000000000000,
          logo: "",
          price: 1714.3,
          value: 5142.9,
        },
        {
          type: "token",
          name: "Eth",
          balance: 3000000000000000000,
          logo: "",
          price: 1714.3,
          value: 5142.9,
        },
      ],
    },
  ];

  const sumBalanceAndValuesForChains = (data) => {
    // balance should be balance x value
    return data.map((chain) => {
      return {
        ...chain,
        balance: chain.tokens.reduce((acc, obj) => (acc += obj.balance), 0),
        value: chain.tokens.reduce((acc, obj) => (acc += obj.value), 0),
      };
    });
  };

  console.log("assets - ", assets);

  return (
    <div
      style={{
        margin: "0 3.125rem 3.125rem 3.125rem",
      }}
    >
      <Table
        tableData={sumBalanceAndValuesForChains(mockData)}
        columns={columns}
        tableTitle={"Token"}
        expandableRow={true}
      />
    </div>
  );
}
export default ERC20Balance;
