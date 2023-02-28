import styled from "styled-components";
import warningStripe from "../../assets/warningStripe.svg";

const WarningContainer = styled(`div`)`
  position: relative;
  width: 282px;
  height: 109px;
  margin: ${({ margin }: { margin?: string }) => margin};
`;

const BackdropStyled = styled("div")`
  position: absolute;
  left: 5px;
  top: 5px;
  width: 282px;
  height: 109px;
  border: 2px solid #f34337;
  background-image: url(${warningStripe});
  // background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 15px;
`;

const WarningNotification = styled("div")`
  width: 282px;
  height: 109px;
  border: 2px solid #f34337;
  border-radius: 15px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  background: #f8e4de;
`;

const StyledTitle = styled(`p`)`
  font-family: "Gloria Hallelujah";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 130%;
  text-align: center;
  color: #000000;
`;

const StyledMessage = styled(`p`)`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  color: #000000;
  margin-top: 5px;
`;

interface IPizzawalletWarning {
  title: string;
  message: string;
  margin?: string;
}

function PizzaWalletWarning({ title, message, margin }: IPizzawalletWarning) {
  return (
    <WarningContainer margin={margin}>
      <BackdropStyled></BackdropStyled>
      <WarningNotification>
        <StyledTitle>{title}</StyledTitle>
        <StyledMessage>{message}</StyledMessage>
      </WarningNotification>
    </WarningContainer>
  );
}

export default PizzaWalletWarning;
