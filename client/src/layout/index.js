import React from "react";
import Header from "./header";
import Footer from "./footer";
const DefaultLayout = (props) => {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <>{props.children}</>
      <Footer />
    </>
  );
};

export default DefaultLayout;
