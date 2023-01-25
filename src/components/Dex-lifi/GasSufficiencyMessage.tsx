import type { Route } from "@lifi/sdk";
import { useGasSufficiency } from "../../hooks/useGasSufficiency";
import { useSwapRoutes } from "../../hooks/useSwapRoutes";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
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
  cursor: pointer;
  margin: auto;
  margin-top: 30px;
  background: #f34337;
  padding: 10px;
`;

const CardTitle = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  line-height: 1.5rem;
  margin-left: 20px;
  margin-top: 15px;
`;

const Typography = styled("p")`
  color: #3e389f;
  font-family: "Rubik", sans-serif;
  font-size: 16px;
  cursor: pointer;
  line-height: 1.5rem;
`;

interface IGasSufficiencyMessage {
  route: Route;
  fromChainId: number;
  fromTokenAddress: string;
  toChainId: number;
  toTokenAddress: string;
  toAddress: string;
  fromAmount: number;
}

export const GasSufficiencyMessage = ({
  route,
  fromChainId,
  fromTokenAddress,
  toChainId,
  toTokenAddress,
  toAddress,
  fromAmount,
}: IGasSufficiencyMessage) => {
  const { routes } = useSwapRoutes(
    fromChainId,
    fromTokenAddress,
    toChainId,
    toTokenAddress,
    toAddress,
    fromAmount,
  );

  const recommendedRoute = routes?.[0];
  const { insufficientFunds, insufficientGas } = useGasSufficiency(
    route ?? recommendedRoute,
  );

  if (insufficientFunds || insufficientGas?.length) {
    return (
      <Card>
        <div>
          <div style={{ display: "flex" }}>
            <FontAwesomeIconStyled icon={faExclamationTriangle} />
            {insufficientGas?.length ? (
              <CardTitle>Insufficient gas</CardTitle>
            ) : null}
          </div>

          <div style={{ marginLeft: "50px" }}>
            {insufficientFunds ? (
              <Typography>
                {insufficientFunds
                  ? "You don't have enough funds to execute the swap."
                  : null}
              </Typography>
            ) : null}

            {insufficientGas?.length ? (
              <Typography>You need to add at least: </Typography>
            ) : null}
            {insufficientGas?.length
              ? insufficientGas.map((item, index) => (
                  <Typography
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                  >
                    {item.insufficientAmount?.toString()} {item.token.symbol}{" "}
                    {item.chain?.name}
                  </Typography>
                ))
              : null}
          </div>
        </div>
      </Card>
    );
  } else {
    return <></>;
  }
};
