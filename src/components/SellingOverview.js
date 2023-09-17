import React, { useState, useEffect } from "react";
import { Avatar, List, Button } from "antd";
import { getListedItem, deleteListedItem } from "../utils";
import { useLocation, useNavigate } from "react-router-dom";

function SellingOverview() {
  const [sellingList, setSellingList] = useState([]);
  const [soldList, setSoldList] = useState([]);
  const [unsoldCount, setUnsoldCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [soldCount, setSoldCount] = useState(0);

  const [reloadData, setReloadData] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const fetchListedItems = async () => {
      const username = localStorage.getItem("currentUser");
      if (username) {
        try {
          const items = await getListedItem(username);
          setSellingList(items);
          setActiveCount(items.length);
        } catch (error) {
          console.error("Failed to fetch items:", error);
        }
      }
    };

    fetchListedItems();
  }, [reloadData, location]);

  const sellingListHandler = () => {
    navigate("/list");
  };

  const deleteHandler = (itemId) => {
    deleteListedItem(itemId)
      .then(() => {
        console.log("Item deleted successfully.");
        setReloadData((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const editHandler = (itemId) => {};

  return (
    <div
      className="selling-overview"
      style={{
        display: "column",
        flex: "1",
      }}
    >
      <h2>My Selling Overview</h2>
      <div
        className="item-count-container"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <p
          className="item-sold"
          style={{
            fontSize: "20px",
          }}
        >
          Sold: {soldCount}
        </p>
        <p
          className="item-active"
          style={{
            fontSize: "20px",
          }}
        >
          Active: {activeCount}
        </p>
        <p
          className="item-unsold"
          style={{
            fontSize: "20px",
          }}
        >
          Unsold: {unsoldCount}
        </p>
        <Button
          key="list"
          type="primary"
          size="large"
          onClick={sellingListHandler}
          style={{
            backgroundColor: "#2B60DE",
            color: "white",
          }}
        >
          List an Item
        </Button>
      </div>
      <h3>Unsold:</h3>
      <List
        className="selling-items"
        itemLayout="horizontal"
        dataSource={sellingList}
        renderItem={(product, index) => (
          <List.Item
            key={product.id}
            actions={[
              // <Button
              //   key="edit"
              //   style={{ backgroundColor: "#2B60DE", color: "white" }}
              //   onClick={() => editHandler(product.id)}
              // >
              //   Edit
              // </Button>,
              <Button
                key="delete"
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => deleteHandler(product.id)}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    product.Images.length > 0
                      ? product.Images[0].url
                      : "https://placehold.co/600x400?text=No+Preview"
                  }
                  size={128}
                />
              }
              title={product.Title}
              description={product.Description}
            />
          </List.Item>
        )}
      />
      <h3>Sold:</h3>
      <List
        className="sold-items"
        itemLayout="horizontal"
        dataSource={soldList}
      ></List>
    </div>
  );
}

export default SellingOverview;
