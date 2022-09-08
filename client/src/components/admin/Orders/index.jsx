import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { OrderService } from "../../../services/order-service";
import moment from "moment";
import "moment/locale/vi";
import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import UpdateStatus from "./UpdateStatus";
import DeleteOrders from "./DeleteOrders";

export default function Orders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orders, setOrder] = React.useState();
  const [call, setCall] = React.useState(false);
  const formatter = new Intl.NumberFormat("vn");

  const orderServices = new OrderService();

  React.useEffect(() => {
    const getOrders = async () => {
      const res = await orderServices.getAllOrders();
      setOrder(res.orders);
    };
    getOrders();
  }, [call]);
  const rows =
    orders?.map((order) =>
      createData(
        order._id,
        order?.name || order?.id_user?.name,
        order.address || order.id_user.address,
        formatter.format(order.totalSum) + "₫",
        status[order.status_order],
        order.status_order,
        order.message
      )
    ) || [];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column._id}
                    align={column.align}
                    style={{ width: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="center" style={{ width: "120px" }}>
                  Thao tác
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                      <TableCell
                        className="group-btn_action"
                        align="center"
                        style={{ width: "120px" }}
                      >
                        <UpdateStatus values={{ row, call, setCall }} />
                        <DeleteOrders values={{ call, setCall, id: row.id }} />
                        <Tooltip title="Chi tiết đơn hàng">
                          <Button color="secondary">
                            <Link to={`/admin/detail-orders/${row.id}`}>
                              <i class="fa-solid fa-eye"></i>
                            </Link>
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

const columns = [
  { id: "id", label: "Mã đơn hàng", minWidth: 100 },
  { id: "nameUser", label: "Tên người dùng", minWidth: 100 },
  { id: "total", label: "Tổng tiền", minWidth: 100 },
  { id: "statusOrder", label: "Trạng thái", minWidth: 100 },
  { id: "message", label: "Ghi chú", minWidth: 100 },
];

function createData(
  id,
  nameUser,
  address,
  total,
  statusOrder,
  status,
  message
) {
  return {
    id,
    nameUser,
    address,
    total,
    statusOrder,
    status,
    message,
  };
}
const statusOrder = ["Nhận hàng thanh toán", "Thanh toán qua ngân hàng"];
const status = ["Đang xử lý", "Đã hủy", "Đang giao hàng", "Thành công"];
