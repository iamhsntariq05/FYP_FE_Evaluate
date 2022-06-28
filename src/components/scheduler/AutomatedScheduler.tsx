import React from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Grid, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import XLSX from "xlsx";
import { CustomButton } from "../base/CustomButton";
import { CustomTypography } from "../base/CustomTypography";

export const AutomatedScheduler = () => {
  const [values, setValues] = React.useState<any>({
    startDate: new Date(),
    timeSlot: 0,
  });
  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const baseURL = "http://localhost:8000/api";
  const token = localStorage.getItem("token");

  const handleAssignProjects = async () => {
    await axios.patch(
      `${baseURL}/scheduler/assign-groups`,
      {
        values,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  return (
    <div>
      <Grid
        container
        spacing={2}
        style={{
          margin: "auto",
          marginTop: "5em",
          maxWidth: 800,
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={12}>
          <CustomTypography text="Assign Projects to Teams" variant="h5" component="h3" />
          <br />
          <CustomTypography
            text="Automated Scheduling; process to assign projects to teams in free slots"
            variant="subtitle"
            component="subtitle"
          />
          <br />
          <br />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField fullWidth {...props} />}
              label="DateTimePicker"
              value={values.startDate}
              onChange={handleChange("startDate")}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            label="Time slot"
            type="number"
            id="filled-start-adornment"
            value={values.timeSlot}
            onChange={handleChange("timeSlot")}
            InputProps={{
              inputMode: "numeric",
              endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <CustomButton
            loading={false}
            handleClick={handleAssignProjects}
            text="Assign Projects"
            fullWidth={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};
