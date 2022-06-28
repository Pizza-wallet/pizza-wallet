import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  SendOutlined,
  SwapOutlined,
  LayoutOutlined,
  UserSwitchOutlined,
  DollarOutlined,
} from "@ant-design/icons";

function MenuItems() {
  const { pathname } = useLocation();

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
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/dashboard">
        <NavLink to="/dashboard">
          <LayoutOutlined /> Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/ERC20Transfers">
        <NavLink to="/ERC20Transfers">
          <UserSwitchOutlined /> Transactions
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/wallet">
        <NavLink to="/wallet">
          <SendOutlined /> Transfer
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/dex">
        <NavLink to="/dex">
          <SwapOutlined /> Exchange
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/onramp">
        <NavLink to="/Onramp">
          <DollarOutlined /> Fiat Onramp
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
