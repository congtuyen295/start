import {
  Button, Form,
  Input, message, Modal, Select
} from "antd";
import React, { useEffect, useState } from "react";
import { CategoryService } from "../../../services/category-service";

import "./category.scss";
import Tags from "./Tag";

const AddCategory = ({ values }) => {
  const {openAdd, setOpenAdd, call,setCall} = values;
  const [category, setCategory] = useState([]);
  const [messError, setMessError] = useState(false);
  const categoryService = new CategoryService();
  const handleAdd = async (value) => {
   try {
    await categoryService.newCategory(value);
    message.success("Thêm danh mục thành công");
    setCall(!call);
    setOpenAdd(false);
   } catch (error) {
    message.error("Thêm danh mục thất bại")
     setCall(!call);
    setOpenAdd(false);
   }
  };

  const [form] = Form.useForm();
  return (
    <div className="new-product">
      <Modal
        width={1200}
        title="Thêm sản phẩm"
        visible={openAdd}
        onCancel={() => setOpenAdd(false)}
        className="themsanpham"
        style={{ top: "50px" }}
        footer={[
          <Form form={form} onFinish={handleAdd}>
            <Button key="back" onClick={() => setOpenAdd(false)}>
              Hủy
            </Button>
            <Button className="addProduct" type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên Danh Mục"
            name="name"
            rules={[{ required: true, message: "Vui lòng tên danh mục" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nhà sản xuất"
            name="subCategories"
            rules={[
              { required: true, message: "Vui lòng nhập nhà sản xuất" },
            ]}
          >
            <Tags form={form} />
        </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCategory;
