/* eslint-disable consistent-return */
import { List } from "antd";
import { ActiveSwapItem } from "./ActiveSwapItem";
import { useExecutingRoutesIds } from "../../../stores";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 1.75rem;
  margin-top: 8px;
  color: #3e389f;
  cursor: pointer;
`;

const Card = styled("div")`
  width: 95%;
  border: 0.125rem solid #3e389f;
  border-radius: 10px;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  cursor: pointer;
  &:hover {
    background: #e8e8e8;
  }
`;

const CardTitle = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  line-height: 1.5rem;
  display: inline-block;
  margin-left: 60px;
`;

export const ActiveSwapsExpanded = ({
  setPage,
  setSelectedRoute,
}: {
  setPage: any;
  setSelectedRoute: any;
}) => {
  const accountAddress = process.env.REACT_APP_TEST_ACCOUNT;
  const executingRoutes = useExecutingRoutesIds(accountAddress);
  // const deleteRoutes = useRouteExecutionStore((store) => store.deleteRoutes);

  // useEffect(() => {
  //   if (executingRoutes.length) {
  //     return useHeaderActionStore.getState().setAction(
  //       <IconButton size="medium" edge="end" onClick={toggleDialog}>
  //         <DeleteIcon />
  //       </IconButton>,
  //     );
  //   }
  // }, [executingRoutes.length, toggleDialog]);

  if (!executingRoutes.length) {
    return <h3>Active swaps empty</h3>;
  }

  return (
    <>
      <div style={{ width: "100%" }}>
        <div style={{ display: "inline-block" }}>
          <FontAwesomeIconStyled
            onClick={() => setPage("main")}
            icon={faArrowLeft}
          />
        </div>

        <CardTitle>Active swaps</CardTitle>
      </div>
      <List>
        {executingRoutes.map((routeId: string) => (
          <Card key={routeId}>
            <ActiveSwapItem
              routeId={routeId}
              setSelectedRoute={setSelectedRoute}
              setPage={setPage}
            />
          </Card>
        ))}
      </List>
    </>
  );
};
