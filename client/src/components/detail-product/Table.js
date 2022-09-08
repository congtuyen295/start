import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./style.scss";

function createData(dv, thongSo) {
  return { dv, thongSo };
}



export default function Tables({product}) {
  const rows = [
    createData(
      "Nhà sản xuất", product.category
    ),
    createData(
      "Hệ điều hành", product.operatingSystem
    ),
    createData(
      "CPU", product.cpu
    ),
    createData(
      "Card VGA", product.vga
    ),
    createData(
      "Memory", product.ram
    ),
    createData(
      "Ổ cứng", product.hardDrive
    ),
    createData(
      "Màn hình", product.screen
    ),
    createData(
      "Màu sắc", product.color
    ),
    createData(
      "Webcam", product.webcam
    ),
    createData(
      "Pin", product.pin + " Wh"
    ),
    createData(
      "Trọng lượng", product.weight + " kg"
    ),
    createData(
      "Kích thước", product.size + " mm"
    ),
    createData(
      "Bảo hành", "1 năm"
    ),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{width: "40%"}} align="right">{row.dv}</TableCell>
              <TableCell sx={{width: "60%"}} align="left">{row.thongSo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
