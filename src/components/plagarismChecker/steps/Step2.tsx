/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import { Fab } from "@mui/material";
import { CustomTypography } from "src/components/base/CustomTypography";
import file from "../../../result.json";
import { useStyles } from "./styles";

const Step2 = () => {
  const classes = useStyles();
  const handleDownload = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(file))}`;
    const dlAnchorElem: any = document.getElementById("downloadAnchorElem");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "result.json");
    dlAnchorElem.click();
  };

  return (
    <div className={classes.step2Container}>
      <CustomTypography variant="h5" component="h6" text="Download Scanned Document Report" />
      <div className={classes.upload}>
        {/* @ts-ignore */}
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
        <a id="downloadAnchorElem" style={{ display: "none" }}></a>
        <label htmlFor="downloadAnchorElem">
          <Fab component="span" className={classes.button} onClick={handleDownload}>
            <DownloadIcon />
          </Fab>
        </label>
      </div>
    </div>
  );
};

export default Step2;
