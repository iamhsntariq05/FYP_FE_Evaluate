import React, { useState } from "react";
import style from "./MainClock.module.css";
import Clock from "./Clock";
import { Form, FormControl, Button } from "react-bootstrap";
import { Typography } from "@mui/material";

const App = () => {
  const [deadline, setDeadline] = useState("June 6, 2022");
  const [newDeadline, setNewDeadline] = useState("");

  const changeDeadline = () => {
    setDeadline(newDeadline);
  };

  return (
    <div style={{ textAlign: "center", fontSize: " 20px", marginTop: "1%" }}>
      <div>
        <Typography style={{ fontSize: "34px" }}>Countdown to Submission </Typography>
      </div>
      <Clock deadline={deadline} />
    </div>
  );
};

export default App;
