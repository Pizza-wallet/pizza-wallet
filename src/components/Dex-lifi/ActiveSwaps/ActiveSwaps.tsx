import React from "react";
import { useExecutingRoutesIds } from "../../../stores";
import { ActiveSwapItem } from "./ActiveSwapItem";
import { PizzaWalletCard } from "../../reusable/PizzaWalletCard";
import styled from "styled-components";

const CardTitle = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  line-height: 1.5rem;
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

export const ActiveSwaps: React.FC<{ navigate: (x: string) => void }> = ({
  navigate,
}) => {
  const accountAddress = process.env.REACT_APP_TEST_ACCOUNT;
  const executingRoutes = useExecutingRoutesIds(accountAddress);

  const handleShowAll = () => {
    // navigate to page to show all active swaps
    navigate("activeSwapsPage");
  };

  if (!executingRoutes?.length) {
    return null;
  }

  return (
    <PizzaWalletCard padding={"20px"}>
      <CardTitle>Active swaps</CardTitle>
      <div>
        {executingRoutes.slice(0, 1).map((routeId: string) => (
          <ActiveSwapItem key={routeId} routeId={routeId} />
        ))}
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "auto" }}>
          <Typography onClick={handleShowAll}>Show all</Typography>
        </div>
      </div>
    </PizzaWalletCard>
  );
};
