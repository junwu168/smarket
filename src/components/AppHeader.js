import React from "react";
import { Menu } from "antd";
import { HomeFilled } from "@ant-design/icons";
import AppCart from "./AppCart";
import AppUser from "./AppUser";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router-dom";

function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
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

export default AppHeader;
