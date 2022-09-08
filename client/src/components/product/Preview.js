import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import Slider from "react-slick";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { addCart } from "../../redux/cartSlice";

import "./preview.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Preview({ product }) {
  const [open, setOpen] = React.useState(false);
  const {discount,price} = product;
  const dispatch = useDispatch()
  const alert = useAlert();
  const formatter = new Intl.NumberFormat("vn");
  const showprice = discount!==0 ? price - price*discount/100 : price; 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //setting slide images
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

  const handleAddCart = ()=>{
    dispatch(
      addCart({
        product: {
          ...product,
        },
        quantity: 1,
      })
    );
    alert.success("Thêm vào giỏ hàng thành công !")
  }
  
  return (
    <>
      <button onClick={handleClickOpen}>
        <i className="fa fa-eye"></i>
      </button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent >
          {product && (
            <div className="container products-preview">
              <div className="row">
                <div className="product-images-prev col l-5">
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
                <div className="detail-prod-prev col l-7">
                  <h1 className="title-product">{product?.name}</h1>
                  <div className="group-status">
                    <span className="first_status">
                      Thương hiệu:
                      <span className="status_name">{product?.category}</span>
                    </span>
                    <span className="first_status">
                      &nbsp;|&nbsp; Tình trạng:
                      <span className="status_name">
                        <span>Còn hàng</span>
                      </span>
                    </span>
                  </div>
                  <div className="price-box">
                    <span className="special-price">
                      <span> {formatter.format(showprice)}₫</span>
                    </span>
                    <span className="old-price">
                      {discount && 
                      <del>{formatter.format(product?.price)}₫</del>
                      }
                    </span>
                  </div>
                  <div className="product-summary">
                    <div className="description">
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                  </div>
                  <div className="button_actions">
                    <button type="button" onClick={handleAddCart}>THÊM VÀO GIỎ HÀNG</button>
                  </div>
                </div>
              </div>
              <button
                className="btn-del-prev"
                type="button"
                onClick={handleClose}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
