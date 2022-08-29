import { CreditCardOutlined } from "@ant-design/icons";
import { Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import AddressInput from "../../AddressInput";
import AssetSelector from "./AssetSelector";
import styled from "styled-components";
import {
  ButtonContainer,
  PrimaryButton,
  SecondaryButton,
} from "../../reusable/Buttons";
import { Link } from "react-router-dom";

const Card = styled("div")`
  width: 26.8em;
  margin-left: auto;
  margin-right: auto;
  border: 0.125rem solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 2.75rem;
  padding: 0.425rem;
`;

const InnerCard = styled("div")`
  position: relative;
  border: 0.125rem solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 2.5625rem;
  padding: 1.25rem;
  width: 25.6em;
`;

const Header = styled("div")`
  color: #3e389f;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 1.5rem;
  padding: 0.625rem 0 0.625rem 1.25rem;
  -webkit-text-stroke: thin;
`;

const Text = styled("p")`
  color: black;
  font-family: "Rubik", sans-serif;
  font-size: 1.25rem;
  line-height: 1.5rem;
  letter-spacing: 0.02em;
  margin: 1.25rem 0 0.625rem 0;
`;

const Controls = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-top: 2.3125rem;
`;

const StyledInput = styled(Input)`
  border: 0.125rem solid #3e389f;
  border-radius: 0.9375rem;
`;

function Transfer() {
  const { Moralis } = useMoralis();
  const [receiver, setReceiver] = useState();
  const [asset, setAsset] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    asset && amount && receiver ? setTx({ amount, receiver, asset }) : setTx();
  }, [asset, amount, receiver]);

  const openNotification = ({ message, description }) => {
    notification.open({
      placement: "bottomRight",
      message,
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  async function transfer() {
    const { amount, receiver, asset } = tx;

    let options = {};

    switch (asset.token_address) {
      case "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":
        options = {
          native: "native",
          amount: Moralis.Units.ETH(amount),
          receiver,
          awaitReceipt: false,
        };
        break;
      default:
        options = {
          type: "erc20",
          amount: Moralis.Units.Token(amount, asset.decimals),
          receiver,
          contractAddress: asset.token_address,
          awaitReceipt: false,
        };
    }

    setIsPending(true);

    try {
      const txStatus = await Moralis.transfer(options);
      const result = await txStatus.wait();

      switch (result.status) {
        case "1":
          openNotification({
            message: "🔊 New Transaction",
            description: `To: ${result.to}`,
          });
          setIsPending(false);
          break;
        default:
          openNotification({
            message: "📃 Error",
            description: `${result.error}`,
          });
          setIsPending(false);
      }
    } catch (error) {
      openNotification({
        message: "📃 Error",
        description: `${error.message}`,
      });
      setIsPending(false);
      console.log(error);
    }

    // console.log(txStatus);
    // console.log(result);
  }

  return (
    <Card>
      <Header>
        <p>Transfer Assets</p>
      </Header>
      <InnerCard>
        <Text strong>Send to:</Text>
        <AddressInput autoFocus onChange={setReceiver} />

        <Text strong>Asset:</Text>
        <AssetSelector setAsset={setAsset} style={{ width: "100%" }} />

        {/* <Text strong>Blockchain:</Text>
        <AssetSelector setAsset={setAsset} style={{ width: "100%" }} /> */}

        <Text strong>Amount:</Text>
        <StyledInput
          size="large"
          prefix={<CreditCardOutlined />}
          onChange={(e) => {
            setAmount(`${e.target.value}`);
          }}
        />
        <Controls>
          <ButtonContainer width={"11em"} height={"3.1875rem"}>
            <Link to="/dashboard">
              <SecondaryButton>Cancel</SecondaryButton>
            </Link>
          </ButtonContainer>
          <ButtonContainer width={"11em"} height={"3.1875rem"}>
            <PrimaryButton
              loading={isPending}
              onClick={() => transfer()}
              disabled={!tx}
            >
              Transfer
            </PrimaryButton>
          </ButtonContainer>
        </Controls>
      </InnerCard>
    </Card>
  );
}

export default Transfer;
