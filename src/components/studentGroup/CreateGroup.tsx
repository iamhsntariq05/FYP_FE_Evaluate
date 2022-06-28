import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Tooltip,
  Zoom,
} from "@mui/material";
import { createGroup } from "src/features/groups/groupActions";
import { groupSelector } from "src/features/groups/groupSlice";
import { CustomInput } from "../base/CustomInput";
import { CustomTypography } from "../base/CustomTypography";

interface State {
  name: string;
}

const CreateGroup = ({ setOpenS, setType, setMessage }: any) => {
  // useDispatch in case of calling an API
  const dispatch = useDispatch();

  // useSelector to get any state in the store
  const { groupsSuccessful, groupsFailed, groups, groupCreateFailed, groupCreateSuccessful } =
    useSelector(groupSelector);

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const [values, setValues] = React.useState({
    name: "",
  });

  const [errors, setErrors] = React.useState<State>({
    name: "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
  };

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  function refreshPage() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.location.reload(false);
  }
  const createNewGroup = async () => {
    try {
      // pass the function in dispatch
      // console.log(values);
      const id = localStorage.getItem("id");
      setMessage("Group Created successfully!");
      setType("success");
      await dispatch(createGroup({ ...values, leaderId: id }));
      // console.log("Success", groupCreateSuccessful); ///this displays false for now hence the error.
      // alert("Group Made Successfully..!");
      refreshPage();
    } catch (er) {
      setType("error");
      setMessage("An Error Occured!");
      // console.log("fail g", groupCreateFailed);
    }
    handleClose();
    setOpenS(true);
  };

  return (
    <div>
      <CustomTypography variant="h5" component="h5" text="Currently you don't have any group!" />
      <Tooltip TransitionComponent={Zoom} title="Create a group for your FYP.">
        <Button
          variant="outlined"
          size="medium"
          onClick={handleClickOpen}
          startIcon={<AddCircleOutlineIcon />}
          style={{ margin: "1.5em 0" }}
        >
          Create Group
        </Button>
      </Tooltip>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Create your FYP Group</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div style={{ marginBlockEnd: "2rem" }}>
              <CustomInput
                value={values.name}
                handleChange={handleChange("name")}
                field="Title"
                type="name"
                error={errors.name}
                helperText={"e.g. cool Group Name"}
                black={true}
              />{" "}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createNewGroup}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateGroup;
