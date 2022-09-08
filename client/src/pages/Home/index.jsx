import React from "react";
import { Advertise } from "../../components/Advertise";
import ListProducts from "../../components/ListProducts";
import Chatbox from "./ChatBox";

const Homepage = () => {
  return (
    <>
      <Advertise />
      <ListProducts />
      <Chatbox />
    </>
  );
};

export default Homepage;
