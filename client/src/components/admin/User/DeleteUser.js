import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import { useAlert } from "react-alert";
import { UserServices } from "../../../services/user-service";
import { OrderService } from "../../../services/order-service";

export default function DeleteUser({ values }) {
  const { call, setCall, id } = values;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const alert = useAlert();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const userServices = new UserServices();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteUser = async () => {
    try {
      await userServices.deleteUser(id);
      setCall(!call);
      handleClose();
      alert.success("Xóa thành công!");
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
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Xóa tài khoản</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn có muốn xóa tài khoản này?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Hủy
          </Button>
          <Button onClick={handleDeleteUser}>Đồng ý</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
