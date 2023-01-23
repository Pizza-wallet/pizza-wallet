/* eslint-disable consistent-return */
import { List } from "antd";
import { ActiveSwapItem } from "./ActiveSwapItem";
import { useExecutingRoutesIds, useRouteExecutionStore } from "../../../stores";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
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
  setPage: any;
  setSelectedRoute: any;
}) => {
  const accountAddress = process.env.REACT_APP_TEST_ACCOUNT;
  const executingRoutes = useExecutingRoutesIds(accountAddress);
  const deleteRoutes = useRouteExecutionStore((store) => store.deleteRoutes);

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
          <Typography>Clear all</Typography>
        </div>
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
