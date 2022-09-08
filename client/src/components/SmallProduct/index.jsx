import React from "react";
import thumb from "./../../assets/images/chuot-co-day-logitech-b100-910-001439-0-b8188ffa-50ca-43e4-bea8-52be8fabc00c (1).webp";
import "./style.scss";

const SmallProduct = () => {
  return (
    <div className="product-mini-item">
      <a className="product-img" href="/">
        <img src={thumb} alt="" />
      </a>
      <div className="product-info">
        <h3>
          <a href="/">Chuột có dây Logitech B100 910-006605</a>
        </h3>
        <div className="price-box">
          <span className="price">
            <span className="price product-price">80.000₫ </span>
          </span>
          <span className="old-price">
            <del className="sale-price">130.000₫</del>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
