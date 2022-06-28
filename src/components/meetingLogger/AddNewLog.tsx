import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AlertColor, Paper, TextField, Tooltip } from "@mui/material";
import { CustomInput } from "../base/CustomInput";
import { groupSelector } from "src/features/groups/groupSlice";
import { createGroup } from "src/features/groups/groupActions";
import CustomSnackbar from "../base/CustomSnackbar";
import { CustomTypography } from "../base/CustomTypography";
import { CustomButton } from "../base/CustomButton";
import { createMeeting } from "src/features/meeting/meetingActions";

interface State {
  Logtitle: string;
  RecordedTime: string;
  Message: string;
}

const AddNewLog = () => {
  const [values, setValues] = React.useState({
    Logtitle: "",
    RecordedTime: "",
    Message: "",
  });
  // useDispatch in case of calling an API
  const dispatch = useDispatch();

  // useSelector to get any state in the store
  const { groupsSuccessful, groupsFailed, groups, groupCreateFailed, groupCreateSuccessful } =
    useSelector(groupSelector);
  const [opens, setOpenS] = useState(false);
  const [applyType, setApplyType] = useState<AlertColor | undefined>("success");
  const [errorType, setErrorType] = useState<AlertColor | undefined>("error");

  const createNewLog = async () => {
    try {
      // pass the function in dispatch
      await dispatch(
        createMeeting({
          title: values.Logtitle,
          recordedTime: values.RecordedTime,
          message: values.Message,
          studentId: localStorage.getItem("id"),
          addDate: new Date(),
        })
      );

      console.log(meetingCreateSuccessful);

      setOpenS(true);
    } catch (er) {
      setOpenS(true);

      <CustomSnackbar
        message={"An error occured."}
        open={opens}
        vertical="bottom"
        horizontal="center"
        handleClose={() => setOpenS(false)}
        type={errorType}
      />;
    }
  };

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  return (
    <div>
      <Paper>
        <div style={{ padding: 10 }}>
          <CustomTypography text="Enter Log Details" variant="h5" component="h5" />
        </div>
        <br />

        <div>
          <TextField
            style={{ padding: 10 }}
            value={values.Logtitle}
            onChange={handleChange("Logtitle")}
            id="logName"
            label="Log Title"
            placeholder="e.g. Front end meet 2.0"
            multiline
            fullWidth
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            style={{ padding: 10 }}
            value={values.RecordedTime}
            onChange={handleChange("RecordedTime")}
            id="recordedTime"
            label="Recorded Time"
            placeholder="e.g. 15 min."
            multiline
            fullWidth
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            style={{ padding: 10 }}
            value={values.Message}
            onChange={handleChange("Message")}
            id="logDetails"
            label="Details."
            placeholder="e.g.Today professor and we had a meeting on front end of our application......."
            multiline
            fullWidth
            variant="outlined"
          />
        </div>
        <div style={{ padding: 10, display: "flex", flexDirection: "row" }}>
          <CustomButton text="Create" loading={false} handleClick={createNewLog} />
        </div>
      </Paper>
      <CustomSnackbar
        message={"Meeting is Logged."}
        open={opens}
        vertical="bottom"
        horizontal="center"
        handleClose={() => setOpenS(false)}
        type={"success"}
      />
    </div>
  );
};

export default AddNewLog;
function meetingCreateSuccessful(meetingCreateSuccessful: any) {
  throw new Error("Function not implemented.");
}

function meetingCreateFailed(meetingCreateFailed: any) {
  throw new Error("Function not implemented.");
}
