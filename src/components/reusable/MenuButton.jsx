import styled from "styled-components";
import btnStripe from "../../assets/btn-stripes.svg";

const MenuButton = styled("button")`
  user-select: none;
  font-family: "Gloria Hallelujah", sans-serif;
  padding: 12px 24px;
  font-size: 24px;
  line-height: 10px;
  color: ${(props) =>
    props.selected ? "var(--dirty-white-2)" : "var(--brand-blue)"};
  position: relative;
  text-align: center;
  cursor: pointer;
  z-index: 0;
  transition: letter-spacing 0.4s ease;
  border: none;
  display: inline-block;
  border-radius: 17px;
  width: 227px;
  height: 50px;
  transform: rotate(-1deg);
  margin: 10px;
  -webkit-text-stroke: thin;
  letter-spacing: 0.5px;

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
    border-radius: 17px;
    width: 227px;
    height: 50px;
    border: 3px solid var(--brand-blue);
  }
  &:after {
    pointer-events: none;
    content: "";
    background: white;
    background: ${(props) =>
      props.selected ? `var(--brand-blue-80)` : `url(${btnStripe})`};
    background-position: bottom;
    background-repeat: round;
    background-position-y: bottom;
    background-repeat: round;
    background-origin: border-box;
    display: block;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    transform: translate(3px, 4px);
    width: 100%;
    z-index: -2;
    border-radius: 17px;
    width: 227px;
    height: 50px;
    border: ${(props) =>
      props.selected ? `2px solid #3E389F;` : `2px solid var(--brand-blue)`};
  }
`;

export default MenuButton;
