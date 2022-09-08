import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Tooltip } from "@mui/material";
import { OrderService } from "../../services/order-service";

export default function CancelOrders({ values }) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { id, call, setCall } = values;
  const orderServices = new OrderService();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelOrders = async() => {
    try {
      const res = await orderServices.cancelOrders({
        id,
        message,
      });
      console.log(res);
      values.setCall(!values.call);
      setCall(!call)
      setOpen(false);
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <Tooltip title="Hủy hàng">
        <Button onClick={handleClickOpen}>
          <i className="fa-solid fa-x"></i>
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận hủy đơn hàng</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Lý do hủy hàng"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={(e)=>{setMessage(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleCancelOrders}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
