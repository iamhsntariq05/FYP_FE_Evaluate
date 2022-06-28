import React, { useState } from "react";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { Fab } from "@mui/material";
import { CustomTypography } from "src/components/base/CustomTypography";
import { useStyles } from "./styles";

const Step1 = () => {
  const classes = useStyles();

  const [file, setFile] = useState<any>(null);

  const handleUploadClick = (event: any) => {
    const fl = event.target.files[0];
    setFile(fl);
  };
  return (
    <div className={classes.step1Container}>
      <CustomTypography variant="h5" component="h6" text="Upload Your Document to Scan" />
      <div className={classes.upload}>
        <input
          accept="application/pdf,application/msword,
            application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className={classes.input}
          id="contained-button-file"
          type="file"
          onChange={handleUploadClick}
        />
        <label htmlFor="contained-button-file">
          <Fab component="span" className={classes.button}>
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
      </div>
      <span className={classes.showFile}>{file && file?.name}</span>
    </div>
  );
};

export default Step1;
