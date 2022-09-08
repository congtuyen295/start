import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { LOCAL_STORAGE } from "../../constants/localstorage";
import { logOut } from "../../redux/authSlice";
import "./topbar.scss";

const Topbar = () => {
  const { isLogged, isAdmin, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, "");
    localStorage.setItem(LOCAL_STORAGE.REFESH_TOKEN, "");
    dispatch(logOut());
    console.log("Đăng xuất thành công!");
    history.push("/");
  };

  return (
    <>
      <div className="grid wide">
        <div className="row">
          <div className="topbar-left col c-0 m-0 l-6">
            <span>Mở cửa: 9h đến 20h, chủ nhật 10h đến 19h</span>
          </div>
          <div className="topbar-right col c-12 m-12 l-6">
            <ul>
              <li className="login_content">
                <Link to="/login" style={isLogged ? {marginRight: '15px'}: null}>
                  
                  {!isLogged ? <><i className="fa-solid fa-user"></i>Tài khoản</>: <img className="tb-avatar" src={user?.avatar} alt="" />}
                </Link>
                {!isLogged && (
                  <ul className="ul_account">
                    <li>
                      <Link to="/login">Đăng nhập</Link>
                    </li>
                    <li>
                      <Link to="/register">Đăng ký</Link>
                    </li>
                  </ul>
                )}
                {isLogged && (
                  <ul className="ul_account">
                    <li>
                      <Link to="/account">Tài khoản</Link>
                    </li>
                    {isAdmin && (
                      <li>
                        <Link to="/admin">Trang quản trị</Link>
                      </li>
                    )}
                    <li>
                      <Link to="#" type="button" onClick={handleLogout}>
                        Đăng xuất
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="hidden-xs">
                <a href="#">
                  <i className="fa-solid fa-location-dot"></i>
                  Địa chỉ: Hà Nội
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
