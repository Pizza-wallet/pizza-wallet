import { useLocation } from "react-router";
import { Menu } from "antd";
import { Link } from "react-router-dom";
// import {
//   SendOutlined,
//   SwapOutlined,
//   // LayoutOutlined,
//   UserSwitchOutlined,
//   DollarOutlined,
// } from "@ant-design/icons";
import styled from "styled-components";
import dashboardIcon from "../assets/dashboard.svg";
import swapIcon from "../assets/swap.svg";
import buySellIcon from "../assets/buySell.svg";
import transactionsIcon from "../assets/transactions.svg";
import transferIcon from "../assets/transfer.svg";
import MenuButton from "./reusable/MenuButton";

const MenuListItem = styled("li")`
  padding-left: 24px;
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 15px;
`;

const MenuIcon = styled("img")`
  height: 25px;
  margin: 0 10px 5px 0;
  background: ${(props) => (props.selected ? "var(--dirty-white-2)" : "")};
`;

function MenuItems() {
  // use pathname to highlight selected menu item
  const { pathname } = useLocation();

  const menuItemButton = (text, icon, route) => {
    const selected = route === pathname;
    return (
      <MenuButton selected={selected} pathname={pathname}>
        <span style={{ display: "flex" }}>
          <MenuIcon selected={selected} src={icon}></MenuIcon>
          {text}
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
        backgroundColor: "#FFF5CE",
        marginTop: "35px",
      }}
      // defaultSelectedKeys={[pathname]}
    >
      <MenuListItem>
        <Link to="/dashboard">
          {menuItemButton("Dashboard", dashboardIcon, "/dashboard")}
        </Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/transfer">
          {menuItemButton("Transfer", transferIcon, "/transfer")}
        </Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/dex">{menuItemButton("Swap", swapIcon, "/dex")}</Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/onramper">
          {menuItemButton("Buy / Sell", buySellIcon, "/onramper")}
        </Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/activity">
          {menuItemButton("Transactions", transactionsIcon, "/activity")}
        </Link>
      </MenuListItem>
    </Menu>
  );
}

export default MenuItems;
