import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Loading from "../../common/Loading";
import moment from "moment";
import "moment/locale/vi";
import AddCategory from "./AddCategory";
import UpdateCategory from "./UpdateCategory";
import DeleteCategory from "./DeleteCategory";
import { CategoryService } from "../../../services/category-service";
import EditIcon from '@mui/icons-material/Edit';
import "./style.scss";
import { Button } from "antd";

const columns = [
  { id: "name", label: "Danh mục sản phẩm", minWidth: 250 },
  { id: "createdAt", label: "Ngày tạo", minWidth: 250 },
  { id: "updatedAt", label: "Chỉnh sửa gần nhất", minWidth: 250 },
  { id: "subCategories", label: "Nhà sản xuất", minWidth: 250 },
];

function createData(id, name, createdAt, updatedAt,subCategories) {
  return {
    id,
    name,
    createdAt,
    updatedAt,
    subCategories: subCategories.reduce((pre,item)=>{
      return pre +=  item.name + " ";
    }, "")
  };
}

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [idDelete, setIdDelete] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [call, setCall] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [openAdd,setOpenAdd] = useState(false);
  const [openEdit,setOpenEdit] = useState(false);
  const categoryService = new CategoryService();
  const [idEdit,setIdEdit] = useState(null);
  //default
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const getCategories = async (name) => {
      setIsLoading(true);
      const res = await categoryService.getCategory();
      setIsLoading(false);
      setCategories(res);
    };
    getCategories();
  }, [call]);

  const rows = categories?.map((cate) =>
    createData(
      cate._id,
      cate.name,
      moment(cate?.createdAt).calendar(),
      moment(cate?.updatedAt).fromNow(),
      cate.subCategories  
    )
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
      {isLoading && <Loading values={isLoading} />}

      <div className="categoriesAd">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <a onClick={()=>setOpenAdd(true)} className="add-product_icon" style={{margin: 16}}>Thêm Danh Mục</a>
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
                  <TableCell align="center" style={{ width: "150px" }}>
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
                        <TableCell
                          className="group-btn_action"
                          align="center"
                          style={{ width: "150px" }}
                        >
                          
                          <EditIcon onClick = {()=>{
                            setIdEdit(row.id);
                            setOpenEdit(true);
                          }}/>
                          
                          <DeleteCategory
                            values={{ call, setCall, id: row.id }}
                          />
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
      </div>
      {openAdd && <AddCategory values ={{openAdd, setOpenAdd, call, setCall}} />}
      {openEdit &&   <UpdateCategory
                            values={{ openEdit, call, setCall, setOpenEdit }}
                           
                            id = {idEdit}
/>}
    </>
  );
};

export default Categories;
