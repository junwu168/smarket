import React, { useState } from "react";
import {
  Badge,
  Button,
  Checkbox,
  Drawer,
  List,
  Avatar,
  Card,
  Radio,
  Row,
  Col,
  Space,
  Tooltip,
} from "antd";

import { ShoppingCartOutlined } from "@ant-design/icons";

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
        <div>
          <CartItems />
          <Space size={10}>
            <Button>Check Out</Button>

            <Button> Delete </Button>
          </Space>
        </div>
      </Drawer>
    </div>
  );
}

function CartItems() {
  const { Meta } = Card;
  const [data, setData] = useState([
    {
      id: 1,
      Seller_name: "Seller 1",
      Product_name: "Product 1",
      Price: "100",
      Quantity: "12",
    },
    {
      id: 2,
      Seller_name: "Seller 2",
      Product_name: "Product 2",
      Price: "500",
      Quantity: "1",
    },
    {
      id: 3,
      Seller_name: "Seller 3",
      Product_name: "Product 3",
      Price: "1000",
      Quantity: "15",
    },
    {
      id: 4,
      Seller_name: "Seller 4",
      Product_name: "Product 4",
      Price: "231",
      Quantity: "22",
    },
  ]);
  const addOne = (index) => {
    let newData = [...data];
    newData[index - 1].Quantity++;
    setData(newData);
  };
  const minusOne = (index) => {
    if (data[index - 1].Quantity == 0) {
      return;
    }
    let newData = [...data];
    newData[index - 1].Quantity--;
    setData(newData);
  };

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.Seller_name}>
            <Row align="middle">
              <Col span={2}>
                <Radio></Radio>
              </Col>
              <Col span={11}>
                <Meta
                  avatar={
                    <Avatar
                      src="https://i.dummyjson.com/data/products/1/1.jpg"
                      size={64}
                      shape="square"
                    />
                  }
                  title={item.Product_name}
                  description={"￥" + item.Price}
                />
              </Col>

              <Space>
                <Button size="small" onClick={() => minusOne(item.id)}>
                  -
                </Button>
                <Tooltip>{item.Quantity}</Tooltip>
                <Button size="small" onClick={() => addOne(item.id)}>
                  +
                </Button>
              </Space>
            </Row>
          </Card>
        </List.Item>
      )}
    />
  );
}
export default AppCart;
