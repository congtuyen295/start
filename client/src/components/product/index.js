import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Preview from "./Preview";
import { addCart } from "../../redux/cartSlice";

import "./style.scss";




const Product = ({ product }) => {
  const { _id, name, images, price, discount, price_spe } = product;
  const dispatch = useDispatch()
  const alert = useAlert();

  const handleAddCart = () => {
    dispatch(
      addCart({
        product: {
          ...product,
        },
        quantity: 1,
      })
    );
    alert.success("Thêm vào giỏ hàng thành công !")
  };
  const showprice = discount!==0 ? price - price*discount/100 : price; 
  const formatter = new Intl.NumberFormat("vn");
  return (
    <div className="product-card">
      <div className="product-thumbnail">
        <Link to={`/detail/${_id}`}>
          <img title={name} src={images[0]?.url} alt="" />
        </Link>
        <div className="sale-flash">
          <div className="font16">-{discount}%</div>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/detail/${_id}`}>{name}</Link>
        </h3>
        <div className="product-hides">
          <div className="special-price">
            <span>{formatter.format(showprice)}₫</span>
          </div>
          <div className="old-price">
            <span className="price product-price-old">
             {discount!==0 &&  formatter.format(price)} 
            {discount!==0 &&  <>đ</>}

            </span>
          </div>
        </div>
        <div className="product-action">
            <div>
              <button onClick={handleAddCart}>
                <i className="fa fa-shopping-basket"></i>
                Thêm vào giỏ hàng
              </button>
              <Preview product={product}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
