import { isArray } from "lodash";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductService } from "../../services/product-service";
import Loading from "../common/Loading";
import Product from "../product";

const Products = ({ cate }) => {
  const [prods, setProds] = useState([]);
  const productService = new ProductService();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async (name) => {
      setIsLoading(true);
      const res = await productService.getProductByCategory({
        limit: 12,
        category: cate.name,
      });
      setProds(res.products);
      setIsLoading(false);
    };
    getProducts(cate.name);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className="grid wide list-products">
        <div className="title">
          <h3>
            <Link to={`/list-products?category=${cate.name}`}>{cate.name}</Link>
          </h3>
          {/* <ul>
            {cate.subCategories.map((i) => (
              <li>
                <Link to={`/list-products?category=${i}`}>{i}</Link>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="row mt-3">
          {prods.map((prod) => (
            <div key={prod._id} className="col l-2 m-4 c-6">
              <Product product={prod} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
