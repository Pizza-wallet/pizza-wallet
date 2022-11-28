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
import { IGroupedToken } from "../../types";

const TableContainer = styled("div")`
  margin: 0 3.125rem 3.125rem 3.125rem;
`;

function ERC20Balance({
  setTotalBalance,
  setBalances,
  balances,
}: {
  setTotalBalance: Dispatch<number | undefined>;
  setBalances: Dispatch<IGroupedToken[]>;
  balances: IGroupedToken[];
}) {
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
      const balanceForEachChain: any = await getTokenBalanceForEachChain(
        account!,
        supportedChains!,
      );

      const userBalances: IGroupedToken[] = await groupTokensWithPriceInfo(
        balanceForEachChain,
      );

      console.log("what we are returning for token table - ", userBalances);

      const totalBalance = limitDigits(
        userBalances.reduce((total: number, val: IGroupedToken) => {
          total += val?.value;
          return total;
        }, 0),
      );

      setTotalBalance(totalBalance === 0 ? -1 : totalBalance);
      setBalances(userBalances);
      setLoading(false);
    };

    const tokensLoaded = Object.keys(tokens).length !== 0;
    if (account && tokensLoaded) {
      getBalancesAsync();
    }
  }, [account, tokens]);

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
