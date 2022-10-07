import { CreditCardOutlined } from "@ant-design/icons";
import { Input, notification } from "antd";
import { useEffect, useState } from "react";
//import { useMoralis } from "react-moralis";
import AddressInput from "../../AddressInput";
import AssetSelector from "./AssetSelector";
import styled from "styled-components";
import {
  ButtonContainer,
  PrimaryButton,
  SecondaryButton,
} from "../../reusable/Buttons";
import { Link } from "react-router-dom";
import { useWeb3 } from "../../../hooks/useWeb3";

const Card = styled("div")`
  width: 428px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 44px;
  padding: 6.8px;
`;

const InnerCard = styled("div")`
  position: relative;
  border: 2px solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 41px;
  padding: 20px;
  width: 411px;
`;

const Header = styled("div")`
  color: #3e389f;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 24px;
  padding: 10px 0 10px 20px;
  -webkit-text-stroke: thin;
`;

const Text = styled("p")`
  color: black;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.02em;
  margin: 20px 0 10px 0;
`;

const Controls = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-top: 37px;
`;

const StyledInput = styled(Input)`
  border: 2px solid #3e389f;
  border-radius: 15px;
`;

function Transfer() {
  //const { account } = useMoralis();
  const { web3, account } = useWeb3();
  console.log("account", account);
  const [receiver, setReceiver] = useState();
  const [asset, setAsset] = useState();
  const [gas, setGas] = useState();
  const [maxFee, setMaxFee] = useState();
  const [gasPrice, setGasPrice] = useState();
  const [gasFlag, setGasFlag] = useState();

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

  const handleGas = async (e) => {
    let input = e.target.value;
    if (input >= gas) {
      //setTx(!tx);

      setGasFlag(true);
      alert("Good to go");
      setGasFlag(true);
      setGas(input);
      web3.eth.getMaxPriorityFeePerGas().then((res) => setMaxFee(Number(res)));

      let gasprice = await web3.eth.getGasPrice();

      let gasInEther = web3.utils.fromWei(input, "ether");

      setGasPrice(gasInEther * gasprice);
    } else {
      alert("Oops less gas");
      const { amount, receiver, asset } = tx;
      // Set recipient address and transfer value first.
      let to_address = receiver;
      let transfer_val = amount;
      // function signature is the first 4 bytes of the sha3 hash
      let function_signature = web3.utils
        .sha3("transfer(address,uint256)")
        .substring(0, 10);
      // we have to make the address field 32 bytes
      let address_param = "0".repeat(24) + to_address.substring(2);
      // likewise, we have to make the transfer value 32 bytes
      let transfer_value_param = web3.utils.toHex(
        web3.utils.toBN(transfer_val * Math.pow(10, 18)).toString(),
      );
      let transfer_value_prefix = "0".repeat(66 - transfer_value_param.length);
      // combining the function sig and all the arguments
      let transfer_data =
        function_signature +
        address_param +
        transfer_value_prefix +
        transfer_value_param.substring(2);
      // We are ready to estimateGas with all the data ready.
      let result = await web3.eth.estimateGas({
        from: account,
        // token contract address
        to: asset.token_address,
        data: transfer_data,
      });

      setGas(result);

      web3.eth.getMaxPriorityFeePerGas().then((res) => setMaxFee(Number(res)));

      let gasprice = await web3.eth.getGasPrice();

      let gasInEther = web3.utils.fromWei(result.toString(), "ether");

      setGasPrice(gasInEther * gasprice);
    }
  };

  async function transfer() {
    const { amount, receiver, asset } = tx;

    // Set recipient address and transfer value first.
    let to_address = receiver;
    let transfer_val = amount;
    // function signature is the first 4 bytes of the sha3 hash
    let function_signature = web3.utils
      .sha3("transfer(address,uint256)")
      .substring(0, 10);
    // we have to make the address field 32 bytes
    let address_param = "0".repeat(24) + to_address.substring(2);
    // likewise, we have to make the transfer value 32 bytes
    let transfer_value_param = web3.utils.toHex(
      web3.utils.toBN(transfer_val * Math.pow(10, 18)).toString(),
    );
    let transfer_value_prefix = "0".repeat(66 - transfer_value_param.length);
    // combining the function sig and all the arguments
    let transfer_data =
      function_signature +
      address_param +
      transfer_value_prefix +
      transfer_value_param.substring(2);
    // We are ready to estimateGas with all the data ready.

    const transaction_params = {
      from: account,
      // token contract address
      to: asset.token_address,
      data: transfer_data,
      gas: gas,
      //gasPrice: web3.utils.toWei(gasPrice.toString(), "gwei"),
    };

    setIsPending(true);
    // let options = {};

    // switch (asset.token_address) {
    //   case "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee":
    //     options = {
    //       native: "native",
    //       amount: Moralis.Units.ETH(amount),
    //       receiver,
    //       awaitReceipt: false,
    //     };
    //     break;
    //   default:
    //     options = {
    //       type: "erc20",
    //       amount: Moralis.Units.Token(amount, asset.decimals),
    //       receiver,
    //       contractAddress: asset.token_address,
    //       awaitReceipt: false,
    //     };
    // }

    setIsPending(true);

    try {
      // const txStatus = await Moralis.transfer(options);
      // const result = await txStatus.wait();

      const result = await web3.eth.sendTransaction(transaction_params);

      switch (result) {
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
          type="text"
          maxLength="3"
        />
        <Text strong>Gas:</Text>
        <StyledInput
          size="large"
          prefix={<CreditCardOutlined />}
          onChange={(e) => {
            handleGas(e);
          }}
          disabled={gasFlag}
        />
        <Controls>
          <ButtonContainer width={"167px"} height={"51px"}>
            <Link to="/dashboard">
              <SecondaryButton>Cancel</SecondaryButton>
            </Link>
          </ButtonContainer>
          <ButtonContainer width={"172px"} height={"51px"}>
            <PrimaryButton
              loading={isPending}
              onClick={() => transfer()}
              disabled={!tx && !gasFlag}
            >
              Transfer
            </PrimaryButton>
          </ButtonContainer>
        </Controls>
        {gas ? <Text strong>Gas: {gas}</Text> : <></>}
        {maxFee ? <Text strong>Max Fee: {maxFee}</Text> : <></>}
        {gasPrice ? <Text strong>Gas Price: {gasPrice}</Text> : <></>}
      </InnerCard>
    </Card>
  );
}

export default Transfer;
