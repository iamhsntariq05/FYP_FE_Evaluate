import * as React from "react";
import { Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const ProfileCard = ({ primaryText, secondaryText, imgSrc }: any) => {
  return (
    <Card sx={{ width: "300px", height: "200px" }}>
      <div style={{ justifyContent: "center", margin: "1em 7em" }}>
        <Avatar alt="Image" src={imgSrc} sx={{ width: 70, height: 70 }} />
      </div>
      <CardContent style={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div" style={{}}>
          {primaryText}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {secondaryText}
        </Typography>
      </CardContent>
    </Card>
  );
};
