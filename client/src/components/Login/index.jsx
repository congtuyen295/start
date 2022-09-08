import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import FormGroup from "../form-group";
import { AuthServices } from "../../services/auth-service";
import { LOCAL_STORAGE } from "../../constants/localstorage";
import { loginSuccess } from "../../redux/authSlice";

import "./style.scss";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ!").required("Bắt buộc nhập!"),
  password: Yup.string()
    .min(6, "Password ít nhất 6 kí tự!")
    .required("Bắt buộc nhập!"),
});

const Login = () => {
  const username = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();

  const authServices = new AuthServices();

  const handleSubmit = async (values) => {
    try {
      const res = await authServices.login(values);
      const role = res.user.role;
      localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, res.accesstoken);
      localStorage.setItem(LOCAL_STORAGE.REFESH_TOKEN, res.accesstoken);
      dispatch(loginSuccess({ user: res.user, isAdmin: res.user.role === 1 ? true : false }));

      role === +1 ? history.push("/admin") : history.push("/");
      alert.success("Đăng nhập thành công !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      <div className="grid wide">
        <h1 className="title-head">
          <span>Đăng nhập tài khoản</span>
        </h1>
        <div className="row">
          <div className="col l-6 c-12">
            <div className="page-login">
              <span className="d-block mb-4">
                Nếu bạn đã có tài khoản, đăng nhập tại đây.
              </span>
              <Formik
                initialValues={username}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, handleSubmit, handleChange }) => (
                  <>
                    <FormGroup
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      handleChange={handleChange}
                      errors={errors.email}
                      touched={touched.email}
                    />
                    <FormGroup
                      label="Password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      handleChange={handleChange}
                      errors={errors.password}
                      touched={touched.password}
                    />

                    <div className="d-flex">
                      <input
                        className="btn btn-style btn-primary"
                        type="submit"
                        value="Đăng nhập"
                        onClick={handleSubmit}
                      />
                      <Link to="/register">Đăng ký</Link>
                    </div>
                  </>
                )}
              </Formik>
            </div>
          </div>
          <div className="col l-6 c-12">
            <div className="recover-password">
              <span className="d-block mb-4">
                Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua
                email.
              </span>
              <FormGroup label="Email" type="email" placeholder="Email" />
              <div>
                <input type="submit" value="Lấy lại mật khẩu" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
