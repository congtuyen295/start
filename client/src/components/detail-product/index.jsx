import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { ProductService } from "../../services/product-service";
import Breadcrumb from "../BreadCrumb";
import TabProduct from "./TabProduct";
import "./style.scss";
import Comment from "./Comment";
import { addCart } from "../../redux/cartSlice";
import ListPorducts from "./ListPorducts";

const Detail = () => {
  const [product, setProduct] = useState(null);
  const [numberProd, setNumberProd] = useState(1);
  const [cart, setCart] = useState(null);
  const [call, setCall] = useState(false);
  const dispatch = useDispatch();
  const prams = useParams();
  const alert = useAlert();

  const rate = product?.ratings / product?.numOfReviews;
  const formatter = new Intl.NumberFormat("vn");
  const productService = new ProductService();

  useEffect(() => {
    const getProduct = async () => {
      const res = await productService.getProductById({ id: prams.id });
      setProduct(res.product);
      setCart(
        JSON.parse(localStorage.getItem("cart"))?.find(
          (item) => item.product._id === res?.product?._id
        ) || {}
      );
    };
    getProduct();
  }, [prams.id, call]);
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={product?.images[i]?.url} alt="" />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleAddCart = () => {
    if (numberProd + cart.quantity > product?.quantity) {
      alert.error("Số lượng trong giỏ hàng đã đầy");
      return;
    }
    dispatch(
      addCart({
        product: {
          ...product,
        },
        quantity: numberProd,
      })
    );
    setCall(!call);
    setNumberProd(1);
    alert.success("Thêm thành công !");
  };
  const showprice = product?.discount!==0 ? product?.price - product?.price*product?.discount/100: product?.price;
  return (
    <>
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb value={product?.name} />
      </div>
      <section className="detail-products">
        <div className="grid wide">
          <div className="row">
            <div className="col c-12 l-9">
              {product && (
                <>
                  <div className="row">
                    <div className="product-images col l-5 m-12 c-12">
                      <Slider {...settings}>
                        <div>
                          <img src={product?.images[0]?.url} alt="" />
                        </div>
                        <div>
                          <img src={product?.images[1]?.url} alt="" />
                        </div>
                        <div>
                          <img src={product?.images[2]?.url} alt="" />
                        </div>
                        <div>
                          <img src={product?.images[3]?.url} alt="" />
                        </div>
                      </Slider>
                    </div>
                    <div className="detail-prod col l-7 m-12 c-12">
                      <h1 className="title-product">{product?.name}</h1>
                      <div className="review-result">
                        <Rating name="read-only" value={rate} readOnly />
                        {product.numOfReviews === 0 && (
                          <span className="total-review">
                            Hãy là người đầu tiên đánh giá sản phẩm!
                          </span>
                        )}
                        {product.numOfReviews !== 0 && (
                          <span className="total-review">
                            Xem {product.numOfReviews} đánh giá
                          </span>
                        )}
                      </div>
                      <div className="group-status">
                        <span className="first_status">
                          Thương hiệu:
                          <span className="status_name">
                            {" "}
                            {product?.nsx}
                          </span>
                        </span>
                        <span className="first_status">
                          &nbsp;|&nbsp;Tình trạng:
                          <span className="status_name">
                            <span>
                              {product?.quantity === +0
                                ? " Hết hàng"
                                : " Còn hàng"}
                            </span>
                          </span>
                        </span>
                      </div>
                      <div className="price-box">
                        <span className="special-price">
                          <span>{formatter.format(showprice)} ₫</span>
                        </span>
                        <span className="old-price">
                          <del>{product?.discount!==0 && formatter.format(product?.price) }</del>
                        </span>
                      </div>
                      <div className="product-summary">
                        <div className="description">
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                        </div>
                      </div>
                      <form>
                        <div className="form_product_content ">
                          <div className="soluong">
                            <div className="label_sl">
                              Số lượng: {product?.quantity}
                            </div>
                            <div className="custom ">
                              <button
                                type="button"
                                onClick={() =>
                                  setNumberProd((num) => {
                                    if (num > 1) {
                                      return num - 1;
                                    }
                                    return num;
                                  })
                                }
                              >
                                -
                              </button>
                              <input type="text" value={numberProd} disabled />
                              <button
                                type="button"
                                onClick={() =>
                                  setNumberProd((num) => {
                                    if (
                                      num + (cart.quantity || 0) <
                                      product?.quantity
                                    ) {
                                      return num + 1;
                                    } else {
                                      alert.error(
                                        "Số lượng sản phẩm này đã tối đa trong giỏ hàng!"
                                      );
                                      return num;
                                    }
                                  })
                                }
                              >
                                +
                              </button>
                            </div>
                            <div className="button_actions">
                              <button
                                className="btn_call"
                                type="button"
                                onClick={handleAddCart}
                              >
                                <span className="text_1">
                                  THÊM VÀO GIỎ HÀNG
                                </span>
                                <span className="text_2">
                                  Vui lòng gọi ngay 0397209076
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row mt-4 mb-4">
                    <div className="col c-12">
                      <TabProduct product={product} />
                    </div>
                  </div>
                  <div className="row mt-4 mb-4">
                    <div className="col c-12">
                      <Comment values={{ call, setCall }} />
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="col c-0 m-0 l-3">
              <ListPorducts category={product?.category} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detail;
