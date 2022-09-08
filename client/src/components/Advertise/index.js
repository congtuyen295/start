import React from "react";
import Slider from "react-slick";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import banner1 from "../../assets/images/banner_slider_1.webp";
import banner2 from "../../assets/images/banner_slider_2.webp";
import banner3 from "../../assets/images/banner_11.webp";
import banner4 from "../../assets/images/banner_22.webp";
import banner5 from "../../assets/images/banner_2.webp";
import banner6 from "../../assets/images/banner_3.webp";
import banner7 from "../../assets/images/banner_4.webp";
import "./style.scss";

export const Advertise = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  };
  return (
    <>
      <div className="pb-4 pt-4 slides">
        <div className="grid wide">
          <div className="row">
            <div className="col c-12 l-9 left-slides">
              <Slider {...settings}>
                <div>
                  <img src={slider1} alt="" />
                </div>
                <div>
                  <img src={slider2} alt="" />
                </div>
                <div>
                  <img src={slider3} alt="" />
                </div>
              </Slider>
            </div>
            <div className="col c-12 l-3">
              <div className="right-slides">
                <a href="/" className="banner-slider1">
                  <img src={banner1} alt="" />
                </a>
                <a href="/">
                  <img src={banner2} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid wide">
        <div className="row">
          <div className="col l-4 m-4 c-12 mb-3">
            <div className=" mb-3">
              <div className="adv_bottom_inner">
                <a className="overflow-hidden" href="/">
                  <img src={banner3} alt="" />
                </a>
              </div>
            </div>
            <div className="adv_bottom_inner">
              <a className="overflow-hidden" href="/">
                <img src={banner4} alt="" />
              </a>
            </div>
          </div>
          <div className="col l-4 m-4 c-12 mb-3">
            <div className="adv_bottom_inner">
              <a className="overflow-hidden" href="/">
                <img src={banner5} alt="" />
              </a>
            </div>
          </div>
          <div className="col l-4 m-4 c-12 mb-3">
            <div className=" mb-3">
              <div className="adv_bottom_inner">
                <a className="overflow-hidden" href="/">
                  <img src={banner6} alt="" />
                </a>
              </div>
            </div>
            <div className="adv_bottom_inner">
              <a className="overflow-hidden" href="/">
                <img src={banner7} alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
