import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { OrderService } from "../../../services/order-service";
import { useAlert } from "react-alert";
import { Tooltip } from "@mui/material";

export default function DeleteOrders({ values }) {
  const [open, setOpen] = React.useState(false);
  const { id, call, setCall } = values;
  const theme = useTheme();
  const alert = useAlert();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const orderServices = new OrderService();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteOrder = async () => {
    await orderServices.deleteOrder(id);
    setCall(!call);
    handleClose();
    alert.success("Xóa thành công!");
  };
  return (
    <>
      <Tooltip title="Xóa">
        <Button color="error" onClick={handleClickOpen}>
          <i className="fa-solid fa-trash-can"></i>
        </Button>
      </Tooltip>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Xóa đơn hàng</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa đơn hàng này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Hủy
          </Button>
          <Button onClick={handleDeleteOrder}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
