import React from "react";
import MidHeader from "./MidHeader.js";
import Nav from "./Nav.js";
import Topbar from "./Topbar.js";
import "./style.scss";

const Header = () => {
  return (
    <>
      <div className="topbarr">
        <Topbar />
      </div>
      <div className="mid-header pt-2 pb-2">
        <MidHeader />
      </div>
      <div>
        <Nav />
      </div>
    </>
  );
};

export default Header;
