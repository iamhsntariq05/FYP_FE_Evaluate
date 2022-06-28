import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { getAllFaculty } from "src/features/faculty/facultyActions";
import { facultySelector } from "src/features/faculty/facultySlice";
import { addStudents } from "src/features/facultyStudentRelationship/templateActions";
import { groupSelector } from "src/features/groups/groupSlice";
import { getAllStudentGroups, getAllStudents } from "src/features/student/studentActions";
import { studentSelector } from "src/features/student/studentSlice";
import { CustomAlert } from "../base/CustomAlert";
import { CustomButton } from "../base/CustomButton";

export const AddStudents = () => {
  const [flag, setFlag] = useState(0);
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const { studentsFailed, students } = useSelector(studentSelector);
  const { groups } = useSelector(groupSelector);

  const { faculties } = useSelector(facultySelector);
  const [delis, setDelis] = useState<any[]>([]);
  const [fac, setFaculties] = useState<any[]>([]);
  const [inputError, setInputError] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const [facId, setFac] = useState<any>("");
  useEffect(() => {
    const getStudentsGroups = async () => {
      try {
        // pass the function in dispatch
        await dispatch(getAllStudentGroups());
      } catch (er) {
        console.log(studentsFailed);
      }
    };
    const getFaculty = async () => {
      try {
        // pass the function in dispatch
        await dispatch(getAllFaculty());
      } catch (er) {}
    };
    getStudentsGroups();
    getFaculty();
  }, []);
  useEffect(() => {
    if (groups) {
      const st: any[] = groups.map(({ _id, name }) => {
        const id = _id;
        return {
          id,
          title: `${name}`,
        };
      });
      console.log(st);
      setDelis(st);
    }
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
  }, [faculties, groups]);

  const handleClick = async () => {
    try {
      if (data.length === 0) {
        setInputError("Invalid Fields!");
        return;
      }
      setInputError("");
      setFlag(1);
      const dataItem = data.map((item: any) => {
        return {
          faculty: facId,
          groups: item,
        };
      });
      await addStudents(dataItem);
      alert("Added successfully");
      console.log(flag);
    } catch (error) {}
  };
  const handleChangeDeliv = (value: any, e: any) => {
    setData(value.map((val: any) => val));
    console.warn("data check", data);
  };
  const handleChangeFac = (value: any, e: any) => {
    setFac(value.id);
  };
  return (
    <Grid container spacing={2} style={{ margin: "auto", maxWidth: 800 }}>
      {/* choose deliverable to upload template */}
      <Grid item xs={12} sm={12}>
        <Autocomplete
          fullWidth
          id="free-solo-demo"
          options={fac}
          getOptionLabel={(option) => option.title}
          onChange={(e: any, value: any) => handleChangeFac(value, e)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" fullWidth label="Select Faculties" />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Autocomplete
          fullWidth
          id="free-solo-demo"
          options={delis}
          getOptionLabel={(option) => option.title}
          multiple={true}
          onChange={(e: any, value: any) => handleChangeDeliv(value, e)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" fullWidth label="Select groups" />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <CustomButton
          loading={false}
          handleClick={handleClick}
          text="Add groups"
          fullWidth={true}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        {inputError && <CustomAlert type="error" content={inputError} />}
      </Grid>
    </Grid>
  );
};
