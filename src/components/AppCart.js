import React, { useEffect, useState } from "react";
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
  Tag,
  ConfigProvider,
  Skeleton,
  Divider,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { ShoppingCartOutlined } from "@ant-design/icons";

const styles = {
  fontSize: "20px",
};

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
        contentWrapperStyle={{ width: 600 }}
      >
        Shoping Cart
        <div>
          <CartItems />
        </div>
      </Drawer>
    </div>
  );
}

function CartItems() {
  const { Meta } = Card;
  const [data, setData] = useState([
    {
      Seller_name: "Seller 1",
      Product_name: "Product 1",
      Price: "100",
      Quantity: "12",
      Checked: false,
    },
    {
      Seller_name: "Seller 2",
      Product_name: "Product 2",
      Price: "500",
      Quantity: "1",
      Checked: false,
    },
    {
      Seller_name: "Seller 3",
      Product_name: "Product 3",
      Price: "1000",
      Quantity: "15",
      Checked: false,
    },
    {
      Seller_name: "Seller 4",
      Product_name: "Product 4",
      Price: "231",
      Quantity: "22",
      Checked: false,
    },
    {
      Seller_name: "Seller 5",
      Product_name: "Product 5",
      Price: "2312",
      Quantity: "21",
      Checked: false,
    },
  ]);

  const [total, setTotal] = useState(0);

  const addOne = (name) => {
    let newData = [...data];
    newData.find((item) => item.Product_name === name).Quantity++;
    setData(newData);
  };

  const minusOne = (name) => {
    if (data.find((item) => item.Product_name === name).Quantity == 0) {
      return;
    }
    let newData = [...data];
    newData.find((item) => item.Product_name === name).Quantity--;
    setData(newData);
  };

  const deleteItem = (name) => {
    let newData = data.filter((item) => item.Product_name !== name);

    setData(newData);
  };

  const checked = (name) => {
    let newData = [...data];
    let target = newData.find((item) => item.Product_name === name);
    target.Checked = !target.Checked;
    setData(newData);
  };

  useEffect(() => {
    const getTotal = () => {
      let curtotal = 0;
      data.map((item) => {
        if (item.Checked) {
          curtotal += item.Price * item.Quantity;
        }
      });

      setTotal(curtotal);
    };
    getTotal();
  }, [data]);
  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        //next={}
        hasMore={data.length < 2}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
        height="700px"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.Seller_name} style={{ width: "500px" }}>
                <Row align="middle">
                  <Col span={2}>
                    <Checkbox
                      onChange={() => checked(item.Product_name)}
                      checked={item.Checked}
                    ></Checkbox>
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
                  <Col>
                    <Space size={33}>
                      <Space>
                        <Button
                          size="small"
                          onClick={() => minusOne(item.Product_name)}
                        >
                          -
                        </Button>
                        <Tooltip>{item.Quantity}</Tooltip>
                        <Button
                          size="small"
                          onClick={() => addOne(item.Product_name)}
                        >
                          +
                        </Button>
                      </Space>
                      <Button onClick={() => deleteItem(item.Product_name)}>
                        Delete
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <Space size={70}>
        <Tag style={styles} bordered={false}>
          Total: ￥{total}
        </Tag>
        <Button>Check Out</Button>
      </Space>
    </div>
  );
}
export default AppCart;
