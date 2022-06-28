import React from "react";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface ButtonProps {
  loading: boolean;
  handleClick: any;
  text: string;
  fullWidth?: boolean;
  type?: string;
  buttonType?: "text" | "outlined" | "contained" | undefined;
}

export const CustomButton = (props: ButtonProps) => {
  const { loading, handleClick, text, fullWidth, type, buttonType } = props;
  console.log(buttonType);
  return (
    <Button
      style={{
        width: fullWidth ? "100%" : "auto",
        backgroundColor: buttonType === "outlined" ? "none" : "rgb(157 39 176)",
        color: "white",
      }}
      disabled={loading}
      variant={buttonType && buttonType}
      onClick={handleClick}
    >
      {text}
      {loading && <CircularProgress color="success" size={25} />}
    </Button>
  );
};
