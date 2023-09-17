import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Image, List, Rate, Typography } from "antd";
import { getProduct } from "../utils";
import { Link, useLocation } from "react-router-dom";
import { SearchContext } from "../App";

function Products() {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchResults } = useContext(SearchContext);

  useEffect(() => {
    if (searchResults.length > 0) {
      setItems(searchResults);
    } else {
      setLoading(true);
      getProduct()
        .then((data) => setItems(data.slice(0, 7)))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchResults, location]);

  const columns = items.length > 2 ? 3 : items.length;

  return (
    <div className="productsContainer">
      <List
        loading={loading}
        grid={{ column: columns }}
        renderItem={(product, index) => {
          const imageUrl =
            product.Images && product.Images.length > 0
              ? product.Images[0].url
              : "https://placehold.co/600x400?text=No+Preview";
          return (
            <Card
              className="itemCard"
              title={product.Title}
              key={index}
              cover={<Image className="itemCardImage" src={imageUrl} />}
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
