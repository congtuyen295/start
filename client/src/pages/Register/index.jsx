import React from "react";
import Register from "../../components/register";
import Breadcrumb from "../../components/BreadCrumb"

const RegisterPage = () => {
  return (
    <>
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb value="Đăng ký" />
      </div>
      <Register />
    </>
  );
};

export default RegisterPage;
