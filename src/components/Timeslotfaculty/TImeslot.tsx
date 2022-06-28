import React from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import { Grid, TextField } from "@mui/material";

export const timeslot = () => {
  return (
    <Grid container spacing={2} style={{ margin: "auto", maxWidth: 800 }}>
      <Grid item xs={12} sm={12}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            label="Time"
            value={""}
            onChange={(e: any) => e.target}
            renderInput={(params: any) => <TextField fullWidth {...params} />}
          />
          {/* <DateTimePicker
            renderInput={(props: any) => <TextField fullWidth {...props} />}
            label="Time slot"
            value={""}
            onChange={(e: any) => e.target}
          /> */}
        </LocalizationProvider>
      </Grid>
    </Grid>
  );
};
