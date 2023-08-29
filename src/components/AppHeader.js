import React, { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Table,
  Typography,
  Dropdown,
} from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HomeFilled,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import AppUser from "./AppUser";
function AppHeader() {
  const onMenuClick = (item) => {
    console.log(item);
  };
  return (
    <div className="appHeader">
      {/** Header navigators */}
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeFilled />,
            key: "",
          },
          {
            label: "Electronics",
            key: "electronics",
            children: [
              {
                label: "Smartphones",
                key: "smartphones",
              },
              {
                label: "TV",
                key: "tv",
              },
              {
                label: "Cameras",
                key: "cameras",
              },
            ],
          },
          {
            label: "Books",
            key: "books",
            children: [
              {
                label: "Fiction",
                key: "fiction",
              },
              {
                label: "science",
                key: "science",
              },
            ],
          },
          {
            label: "To Do",
            key: "",
          },
        ]}
      />
      <SearchBox />
      <div style={{ display: "flex", alignItems: "center" }}>
        <AppCart />
        <AppUser />
      </div>
    </div>
  );
}

function SearchBox() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    console.log("Search Value:", value);
    // Implement search logic
  };

  return (
    <Search
      placeholder="Search..."
      onSearch={handleSearch}
      style={{ width: "40%", minWidth: "300px" }}
    />
  );
}

function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        className="shoppingCartIcon"
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        Shoping Cart
      </Drawer>
    </div>
  );
}

export default AppHeader;
