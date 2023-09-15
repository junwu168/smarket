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
import { getShoppingCart, getProductList } from "../utils";

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
  const [ddata, setDdata] = useState([]);
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

  // const [cartData, setCartData] = useState([]);
  // const [productDetails, setProductDetails] = useState([]);

  // const getdata = () => {
  //   setCartData(getShoppingCart())
  //     .then(() => {
  //       let idList = cartData.map(function (item) {
  //         return { id: item.cartItemKey.item };
  //       });
  //       setProductDetails(getProductList(idList));
  //     })
  //     .then(() => {
  //       return Object.assign(data, productDetails);
  //     });
  // };

  const addOne = (name) => {
    let newData = [...ddata];
    newData.find((item) => item.Title === name).count++;
    setData(newData);
  };

  const minusOne = (name) => {
    if (ddata.find((item) => item.Title === name).count == 0) {
      return;
    }
    let newData = [...ddata];
    newData.find((item) => item.Title === name).count--;
    setData(newData);
  };

  const deleteItem = (name) => {
    let newData = ddata.filter((item) => item.Title !== name);

    setData(newData);
  };

  const checked = (name) => {
    let newData = [...ddata];
    let target = newData.find((item) => item.Title === name);
    target.Checked = !target.Checked;
    setData(newData);
  };

  useEffect(() => {
    const getTotal = () => {
      let curtotal = 0;
      ddata.map((item) => {
        if (item.Checked) {
          curtotal += item.Price * item.count;
        }
      });

      setTotal(curtotal);
    };
    getTotal();
  }, [ddata]);

  useEffect(() => {
    getShoppingCart()
      .then((cartData) => {
        console.log(cartData);
        let idList = cartData.map(function (item) {
          console.log(item);
          console.log(item.cartItemKey.item);
          return item.cartItemKey.item;
        });

        console.log(idList);
        return [cartData, getProductList(idList)];
      })
      .then((productDetails) => {
        for (let i = 0; i < productDetails[0].length; i++) {
          Object.assign(productDetails[0][i], productDetails[1][i]);
        }
        setDdata(productDetails[0]);
      });
  }, []);
  return (
    <div>
      <InfiniteScroll
        dataLength={ddata.length}
        //next={}
        hasMore={ddata.length < 2}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
        height="700px"
      >
        <List
          dataSource={ddata}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.Owner} style={{ width: "500px" }}>
                <Row align="middle">
                  <Col span={2}>
                    <Checkbox
                      onChange={() => checked(item.Title)}
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
                      title={item.Title}
                      description={"￥" + item.Price}
                    />
                  </Col>
                  <Col>
                    <Space size={33}>
                      <Space>
                        <Button
                          size="small"
                          onClick={() => minusOne(item.Title)}
                        >
                          -
                        </Button>
                        <Tooltip>{item.count}</Tooltip>
                        <Button size="small" onClick={() => addOne(item.Title)}>
                          +
                        </Button>
                      </Space>
                      <Button onClick={() => deleteItem(item.Title)}>
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
