import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductService } from "../../services/product-service";
import Breadcrumb from "../BreadCrumb";
import Product from "../product";
import "./style.scss";

const SearchProduct = () => {
  const [name, setName] = useState("");
  const [products, setProduct] = useState();
  const { search } = useLocation();
  const productService = new ProductService();

  const getProducts = async (name) => {
    console.log(name);
    const res = await productService.searchProducts({ name: name });
    setProduct(res.products);
  };
  useEffect(() => {
    const name = new URLSearchParams(search).get("query") || "";
    setName(() => name);
    getProducts(name);
  }, [search]);
  return (
    <>
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb />
      </div>
      <div className="search-product">
        <div className="grid wide">
          <p className="total-product">Có {products?.length || 0} kết quả tìm kiếm</p>
          <div className="row">
            {products &&
              products.map((product) => (
                <div key={product._id} className="col l-3">
                  <Product product={product}/>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
