import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  Paper,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useAlert } from "react-alert";
import { CategoryService } from "../../../services/category-service";
import { ProductService } from "../../../services/product-service";
import { Editor } from 'primereact/editor';

import "./style.scss";

const AddProduct = () => {

  const product = {
    name: "",
    quantity: "",
    price: 0,
    category: "",
    nsx: "",
    discount: 0,
    color:""
  };

  const [categories, setCategories] = useState([{
    name:"LAPTOP",
    subCategories: "Dell, HP, MACBOOK"
  },{
    name:"DIEN THOAI",
    subCategories: "nokia, sam sung, oppo"
  }]);
  const [description,setDescription] = useState("");
  const [dep,setDep] = useState("");
  const [subcategory, setSubcategory] = useState([]);
  const category = categories?.map((item)=>item.name);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [cate, setCate] = useState("");
  const alert = useAlert();
  const history = useHistory();
  const categoryService = new CategoryService();
  const productService = new ProductService();
  useEffect(() => {
    const getCategory = async () => {
      const res = await categoryService.getCategory();
      setCategories(res);
      
    };
    getCategory();
    
  }, []);


  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChangeCategory = (e) => {
    setCate(e.target.value);
  };

  const backProdPage = () => {
    history.push("/admin/products");
  };
  const handelChangeCategory=(value,setFieldValue)=>{
   
   
    const element = categories.find(item => item.name=== value);
    const subCate = element?.subCategories?.map((item)=>item.name);
    setSubcategory(subCate);
    setFieldValue("category",value);
   
   
  }
 
  return (
    <>
      <Paper className="addProd-container grid wide pt-2 pb-2 mt-4">
        <div className="grid wide">
          <h2 className="title">Thêm sản phẩm</h2>
          <Formik
            initialValues={product}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              const newProduct = {
                ...values,
                images: imagesPreview,
                description,
                dep
              };
              try {
                await productService.addProduct(newProduct);
                history.push("/admin/products");
                alert.success("Thên thành công!");
              } catch (e) {
                console.log(e);
              }
            }}
          >
            {({ errors, touched, handleSubmit, handleChange ,setFieldValue}) => (
              <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col  m-12 c-12 mb-1">
                  <TextField
                    label="Tên sản phẩm"
                    name="name"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  {errors.name && touched.name && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="col l-6  m-12 c-12 mb-1">
                <Autocomplete
                  disablePortal
                  name="category"
                  id="com"
                  options={category}
                  onChange={(event, value) => {
                    handelChangeCategory(value,setFieldValue)
                  }}
                  renderInput={(params) => <TextField {...params}  label="Danh mục sản phẩm" />}
                />
                 {errors.category && touched.quantity && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.category}
                    </div>
                  )}
                </div>
                <div className="col l-6  m-12 c-12 mb-1">
                <Autocomplete
                  disablePortal
                  name="nsx"
                  id="combo-box-demo"
                  options={subcategory}
                  onChange={(event, value) => {
                    setFieldValue("nsx",value)
                  }}
                  renderInput={(params) => <TextField {...params} label="Nhà sản xuất" />}
                />
                 {errors.quantity && touched.quantity && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.nsx}
                    </div>
                  )}
                </div>
                
                <div className="col  m-12 c-12 mb-1">
                  <TextField
                    label="Số lượng nhập vào"
                    name="quantity"
                    type="number"
                    variant="outlined"
                    defaultValue={product.quantity}
                    onChange={handleChange}
                  />
                  {errors.quantity && touched.quantity && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.quantity}
                    </div>
                  )}
                </div>
                <div className="col  m-12 c-12 mb-1">
                  <TextField
                    label="Giá (vnđ)"
                    type="number"
                    name="price"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  {errors.price && touched.price && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.price}
                    </div>
                  )}
                </div>
                <div className="col  m-12 c-12 mb-1">
                  <TextField
                    label="Giảm giá (%)"
                    type="number"
                    name="discount"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  {errors.discount && touched.discount && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.discount}
                    </div>
                  )}
                </div>
                <div className="col  m-12 c-12 mb-1">
                  <TextField
                    label="Màu sắc"
                    name="color"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  {errors.color && touched.color && (
                    <div style={{ color: "red", marginTop: "5px" }}>
                      {errors.color}
                    </div>
                  )}
                </div>
                <div className="col l-12">
                    <Editor style={{height:'320px'}} value={description} onTextChange={(e) => setDescription(e.htmlValue)} />
                </div>
                <div className="col l-12">
                    <Editor style={{height:'320px'}} value={dep} onTextChange={(e) => setDep(e.htmlValue)} />
                </div>
                <div id="createProductFormFile" className="col">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={createProductImagesChange}
                    multiple
                  />
                </div>
                <div id="createProductFormImage" className="row mt-2">
                  {imagesPreview.map((image, index) => (
                    <div key={index} className="col l-2">
                      <img
                        className="image-prod"
                        key={index}
                        src={image}
                        alt="Product Preview"
                      />
                    </div>
                  ))}
                </div>
                <div className="group-btn">
                  <input
                    type="submit"
                    onClick={handleSubmit}
                    value="Thêm sản phẩm"
                  />
                  <Button
                    startIcon={<KeyboardBackspaceIcon />}
                    size="medium"
                    onClick={backProdPage}
                  >
                    Trở về
                  </Button>
                </div>
              </div>
              </Form>
            )}
          </Formik>
         
                  
        </div>
      </Paper>
    </>
  );
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Tên không được để trống!"),
  category: Yup.string().required("Danh mục không được để trống!"),
  nsx: Yup.string().required("Nhà sản xuất không được để trống!"),
  quantity: Yup.number().min(1,"Cần nhập số lượng đầu vào!"),
  price: Yup.number().required("Price không được để trống!"),
  color: Yup.string().required("Màu sắc không được để trống!"),
  discount: Yup.number().required("Giảm giá không được để trống!"),
});

export default AddProduct;
