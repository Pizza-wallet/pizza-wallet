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

interface ITransferError {
  insufficientFunds: boolean;
  amountToAdd: number;
}

export const TransferError = ({
  insufficientFunds,
  amountToAdd,
}: ITransferError) => {
  if (insufficientFunds) {
    return (
      <Card>
        <div>
          <div style={{ display: "flex" }}>
            <FontAwesomeIconStyled icon={faExclamationTriangle} />

            <CardTitle>Insufficient funds</CardTitle>
          </div>

          <div style={{ marginLeft: "50px" }}>
            <Typography>
              You don't have enough funds to execute the swap.
            </Typography>
            <Typography>You need to add at least: </Typography>
            <Typography>{amountToAdd}</Typography>
          </div>
        </div>
      </Card>
    );
  } else {
    return <></>;
  }
};
