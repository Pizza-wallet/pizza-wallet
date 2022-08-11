import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import "antd/dist/antd.css";
import "../style.css";
import Text from "antd/lib/typography/Text";
import Account from "./Account/Account.jsx";
import apple from "./Account/WalletIcons/apple-social.svg";
import google from "./Account/WalletIcons/google.svg";
import twitter from "./Account/WalletIcons/twitter.svg";
import facebook from "./Account/WalletIcons/facebook.svg";
import styled from "styled-components";
import LoginLogo from "../assets/login-logo.svg";
import { ButtonContainer, PrimaryButton } from "./reusable/Buttons";
import { CustomImg } from "./reusable/CustomImg";

const AccountContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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
  margin-bottom: 65px;
`;

const TextStyled = styled(Text)`
  font-family: "Rubik", sans-serif;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.04em;
`;

const Divider = styled("div")`
  margin-top: 50px;
  margin-bottom: 50px;
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
  padding-bottom: 1em;
  cursor: pointer;
`;

export default function SignIn() {
  const { authenticate, authError } = useMoralis();

  const [chain, setchain] = useState("");

   console.log("chain", chain);

   useEffect(() => {
     if (!chain) return null;
     const newSelected = menuItems.find((item) => item.key === chain);
     setSelected(newSelected);
     console.log("current chainId: ", chain);
   }, [chain]);

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
            margin={"23px"}
            src={LoginLogo}
          />
        </FlexContainerCenter>
        <InnerCard>
          <FlexContainerCenter>
            <LoginTitle>Login</LoginTitle>
          </FlexContainerCenter>
          {authError && alert(JSON.stringify(authError.message))}
          <div>
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
                <PrimaryButton>
                  <Account />
                </PrimaryButton>
              </ButtonContainer>
            </FlexContainerCenter>
          </div>
        </InnerCard>
      </Card>
    </AccountContainer>
  );
}
