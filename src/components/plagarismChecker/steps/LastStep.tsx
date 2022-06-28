import React from "react";
import Confetti from "react-confetti";
import { CustomTypography } from "src/components/base/CustomTypography";
import { useStyles } from "./styles";

const LastStep = () => {
  const sgColors = [
    "#9ce8c2",
    "#60d399",
    "#b9e2fe",
    "#4fb3f6",
    "#bdc7fb",
    "#6d83f3",
    "#ff7968",
    "#ffe8e5",
    "#fedd8e",
    "#fbbe2e",
  ];
  const classes = useStyles();

  return (
    <div className={classes.step2Container}>
      <Confetti className="canvas" colors={sgColors} numberOfPieces={200} gravity={0.17} />
      <CustomTypography
        variant="h5"
        component="h6"
        text="Congratulations! You document is free from plagiarism."
      />
    </div>
  );
};

export default LastStep;
