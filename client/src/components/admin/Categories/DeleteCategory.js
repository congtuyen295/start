import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Tooltip } from "@mui/material";
import { CategoryService } from "../../../services/category-service";
import { useAlert } from "react-alert";

export default function AlertDialog({ values }) {
  const { id, call, setCall } = values;
  const [open, setOpen] = React.useState(false);
  const alert = useAlert()
  const categoryService = new CategoryService();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCategory = async () => {
    try {
      await categoryService.deleteCategory(id);
      setCall(!call);
      handleClose();
      alert.success("Xóa thành công !")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip title="Xóa">
        <Button color="error" onClick={handleClickOpen}>
          <i className="fa-solid fa-trash-can"></i>
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa danh mục"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc xóa sản phẩm đang chọn không? Các product liên quan cũng
            sẽ bị xóa!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDeleteCategory} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
