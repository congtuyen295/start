import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./style.scss";

const HeaderCart = () => {
  const { cart } = useSelector((state) => state.cart);
  
  
  return (
    <div className="header-card">
      <div className="hotline_dathang ">
        <div className="icon">
          <i className="fas fa-paper-plane"></i>
        </div>
        <div className="content_hotline">
          <a href="/">0397209076</a>
          <span>hotline</span>
        </div>
      </div>
      <div className="cart-contain">
        <div className="icon">
          <i className="fas fa-shopping-basket"></i>
        </div>
        <Link to="/cart">
          <div>({cart.length})Sản phẩm</div>
          <span>Giỏ hàng</span>
        </Link>
      </div>
    </div>
  );
};

export default HeaderCart;
