import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { OrderService } from "../../services/order-service";
import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import "./style.scss";
import DeleteOrders from "./DeleteOrders";
import CancelOrders from "./CancelOrders";

function createData(
  id,
  donHang,
  ngay,
  diaChi,
  giaTri,
  trangThai,
  check,
  ghiChu
) {
  return { id, donHang, ngay, diaChi, giaTri, trangThai, check, ghiChu };
}

const statusOrder = ["Nhận hàng thanh toán"];
const status = ["Đang xử lý", "Đã hủy", "Đang giao hàng", "Thành công"];

export default function TableCart() {
  const { user } = useSelector((state) => state.auth);
  const [call, setCall] = useState(true);
  const [orders, setOrder] = useState();
  const formatter = new Intl.NumberFormat("vn");

  const orderServices = new OrderService();
  useEffect(() => {
    const getOrders = async () => {
      const res = await orderServices.getOrders(user._id);
      setOrder(res.orders);
    };
    getOrders();
  }, [call]);

  const rows =
    orders?.map((order) =>
      createData(
        order._id,
        order.cart[0].id_product?.name,
        moment(order?.createdAt).calendar(),
        order?.address || order?.id_user?.address,
        order.totalSum,
        status[order.status_order],
        order.status_order,
        order.note
      )
    ) || [];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Đơn hàng</TableCell>
            <TableCell align="left">Ngày</TableCell>
            {/* <TableCell align="left">Địa chỉ</TableCell> */}
            <TableCell align="center">Giá trị đơn hàng</TableCell>
            <TableCell align="left">Trạng thái</TableCell>
            <TableCell align="left">Ghi chú</TableCell>
            <TableCell align="center">Thao tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              className="p-relative"
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.ngay}</TableCell>
              {/* <TableCell align="left">{row.diaChi}</TableCell> */}
              <TableCell align="center">
                {formatter.format(row.giaTri)}đ
              </TableCell>
              <TableCell align="left">{row.trangThai}</TableCell>
              <TableCell align="left">{row.ghiChu}</TableCell>
              <TableCell
                align="center"
                className="d-flex justify-content-center align-center"
              >
                {row.check !== 1 && row.check !== 3 && (
                  <CancelOrders values={{ call, setCall, id: row.id }} />
                )}
                <DeleteOrders values={{ call, setCall, id: row.id }} />
                <Tooltip title="Chi tiết đơn hàng">
                  <Button color="secondary">
                    <Link to={`/detail-orders/${row.id}`}>
                      <i className="fa-solid fa-eye"></i>
                    </Link>
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan="7" align="center">
                Chưa có sản phẩm nào được mua!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
