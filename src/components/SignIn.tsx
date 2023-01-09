import Account from "./Account/Account";
import apple from "./Account/WalletIcons/apple-social.svg";
import google from "./Account/WalletIcons/google.svg";
import twitter from "./Account/WalletIcons/twitter.svg";
import facebook from "./Account/WalletIcons/facebook.svg";
import styled from "styled-components";
import LoginLogo from "../assets/login-logo.svg";
import { ButtonContainer, PrimaryButton } from "./reusable/Buttons";
import { CustomImg } from "./reusable/CustomImg";
import { useAuthenticateUser } from "../hooks/useAuthenticateUser";

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

const FlexContainerCenter = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginTitle = styled("p")`
  font-family: "Gloria Hallelujah", sans-serif;
  color: var(--brand-blue);
  font-size: 1.62rem;
  line-height: 3.25rem;
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
`;

export default function SignIn() {
  // todo: add state variable for auth error and create error handling logic and component
  //const { authenticateUser } = useAuthenticateUser();

  const handleCustomLogin = async () => {
    //await authenticateUser(
    //  {
    //    provider: "web3Auth",
    //    clientId:
    //      "BDd_ThRyII1AlPIPirOMjMz4ZZ5ai_NSGrBqU7dV1kBO36YNIrJDPXC-EXxB8W_ck2MQHWOfVOmKRw_MZAmq49A",
    //    rpcTarget:
    //      "https://eth-mainnet.g.alchemy.com/v2/QYhVNEB6nYsSUseBAR1-vk1D2W6ulwxG",
    //    chainId: "0x1",
    //    appLogo: "pizza.png",
    //  },
    //  "web3Auth",
    //);
  };

  return (
    <AccountContainer>
      <Card>
        <FlexContainerCenter>
          <CustomImg
            height={"70%"}
            width={"70%"}
            margin={"1.4375rem 0 1.0625rem 0"}
            src={LoginLogo}
          />
        </FlexContainerCenter>
        <InnerCard>
          <>
            <FlexContainerCenter>
              <LoginTitle>Login</LoginTitle>
            </FlexContainerCenter>
            {/*{authError && alert(JSON.stringify(authError.message))}*/}
            <div>
              <ButtonCard>
                <SocialIcons onClick={handleCustomLogin}>
                  <CustomImg margin={"0 0 0.25rem 0"} src={apple} alt="logo" />
                  <img src={facebook} alt="logo" />
                  <img src={google} alt="logo" />
                  <img src={twitter} alt="logo" />
                  <TextStyled>and more</TextStyled>
                </SocialIcons>
                <ButtonContainer
                  width={"14.375rem"}
                  height={"3.1875rem"}
                  margin={"1.25rem 0 0 0"}
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
                  width={"14.375rem"}
                  height={"3.1875rem"}
                  margin={"0 0 4.0625rem 0"}
                >
                  <PrimaryButton>
                    {/* Connect wallet */}
                    <Account />
                  </PrimaryButton>
                </ButtonContainer>
              </FlexContainerCenter>
            </div>
          </>
        </InnerCard>
      </Card>
    </AccountContainer>
  );
}
