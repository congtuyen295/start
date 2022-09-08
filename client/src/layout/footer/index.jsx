import React from "react";
import "./footer.scss";

function Footer() {
  return (
    <footer>
      <div id="top-footer">
        <div className="grid wide">
          <div className="row">
            <div className="col l-2 m-6 c-12">
              <h6 className="title">Giới thiệu</h6>
              <ul className="list">
                <li>
                  <a href="#">Trang chủ </a>
                </li>
                <li>
                  <a href="#">Giới thiệu </a>
                </li>
                <li>
                  <a href="#">Sản phẩm </a>
                </li>
                <li>
                  <a href="#">Bảo mật thông tin </a>
                </li>
                <li>
                  <a href="#">Tuyển dụng </a>
                </li>
              </ul>
            </div>

            <div className="col l-3 m-6 c-12">
              <h6 className="title">Chính sách công ty</h6>
              <ul className="list">
                <li>
                  <a href="#">Chính sách giao nhận </a>
                </li>
                <li>
                  <a href="#">Chính sách đổi trả hàng </a>
                </li>
                <li>
                  <a href="#">Phương thức thanh toán </a>
                </li>
                <li>
                  <a href="#">Hướng dẫn trả góp </a>
                </li>
                <li>
                  <a href="#">Chế độ bảo hành </a>
                </li>
              </ul>
            </div>

            <div className="col l-3 m-6 c-12">
              <h6 className="title">Hỗ trợ khách hàng</h6>
              <ul className="list">
                <li>
                  <a href="#">Bảo hành: 0192837465 </a>
                </li>
                <li>
                  <a href="#">Gửi yêu cầu bảo hành </a>
                </li>
                <li>
                  <a href="#">Gửi yêu cầu đổi hàng </a>
                </li>
                <li>
                  <a href="#">
                    P. Hỗ trợ khách hàng:
                    <br /> support@doctech.com.vn{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div className="col l-4 m-6 c-12">
              <div className="col l-12">
                <ul className="list">
                  <li className="contact">
                    <h5 className="title">Cty tnhh dịch vụ tin học siêu tốc</h5>
                  </li>
                  <li>
                    <a>
                      Mở cửa: 9h đến 20h từ thứ 2 đến thứ 7, Chủ nhật: 10h đến
                      19h.
                    </a>
                  </li>
                  <li>
                    <a>
                      Địa chỉ: Số 298 Đ. Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà
                      Nội.{" "}
                    </a>
                  </li>
                  <li className="contact">
                    <a>Điện thoại: 0192837465 </a>
                  </li>
                  <li className="contact">
                    <a>Email: sp@doctech.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom_footer">
        <div className="grid wide">
          <div className="row">
            <div className="col l-6">
              <h2 className="title" style={{ padding: "0px" }}>
                Đăng kí nhận tin khuyến mãi
              </h2>
              <form className="form">
                <div className="form-group">
                  <div className="input_group">
                    <input
                      className="mail"
                      name="email"
                      placeholder="Nhập email của bạn"
                      type="email"
                    />
                    <button className="btn" type="submit">
                      Đăng ký
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col l-6">
              <h2
                className="title"
                style={{
                  padding: "0px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                Liên kết mua hàng hoặc tư vấn
              </h2>
              <div className="list_social">
                <ul>
                  <li>
                    <a >
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-google-plus-g"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa-brands fa-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
