import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductService } from "../../services/product-service";
import "./listproducts.scss";

const ListPorducts = (value) => {
  const formatter = new Intl.NumberFormat("vn");
  const [listProducts, setListProducts] = useState(null);
  const params = useParams();
  const productService = new ProductService();
  useEffect(() => {
    const getProducts = async () => {
      const res = await productService.getProductByCategory({
        category: value.category,
        limit: 6,
      });
      const lstProduct = res?.products?.filter(
        (item) => item._id !== params.id
      );
      setListProducts(lstProduct);
    };
    getProducts();
  }, [value.category, params.id]);
  return (
    <div className="module_best_sale_product">
      <h3 className="title_module">Sản phẩm liên quan</h3>
      <div className="sale_off_today">
        {listProducts &&
          listProducts.map((product) => {
            let showPrice =
              product.discount === 0
                ? product.price
                : product.price - (product.price * product.discount) / 100;
            return (
              <>
                <div key={product._id} className="item_small">
                  <div className="product-mini-item">
                    <Link to={`/detail/${product._id}`}>
                      <img src={product.images[0]?.url} alt={product.name} />
                    </Link>
                    <div className="product-info">
                      <h3>
                        <Link to={`/detail/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <div className="price-box">
                        <span className="price">
                          <span className="product-price">
                            {formatter.format(showPrice)}₫
                          </span>
                        </span>
                        {product.discount && (
                          <span className="old-price">
                            <del className="sale-price">
                              {formatter.format(product?.price)}₫
                            </del>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default ListPorducts;
