import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Image,
  List,
  message,
  Rate,
  Typography,
} from "antd";
import { getProduct } from "../utils";
import { Link } from "react-router-dom";

function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getProduct()
      .then((data) => setItems(data.products))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="productsContainer">
      <List
        loading={loading}
        grid={{ column: 3 }}
        renderItem={(product, index) => {
          return (
            <Card
              className="itemCard"
              title={product.title}
              key={index}
              cover={
                <Image className="itemCardImage" src={product.thumbnail} />
              }
              actions={[
                <Rate allowHalf disabled value={product.rating} />,
                <Link to={`/product/${product.id}`}>
                  <Button style={{ border: "2px solid blue" }}>Details</Button>
                </Link>,
              ]}
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    Price: ${product.price}
                  </Typography.Paragraph>
                }
                description={
                  <Typography.Paragraph
                    ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                  >
                    {product.description}
                  </Typography.Paragraph>
                }
              ></Card.Meta>
            </Card>
          );
        }}
        dataSource={items}
      ></List>
    </div>
  );
}

export default Products;
