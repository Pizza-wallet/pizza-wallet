import { useLogin } from "../hooks/useLogin";
import apple from "./Account/WalletIcons/apple-social.svg";
import google from "./Account/WalletIcons/google.svg";
import twitter from "./Account/WalletIcons/twitter.svg";
import facebook from "./Account/WalletIcons/facebook.svg";
import discord from "../assets/discord.svg";
import reddit from "../assets/reddit.svg";
import styled from "styled-components";
import LoginLogo from "../assets/login-logo.svg";
import { Avatar } from "antd";
import { ButtonContainer, PrimaryButton } from "./reusable/Buttons";
import { CustomImg } from "./reusable/CustomImg";

const AccountContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Card = styled("div")`
  width: 26.75em;
  margin-left: auto;
  margin-right: auto;
  border: 0.125rem solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 2.75rem;
  padding: 0 0.425rem 0.425rem 0.425rem;
`;

const InnerCard = styled("div")`
  position: relative;
  border: 0.125rem solid #3e389f;
  background-color: #f8f2ed;
  border-radius: 2.5625rem;
  padding: 1.25rem;
`;

const FlexContainer = styled("div")`
  display: flex;
  padding: 10px 15px 0 15px;
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
  font-size: 1.625rem;
  line-height: 3.25rem;
  letter-spacing: 0.04em;
  -webkit-text-stroke: thin;
  margin: 17px 17px 0 auto;
`;

const TextStyled = styled("p")`
  font-family: "Rubik", sans-serif;
  font-size: 0.93rem;
  line-height: 1.125rem;
  letter-spacing: 0.04em;
  margin-bottom: 0.1875rem;
`;

const Divider = styled("div")`
  margin-top: 3.2em;
  margin-bottom: 3.2em;
`;

const DividerText = styled("p")`
  font-family: "Rubik", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.5rem;
  letter-spacing: 0.04em;
  width: 100%;
  text-align: center;
  border-bottom: 0.125rem solid #3e389f;
  line-height: 0.1em;
`;

const DividerSpan = styled("span")`
  background: #f8f2ed;
  padding: 0 0.625rem;
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
  width: 18.5625rem;
  margin-bottom: 35px;
`;

const ActionTitle = styled(`p`)`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.04em;
  margin-bottom: 20px;
`;

const SocialLoginCard = styled("div")`
  position: relative;
  display: grid;
  place-items: center;
  width: 37px;
  height: 37px;
  cursor: pointer;
  border-radius: 10px;
  border: 1.5px solid #3e389f;
  &:hover {
    border: 1.5px solid black;
    background: rgb(220, 220, 220, 0.8);
  }
`;

const socialLoginLogos = [
  { logo: google, width: "21px", height: "26px" },
  { logo: apple, width: "21px", height: "26px" },
  { logo: facebook, width: "24px", height: "26px" },
  { logo: twitter, width: "24px", height: "26px" },
  { logo: discord, width: "24px", height: "24px" },
  { logo: reddit, width: "24px", height: "24px" },
];

export default function SignIn() {
  const { handleLogin } = useLogin();

  return (
    <AccountContainer>
      <Card>
        <FlexContainer>
          <CustomImg
            height={"65%"}
            width={"60%"}
            margin={"1.4375rem 0 1.0625rem 0"}
            src={LoginLogo}
          />
          <LoginTitle>Login</LoginTitle>
        </FlexContainer>
        <InnerCard>
          <>
            <div>
              <FlexContainerCenter>
                <ActionTitle>Login with Social</ActionTitle>
              </FlexContainerCenter>
              <ButtonCard>
                <SocialIcons onClick={handleLogin}>
                  {socialLoginLogos.map((val, i) => {
                    return (
                      <SocialLoginCard key={i}>
                        <Avatar
                          src={val.logo}
                          style={{ width: val.width, height: val.height }}
                        ></Avatar>
                      </SocialLoginCard>
                    );
                  })}
                </SocialIcons>
                <ButtonContainer
                  width={"14.375rem"}
                  height={"3.1875rem"}
                  margin={"1.25rem 0 0 0"}
                >
                  <PrimaryButton onClick={handleLogin}>
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
                <ActionTitle>Add your wallet</ActionTitle>
              </FlexContainerCenter>

              <FlexContainerCenter>
                <ButtonContainer
                  width={"14.375rem"}
                  height={"3.1875rem"}
                  margin={"0 0 4.0625rem 0"}
                >
                  <PrimaryButton>Import wallet</PrimaryButton>
                </ButtonContainer>
              </FlexContainerCenter>
            </div>
          </>
        </InnerCard>
      </Card>
    </AccountContainer>
  );
}
