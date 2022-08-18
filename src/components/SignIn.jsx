import { useState } from "react";
import { useMoralis } from "react-moralis";
import "antd/dist/antd.css";
import "../style.css";
import Text from "antd/lib/typography/Text";
// import Account from "./Account/Account.jsx";
import apple from "./Account/WalletIcons/apple-social.svg";
import google from "./Account/WalletIcons/google.svg";
import twitter from "./Account/WalletIcons/twitter.svg";
import facebook from "./Account/WalletIcons/facebook.svg";
import styled from "styled-components";
import LoginLogo from "../assets/login-logo.svg";
import { ButtonContainer, PrimaryButton } from "./reusable/Buttons";
import { CustomImg } from "./reusable/CustomImg";
// import { Menu } from "antd";
// import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Chains/Logos";

const AccountContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled("div")`
  width: 26.8em;
  height: 39em;
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
  width: 25.6em;
  height: 31em;
`;

const FlexContainerCenter = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled("p")`
  font-family: "Gloria Hallelujah", sans-serif;
  color: var(--brand-blue);
  font-size: 26px;
  line-height: 52px;
  letter-spacing: 0.04em;
  -webkit-text-stroke: thin;
  margin-bottom: 2em;
  @media (min-width: 1250px) {
    margin-bottom: 2.5em;
  }
  @media (max-width: 380px) {
    margin-bottom: 1em;
  }
`;

const TextStyled = styled(Text)`
  font-family: "Rubik", sans-serif;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.04em;
  margin-bottom: 3px;
`;

const Divider = styled("div")`
  margin-top: 3.2em;
  margin-bottom: 3.2em;
`;

const DividerText = styled("p")`
  font-family: "Rubik", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.04em;
  width: 100%;
  text-align: center;
  border-bottom: 2px solid #3e389f;
  line-height: 0.1em;
`;

const DividerSpan = styled("span")`
  background: #f8f2ed;
  padding: 0 10px;
`;

const ButtonCard = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const SocialIcons = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: end;
  cursor: pointer;
`;

// const menuItems = [
//   {
//     key: "0x2a",
//     value: "Kovan Testnet",
//     icon: <ETHLogo />,
//   },
//   {
//     key: "0x61",
//     value: "BSC Testnet",
//     icon: <BSCLogo />,
//   },
//   {
//     key: "0x13881",
//     value: "Mumbai",
//     icon: <PolygonLogo />,
//   },
//   {
//     key: "0xa869",
//     value: "Avalanche Testnet",
//     icon: <AvaxLogo />,
//   },
// ];

export default function SignIn({ setViewSwitched }) {
  const { authenticate } = useMoralis();
  const [chain] = useState("");
  // const [setSelected] = useState({});

  console.log("chain", chain);

  // useEffect(() => {
  //   if (!chain) return null;
  //   const newSelected = menuItems.find((item) => item.key === chain);
  //   setSelected(newSelected);
  //   console.log("current chainId: ", chain);
  // }, [chain]);

  // const handleMenuClick = (e) => {
  //   setchain(e.key);
  //   console.log(`${chain}`);
  // };

  // const menu = (
  //   <Menu onClick={handleMenuClick}>
  //     {menuItems.map((item) => (
  //       <Menu.Item key={item.key} icon={item.icon}>
  //         <span style={{ marginLeft: "5px" }}>{item.value}</span>
  //       </Menu.Item>
  //     ))}
  //   </Menu>
  // );

  const handleCustomLogin = async () => {
    await authenticate({
      provider: "web3Auth",
      clientId:
        "BKHvc6j0wd4pp3KVIMfHBjGPkz-4gQo5HA7LjLzRmzxV2cWVkjf1gyhmZwQAIKmezaq5mVhnphnkK-H29vrAEY4",
      rpcTarget: "https://kovan.infura.io/v3/f79f2eecc6f1408692098c78dcbdf228",
      chainId: `${chain}` || "0x2a",
      appLogo: "pizza.png",
    });
    window.localStorage.setItem("connectorId", "web3Auth");
    window.localStorage.setItem("chainId", chain || "0x2a");
  };

  return (
    <AccountContainer>
      <Card>
        <FlexContainerCenter>
          <CustomImg
            height={"70%"}
            width={"70%"}
            margin={"1.4em"}
            src={LoginLogo}
          />
        </FlexContainerCenter>
        <InnerCard>
          <FlexContainerCenter>
            <LoginTitle>Login</LoginTitle>
          </FlexContainerCenter>
          {/* {authError && alert(JSON.stringify(authError.message))} */}
          <div>
            {/* <Dropdown overlay={menu} trigger={["click"]}>
              <Button key={selected?.key} icon={selected?.icon}>
                <span style={{ marginLeft: "5px" }}>
                  {selected?.value || "Choose chain"}
                </span>
              </Button>
            </Dropdown> */}
            <ButtonCard>
              <SocialIcons onClick={handleCustomLogin}>
                <CustomImg margin={"0 0 4px 0"} src={apple} alt="logo" />
                <img src={facebook} alt="logo" />
                <img src={google} alt="logo" />
                <img src={twitter} alt="logo" />
                <TextStyled>and more</TextStyled>
              </SocialIcons>
              <ButtonContainer
                width={"239px"}
                height={"57px"}
                margin={"20px 0 0 0"}
              >
                <PrimaryButton onClick={handleCustomLogin}>
                  Social Login
                </PrimaryButton>
              </ButtonContainer>
            </ButtonCard>

            <Divider>
              <DividerText>
                <DividerSpan>OR</DividerSpan>
              </DividerText>
            </Divider>

            <FlexContainerCenter>
              <ButtonContainer
                width={"239px"}
                height={"57px"}
                margin={"0 0 65px 0"}
              >
                <PrimaryButton onClick={setViewSwitched}>
                  Connect wallet
                  {/* <Account /> */}
                </PrimaryButton>
              </ButtonContainer>
            </FlexContainerCenter>
          </div>
        </InnerCard>
      </Card>
    </AccountContainer>
  );
}
