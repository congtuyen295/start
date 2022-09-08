import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteProduct from "./DeleteProduct";
import { Link } from "react-router-dom";
import { ProductService } from "../../../services/product-service";

import "./style.scss";

function createData(
  id,
  name,
  category,
  description,
  quantity,
  price_spe
) {
  return {
    id,
    name,
    category,
    description,
    quantity,
    price_spe,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Tên sản phẩm",
    minWidth: 350,
  },
  {
    id: "category",
    label: "Danh mục sản phẩm",
    numeric: false,
    disablePadding: false,
    minWidth: 150,
  },
  {
    id: "quantity",
    label: "Số lượng",
    numeric: false,
    disablePadding: false,
    minWidth: 150,
  },
  {
    id: "price",
    label: "Giá \u00a0(vnđ)",
    numeric: true,
    disablePadding: false,
    minWidth: 100,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" style={{ width: "120px" }}>
          Thao tác
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <Link className="add-product_icon" to="/admin/products/addproduct">
            Thêm sản phẩm
          </Link>
        </Typography>
      )}

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("category");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [prods, setProds] = React.useState([]);
  const formatter = new Intl.NumberFormat("vn");
  const { search } = useLocation();
  const [call, setCall] = React.useState(true);

  const productService = new ProductService();
  const getProducts = async (name) => {
    const res = await productService.searchProducts({ name: name });
    setProds(res.products);
  };

  React.useEffect(() => {
    const name = new URLSearchParams(search).get("query") || "";
    getProducts(name);
  }, [search]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const rows = prods?.map((prod) =>
  { const ShowPrice = prod.discount ? (prod.price - (prod.price*prod.discount/100)): prod.price;
    

    return {
    id: prod._id,
    name: prod.name,
    category: prod.category,
    nsx: prod?.nsx,
    quantity: prod?.quantity,
    price: formatter.format(ShowPrice) + "₫"
    }}
  );




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover tabIndex={-1} key={row._id}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      style={{ width: 300 }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left" style={{ width: 150 }}>
                      {row.category}
                    </TableCell>
                    <TableCell align="left" style={{ width: 80 }}>
                      {row.quantity}
                    </TableCell>
                    <TableCell align="right" style={{ width: 100 }}>
                      {row.price}
                    </TableCell>
                    <TableCell align="center" style={{ width: "120px" }}>
                      <Tooltip title="Sửa">
                        <Button color="secondary">
                          <Link to={`/admin/update-product/${row.id}`}>
                            <i className="fa-solid fa-pen"></i>
                          </Link>
                        </Button>
                      </Tooltip>
                      <Tooltip title="Xóa">
                        <DeleteProduct values={{ call, setCall, id: row.id }} />
                      </Tooltip>
                      {/* <Tooltip title="Xem chi tiết">
                        <Button color="success">
                          <Link to={`/admin/detail-product/${row.id}`}>
                            <i className="fa-solid fa-eye"></i>
                          </Link>
                        </Button>
                      </Tooltip> */}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
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
