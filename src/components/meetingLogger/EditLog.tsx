import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";
import { DialogContentText, TextField, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { CustomButton } from "../base/CustomButton";
import { CustomTypography } from "../base/CustomTypography";
import Rows from "./data.json";

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function EditLog({
  open,
  handleClose,
  details,
  handleUpdate,
  evalues,
  handleChangeEdit,
}: any) {
  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        // scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        {/* <DialogTitle id="scroll-dialog-title">{details ? details.title : ""}</DialogTitle> */}

        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div>
              <TextField
                margin="dense"
                id="name"
                label="Log Title"
                type="text"
                fullWidth
                variant="standard"
                // defaultValue={details ? details.title : ""}
                value={evalues.title}
                onChange={handleChangeEdit("title")}
              />
            </div>
          </DialogContentText>
          <DialogContentText
            id="scroll-dialog-description"
            // ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div>
              <TextField
                margin="dense"
                id="name"
                label="Log Details"
                type="text"
                fullWidth
                variant="standard"
                // defaultValue={details ? details.message : ""}
                value={evalues.message}
                onChange={handleChangeEdit("message")}
              />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton text="Close" handleClick={handleClose} loading={false} />
          <CustomButton
            text="Update"
            handleClick={() => {
              handleUpdate();
              handleClose();
            }}
            loading={false}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
