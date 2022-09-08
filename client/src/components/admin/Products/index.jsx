import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ProductService } from "../../../services/product-service";
import Loading from "../../common/Loading";
import DeleteProduct from "./DeleteProduct";

import "./style.scss";

const columns = [
  { id: "name", label: "Tên sản phẩm", minWidth: 200 },
  { id: "category", label: "Danh mục sản phẩm", minWidth: 150 },
  { id: "nsx", label: "Thương hiệu", minWidth: 150 },
  {
    id: "price",
    label: "Giá \u00a0(vnđ)",
    minWidth: 100,
    // align: "right",
    format: (value) => value.toFixed(2),
  },
];

export default function StickyHeadTable() {
  const [prods, setProds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const [call, setCall] = useState(true);
  const formatter = new Intl.NumberFormat("vn");

  const productService = new ProductService();
  const getProducts = async (name) => {
    const res = await productService.searchProducts({ name: name });
    setProds(res.products);
  };
  useEffect(() => {
    const name = new URLSearchParams(search).get("query") || "";
    getProducts(name);
  }, [search]);
  //default
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    
    const getProducts = async (name) => {
      setIsLoading(true);
      const res = await productService.searchProducts("");
      setIsLoading(false);
      setProds(res.products);
    };
    getProducts();
  }, [call]);

  const rows = prods?.map((prod) =>
  { const ShowPrice = prod.discount ? prod.price - prod.price*prod.discount/100: prod.price
    return {
    id: prod._id,
    name: prod.name,
    category: prod.category,
    nsx: prod?.nsx,
    price: formatter.format(ShowPrice) + "₫"
    }
  }
);

  // default
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
        {isLoading && <Loading values={isLoading} />}
        <Link className="add-product_icon" to="/admin/products/addproduct">
          Thêm sản phẩm
        </Link>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
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
                          <>
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          </>
                        );
                      })}
                      <TableCell align="center" style={{ width: "120px" }}>
                        <Tooltip title="Sửa">
                          <Button color="secondary">
                            <Link to={`/admin/update-product/${row.id}`}>
                              <i className="fa-solid fa-pen"></i>
                            </Link>
                          </Button>
                        </Tooltip>
                        <Tooltip title="Xóa">
                          <DeleteProduct
                            values={{ call, setCall, id: row.id }}
                          />
                        </Tooltip>
                        <Tooltip title="Xem chi tiết">
                          <Button color="success">
                            <Link to={`/admin/detail-product/${row.id}`}>
                              <i className="fa-solid fa-eye"></i>
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
