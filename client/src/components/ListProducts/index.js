import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCategory } from "../../redux/categorySlice";
import { CategoryService } from "../../services/category-service";
import { ProductService } from "../../services/product-service";
import { Link } from "react-router-dom";
import Products from "./Products.js";
import Product from "../product";
import Loading from "../common/Loading";
import "./style.scss";

const ListProducts = () => {
  const [cates, setCates] = useState([]);
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const categoryService = new CategoryService();
  const productService = new ProductService();

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      setIsLoading(true);
      const categories = await categoryService.getCategory();
      dispatch(getCategory({ categories: categories}));
      setCates(categories);
      setIsLoading(false);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      const listProducts = await productService.getProductsByDiscount();
      setProducts(listProducts.products);
      setIsLoading(false);
    };
    getProducts();
  }, []);
  
  return (
    <>
      {isLoading && <Loading />}
      <div className="grid wide list-products">
        <div className="title">
          <h3>
            <Link to="/">Sản phẩm hot</Link>
          </h3>
        </div>
        <div className="row mt-3">
          {products &&
            products.map((prod) => (
              <div key={prod._id} className="col l-2 m-4 c-6">
                <Product product={prod} />
              </div>
            ))}
        </div>
      </div>

      {cates &&
        cates.map((cate) => (
          <section key={cate._id} className="mb-1">
            <Products cate={cate} />
          </section>
        ))}
    </>
  );
};

export default ListProducts;
