// import { useLocation } from "react-router";
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

const MenuListItem = styled("li")`
  padding-left: 24px;
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 15px;
`;

const MenuIcon = styled("img")`
  height: 20px;
  margin: 5px 10px 5px 0;
`;

const menuItemButton = (text, icon) => {
  return (
    <div className="new-button">
      <a className="btn">
        <span className="link" data-type="gesture">
          <MenuIcon src={icon}></MenuIcon>
          {text}
        </span>
      </a>
    </div>
  );
};

function MenuItems() {
  // use pathname to highlight selected menu item
  // const { pathname } = useLocation();

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
        marginTop: "40px",
      }}
      // defaultSelectedKeys={[pathname]}
    >
      <MenuListItem>
        <Link to="/dashboard">
          {menuItemButton("Dashboard", dashboardIcon)}
        </Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/transfer">{menuItemButton("Transfer", transferIcon)}</Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/dex">{menuItemButton("Swap", swapIcon)}</Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/onramper">{menuItemButton("Buy / Sell", buySellIcon)}</Link>
      </MenuListItem>
      <MenuListItem>
        <Link to="/activity">
          {menuItemButton("Transactions", transactionsIcon)}
        </Link>
      </MenuListItem>
    </Menu>
  );
}

export default MenuItems;
