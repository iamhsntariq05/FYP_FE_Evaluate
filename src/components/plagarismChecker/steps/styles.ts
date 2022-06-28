import { blue } from "@mui/material/colors";
import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // step1
    mainContainer: {
      padding: "5rem",
      height: "50vh",
    },
    step1Container: {
      display: "flex",
      flexDirection: "row",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      display: "none",
    },
    button: {
      color: blue[900],
      margin: 10,
    },
    upload: {
      marginLeft: "3em",
    },
    showFile: {
      justifyContent: "center",
      marginTop: "1em",
      color: blue[900],
    },
    // step2
    step2Container: {
      display: "flex",
      flexDirection: "row",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    // card
    card: {
      width: 220,
      height: 220,
      textAlign: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    // step3
    step3Container: {
      display: "flex",
      flexDirection: "row",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "2rem",
    },
  })
);
