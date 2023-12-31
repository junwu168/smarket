import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, addCart } from "../utils";
import { Button, Rate, Carousel, Typography, message, Popconfirm } from "antd";
import { ShoppingCartOutlined, DollarCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);

  const addToCart = (id) => {
    console.log(id);
    addCart(id);
  };

  const confirm = (id) => {
    addToCart(id);
    message.success("Added to Shopping Cart!");
  };
  const cancel = (e) => {};

  useEffect(() => {
    getProductById(id)
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
            {product.Images.map((image, index) => (
              <div key={index} className="carousel-image-container">
                <img
                  src={image.url}
                  alt={product.Title}
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
          <Title level={2}>{product.Title}</Title>
          <Rate disabled defaultValue={4.5} />
          <Title level={4}>Price: ${product.Price}</Title>
          <Paragraph>Stock: {product.Inventory}</Paragraph>
          <Paragraph>{product.Description}</Paragraph>
          <Popconfirm
            title="Add to Cart"
            description="Are you sure to add this in shopping cart?"
            onConfirm={() => confirm(product.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              style={{ marginRight: "10px" }}
            >
              Add to Cart
            </Button>
          </Popconfirm>
          <Button type="danger" icon={<DollarCircleOutlined />}>
            Buy It Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
