import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  SendOutlined,
  SwapOutlined,
  LayoutOutlined,
  UserSwitchOutlined,
  ArrowRightOutlined,
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
      <Menu.Item key="/wallet">
        <NavLink to="/wallet">
          <SendOutlined /> Transfer
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/1inch">
        <NavLink to="/1inch">
          <SwapOutlined /> Dex
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/ERC20Transfers">
        <NavLink to="/ERC20Transfers">
          <UserSwitchOutlined /> Transactions
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/bridge">
        <NavLink to="/bridge">
          <ArrowRightOutlined rotate="-45" /> Bridge
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
