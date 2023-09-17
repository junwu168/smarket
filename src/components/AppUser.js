import React, { useState } from "react";
import { Menu, Dropdown, Button, Form, Input, message, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login, register } from "../utils";
import { Link, useNavigate } from "react-router-dom";

function AppUser() {
  const navigate = useNavigate();
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [displayRegisterModal, setDisplayRegisterModal] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCancel = (type) => {
    type === "login"
      ? setDisplayLoginModal(false)
      : setDisplayRegisterModal(false);
  };

  const handleLoginFinish = async (data) => {
    try {
      const response = await login(data);

      if (response) {
        localStorage.setItem("userToken", response);
        localStorage.setItem("currentUser", data.Username);
      }

      setDisplayLoginModal(false);
      setIsLoggedIn(true);
      message.success("Welcome back");
    } catch (err) {
      console.log(err);
      message.error(err.message || "An error occurred during login");
    }
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
    localStorage.removeItem("userToken");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    message.success("Successfully logged out");
    navigate("/");
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
      {!isLoggedIn && <Menu.Item key="1">Login</Menu.Item>}
      {isLoggedIn && <Menu.Item key="2">Logout</Menu.Item>}
      {!isLoggedIn && <Menu.Item key="3">Register</Menu.Item>}
      {isLoggedIn && (
        <Menu.Item key="4">
          <Link to="/sell">Sell</Link>
        </Menu.Item>
      )}
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
            name="Username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="Password"
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
            name="Username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="First_name"
            rules={[
              { required: true, message: "Please input your Firstname!" },
            ]}
          >
            <Input placeholder="firstname" />
          </Form.Item>
          <Form.Item
            name="Last_name"
            rules={[{ required: true, message: "Please input your Lastname!" }]}
          >
            <Input placeholder="lastname" />
          </Form.Item>
          <Form.Item
            name="Address"
            rules={[{ required: true, message: "Please input your Address!" }]}
          >
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item
            name="Phone"
            rules={[{ required: true, message: "Please input your Phone!" }]}
          >
            <Input placeholder="(888)888-8888" />
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
