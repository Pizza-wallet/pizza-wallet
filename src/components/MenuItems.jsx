import { useState } from "react";
import { useLocation } from "react-router";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MenuButton } from "./reusable/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faArrowsRotate,
  faDollarSign,
  faClockRotateLeft,
  faArrowsTurnRight,
} from "@fortawesome/free-solid-svg-icons";

const MenuListItem = styled("li")`
  padding-left: 1.5rem;
  display: flex;
  align-items: center;
  height: 3.125rem;
  margin-bottom: 1.0625rem;
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  font-size: 1.75rem;
`;

const ButtonFlexContainer = styled("div")`
  display: flex;
  position: absolute;
  top: 0.375rem;
  left: 0.375rem;
  top: ${(props) => props.mouseDown && `0.675rem`};
  left: ${(props) => props.mouseDown && `0.675rem`};
`;

const ButtonText = styled("p")`
  margin-top: 0.65rem;
  margin-left: 0.9375rem;
`;

const StyledMenu = styled(Menu)`
  background-color: #f8f2ed;
  margin-top: 2.1875rem !important;
`;

const IconContainer = styled("div")`
  width: 3.125rem;
`;

function MenuItems() {
  // use pathname to highlight selected menu item
  const { pathname } = useLocation();
  const [mouseDown, setMouseDown] = useState("");

  const handleClick = (event) => {
    const id = event.currentTarget.id;
    if (event.type === "mousedown") {
      setMouseDown(id);
    } else {
      setMouseDown("");
    }
  };

  const menuItemButton = (text, icon, route) => {
    const selected = route === pathname;
    return (
      <div id={text}>
        <MenuButton
          onMouseDown={(e) => handleClick(e)}
          onMouseUp={(e) => handleClick(e)}
          selected={selected}
          pathname={pathname}
          id={text}
        >
          <ButtonFlexContainer mouseDown={mouseDown === text && true}>
            <IconContainer>
              <FontAwesomeIconStyled icon={icon} />
            </IconContainer>
            <ButtonText>{text}</ButtonText>
          </ButtonFlexContainer>
        </MenuButton>
      </div>
    );
  };

  return (
    <StyledMenu mode="inline">
      <MenuListItem>
        <Link to="/dashboard">
          {menuItemButton("Dashboard", faTableColumns, "/dashboard")}
        </Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/transfer">
          {menuItemButton("Transfer", faArrowsTurnRight, "/transfer")}
        </Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/dex">{menuItemButton("Swap", faArrowsRotate, "/dex")}</Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/onramper">
          {menuItemButton("Buy/Sell", faDollarSign, "/onramper")}
        </Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/activity">
          {menuItemButton("History", faClockRotateLeft, "/activity")}
        </Link>
      </MenuListItem>
    </StyledMenu>
  );
}

export default MenuItems;
