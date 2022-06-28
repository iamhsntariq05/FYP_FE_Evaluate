import { Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AlarmIcon from "@mui/icons-material/Alarm";

const Clock = (props: { deadline: any }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const getTimeUntil = (deadline: any) => {
    const time = Date.parse(deadline) - Date.parse(new Date().toString());
    setSeconds(Math.floor((time / 1000) % 60));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
  };

  useEffect(() => {
    getTimeUntil(props.deadline);
  });

  useEffect(() => {
    setInterval(() => getTimeUntil(props.deadline), 1000);
  }, [props.deadline]);

  const leading0 = (num: any) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
      <AlarmIcon style={{ paddingTop: 4, marginRight: "0.5em" }} color="primary" fontSize="large" />

      <div>
        <Typography style={{ fontSize: 34 }}>{`${leading0(days)} days  ::__  `} </Typography>
      </div>
      <div style={{ fontSize: 34 }}>
        <Typography style={{ fontSize: 34 }}>{`${leading0(hours)} \t hours :__ `}</Typography>
      </div>
      <div style={{ fontSize: 34 }}>
        <Typography style={{ fontSize: 34 }}>{`${leading0(minutes)}  minutes :__`}</Typography>
      </div>
      <div style={{ fontSize: 34 }}>
        <Typography style={{ fontSize: 34 }}>{`${leading0(seconds)}  seconds`}</Typography>
      </div>
    </div>
  );
};

export default Clock;
