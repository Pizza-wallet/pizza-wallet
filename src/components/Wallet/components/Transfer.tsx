import { notification } from "antd";
import { useEffect, useState, useCallback } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import AddressInput from "../../AddressInput";
import { getEllipsisTxt } from "../../../helpers/formatters";
import styled from "styled-components";
import {
  ButtonContainer,
  PrimaryButton,
  SecondaryButton,
} from "../../reusable/Buttons";
import PizzawalletModal from "../../reusable/PizzawalletModal";
import { Link } from "react-router-dom";
import { BigNumber } from "@ethersproject/bignumber";
import { SelectChainTokenBtn } from "../../Dex-lifi/SelectChainTokenBtn";
import { SelectTokenPage } from "../../Dex-lifi/SelectToken/SelectTokenPage";
import { SwapInput } from "../../Dex-lifi/SwapInput";
import { useToken } from "../../../hooks/useToken";

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

interface ITransaction {
  receiver?: string;
  fromToken?: string;
  fromTokenAmount?: number;
}

interface Iresult {
  status: string;
  to: string;
  error: string;
}

function Transfer() {
  const { Moralis, web3 } = useMoralis();
  const web3Provider: any = web3;
  const [receiver, setReceiver] = useState("");
  // const [asset, setAsset] = useState<string>();

  const [address, setAddress] = useState("");
  const [validatedAddress, setValidatedAddress] = useState("");
  const [isDomain, setIsDomain] = useState(false);
  const {
    resolve: { resolveDomain },
  } = useMoralisWeb3Api();

  const [page, setPage] = useState("main");

  // Send From chain and token
  const [fromChain, setFromChain] = useState(1);
  const [fromToken, setFromToken] = useState("");
  const [fromTokenAmount, setFromTokenAmount] = useState<number>(0);

  const { token, isLoading: isTokenLoading } = useToken(fromChain, fromToken);

  const [tx, setTx] = useState<ITransaction>({
    fromTokenAmount: 0,
    receiver: "",
    fromToken: "",
  });
  const [amount, setAmount] = useState<string>();
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    fromToken && fromTokenAmount && receiver
      ? setTx({ fromTokenAmount, receiver, fromToken })
      : setTx({});
  }, [fromToken, fromTokenAmount, receiver]);

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
    console.log("transfer happening - ");

    const { fromTokenAmount, receiver, fromToken } = tx;

    let options = {};
    const transactionAmount = fromTokenAmount ? fromTokenAmount : "";
    switch (fromToken) {
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
          amount: Moralis.Units.Token(transactionAmount, token?.decimals),
          receiver,
          contractAddress: fromToken,
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

  function isSupportedDomain(domain: string) {
    return [
      ".eth",
      ".crypto",
      ".coin",
      ".wallet",
      ".bitcoin",
      ".x",
      ".888",
      ".nft",
      ".dao",
      ".blockchain",
    ].some((tld) => domain.endsWith(tld));
  }

  const updateAddress = useCallback(
    async (value: string) => {
      setAddress(value);
      if (isSupportedDomain(value)) {
        const processPromise = function (promise: any) {
          promise
            .then((addr: string) => {
              setValidatedAddress(addr);
              setIsDomain(true);
              setReceiver(addr);
            })
            .catch(() => {
              setValidatedAddress("");
              setReceiver("");
            });
        };
        if (value.endsWith(".eth")) {
          processPromise(web3Provider?.eth?.ens?.getAddress(value));
        } else {
          processPromise(
            resolveDomain({
              domain: value,
            }).then((r) => r?.address),
          );
        }
      } else if (value.length === 42) {
        setValidatedAddress(getEllipsisTxt(value, 10));
        setReceiver(getEllipsisTxt(value, 10));
        setIsDomain(false);
      } else {
        setValidatedAddress("");
        setIsDomain(false);
        setReceiver("");
      }
    },
    [resolveDomain, web3Provider?.eth?.ens],
  );

  console.log("show tx here - ", tx);

  return (
    <PizzawalletModal center={true} header={"Transfer Assets"}>
      {page === "selectToken" ? (
        <SelectTokenPage
          formType={"From"}
          navigateBack={() => setPage("main")}
          fromChain={fromChain}
          setFromChain={setFromChain}
          toChain={1}
          setToChain={() => {}}
          setFromToken={setFromToken}
          setToToken={() => {}}
        />
      ) : (
        <>
          {/* <Text>Send to:</Text> */}
          <AddressInput
            updateAddress={updateAddress}
            address={address}
            validatedAddress={validatedAddress}
            isDomain={isDomain}
            setIsDomain={setIsDomain}
            setValidatedAddress={setValidatedAddress}
          />

          <SelectChainTokenBtn
            handleClick={setPage}
            chainId={fromChain}
            tokenAddress={fromToken}
            formType={"Choose asset"}
          />

          <SwapInput
            tokenAddress={fromToken}
            chainId={fromChain}
            value={fromTokenAmount}
            handleChange={(val: number) => setFromTokenAmount(val)}
            selectedChainId={fromChain}
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
                onClick={() => (tx ? transfer() : null)}
                // disabled={!tx}
              >
                Transfer
              </PrimaryButton>
            </ButtonContainer>
          </Controls>
        </>
      )}
    </PizzawalletModal>
  );
}

export default Transfer;
