import styled from "styled-components";

export const ButtonContainer = styled("div")`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

export const PrimaryButton = styled("button")`
  width: 100%;
  height: 100%;
  background: #3e389f;
  border-radius: 15px;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 22px;
  cursor: pointer;
  color: white;

  user-select: none;

  padding: 12px 24px;

  line-height: 28px;

  position: relative;
  text-align: center;

  z-index: 0;
  transition: letter-spacing 0.4s ease;
  border: none;
  display: inline-block;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--brand-blue);
    z-index: -1;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    border: 3px solid var(--brand-blue);
  }

  &:after {
    pointer-events: none;
    content: "";
    background: white;
    background: #8b88c3;
    background-position: bottom;
    background-repeat: round;
    background-position-y: bottom;
    background-repeat: round;
    display: block;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    transform: translate(5px, 5.5px);
    z-index: -2;
    border-radius: 15px;
    width: 100%;
    height: 100%;
    border: 2px solid #3e389f;
  }
`;

export const SecondaryButton = styled("button")`
  width: 100%;
  height: 100%;
  border: 3px solid #3e389f;
  border-radius: 15px;
  color: #3e389f;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 22px;
  cursor: pointer;
`;
