import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PreviewIcon from "@mui/icons-material/Preview";
import { DialogContentText, TextField, Tooltip } from "@mui/material";
import { CustomTypography } from "../base/CustomTypography";
import Rows from "./data.json";
import { CustomButton } from "../base/CustomButton";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function LogDetails({ open, handleClose, details }: any) {
  // const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  // const descriptionElementRef = React.useRef<HTMLElement>(null);
  // React.useEffect(() => {
  //   if (open) {
  //     const { current: descriptionElement } = descriptionElementRef;
  //     if (descriptionElement !== null) {
  //       descriptionElement.focus();
  //     }
  //   }
  // }, [open]);

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      {/* <Tooltip title="View Log Details">
        <IconButton onClick={handleClickOpen}>
          <PreviewIcon />
        </IconButton>
      </Tooltip> */}
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{details ? details.title : ""}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div>
              <CustomTypography
                text={details ? details.message : ""}
                variant="body1"
                component={undefined}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton text="Close" handleClick={handleClose} loading={false} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
