import { useLocation } from "react-router";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuButton from "./reusable/MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faArrowsRotate,
  faDollarSign,
  faClockRotateLeft,
  faArrowsTurnRight,
} from "@fortawesome/free-solid-svg-icons";

const MenuListItem = styled("li")`
  padding-left: 24px;
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
`;

const FontAwesomeIconStyled = styled(FontAwesomeIcon)`
  margin-right: 15px;
  font-size: 30px;
`;

const ButtonFlexContainer = styled("span")`
  display: flex;
  position: absolute;
  top: 9px;
`;

const ButtonText = styled("p")`
  margin-top: 12px;
`;

function MenuItems() {
  // use pathname to highlight selected menu item
  const { pathname } = useLocation();

  const menuItemButton = (text, icon, route) => {
    const selected = route === pathname;
    return (
      <MenuButton selected={selected} pathname={pathname}>
        <ButtonFlexContainer>
          <FontAwesomeIconStyled icon={icon} />
          <ButtonText>{text}</ButtonText>
        </ButtonFlexContainer>
      </MenuButton>
    );
  };

  return (
    <Menu
      mode="inline"
      style={{
        fontSize: "17px",
        fontWeight: "500",
        height: "100%",
        paddingTop: "10px",
        justifyContent: "center",
        border: "none",
        backgroundColor: "#F8F2ED",
        marginTop: "35px",
      }}
    >
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
    </Menu>
  );
}

export default MenuItems;
