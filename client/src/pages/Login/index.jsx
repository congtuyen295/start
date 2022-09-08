import React from "react";
import Login from "../../components/Login";
import Breadcrumb from "../../components/BreadCrumb"

const LoginPage = () => {
  return (
    <>
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb value="Đăng nhập"/>
      </div>
      <Login />
    </>
  );
};

export default LoginPage;
