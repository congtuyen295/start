import { Paper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { LOCAL_STORAGE } from "../constants/localstorage";
import { logOut } from "../redux/authSlice";

import "./style.css";
import "./style.scss";

const DefaultAdminLayout = (props) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const handleLogout = async () => {
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, "");
    localStorage.setItem(LOCAL_STORAGE.REFESH_TOKEN, "");
    dispatch(logOut());
    alert.success("Đăng xuất thành công!");
    history.push("/");
  };
  return (
    <>
      <nav className="navigateAd">
        <div className="logo-name">
          <div className="logo-image"></div>
          <a href="/admin" className="logo_name">
             DT SHOP
          </a>
        </div>
        <div className="menu-items">
          <ul className="nav-links">
            <li>
              <Link to="/admin">
                <i className="uil uil-estate"></i>
                <span className="link-name">Trang chủ</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products">
                <i className="uil uil-files-landscapes"></i>
                <span className="link-name">Sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/categories">
                <i className="uil uil-chart"></i>
                <span className="link-name">Danh mục</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/usersmanagement">
                <i className="uil uil-user"></i>
                <span className="link-name">Người dùng</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders">
                <i className="uil uil-comments"></i>
                <span className="link-name">Đơn hàng</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/chat">
                <i className="uil uil-comments"></i>
                <span className="link-name">Chát</span>
              </Link>
            </li>
          </ul>
          <ul className="logout-mode">
            <li>
              <Link to="#" onClick={handleLogout}>
                <i className="uil uil-signout"></i>
                <span className="link-name">Đăng xuất</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <section className="section-main">
        <Paper className="top">
          <i className="uil uil-bars sidebar-toggle"></i>
          <div className="search-box">
            <Link to={`/admin/products?query=${value}`}>
              <i className="uil uil-search"></i>
            </Link>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Tìm kiếm sản phẩm..."
            />
          </div>
        </Paper>
        <div className="content-main">{props.children}</div>
      </section>
    </>
  );
};

export default DefaultAdminLayout;
