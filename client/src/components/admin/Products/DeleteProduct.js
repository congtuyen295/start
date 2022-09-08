import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAlert } from "react-alert";
import { ProductService } from "../../../services/product-service";

export default function DeleteProduct({ values }) {
  const { id, call, setCall } = values;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const alert = useAlert();

  const productService = new ProductService();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProduct = async () => {
    try {
      await productService.deleteProduct(id);
      setCall(!call);
      handleClose();
      alert.success("Xóa thành công !");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button color="error" onClick={handleClickOpen}>
        <i className="fa-solid fa-trash-can"></i>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Xóa sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa sản phẩm đang chọn?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Hủy
          </Button>
          <Button onClick={handleDeleteProduct}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
