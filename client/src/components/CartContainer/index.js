import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { deleteCart, updateCart } from "../../redux/cartSlice";
import Breadcrumb from "../BreadCrumb";
import "./style.scss";
import { ProductService } from "../../services/product-service";
import { Tooltip } from "@mui/material";

const Cart = () => {
  const formatter = new Intl.NumberFormat("vn");
  const [product, setProduct] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const alert = useAlert();
  const dispatch = useDispatch();

  const productService = new ProductService();

  useEffect(() => {
    const sumPrice = cart.reduce((pre, item) => {
      
      let price = 0;
      if(item.product.discount === 0){
        price = item.product.price*item.quantity;
      }else{
        price = (item.product.price - item.product.price*item.product.discount/100)*item.quantity;
      }
      console.log(price)
      return pre + price;
    }, 0);
    setTotal(sumPrice);
  }, [cart]);

  const handleDeleteCart = (index) => {
    dispatch(deleteCart(index));
    alert.success("Xóa thành công !");
  };
  const increment = async (quantity, index, id) => {
    try {
      const res = await productService.getProductById({ id });
      if (quantity + 1 <= +res.product.quantity) {
        dispatch(updateCart({ index, quantity: quantity + 1 }));
        alert.success("Cập nhật số lượng thành công !");
      } else {
        alert.error("Không đủ số lượng để thêm!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const decrement = (quantity, index) => {
    const soluong = Math.max(1, quantity - 1);
    dispatch(updateCart({ index, quantity: soluong }));
    alert.success("Cập nhật số lượng thành công !");
  };

  return (
    <>
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb value="Giỏ hàng" />
      </div>
      <section className="main-cart-page main-container">
        <div className="grid wide">
          <div className="row">
            <div className="col c-12 m-12 l-12">
              <div className="header-cart">
                <h1 className="title">Giỏ hàng</h1>
                <div className="cart-page">
                  <form>
                    <div className="b-scroll">
                      <div className="cart-thead">
                        <div style={{ width: "17%" }}>Ảnh sản phẩm</div>
                        <div style={{ width: "33%" }}>
                          <span className="nobr">Tên sản phẩm</span>
                        </div>
                        <div style={{ width: "15%" }} className="a-center">
                          <span className="nobr">Đơn giá</span>
                        </div>
                        <div style={{ width: "14%" }} className="a-center">
                          Số lượng
                        </div>
                        <div style={{ width: "15%" }} className="a-center">
                          Thành tiền
                        </div>
                        <div style={{ width: "6%" }}>Xoá</div>
                      </div>
                      {cart.length !== 0 && (
                        <>
                          <div className="cart-tbody">
                            {cart &&
                              cart.map((c, index) => {
                                let showPrice = c.product.discount === 0 ? c.product.price: c.product.price - c.product.price*c.product.discount/100;
                                return <>
                                 <div className="item-cart">
                                  <div style={{ width: "17%" }}>
                                    <Link
                                      className="product-image"
                                      to={`/detail/${c?.product?._id}`}
                                    >
                                      <img
                                        src={c.product.images[0].url}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                  <div
                                    className="a-center"
                                    style={{ width: "33%" }}
                                  >
                                    <h2 className="product-name">
                                      <Link
                                        className="text2line"
                                        style={{color: "#000"}}
                                        to={`/detail/${c?.product?._id}`}
                                      >
                                        {c?.product.name}
                                      </Link>
                                    </h2>
                                  </div>
                                  <div
                                    style={{ width: "15%" }}
                                    className="a-center"
                                  >
                                    <span className="item-price">
                                      <span className="price">
                                      
                                        {formatter.format(showPrice)}₫
                                      </span>
                                    </span>
                                  </div>
                                  <div style={{ width: "14%" }}>
                                    <span className="input_qty_pr">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          decrement(c.quantity, index)
                                        }
                                      >
                                        -
                                      </button>
                                      <input
                                        type="text"
                                        value={c.quantity}
                                        disabled
                                      />
                                      <button
                                        type="button"
                                        onClick={() =>
                                          increment(
                                            c.quantity,
                                            index,
                                            c.product._id
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                    </span>
                                  </div>
                                  <div
                                    style={{ width: "15%" }}
                                    className="a-center"
                                  >
                                    <span className="item-price">
                                      <span className="price">
                                        {formatter.format(
                                         showPrice * c.quantity
                                        )}
                                        ₫
                                      </span>
                                    </span>
                                  </div>
                                  <div style={{ width: "6%" }}>
                                    <Tooltip title="Xóa">
                                      <button
                                        className="remove-item-cart"
                                        onClick={() => handleDeleteCart(index)}
                                      >
                                        <span>
                                          <i className="fa-solid fa-trash-can"></i>
                                        </span>
                                      </button>
                                    </Tooltip>
                                  </div>
                                </div>
                                </>
                              }
                               
                              )}
                          </div>
                          <table className="shopping-cart-table-total mb-0">
                            <tfoot>
                              <tr>
                                <td colSpan="20" className="a-right">
                                  <span>Tổng tiền:</span>
                                </td>
                                <td className="a-right">
                                  <strong>
                                    <span className="totals_price price">
                                      {formatter.format(total)}₫
                                    </span>
                                  </strong>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </>
                      )}
                      {cart.length === 0 && (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "50px 0 10px 0",
                          }}
                        >
                          Chưa có sản phẩm nào trong giỏ hàng
                        </div>
                      )}
                      <ul className="checkout">
                        <li>
                          {cart.length !== 0 && (
                            <Link
                              to="/checkout"
                              className="btn-proceed-checkout"
                              title="Thực hiện thanh toán"
                              type="button"
                            >
                              <span>Thực hiện thanh toán</span>
                            </Link>
                          )}
                          <Link
                            to="list-products"
                            title="Tiếp tục mua hàng"
                            type="button"
                          >
                            <span>Tiếp tục mua hàng</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
