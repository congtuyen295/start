import React from "react";
import HeaderCart from "../../components/headerCart";
import Search from "../../components/searchContainer";
import Swipeable from "../../components/Swipeable";
import logo from "../../assets/images/logo.png"
const MidHeader = () => {
  return (
    <>
      <div className="grid wide">
        <div className="row">
          <div className="col l-3 m-12 c-12 d-flex justify-content-between">
            <div className="hidden-lg">
              <Swipeable />
            </div>
            <a href="/" className="d-block">
              <img src={logo}height="50px" alt="logo" />
            </a>
            <div></div>
          </div>
          <div className="col l-5 m-12 c-12">
            <Search />
          </div>
          <div className="col l-4 m-12 c-12">
            <HeaderCart />
          </div>
        </div>
      </div>
    </>
  );
};

export default MidHeader;
