import { CreditCardOutlined } from "@ant-design/icons";
import { Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import AddressInput from "../../AddressInput";
import AssetSelector from "./AssetSelector";
import styled from "styled-components";
import {
  ButtonContainer,
  PrimaryButton,
  SecondaryButton,
} from "../../reusable/Buttons";
import PizzawalletModal from "../../reusable/PizzawalletModal";
import { Link } from "react-router-dom";
import { BigNumber } from "@ethersproject/bignumber";

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

export interface Transaction {
  hash?: string;
  to?: string;
  from?: string;
  nonce: number;
  gasLimit: BigNumber;
  gasPrice?: BigNumber;
  data: string;
  value: BigNumber;
  chainId: number;
  r?: string;
  s?: string;
  v?: number;
  // Typed-Transaction features
  type?: number | null;
  // EIP-1559; Type 2
  maxPriorityFeePerGas?: BigNumber;
  maxFeePerGas?: BigNumber;
  wait?: () => { status: string; to: string; error: string };
}

// This could be made into a re-usable type - Token?
interface IAsset {
  token_address: string;
  decimals: number;
}

interface ITransaction {
  receiver?: string;
  asset?: IAsset;
  amount?: string;
}

interface Iresult {
  status: string;
  to: string;
  error: string;
}

function Transfer() {
  const { Moralis } = useMoralis();
  const [receiver, setReceiver] = useState<string>();
  const [asset, setAsset] = useState<IAsset>();
  const [tx, setTx] = useState<ITransaction>({
    amount: "",
    receiver: "",
    asset: { token_address: "", decimals: 0 },
  });
  const [amount, setAmount] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    asset && amount && receiver
      ? setTx({ amount, receiver, asset })
      : setTx({});
  }, [asset, amount, receiver]);

  const openNotification = ({
    message,
    description,
  }: {
    message: string;
    description: string;
  }) => {
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
    const transactionAmount = amount ? amount : "";
    switch (asset?.token_address) {
      case "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":
        options = {
          native: "native",
          amount: Moralis.Units.ETH(transactionAmount),
          receiver,
          awaitReceipt: false,
        };
        break;
      default:
        options = {
          type: "erc20",
          amount: Moralis.Units.Token(transactionAmount, asset?.decimals),
          receiver,
          contractAddress: asset?.token_address,
          awaitReceipt: false,
        };
    }

    setIsPending(true);

    try {
      const txStatus: Transaction = await Moralis.transfer(options);

      const result: Iresult = txStatus.wait
        ? await txStatus.wait()
        : { status: "", to: "", error: "Error waiting on result" };

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
    } catch (error: any) {
      openNotification({
        message: "📃 Error",
        description: `${error.message}`,
      });
      setIsPending(false);
      console.log(error);
    }
  }

  return (
    <PizzawalletModal center={true} header={"Transfer Assets"}>
      <>
        <Text>Send to:</Text>
        <AddressInput autoFocus onChange={setReceiver} />

        <Text>Asset:</Text>
        <AssetSelector setAsset={setAsset} style={{ width: "100%" }} />

        <Text>Amount:</Text>
        <StyledInput
          size="large"
          prefix={<CreditCardOutlined />}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            const target = e.target as HTMLInputElement;
            setAmount(`${target.value}`);
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
              // need to add loading animation to buttons
              // loading={isPending}
              onClick={() => transfer()}
              // disabled={!tx}
            >
              Transfer
            </PrimaryButton>
          </ButtonContainer>
        </Controls>
      </>
    </PizzawalletModal>
  );
}

export default Transfer;
