import { Moralis } from "react-moralis";
import "antd/dist/antd.css";
import "../style.css";
import { Button, Form, Input } from "antd";
import { render } from "@testing-library/react";

const styles = {
  account: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  email: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
export default function EmailSignIn() {
  const login = async (email, password) => {
    console.log(email, password);
    try {
      const user = await Moralis.User.logIn(email, password);
      console.log(user);
    } catch (error) {
      alert("Error: " + error.code + " " + error.message);
    }
  };

  render(
    <div style={styles.email}>
      <Form
        onFinish={login}
        // onFinishFailed={alert("Error")}
        // autoComplete="off"
        // requiredMark="optional"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your e-mail!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>,
  );
}
