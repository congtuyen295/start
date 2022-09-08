import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import { Paper } from "@mui/material";
import { OrderService } from "../../services/order-service";
import moment from "moment";
import "moment/locale/vi";
import "./detail.scss";
moment.locale("vi");

const Detail = () => {
  const [order, setOrder] = useState();
  const [isChange, setIsChange] = useState(false);
  const [call, setCall] = useState(false);
  const params = useParams();
  const orderServices = new OrderService();
  const formatter = new Intl.NumberFormat("vn");
  const [newInfo, setNewInfo] = useState();

  useEffect(() => {
    const getOrder = async () => {
      const res = await orderServices.getOrder(params.id);
      setOrder(res.order);
      setNewInfo({
        name: res.order.name || res?.order.id_user.name,
        address: res.order?.address || res.order.id_user?.address,
        phone: res.order.phone || res?.order.id_user.phone,
      });
    };
    getOrder();
  }, [call]);
  const handleChangeInfoUser = async (e) => {
    e.preventDefault();
    await orderServices.updateUserInfo({ ...newInfo, id: params.id });
    setIsChange(false);
    setCall(!call);
    console.log("Cập nhật thông tin thành công!");
  };
  return (
    <Paper className="detail-orders-container">
      <div className="grid wide">
        <div className="row">
          <div className="col l-12">
            <div className="detail-orders">
              <h1 className="title">Chi tiết đặt hàng</h1>
              <div className="cart-page">
                <div className="b-scroll">
                  <div className="cart-thead">
                    <div style={{ width: "17%" }}>Ảnh sản phẩm</div>
                    <div style={{ width: "39%" }}>
                      <span className="nobr">Tên sản phẩm</span>
                    </div>
                    <div className="a-center" style={{ width: "15%" }}>
                      <span className="nobr">Đơn giá</span>
                    </div>
                    <div className="a-center" style={{ width: "14%" }}>
                      Số lượng
                    </div>
                    <div className="a-center" style={{ width: "15%" }}>
                      Thành tiền
                    </div>
                  </div>
                  <div className="cart-tbody">
                    {order?.cart &&
                      order.cart.map((item, index) => {
                       let {discount, price} = item.id_product;
                        let showPrice = 0;
                      if(discount === 0)
                      {
                        showPrice = price
                      }
                      else{
                        showPrice = price - discount*price/100;
                      }
                        
                       return <>
                              <div key={index} className="item-cart">
                          <div style={{ width: "17%" }}>
                            <a className="product-image" href="/">
                              <img
                                src={item?.id_product?.images[0].url}
                                alt=""
                              />
                            </a>
                          </div>
                          <div className="a-center" style={{ width: "39%" }}>
                            <h2 className="product-name" href="/">
                              <a className="text2line">
                                {item?.id_product?.name}
                              </a>
                            </h2>
                          </div>
                          <div className="a-center" style={{ width: "15%" }}>
                            <span className="item-price">
                              <span className="price">
                                {formatter.format(showPrice)}₫
                              </span>
                            </span>
                          </div>
                          <div style={{ width: "14%" }}>
                            <span className="input_qty_pr">{item.number}</span>
                          </div>
                          <div className="a-center" style={{ width: "15%" }}>
                            <span className="item-price">
                              <span className="price">
                                {formatter.format(
                                  showPrice * item.number
                                )}
                                ₫
                              </span>
                            </span>
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
                              {formatter.format(order?.totalSum)}₫
                            </span>
                          </strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <div className="orders-info">
                    <p>
                      <label>Ngày đặt hàng: </label>
                      {"Ngày " + moment(order?.createdAt).format("DD-MM-YYYY")}
                    </p>
                    <p>
                      <label>Phương thức thanh toán: </label>
                      {payment[order?.payment]}
                    </p>
                    <p>
                      <label>Địa chỉ đặt hàng: </label>
                      {order?.address || order?.id_user.address}
                    </p>
                  </div>
                  <ul className="checkout">
                    <li>
                      <Link
                        title="Tiếp tục mua hàng"
                        type="button"
                        to="/account"
                      >
                        <span>Quay lại</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col l-3">
            <div className="info-user">
              <div className="title">Thông tin người nhận</div>
              <div className="block-avatar">
                <img
                  src={
                    order?.id_user.avatar ||
                    "https://res.cloudinary.com/djkeuemeg/image/upload/v1651232092/avatar/xuruot9xrutpsa6dcdpw.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="block-content mt-2">
                <p>
                  Tên người nhận:{" "}
                  {!isChange && (
                    <input
                      value={order?.name || order?.id_user.name}
                      readOnly
                      type="text"
                    />
                  )}
                  {isChange && (
                    <input
                      value={newInfo.name}
                      autoFocus
                      type="text"
                      onChange={(e) =>
                        setNewInfo({
                          ...newInfo,
                          name: e.target.value,
                        })
                      }
                    />
                  )}
                </p>
                <p>
                  Email:{" "}
                  <input value={order?.id_user.email} readOnly type="text" />
                </p>
                <p>
                  Địa chỉ:{" "}
                  {!isChange && (
                    <input
                      value={order?.address || order?.id_user.address}
                      readOnly
                      type="text"
                    />
                  )}
                  {isChange && (
                    <input
                      value={newInfo.address}
                      type="text"
                      onChange={(e) =>
                        setNewInfo({
                          ...newInfo,
                          address: e.target.value,
                        })
                      }
                    />
                  )}
                </p>
                <p>
                  Điện thoại:{" "}
                  {!isChange && (
                    <input
                      value={order?.phone || order?.id_user.phone}
                      readOnly
                      type="text"
                    />
                  )}
                  {isChange && (
                    <input
                      value={newInfo.phone}
                      type="text"
                      onChange={(e) =>
                        setNewInfo({
                          ...newInfo,
                          phone: e.target.value,
                        })
                      }
                    />
                  )}
                </p>
                <p>
                  {!isChange && (
                    <button
                      type="submit"
                      onClick={() => {
                        setIsChange(true);
                      }}
                    >
                      Sửa thông tin
                    </button>
                  )}
                  {isChange && (
                    <button
                      type="button"
                      onClick={(e) => handleChangeInfoUser(e)}
                    >
                      Lưu thông tin
                    </button>
                  )}
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </Paper>
  );
};
const payment = ["Nhận hàng thanh toán", "Chuyển khoản qua ngân hàng", ];

export default Detail;
