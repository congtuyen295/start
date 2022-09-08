import { Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../../../services/product-service";
import Loading from "../../common/Loading";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import "./style.scss";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const DetailProduct = () => {
  const productService = new ProductService();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const prams = useParams();
  const history = useHistory();
  const formatter = new Intl.NumberFormat("vn");

  useEffect(() => {
    const getProducts = async (name) => {
      setIsLoading(true);
      const res = await productService.getProductById({ id: prams.id });
      setIsLoading(false);
      setProduct(res.product);
    };
    getProducts();
  }, []);

  const backProdPage = () => {
    history.push("/admin/products");
  };

  return (
    <>
      {isLoading && <Loading values={isLoading} />}
      <Paper className="detail-prod-admin pt-2 pb-2">
        <div className="grid wide">
          <div className="detail-main">
            <h2 className="title">Chi tiết sản phẩm</h2>
            <div className="row">
              <div className="col l-6">
                <p>
                  Tên sản phẩm: <span>{product?.name}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Danh mục phẩm: <span>{product?.category}</span>
                </p>
              </div>

              <div className="col l-6">
                <p>
                  Giá cũ: <span>{formatter.format(product?.price)}₫ </span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Giảm giá: <span>{product?.discount}%</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Giá: <span>{formatter.format(product?.price_spe)}₫</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Số lượng: <span>{product?.quantity}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Hệ điều hành: <span>{product?.operatingSystem}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  RAM: <span>{product?.ram}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  CPU: <span>{product?.cpu}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Card VGA: <span>{product?.vga}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Ổ cứng: <span>{product?.hardDrive}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Màn hình: <span>{product?.screen}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Kích Thước: <span>{product?.size}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Trọng lượng: <span>{product?.weight}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Màu sắc: <span>{product?.color}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Webcam: <span>{product?.webcam}</span>
                </p>
              </div>
              <div className="col l-6">
                <p>
                  Pin: <span>{product?.pin}</span>
                </p>
              </div>
              <div className="col l-12">
                <p>
                  <strong> Mô tả: </strong>
                  <span>{product?.description}</span>
                </p>
              </div>
            </div>
            <div className="row">
              {product?.images.length !== 0 &&
                product?.images.map((image, index) => (
                  <div key={index} className="col l-3 mt-1">
                    <img src={image.url} alt="" />
                  </div>
                ))}
            </div>
            <div className="mt-2">
              <div className="group-btn">
                <strong>
                  <Link to={`/admin/update-product/${product?._id}`}>
                    Sửa sản phẩm
                  </Link>
                </strong>
                <Button
                  startIcon={<KeyboardBackspaceIcon />}
                  onClick={backProdPage}
                  size="medium"
                >
                  Trở về
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default DetailProduct;
