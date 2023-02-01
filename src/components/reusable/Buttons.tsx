import React, { useState } from "react";
import styled from "styled-components";
import btnStripe from "../../assets/stripes.png";

interface IButtonContainer {
  width?: string;
  height?: string;
  margin?: string;
}

interface IButton {
  selected?: boolean;
  pathname?: string;
  height?: string;
  width?: string;
}

export const ButtonContainer = styled("div")`
  width: ${(props: IButtonContainer) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
`;

export const PrimaryButton = styled("button")`
  width: 100%;
  height: 100%;
  background: #3e389f;
  border-radius: 0.9375rem;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 1.37rem;
  cursor: pointer;
  color: white;
  user-select: none;
  line-height: 1.75rem;
  position: relative;
  text-align: center;
  z-index: 0;
  transition: letter-spacing 0.4s ease;
  border: none;
  display: inline-block;
  -webkit-text-stroke: thin;
  letter-spacing: 0.03125rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--brand-blue);
    z-index: -1;
    border-radius: 0.9375rem;
    width: 100%;
    height: 100%;
    border: 0.1875rem solid var(--brand-blue);
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
    transform: translate(0.3125rem, 0.34375rem);
    z-index: -2;
    border-radius: 0.9375rem;
    width: 100%;
    height: 100%;
    border: 0.125rem solid #3e389f;
  }
`;

export const SecondaryButton = styled("button")`
  width: 100%;
  height: 100%;
  border: 0.1875rem solid #3e389f;
  border-radius: 0.9375rem;
  background-color: var(--layout-white);
  color: #3e389f;
  font-family: "Gloria Hallelujah", sans-serif;
  font-size: 1.37rem;
  cursor: pointer;
  letter-spacing: 0.03125rem;
  -webkit-text-stroke: thin;
`;

export const MenuButton = styled("button")`
  user-select: none;
  font-family: "Gloria Hallelujah", sans-serif;
  padding: 0.75rem 1.5rem;
  font-size: 1.5rem;
  line-height: 0.625rem;
  color: ${(props: IButton) =>
    props.selected ? "var(--dirty-white-2)" : "var(--brand-blue)"};
  position: relative;
  text-align: center;
  cursor: pointer;
  z-index: 0;
  transition: letter-spacing 0.4s ease;
  border: none;
  display: inline-block;
  border-radius: 1.0625rem;
  height: ${(props) => (props.height ? props.height : "2.625rem")};
  width: ${(props) => (props.width ? props.width : "13.75rem")};
  transform: rotate(-1deg);
  margin: 0.625rem;
  -webkit-text-stroke: thin;
  letter-spacing: 0.03125rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${(props) =>
      props.selected ? "var(--brand-blue)" : "var(--layout-white)"};
    z-index: -1;
    border-radius: 0.9375rem;

    width: 13.75rem;
    height: 2.625rem;
    border: 0.1875rem solid var(--brand-blue);
  }
  &:after {
    pointer-events: none;
    content: "";
    background: white;
    background: ${(props) =>
      props.selected ? `#8B88C3` : `url(${btnStripe})`};
    background-repeat: round;
    background-origin: border-box;
    display: block;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    transform: ${(props) =>
      props.selected
        ? `translate(0.3125rem, 0.375rem)`
        : `translate(0.25rem, 0.3125rem)`};
    width: 100%;
    z-index: -2;
    border-radius: 0.9375rem;
    width: 13.75rem;
    height: 2.625rem;
    border: ${(props) =>
      props.selected
        ? `0.1875rem solid #3E389F;`
        : `0.1875rem solid var(--brand-blue)`};
  }

  &:active {
    &:before {
      left: 0.3125rem;
      top: 0.3125rem;
    }
  }
`;

interface IStyled {
  mouseDown: boolean;
}

export const ButtonAnimationStyles = styled("button")`
  user-select: none;
  font-family: "Gloria Hallelujah", sans-serif;
  padding: 0.75rem 1.5rem;
  font-size: 1.5rem;
  line-height: 0.625rem;
  color: ${(props: IButton) =>
    props.selected ? "var(--dirty-white-2)" : "var(--brand-blue)"};
  position: relative;
  text-align: center;
  cursor: pointer;
  z-index: 0;
  transition: letter-spacing 0.4s ease;
  border: none;
  display: inline-block;
  border-radius: 1.0625rem;
  height: ${(props) => (props.height ? props.height : "2.625rem")};
  width: ${(props) => (props.width ? props.width : "13.75rem")};
  // transform: rotate(-1deg);
  margin: 0.625rem;
  -webkit-text-stroke: thin;
  letter-spacing: 0.03125rem;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${(props) =>
      props.selected ? "var(--brand-blue)" : "var(--layout-white)"};
    z-index: -1;
    border-radius: 0.9375rem;

    height: ${(props) => (props.height ? props.height : "2.625rem")};
    width: ${(props) => (props.width ? props.width : "13.75rem")};
    border: 0.1875rem solid var(--brand-blue);
  }
  &:after {
    pointer-events: none;
    content: "";
    background: white;
    background: ${(props) =>
      props.selected ? `#8B88C3` : `url(${btnStripe})`};
    background-repeat: round;
    background-origin: border-box;
    display: block;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    transform: ${(props) =>
      props.selected
        ? `translate(0.3125rem, 0.375rem)`
        : `translate(0.25rem, 0.3125rem)`};
    width: 100%;
    z-index: -2;
    border-radius: 0.9375rem;
    height: ${(props) => (props.height ? props.height : "2.625rem")};
    width: ${(props) => (props.width ? props.width : "13.75rem")};
    border: ${(props) =>
      props.selected
        ? `0.1875rem solid #3E389F;`
        : `0.1875rem solid var(--brand-blue)`};
  }

  &:active {
    &:before {
      left: 0.3125rem;
      top: 0.3125rem;
    }
  }
`;

const ButtonFlexContainer = styled("div")`
  display: flex;
  position: absolute;
  top: 0.675rem;
  left: 4.275rem;
  top: ${(props: IStyled) => props.mouseDown && `0.975rem`};
  left: ${(props) => props.mouseDown && `4.575rem`};
`;

const ButtonText = styled("p")`
  margin-top: 0.65rem;
  margin-left: 0.9375rem;
`;

export function PrimaryButtonAnimation({
  children,
  onClick,
}: {
  children?: any;
  onClick?: any;
}) {
  const [mouseDown, setMouseDown] = useState("");

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const id = event.currentTarget.id;
    if (event.type === "mousedown") {
      setMouseDown(id);
    } else {
      setMouseDown("");
    }
  };

  const text = children;
  return (
    <ButtonContainer
      width={"14.375rem"}
      height={"3.1875rem"}
      margin={"2.25rem 17% 2.25rem auto"}
      id={text}
      onClick={onClick}
    >
      <ButtonAnimationStyles
        onMouseDown={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
        onMouseUp={(e: React.MouseEvent<HTMLElement>) => handleClick(e)}
        id={text}
        selected={true}
        height={"100%"}
        width={"100%"}
      >
        <ButtonFlexContainer mouseDown={mouseDown === text && true}>
          <ButtonText>{text}</ButtonText>
        </ButtonFlexContainer>
      </ButtonAnimationStyles>
    </ButtonContainer>
  );
}
