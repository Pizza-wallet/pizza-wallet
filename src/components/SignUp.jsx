import { Moralis } from "react-moralis";
import "antd/dist/antd.css";
import "../style.css";
import { Button, Form, Input } from "antd";
// import { DownOutlined } from "@ant-design/icons";
// import { useState, useEffect } from "react";

export default function SignUp() {
  const signup = async (email, password) => {
    const user = new Moralis.User();
    user.set("username", email);
    user.set("password", password);
    user.set("email", email);

    try {
      await user.signUp();
    } catch (error) {
      alert("Error: " + error.code + " " + error.message);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={signup}
      onFinishFailed={alert("Error")}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
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
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
