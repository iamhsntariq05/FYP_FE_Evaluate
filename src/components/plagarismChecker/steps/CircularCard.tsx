import * as React from "react";
import DoneIcon from "@mui/icons-material/Done";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useStyles } from "./styles";

export const CircularCard = ({ title, value }: any) => {
  const classes = useStyles();
  return (
    <Card sx={{ borderRadius: "50%" }} className={classes.card}>
      <CardContent style={{ margin: "1.2em" }}>
        <div style={{ marginBottom: "1em" }}>
          <DoneIcon sx={{ fontSize: 60 }} fontSize="large" color="success" />
        </div>
        <Typography variant="subtitle1" component="h6">
          {title ? title : "None"}
        </Typography>
        <Typography variant="h5" component="h6">
          {value ? value : "0"} %
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
