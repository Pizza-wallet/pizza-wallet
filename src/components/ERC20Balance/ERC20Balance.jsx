import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Table from "../reusable/Table";
import styled from "styled-components";
import { limitDigits } from "../../helpers/formatters";
import { getBalances } from "./balanceMethods/getBalances";
import { useGetTokenListToQuery } from "../../hooks/useGetTokenListToQuery.tsx";
import { getChainDetails } from "../../helpers/getChainDetails";
import { getPriceInformation } from "./balanceMethods/getPriceInformation";

const AbsoluteImgContainer = styled("div")`
  position: absolute;
  top: -0.3125rem;
`;

function ERC20Balance(props) {
  const { account } = useMoralis();
  const tokenList = useGetTokenListToQuery();
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getBalancesAsync = async () => {
      // TODO: optimize this code to reduce load time
      // get balances with tokenlist and multicall contract
      let balances = {};
      for (let chain in tokenList) {
        // get and set balances above zero
        balances[chain] = returnBalancesAboveZero(
          await getBalances(account, tokenList[chain]),
        );
      }

      // Get price info for each token
      const balancesWithPriceInfo = [];

      for (let chain in balances) {
        const userHasTokensOnChain = balances[chain].length;
        if (userHasTokensOnChain) {
          const chainId = balances[chain][0].chainId;
          balancesWithPriceInfo.push(
            await getPriceInformation(balances[chain], chainId),
          );
        }
      }

      // Set chain information and then save in state
      const usersBalances = balancesWithPriceInfo.map((tokens) => {
        const name = getChainDetails(tokens[0].chainId).name;
        const logoUri = getChainDetails(tokens[0].chainId).logoUri;
        return {
          chainId: tokens[0].chainId,
          name: name,
          type: "chain",
          id: name,
          logoURI: logoUri,
          balance: tokens.reduce((acc, obj) => (acc += Number(obj.amount)), 0),
          value: tokens.reduce((acc, obj) => (acc += obj.value), 0),
          tokens: tokens,
        };
      });

      setBalances(usersBalances);
      setLoading(false);
    };

    if (tokenList && account) {
      getBalancesAsync();
    }
  }, [tokenList, account]);

  const returnBalancesAboveZero = (balances) => {
    return balances.filter((token) => token.amount !== "0");
  };

  const columns = [
    {
      title: "Asset",
      dataIndex: "logo",
      key: "logo",
      render: (logo, item) => {
        const isToken = item.type === "token";
        const logoURI = item.logoURI ? item.logoURI : "";
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
                    logoURI ||
                    "https://etherscan.io/images/main/empty-token.png"
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
