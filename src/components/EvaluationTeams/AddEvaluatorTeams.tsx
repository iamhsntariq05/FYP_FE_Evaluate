import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Autocomplete, Grid, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { getAllFaculty } from "src/features/faculty/facultyActions";
import { facultySelector } from "src/features/faculty/facultySlice";
import { CustomButton } from "../base/CustomButton";
import CustomSnackbar from "../base/CustomSnackbar";

export const AddEvaluatorTeam: React.FC<{ changeDeliverableTab: any }> = (props) => {
  const dispatch = useDispatch();
  const [opens, setOpenS] = useState(false);

  const { faculties } = useSelector(facultySelector);
  const [fac, setFaculties] = useState<any[]>([]);
  const [teams, setTeams] = React.useState<any>([{ team: [] }]);

  const [loader, setloader] = React.useState<boolean>(false);
  const [facId, setFac] = useState<any>("");
  const [State, setState] = useState<any>("");

  useEffect(() => {
    const getFaculty = async () => {
      try {
        // pass the function in dispatch
        await dispatch(getAllFaculty());
      } catch (er) {}
    };
    getFaculty();
  }, []);

  useEffect(() => {
    if (faculties) {
      const st: any[] = faculties.map(({ _id, email }) => {
        const id = _id;
        return {
          id,
          title: `${email}`,
        };
      });
      console.log(st);
      setFaculties(st);
    }
  }, [faculties]);

  const handleChangeTeams = (i: any, value: any) => {
    // console.log(t, i, e);
    const newFormValues = [...teams];
    newFormValues[i].team = value;
    setTeams(newFormValues);
  };

  const onChange = (duration: { hours: any; minutes: any }) => {
    const { hours, minutes } = duration;
    setState({ hours, minutes });
  };
  const handleChangeFac = (value: any, e: any) => {
    console.log(value);

    setFac(value.id);
  };

  const removeTeam = (i: number) => {
    const newFormValues = [...teams];
    newFormValues.splice(i, 1);
    setTeams(newFormValues);
  };
  const addTeam = () => {
    setTeams([...teams, { team: [] }]);
  };
  const baseURL = "http://localhost:8000/api";
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    await axios.post(
      `${baseURL}/scheduler/create/evaluator-teams`,
      {
        teams,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOpenS(true);
  };

  return (
    <Grid container spacing={2} style={{ margin: "auto", maxWidth: 800 }}>
      <Grid item xs={12} sm={12}>
        {teams.map((team: any, i: any) => {
          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid item xs={10} sm={10}>
                <Autocomplete
                  fullWidth
                  id="free-solo-demo"
                  options={fac}
                  multiple={true}
                  getOptionLabel={(option) => option.title}
                  onChange={(e: any, value: any) => {
                    handleChangeFac(value, e);
                    handleChangeTeams(i, value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth label="Select Faculties" />
                  )}
                />
              </Grid>
              <div style={{ padding: 0 }}>
                <CustomButton
                  text="Remove Team"
                  loading={false}
                  handleClick={() => removeTeam(i)}
                />
              </div>
            </div>
          );
        })}
        <div style={{ paddingTop: "2rem" }}>
          <CustomButton text="Add Team" loading={false} handleClick={addTeam} />
        </div>
      </Grid>
      <Grid item xs={6} sm={6}>
        <CustomButton
          loading={loader}
          handleClick={handleSubmit}
          text="Save Evaluator Teams"
          fullWidth={true}
        />
      </Grid>
      <CustomSnackbar
        message={"Evaluator Teams created successfully!"}
        open={opens}
        vertical="bottom"
        horizontal="center"
        handleClose={() => setOpenS(false)}
        type={"success"}
      />
    </Grid>
  );
};
