import {
  Button, Form,
  Input, message, Modal, Select
} from "antd";
import React, { useEffect, useState } from "react";
import { CategoryService } from "../../../services/category-service";

import "./category.scss";
import Tags from "./Tag";

const AddCategory = ({ values,id }) => {
  const {openEdit, setOpenEdit, call,setCall} = values;
  const categoryService = new CategoryService();
  const [categories,setCategories] = useState(null);
  useEffect(()=>{
    const getCategory = async()=>{
      const res = await categoryService.detailCategory(id);
   
     setCategories(res.category);
    }
    getCategory();
  },[])
  console.log(categories)
  const handleAdd = async (value) => {
   try {
    console.log(value, "value");
    await categoryService.updateCategory({...value, id});
    message.success("Sửa danh mục thành công");
    setCall(!call);
    setOpenEdit(false);
   } catch (error) {
    message.error("Sửa danh mục thất bại")
    setCall(!call);
    setOpenEdit(false);
   }
  };
  
  const [form] = Form.useForm();
  return (
    <div className="new-product">
     {categories && <>
      <Modal
        width={1200}
        title="Sửa danh mục"
        visible={openEdit}
        onCancel={() => setOpenEdit(false)}
        className="themsanpham"
        style={{ top: "50px" }}
        footer={[
          <Form form={form} onFinish={handleAdd}>
            <Button key="back" onClick={() => setOpenEdit(false)}>
              Hủy
            </Button>
            <Button className="addProduct" type="primary" htmlType="submit">
              Sửa
            </Button>
          </Form>,
        ]}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
         
          initialValues={{
            name: categories?.name,
            
            subCategories: categories?.subCategories,
          }}
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
            {console.log(categories.subCategories)}
            <Tags form={form}  initcolor = {categories.subCategories.map(item=>item.name)} />
        </Form.Item>
        </Form>
      </Modal>
     </>}
    </div>
  );
};

export default AddCategory;
