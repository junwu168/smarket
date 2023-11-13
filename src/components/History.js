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
  Rate,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { CreditCardOutlined } from "@ant-design/icons";
import { getHistory } from "../utils";

const styles = {
  fontSize: "20px",
};

function History() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  return (
    <div>
      <Badge
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        className="shoppingCartIcon"
      >
        <CreditCardOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Shopping Histroy"
        contentWrapperStyle={{ width: 600 }}
      >
        Shoping History
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

  useEffect(() => {
    if (prop.cartDrawerOpen === true) {
      getHistory().then((cartData) => {
        console.log(cartData);
        setDdata(cartData);
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
              <Card title={item.owner} style={{ width: "500px" }}>
                <Row align="middle">
                  <Col span={11}>
                    <Meta
                      avatar={
                        <Avatar
                          src="https://th.bing.com/th?id=OIP.nOQgk0lyx5ukr0nuRGIU_wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
                          size={64}
                          shape="square"
                        />
                      }
                      title={item.name}
                      description={"￥" + item.price}
                    />
                  </Col>
                  <Col>
                    <Space size={20}>
                      <Tooltip>Number: {item.count}</Tooltip>
                      <Tooltip>{item.checkOutTime}</Tooltip>
                      <Rate allowHalf defaultValue={2.5} />
                    </Space>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <Space size={70}></Space>
    </div>
  );
}
export default History;
