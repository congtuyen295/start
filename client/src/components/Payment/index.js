import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAlert } from "react-alert";
import { OrderService } from "../../services/order-service";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { deleteAllCarts } from "../../redux/cartSlice";
import Breadcrumb from "../BreadCrumb";

import "./style.scss";

const Payment = () => {
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [isAddress, setIsAddress] = React.useState(false);
  const [payment, setPayment] = React.useState(0)
  const [togglePayment, setTogglePayment] = React.useState(false)
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const orderServices = new OrderService();
  const sumPrice = cart.reduce((pre, item) => {
    let price = 0;
    if(item.product.discount === 0){
      price = item.product.price*item.quantity;
    }else{
      price = (item.product.price - item.product.price*item.product.discount/100)*item.quantity;
    }
    return pre + price;
  }, 0);
  const formatter = new Intl.NumberFormat("vn");

  const handleChangeIsAddress = (event) => {
    setIsAddress(event.target.value);
  };
  const handleChangePayment = (e)=>{
    setPayment(e.target.value)
    setTogglePayment(!togglePayment)
  }
  return (
    <>
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb value="Thanh toán" />
      </div>
      <div className="payment-container mt-4">
        <div className="grid wide">
          <div className="row">
            <Formik
              initialValues={{
                name: user?.name || "",
                email: user?.email || "",
                address: "",
                phone: user?.phone || "",
                message: "",
              }}
              validationSchema={SignupSchema}
              onSubmit={async (values) => {
                try {
                  const order = {
                    id_user: user._id || "",
                    name: values.name,
                    address: values.address,
                    phone: values.phone,
                    totalSum: sumPrice,
                    payment: payment,
                    message: values.message,
                    cart: cart.map((c) => {
                      return {
                        id_product: c.product._id,
                        number: c.quantity,
                      };
                    }),
                  };
                  const res = await orderServices.createOrder(order);
                  if (res.success === true) {
                    alert.success("Đặt hàng thành công !");
                    dispatch(deleteAllCarts());
                    history.push("/account");
                  } else {
                    alert.error(res.message);
                  }
                } catch (error) {
                  console.log(error.response.data.msg);
                }
              }}
            >
              {({ errors, touched, handleSubmit, handleChange }) => (
                <>
                  <div className="col l-6">
                    <div className="info-user">
                      <div className="title">Thông tin nhận hàng</div>
                      <div className="info-main">
                        <TextField
                          sx={{ width: "100%" }}
                          label="Email"
                          variant="standard"
                          name="email"
                          defaultValue={user?.email}
                          onChange={handleChange}
                          disabled={true}
                        />
                        {touched.email && errors.email && (
                          <div style={{ color: "red" }}>{errors.email}</div>
                        )}
                        <TextField
                          className="mt-1"
                          sx={{ width: "100%" }}
                          label="Họ tên"
                          variant="standard"
                          name="name"
                          defaultValue={user?.name}
                          onChange={handleChange}
                          disabled={true}
                        />
                        {touched.name && errors.name && (
                          <div style={{ color: "red" }}>{errors.name}</div>
                        )}
                        <InputLabel
                          className="mt-1"
                          id="demo-simple-select-standard-label"
                        >
                          Địa chỉ
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={isAddress}
                          onChange={handleChangeIsAddress}
                          variant="standard"
                          label="Địa chỉ"
                        >
                          <MenuItem value={false}>{user?.address}</MenuItem>
                          <MenuItem value={true}>Địa chỉ mới</MenuItem>
                        </Select>
                        {isAddress === true && (
                          <>
                            <TextField
                              className="mt-1"
                              name="address"
                              sx={{ width: "100%" }}
                              label="Địa chỉ mới"
                              variant="standard"
                              onChange={handleChange}
                            />
                            {touched.address && errors.address && (
                              <div style={{ color: "red" }}>
                                {errors.address}
                              </div>
                            )}
                          </>
                        )}
                        <TextField
                          className="mt-1"
                          name="phone"
                          sx={{ width: "100%" }}
                          label="Điện thoại"
                          defaultValue={user?.phone}
                          onChange={handleChange}
                          variant="standard"
                        />
                        {touched.phone && errors.phone && (
                          <div style={{ color: "red" }}>{errors.phone}</div>
                        )}
                        <InputLabel
                          className="mt-1"
                          id="demo-simple-select-standard-label"
                        >
                          Phương thức thanh toán
                        </InputLabel>
                        <Select
                          fullWidth
                          labelId="demo-simple-select-standard-label"
                          id="demo-simple-select-standard"
                          value={payment}
                          onChange={handleChangePayment}
                          variant="standard"
                          label="Phương thức thanh toán"
                        >
                          <MenuItem value={0}>Thanh toán khi nhận hàng</MenuItem>
                          <MenuItem value={1}>Thanh toán qua ngân hàng</MenuItem>
                        </Select>
                        <TextField
                          className="mt-1"
                          name="message"
                          sx={{ width: "100%" }}
                          label="Ghi chú"
                          multiline
                          onChange={handleChange}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col l-6">
                    <div className="product-order">
                      <h4 className="title">Đơn hàng</h4>
                      <div className="product-info-main">
                        {cart.length > 0 &&
                          cart.map((c) =>{
                            let showpPice = c.product.discount===0 ? c.product.price : c.product.price - c.product.discount*c.product.price/100;
                            return <>
                             <div className="item-prod">
                              <div className="img">
                                <img src={c.product.images[0].url} alt="" />
                                <span className="number">{c.quantity}</span>
                              </div>
                              <div className="name">
                                <p>{c.product.name}</p>
                              </div>
                              <p className="price">
                               
                                {formatter.format(showpPice)}₫
                              </p>
                            </div></>
                          } )}
                        <div className="payment-due">
                          <p className="title">Tổng cộng</p>
                          <div className="total">
                            {" "}
                            {formatter.format(sumPrice)}₫
                          </div>
                        </div>
                        <div className="group-button">
                          <Link to="/cart">Quay về giỏ hàng</Link>
                          <button type="submit" onClick={handleSubmit}>
                            Đặt hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ!").required("Bắt buộc nhập!"),
  name: Yup.string().required("Bắt buộc nhập!"),
  phone: Yup.string().required("Bắt buộc nhập!"),
});

export default Payment;
