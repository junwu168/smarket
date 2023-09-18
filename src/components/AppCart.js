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
import { getShoppingCart, getProductList, cartCheckout } from "../utils";

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
          <CartItems cartDrawerOpen={cartDrawerOpen} />
        </div>
      </Drawer>
    </div>
  );
}

function CartItems(prop) {
  const { Meta } = Card;
  const [ddata, setDdata] = useState([]);

  const [total, setTotal] = useState(0);

  const addOne = (name) => {
    let newData = [...ddata];
    newData.find((item) => item.Title === name).count++;
    setDdata(newData);
  };

  const minusOne = (name) => {
    if (ddata.find((item) => item.Title === name).count == 0) {
      return;
    }
    let newData = [...ddata];
    newData.find((item) => item.Title === name).count--;
    setDdata(newData);
  };

  const deleteItem = (name) => {
    let newData = ddata.filter((item) => item.Title !== name);

    setDdata(newData);
  };

  const checked = (name) => {
    let newData = [...ddata];
    let target = newData.find((item) => item.Title === name);
    target.checked = !target.checked;
    setDdata(newData);
  };

  const checkout = () => {
    let checkedItems = ddata
      .filter((item) => item.checked === true)
      .map((item) => {
        return { id: item.id, count: item.count };
      });
    cartCheckout(checkedItems);
    let newData = ddata.filter((item) => item.checked === false);
    setDdata(newData);
  };

  useEffect(() => {
    const getTotal = () => {
      let curtotal = 0;
      ddata.map((item) => {
        if (item.checked) {
          curtotal += item.Price * item.count;
        }
      });

      setTotal(curtotal);
    };
    getTotal();
  }, [ddata]);

  useEffect(() => {
    if (prop.cartDrawerOpen === true) {
      getShoppingCart()
        .then((cartData) => {
          let idList = cartData.map(function (item) {
            return item.cartItemKey.item;
          });
          return getProductList(idList, cartData);
        })
        .then((productDetails) => {
          setDdata(productDetails);
        });
    }
  }, [prop.cartDrawerOpen]);
  return (
    <div>
      <InfiniteScroll
        dataLength={ddata.length}
        //next={}
        // hasMore={ddata.length < 2}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
        height="700px"
      >
        <List
          dataSource={ddata}
          renderItem={(item) => (
            <List.Item>
              <Card title={item.Owner.Username} style={{ width: "500px" }}>
                <Row align="middle">
                  <Col span={2}>
                    <Checkbox
                      onChange={() => checked(item.Title)}
                      checked={item.checked}
                    ></Checkbox>
                  </Col>
                  <Col span={11}>
                    <Meta
                      avatar={
                        <Avatar
                          src={item.Images[0].url}
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
        <Button onClick={() => checkout()}>Check Out</Button>
      </Space>
    </div>
  );
}
export default AppCart;
