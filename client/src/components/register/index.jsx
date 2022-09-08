import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Breadcrumb from "../BreadCrumb";
import FormGroup from "../form-group";
import "./style.scss";
import { AuthServices } from "../../services/auth-service";
import { useAlert } from "react-alert";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Tên không được để trống!"),
  email: Yup.string()
    .email("Email không hợp lệ!")
    .required("Email không được để trống!"),
  password: Yup.string()
    .min(6, "Password ít nhất 6 kí tự!")
    .required("Password không được để trống!"),
});

const Register = () => {
  const username = {
    name: "",
    email: "",
    password: "",
  };
  const alert = useAlert();
  const authServices = new AuthServices();

  return (
    <div className="register">
      <div className="grid wide">
        <h1 className="title-head">
          <span>ĐĂNG KÝ TÀI KHOẢN</span>
        </h1>
        <span className="d-block mb-4">
          Nếu bạn đã có tài khoản, đăng nhập tại đây.
        </span>
        <Formik
          initialValues={username}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            try {
              await authServices.register(values);
              alert.info("Vui lòng kiểm tra email để xác nhận đăng ký !");
            } catch (error) {
              console.log(error.response.data.message);
            }
          }}
        >
          {({ errors, touched, handleSubmit, handleChange }) => (
            <div className="page-register">
              <div className="row">
                <div className="col l-6 c-12">
                  <FormGroup
                    label="Tên"
                    name="name"
                    type="text"
                    placeholder="Tên"
                    handleChange={handleChange}
                    errors={errors.name}
                    touched={touched.name}
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
                </div>
                <div className="col l-6 c-12">
                  <FormGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    handleChange={handleChange}
                    errors={errors.email}
                    touched={touched.email}
                  />
                </div>
              </div>
              <div className="d-flex">
                <input
                  className="btn btn-style btn-primary"
                  type="submit"
                  value="Đăng ký"
                  onClick={handleSubmit}
                />
                <Link to="/login">Đăng nhập</Link>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
