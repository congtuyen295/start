import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import moment from "moment";
import "moment/locale/vi";
import { TotalRevenue } from "./TotalRevenue";
import "./style.scss";
import { OrderService } from "../../../services/order-service";
import { ProductService } from "../../../services/product-service";
import { UserServices } from "../../../services/user-service";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Index = () => {
  const [orders, setOrders] = useState();
  const [orders2, setOrders2] = useState();
  const [countProducts, setCountProducts] = useState();
  const [countUsers, setCountUsers] = useState();
  const [call, setCall] = useState(true);
  const orderServices = new OrderService();
  const productService = new ProductService();
  const userServices = new UserServices();
  const formatter = new Intl.NumberFormat("vn");
  const [month, setMonth] = useState(moment(Date.now()).month() + 1);
  const [year, setYear] = useState(moment(Date.now()).year());
  const dayInMonth = moment(`${year}-${month}-01`).daysInMonth();
  const dateStart = `${year}-${month}-01`;
  const dateEnd = `${year}-${month}-${dayInMonth}`;
  const totalProductsSold = orders?.reduce((previousValue, currentValue) => {
    if (currentValue.status_order === 3)
      // 3 là đã giao+
      return previousValue + currentValue.totalSum;
    return previousValue;
  }, 0);
  const countProductsSold = orders?.reduce((previousValue, currentValue) => {
    if (currentValue.status_order === 3)
      // 3 là đã giao+
      return (previousValue = previousValue + 1);
    return previousValue;
  }, 0);

  let date1 = moment(dateStart, "YYYY-MM-DD");
  date1.format();
  let date2 = moment(dateEnd, "YYYY-MM-DD");
  date2.format();

  useEffect(() => {
    const getOrders = async () => {
      const res = await orderServices.getAllOrders();
      setOrders(res.orders);
    };
    getOrders();
  }, []);
  useEffect(() => {
    const getProducts = async () => {
      const res = await productService.getProducts();
      setCountProducts(res.count);
    };
    getProducts();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userServices.getUsersAllInfo();
      setCountUsers(res.length);
      // setCountProducts(res.count)
    };
    getUsers();
  }, []);

  useEffect(() => {
    const thongKe = async () => {
      const res = await orderServices.thongKe({
        dateStart: date1,
        dateEnd: date2,
      });
      setOrders2(res.orders);
    };
    thongKe();
  }, [call]);
  const handleChangeYear = (e) => {
    setYear(e.target.value);
    setCall(!call);
  };
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
    setCall(!call);
  };


  return (
    <div className="dashboard-container">
      <div className="row">
        <div className="col l-3 m-6 c-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="icon">
                <i className="fa-solid fa-sack-dollar"></i>
              </div>
              <div className="content">
                <h2 className="number">
                  {formatter.format(totalProductsSold)}₫
                </h2>
                <p className="sub-title">Tổng doanh thu</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col l-3  m-6 c-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="icon">
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
              <div className="content">
                <h2 className="number">{countProductsSold}</h2>
                <p className="sub-title">Số đơn hàng đã bán</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col l-3 m-6 c-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="icon">
                <i className="fa-brands fa-product-hunt"></i>
              </div>
              <div className="content">
                <h2 className="number">{countProducts}</h2>
                <p className="sub-title">Số sản phẩm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col l-3 m-6 c-12 mb-4">
          <div className="card">
            <div className="card-body">
              <div className="icon">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className="content">
                <h2 className="number">{countUsers}</h2>
                <p className="sub-title">Người dùng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Paper className="total-revenue">
        <div className="topbar">
          <h3>Doanh thu trong tháng {month}</h3>
          <div className="d-flex" style={{ alignItems: "center" }}>
            <FormControl
              variant="standard"
              fullWidth
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel>Tháng</InputLabel>
              <Select value={month} label="Age" onChange={handleChangeMonth}>
                <MenuItem value={1}>Tháng 1</MenuItem>
                <MenuItem value={2}>Tháng 2</MenuItem>
                <MenuItem value={3}>Tháng 3</MenuItem>
                <MenuItem value={4}>Tháng 4</MenuItem>
                <MenuItem value={5}>Tháng 5</MenuItem>
                <MenuItem value={6}>Tháng 6</MenuItem>
                <MenuItem value={7}>Tháng 7</MenuItem>
                <MenuItem value={8}>Tháng 8</MenuItem>
                <MenuItem value={9}>Tháng 9</MenuItem>
                <MenuItem value={10}>Tháng 10</MenuItem>
                <MenuItem value={11}>Tháng 11</MenuItem>
                <MenuItem value={12}>Tháng 12</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              fullWidth
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel>Năm</InputLabel>
              <Select value={year} label="Age" onChange={handleChangeYear}>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
              </Select>
            </FormControl>
            {/* <button onClick={handleSubmit}>Thống kê</button> */}
          </div>
        </div>

        <TotalRevenue values={{ dayInMonth, orders: orders2 }} />
      </Paper>
    </div>
  );
};

export default Index;
