import React, { useState, useRef } from "react";
import { Form, Input, InputNumber, Button, message } from "antd";
import { uploadListItem } from "../utils";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ListAnItem() {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    const { files } = fileInputRef.current;

    if (files.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("Images", files[i]);
    }

    formData.append("Title", values.Title);
    formData.append("Price", values.Price);
    formData.append("Description", values.Description);
    formData.append("Inventory", values.Inventory);

    setLoading(true);
    try {
      await uploadListItem(formData);
      message.success("upload successfully");
      navigate("/sell");
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/sell");
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={handleSubmit}
      style={{ maxWidth: 1000, margin: "auto" }}
    >
      <Form.Item name="Title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="Inventory"
        label="Quantity"
        rules={[{ required: true, type: "number", min: 1 }]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="Price"
        label="Price"
        rules={[{ required: true, type: "number", min: 0 }]}
      >
        <InputNumber
          placeholder="Enter price"
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        name="Description"
        label="Description"
        rules={[{ required: true }]}
      >
        <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
      </Form.Item>
      <Form.Item name="Images" label="Picture" rules={[{ required: true }]}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={fileInputRef}
          multiple={true}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
        <Button style={{ marginLeft: "10px" }} onClick={handleCancel}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ListAnItem;
