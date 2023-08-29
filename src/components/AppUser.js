import React, { useState } from "react";
import { Menu, Dropdown, Button, Form, Input, message, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login, register, logout } from "../utils";

function AppUser() {
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [displayRegisterModal, setDisplayRegisterModal] = useState(false);

  const handleCancel = (type) => {
    type === "login"
      ? setDisplayLoginModal(false)
      : setDisplayRegisterModal(false);
  };

  const handleLoginFinish = (data) => {
    login(data)
      .then(() => {
        setDisplayLoginModal(false);
        message.success("Welcome back");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleRegisterFinish = (data) => {
    register(data)
      .then(() => {
        setDisplayRegisterModal(false);
        message.success("Successfully signed up");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        message.success("Successfully logged out");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        setDisplayLoginModal(true);
        break;
      case "2":
        handleLogout();
        break;
      case "3":
        setDisplayRegisterModal(true);
        break;
      default:
        break;
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">Login</Menu.Item>
      <Menu.Item key="2">Logout</Menu.Item>
      <Menu.Item key="3">Register</Menu.Item>
      {/* Add other user-related features as needed */}
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <UserOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
      </Dropdown>

      {/* Login Modal */}
      <Modal
        title="Log in"
        visible={displayLoginModal}
        onCancel={() => handleCancel("login")}
        footer={null}
        destroyOnClose={true}
      >
        <Form name="normal_login" onFinish={handleLoginFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Register Modal */}
      <Modal
        title="Register"
        visible={displayRegisterModal}
        onCancel={() => handleCancel("register")}
        footer={null}
        destroyOnClose={true}
      >
        <Form name="normal_register" onFinish={handleRegisterFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="first_name"
            rules={[
              { required: true, message: "Please input your Firstname!" },
            ]}
          >
            <Input placeholder="firstname" />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: "Please input your Lastname!" }]}
          >
            <Input placeholder="lastname" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AppUser;
