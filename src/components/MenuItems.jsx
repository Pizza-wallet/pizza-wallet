import { useLocation } from "react-router";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuButton from "./reusable/MenuButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableColumns,
  faArrowTurnRight,
  faArrowsRotate,
  faDollarSign,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

const MenuListItem = styled("li")`
  padding-left: 24px;
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 20px;
`;

function MenuItems() {
  // use pathname to highlight selected menu item
  const { pathname } = useLocation();

  const menuItemButton = (text, icon, route) => {
    const selected = route === pathname;
    return (
      <MenuButton selected={selected} pathname={pathname}>
        <span style={{ display: "flex" }}>
          <FontAwesomeIcon
            style={{
              marginRight: "15px",
              fontSize: "30px",
            }}
            icon={icon}
          />
          <p>{text}</p>
        </span>
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
      // defaultSelectedKeys={[pathname]}
    >
      <MenuListItem>
        <Link to="/dashboard">
          {menuItemButton("Dashboard", faTableColumns, "/dashboard")}
        </Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/transfer">
          {menuItemButton("Transfer", faArrowTurnRight, "/transfer")}
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
