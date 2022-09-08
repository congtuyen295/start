import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { UserServices } from "../../../services/user-service";
import DeleteUser from "./DeleteUser";

const columns = [
  { id: "avatar", label: "avatar", minWidth: 50, align: "center" },
  { id: "name", label: "Tên người dùng", minWidth: 80 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "address", label: "Địa chỉ", minWidth: 120 },
  { id: "phone", label: "Điện thoại", minWidth: 100 },
  { id: "labelRole", label: "Quyền truy cập", minWidth: 80, align: "center" },
];

function createData(id, avatar, name, email, address, phone, role, labelRole) {
  return { id, avatar, name, email, address, phone, role, labelRole };
}

const label = ["user", "admin"];

export default function UserManagement() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState();
  const [call, setCall] = useState(false);

  const userServices = new UserServices();

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await userServices.getUsersAllInfo();
        setUsers(res);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, [call]);
  const rows =
    users?.map((user) =>
      createData(
        user._id,
        user.avatar,
        user.name,
        user.email,
        user.address,
        user.phone,
        user.role,
        label[user.role]
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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column._id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="center" style={{ width: "50px" }}>
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column, index) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {index === 0 ? (
                            <img className="rounded w-7" src={value} alt="" />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <DeleteUser values={{call, setCall, id: row.id}}/>
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
  );
}
