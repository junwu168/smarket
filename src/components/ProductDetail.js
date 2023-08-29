import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../utils";
import { Button, Rate, Carousel, Typography } from "antd";
import { ShoppingCartOutlined, DollarCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(Number(id))
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Failed to fetch product:", error);
      });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            flex: "1",
            paddingRight: "20px",
            border: "2px black",
            overflow: "hidden",
          }}
        >
          <Carousel autoplay dotPosition="left">
            {product.images.map((image, index) => (
              <div key={index} className="carousel-image-container">
                <img
                  src={image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    height: "100%",
                  }}
                  className="carousel-image"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div style={{ flex: "1", padding: "10px" }}>
          <Title level={2}>{product.title}</Title>
          <Rate disabled defaultValue={product.rating} />
          <Title level={4}>Price: ${product.price}</Title>
          <Paragraph>Stock: {product.stock}</Paragraph>
          <Paragraph>{product.description}</Paragraph>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            style={{ marginRight: "10px" }}
          >
            Add to Cart
          </Button>
          <Button type="danger" icon={<DollarCircleOutlined />}>
            Buy It Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
