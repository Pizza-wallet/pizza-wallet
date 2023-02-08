import Transfer from "./components/Transfer";
import NativeBalance from "../TotalBalance";
import Address from "../Address/Address";
import Blockie from "../Blockie";
import { Card } from "antd";
import styled from "styled-components";

const StyledHeader = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3125rem;
`;

const StyledCard = styled(Card)`
  border: none;
  border-radius: 1rem;
  width: 28.125rem;
  font-size: 1rem;
  font-weight: 500;
  margin-top: -3em;
  margin-right: auto;
  margin-left: auto;
`;

function Wallet() {
  return (
    <StyledCard
      className="floater"
      title={
        <StyledHeader>
          <Blockie scale={5} avatar currentWallet style />
          <Address size={6} copyable />
          <NativeBalance totalBalance={""} />
        </StyledHeader>
      }
    >
      <Transfer />
    </StyledCard>
  );
}

export default Wallet;
