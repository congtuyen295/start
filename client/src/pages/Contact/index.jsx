import React from "react";
import Breadcrumb from "../../components/BreadCrumb";

import "./style.scss";

const Contact = () => {
  return (
    <>
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb value="Liên hệ" />
      </div>
      <div className="contact">
        <div className="grid wide">
          <h3 className="title-head">Liên hệ</h3>
          <p>Mọi thắc mặc liên hệ qua hotline: 0192837465</p>
          <div className="row" style={{marginTop: '15px'}}>
            <div className="col c-12 l-6">
              <p style={{margin: '0 0 15px'}}>
                <span style={{fontSize: '20px'}}><strong>TP. HCM</strong></span>
              </p>
              <p style={{lineHeight: '2em'}}><strong>Trụ sở chính: </strong>4C Đồng Xoài, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh.</p>
              <p style={{lineHeight: '2em'}}><strong>Giờ làm việc: </strong>8h - 21h từ thứ 2 đến CN.</p>
              <p style={{lineHeight: '2em'}}><strong>Điện thoại: </strong> (028) 7301 3878 - DĐ: 0909 305 350.</p>
              <p style={{lineHeight: '2em'}}><strong>Website: </strong>  http://doctech.com.vn</p>
            </div>
            <div className="col c-12 l-6">
            <p style={{margin: '0 0 15px'}}>
                <span style={{fontSize: '20px'}}><strong>HÀ NỘI</strong></span>
              </p>
              <p style={{lineHeight: '2em'}}><strong>Trụ sở chính: </strong>60 Dịch Vọng Hậu, Dịch Vọng Hậu, Quận Cầu Giấy, Hà Nội.</p>
              <p style={{lineHeight: '2em'}}><strong>Giờ làm việc: </strong>8h - 21h từ thứ 2 đến CN.</p>
              <p style={{lineHeight: '2em'}}><strong>Điện thoại: </strong> (028) 7301 3878 - DĐ: 0909 305 350.</p>
              <p style={{lineHeight: '2em'}}><strong>Website: </strong>  http://doctech.com.vn</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
