import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { OrderService } from "../../../services/order-service";

export default function UpdateStatus({ values }) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState(values.row.status);
  const [note, setNote] = React.useState("");
  const id = values.row.id;
  const orderServices = new OrderService();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateStatus = async () => {
    try {
      await orderServices.updateStatus({
        id,
        status_order: status,
        note,
      });
      values.setCall(!values.call);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Tooltip title="Sửa trạng thái">
        <Button color="success" onClick={handleClickOpen}>
          <i className="fa-solid fa-pen"></i>
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Cập nhật trạng thái</DialogTitle>
        <DialogContent>
          <FormControl className="mt-1 mb-1" fullWidth variant="standard">
            <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={status}
              label="Age"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <MenuItem value={0}>Đang xử lý</MenuItem>
              <MenuItem value={1}>Hủy hàng</MenuItem>
              <MenuItem value={2}>Đang giao hàng</MenuItem>
              <MenuItem value={3}>Thành công</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            multiline
            rows={3}
            value={note}
            label="Note"
            type="email"
            onChange={(e) => {
              setNote(e.target.value);
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>HỦy</Button>
          <Button onClick={handleUpdateStatus}>Cập nhật</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
