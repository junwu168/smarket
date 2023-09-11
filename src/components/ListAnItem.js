import React, { useState } from "react";
import { Input, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function ListAnItem() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [image, setImage] = useState(null);

  // Product categories
  const categories = ["Smartphones", "TV", "Cameras", "Fiction", "Science"];

  const handleSubmit = () => {
    if (title && description && price && category && image) {
      // Logic to add the item for sale
      message.success("Item listed successfully");
    } else {
      message.error("Please fill in all fields");
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCategory(null);
    setImage(null);
  };

  const handleImageUpload = (info) => {
    if (info.file.status === "done") {
      setImage(info.file.originFileObj);
      message.success(`${info.file.name} uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} upload failed`);
    }
  };

  return (
    <div className="list-item-container">
      <h2>List an Item</h2>

      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <Input.TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <Input
        placeholder="Price"
        type="number"
        prefix="$"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <Select
        placeholder="Select a category"
        onChange={(value) => setCategory(value)}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        {categories.map((cat) => (
          <Select.Option key={cat} value={cat}>
            {cat}
          </Select.Option>
        ))}
      </Select>

      <Upload
        name="image"
        listType="picture"
        showUploadList={false}
        beforeUpload={() => false} // Prevent auto upload
        onChange={handleImageUpload}
      >
        <Button icon={<UploadOutlined />} style={{ marginBottom: "10px" }}>
          Upload Image
        </Button>
      </Upload>

      <div className="buttons">
        <Button
          type="primary"
          onClick={handleSubmit}
          style={{ marginRight: "10px" }}
        >
          Sell
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
}

export default ListAnItem;
