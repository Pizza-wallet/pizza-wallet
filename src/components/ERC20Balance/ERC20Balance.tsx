import { useEffect, useState, Dispatch } from "react";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import Table from "../reusable/Table";
import { limitDigits } from "../../helpers/formatters";
import { columns } from "./balanceTableColumns";
import {
  getTokenBalanceForEachChain,
  groupTokensWithPriceInfo,
} from "./balanceMethods/getBalances";
import { useChainsTokensTools } from "../../providers/chainsTokensToolsProvider";
import { IGroupedToken, ITokenList } from "../../types";

const TableContainer = styled("div")`
  margin-left: auto;
  margin-right: auto;
  width: 50rem;
`;

interface IERC20Balance {
  setTotalBalance: Dispatch<string | undefined>;
  setBalances: Dispatch<IGroupedToken[]>;
  balances: IGroupedToken[];
}

function ERC20Balance({
  setTotalBalance,
  setBalances,
  balances,
}: IERC20Balance) {
  const { account } = useMoralis();
  const { tokens } = useChainsTokensTools();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(balances.length ? false : true);
    const getBalancesAsync = async () => {
      // picking the chains we want to support
      const supportedChains: any = {
        ethereum: tokens.eth,
        fantom: tokens.ftm,
        polygon: tokens.pol,
        avalanche: tokens.ava,
        arbitrum: tokens.arb,
        optimism: tokens.opt,
        binance: tokens.bsc,
      };
      // get balances with tokenlist and multicall contract
      const balanceForEachChain: ITokenList = await getTokenBalanceForEachChain(
        // account!
        process.env.REACT_APP_TEST_ACCOUNT || "",
        supportedChains!,
      );

      const groupedTokens: IGroupedToken[] = await groupTokensWithPriceInfo(
        balanceForEachChain,
      );

      console.log("what we are returning for token table - ", groupedTokens);

      const totalBalance = limitDigits(
        groupedTokens.reduce((total: number, val: IGroupedToken) => {
          total += val?.value;
          return total;
        }, 0),
      );

      setTotalBalance(totalBalance === 0 ? "Not Available" : totalBalance);
      setBalances(groupedTokens);
      setLoading(false);
    };

    const tokensLoaded = Object.keys(tokens).length !== 0;
    if (tokensLoaded) {
      getBalancesAsync();
    }
  }, [account, tokens]);

  console.log("test limit digits - ", limitDigits(0.00000000007));

  return (
    <TableContainer>
      <Table
        loading={loading}
        tableData={balances && balances}
        columns={columns}
        tableTitle={"Token"}
        expandableRow={true}
      />
    </TableContainer>
  );
}
export default ERC20Balance;
