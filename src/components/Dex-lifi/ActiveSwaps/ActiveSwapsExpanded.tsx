/* eslint-disable consistent-return */
import { List } from "antd";
import { ActiveSwapItem } from "./ActiveSwapItem";
import { PizzaWalletCard } from "../../reusable/PizzaWalletCard";
import { useExecutingRoutesIds, useRouteExecutionStore } from "../../../stores";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import type { Route } from "@lifi/sdk";
import { useWeb3AuthExecutionStore } from "../../../stores/web3Auth/useWeb3AuthExecutionStore";

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 1.75rem;
  margin-top: 8px;
  color: #3e389f;
  cursor: pointer;
`;

const CardTitle = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  line-height: 1.5rem;
  display: inline-block;
  margin-left: 60px;
`;

const Typography = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
  line-height: 1.5rem;
  &:hover {
    color: #2f2a75;
  }
`;

export const ActiveSwapsExpanded = ({
  setPage,
  setSelectedRoute,
}: {
  setPage: (x: string) => void;
  setSelectedRoute: (val: Route) => void;
}) => {
  const { address } = useWeb3AuthExecutionStore((state: any) => state);
  //const accountAddress = process.env.REACT_APP_TEST_ACCOUNT;
  const executingRoutes = useExecutingRoutesIds(address);
  const deleteRoutes = useRouteExecutionStore((store) => store.deleteRoutes);

  if (!executingRoutes.length) {
    return (
      <div>
        <FontAwesomeIconStyled
          onClick={() => setPage("main")}
          icon={faArrowLeft}
        />
        <h3>Active swaps empty</h3>
      </div>
    );
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <FontAwesomeIconStyled
            onClick={() => setPage("main")}
            icon={faArrowLeft}
          />
        </div>

        <CardTitle>Active swaps</CardTitle>
        <div
          style={{ marginLeft: "auto" }}
          onClick={() => deleteRoutes("active")}
        >
          <Typography>Cancel all</Typography>
        </div>
      </div>
      <List>
        {executingRoutes.map((routeId: string) => (
          <PizzaWalletCard hover={true} padding={"20px"} key={routeId}>
            <ActiveSwapItem
              routeId={routeId}
              setSelectedRoute={setSelectedRoute}
              setPage={setPage}
            />
          </PizzaWalletCard>
        ))}
      </List>
    </>
  );
};
