import styled from "styled-components";
import btnStripe from "../../assets/btn-stripes.svg";

const MenuButton = styled("button")`
  user-select: none;
  font-family: "Rubik", sans-serif;
  padding: 12px 24px;
  font-size: 24px;
  line-height: 28px;
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

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${(props) =>
      props.selected ? "var(--brand-blue)" : "var(--dirty-white-2)"};
    z-index: -1;
    border-radius: 17px;
    width: 227px;
    height: 50px;
    border: 3px solid
      ${(props) =>
        props.selected ? "var(--dirty-white-2)" : "var(--brand-blue)"};
  }
  &:after {
    pointer-events: none;
    content: "";
    background: white;
    background-image: url(${btnStripe});
    background-position: bottom;
    background-repeat: round;
    background-position-y: bottom;
    display: block;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    transform: translate(3px, 5px);
    width: 100%;
    z-index: -2;
    border-radius: 17px;
    width: 227px;
    height: 50px;
    border: 0.8px solid var(--brand-blue-80);
  }
`;

export default MenuButton;
