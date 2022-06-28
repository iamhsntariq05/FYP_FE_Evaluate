import * as React from "react";
import { Alert, AlertColor } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

export interface State extends SnackbarOrigin {
  open: boolean;
}
interface ISnackbar {
  message: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  open: any;
  handleClose: any;
  type: AlertColor | undefined;
}
export default function CustomSnackbar({
  vertical,
  horizontal,
  open,
  handleClose,
  message,
  type,
}: ISnackbar) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        // message={message}
        key={vertical + horizontal}
        autoHideDuration={2000}
        style={{ textAlign: "center" }}
      >
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    </div>
  );
}
