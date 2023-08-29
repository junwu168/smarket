import React, { useState, useEffect } from "react";
import { getProduct } from "../utils";
import { Avatar, List, Button } from "antd";
import "./SellingOverview.css";

function SellingOverview() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct().then((data) => {
      setProducts(data.products);
    });
  }, []);

  return (
    <div className="selling-overview">
      <h2>My Selling Overview</h2>
      <div className="item-count-container">
        <p className="item-sold">Sold: 0</p>
        <p className="item-active">Active: 0</p>
        <p className="item-unsold">Unsold: 0</p>
        <Button
          key="list"
          style={{
            backgroundColor: "#2B60DE",
            color: "white",
            fontSize: "24px",
            padding: "20px 40px",
            marginTop: "10px",
          }}
        >
          List an Item
        </Button>
      </div>
      <List
        className="selling-items"
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(product, index) => (
          <List.Item
            key={product.id}
            actions={[
              <Button
                key="edit"
                style={{ backgroundColor: "#2B60DE", color: "white" }}
              >
                Edit
              </Button>,
              <Button
                key="delete"
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={product.thumbnail} size={128} />}
              title={product.title}
              description={product.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default SellingOverview;
