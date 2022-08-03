import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import {
  SendOutlined,
  SwapOutlined,
  LayoutOutlined,
  UserSwitchOutlined,
  // DollarOutlined,
} from "@ant-design/icons";
import dollarSign from "../assets/dollar-sign.svg";

const MenuItemButton = (name, icon) => {
  return (
    <div className="transactions">
      <div className="rectangle-3-0" />
      <img src={icon} />
      <div className="rectangle-2-9" />
      <div className="group-1-6">
        <p className="text-1">{name}</p>
        <img src="" />
      </div>
    </div>
  );
};

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
      <Menu.Item key="/transfer">
        <NavLink to="/transfer">
          <SendOutlined /> Transfer
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/activity">
        <NavLink to="/activity">
          <UserSwitchOutlined /> Activity
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/dex">
        <NavLink to="/dex">
          <SwapOutlined /> Exchange
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/onramper">
        <NavLink to="/onramper">
          {/* <DollarOutlined /> Fiat Onramp */}
          {MenuItemButton("Buy/Sell", dollarSign)}
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
