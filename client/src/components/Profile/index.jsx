import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { UserServices } from "../../services/user-service";
import { setUser } from "../../redux/authSlice";
import Breadcrumb from "../BreadCrumb";
import TableCart from "../table-cart";
import "./style.scss";

// import AlertConfirm from "../common/Alert"

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [avt, setAvt] = useState();
  const [username, setUsername] = useState(user);
  const { name, email, avatar, address, phone } = username;
  const [isChange, setIsChange] = useState(false);
  const alert = useAlert();

  const dispatch = useDispatch();
  const userServices = new UserServices();

  const changeNameUser = (e) => {
    setUsername((username) => ({
      ...username,
      name: e.target.value,
    }));
  };
  const changeAddressUser = (e) => {
    setUsername((username) => ({
      ...username,
      address: e.target.value,
    }));
  };
  const changePhoneUser = (e) => {
    setUsername((username) => ({
      ...username,
      phone: e.target.value,
    }));
  };
  const setIsChangeInfo = () => {
    setIsChange(true);
  };
  const handleChangeInfoUser = async (e) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    await userServices.updateUser({
      ...username,
      avatar: avt,
    });
    dispatch(
      setUser({
        ...username,
        avatar: avt,
      })
    );
    setIsChange(false);
    alert.success("Cập nhật thành công !")
    // setSuccess(true)
  };

  function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        return resolve({
          data: fileReader.result,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      };
      fileReader.readAsDataURL(file);
    });
  }

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    const img = await readAsDataURL(file);
    const url = await userServices.uploadAvatar({
      avatar: img.data,
    });
    setAvt(url.url);
  };

  return (
    <>
      <div className="grid wide pt-2 pb-2 mb-4 border-bottom">
        <Breadcrumb value="Thông tin cá nhân"/>
      </div>
      <section className="page_customer_account">
        <div className="grid wide">
          <div className="row">
            <div className="col l-9">
              <h1 className="title-head">
                <Link to="/account">Trang khách hàng</Link>
              </h1>
              <p className="name-account">
                <strong>
                  Xin chào,
                  <Link to="/account">{name}</Link>
                  &nbsp;!
                </strong>
              </p>
              <div className="table-cart">
                <TableCart />
              </div>
            </div>
            <div className="col l-3">
              <div className="block-account">
                <div className="block-avatar">
                  <img src={avt ? avt : avatar} alt="" />
                  {isChange && (
                    <input type="file" onChange={handleChangeImage} />
                  )}
                </div>
                <div className="block-content">
                  <p>
                    Tên tài khoản:{" "}
                    {isChange && (
                      <input
                        value={name}
                        type="text"
                        onChange={(e) => changeNameUser(e)}
                      />
                    )}
                    {!isChange && <span>{name}</span>}
                  </p>
                  <p>
                    Địa chỉ:{" "}
                    {isChange && (
                      <input
                        value={address}
                        placeholder="xã-huyện-tỉnh(thành phố)"
                        onChange={(e) => changeAddressUser(e)}
                      />
                    )}
                    {!isChange && <span>{address}</span>}
                  </p>
                  <p>
                    Điện thoại:{" "}
                    {isChange && (
                      <input
                        value={phone}
                        type="tel"
                        placeholder="xxx-xxx-xxxx"
                        onChange={(e) => changePhoneUser(e)}
                      />
                    )}
                    {!isChange && <span>{phone}</span>}
                  </p>
                  <p>
                    Email: <span>{email}</span>
                  </p>
                  <p>
                    {!isChange && (
                      <button type="submit" onClick={setIsChangeInfo}>
                        Sửa thông tin
                      </button>
                    )}
                    {isChange && (
                      <button
                        type="button"
                        onClick={(e) => handleChangeInfoUser(e)}
                      >
                        Lưu thông tin
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sửa thanh công */}
      {/* <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Cập nhật thành công!
        </Alert>
      </Snackbar> */}
    </>
  );
};

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default Profile;
