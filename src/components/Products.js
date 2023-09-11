import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Image, List, Rate, Typography } from "antd";
import { getProduct } from "../utils";
import { Link } from "react-router-dom";
import { SearchContext } from "../App";

function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchResults } = useContext(SearchContext);

  useEffect(() => {
    if (searchResults.length > 0) {
      setItems(searchResults);
    } else {
      setLoading(true);
      getProduct()
        .then((data) => setItems(data))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchResults]);

  const columns = items.length > 2 ? 3 : items.length;

  return (
    <div className="productsContainer">
      <List
        loading={loading}
        grid={{ column: columns }}
        renderItem={(product, index) => {
          return (
            <Card
              className="itemCard"
              title={product.Title}
              key={index}
              cover={
                <Image className="itemCardImage" src={product.Images[0].url} />
              }
              actions={[
                <Rate allowHalf disabled value={3.5} />,
                <Link to={`/product/${product.id}`}>
                  <Button style={{ border: "2px solid blue" }}>Details</Button>
                </Link>,
              ]}
            >
              <Card.Meta
                title={
                  <Typography.Paragraph>
                    Price: ${product.Price}
                  </Typography.Paragraph>
                }
                description={
                  <Typography.Paragraph
                    ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                  >
                    {product.Description}
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
