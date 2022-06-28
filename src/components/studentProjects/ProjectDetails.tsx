import * as React from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import CloseIcon from "@mui/icons-material/Close";
import PreviewIcon from "@mui/icons-material/Preview";
import { AppBar, Box, Chip, DialogContentText, Tab, Tabs, TextField, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridApi,
  GridCell,
  GridCellParams,
  GridCellValue,
  GridColDef,
  GridRowId,
  GridValueGetterParams,
  useGridApiRef,
} from "@mui/x-data-grid";
import { getValue } from "@testing-library/user-event/dist/utils";
import { id } from "date-fns/locale";
import { getOneProject } from "src/features/projects/projectActions";
import { CustomButton } from "../base/CustomButton";
import { CustomTypography } from "../base/CustomTypography";
import Rows from "./data copy.json";

export interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function ProjectDetails({ curProject }: any) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [project, setProject] = React.useState<any>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const dispatch = useDispatch();
  useMemo(() => {
    /* TODO : get one project and display info 
      take id from curProject
    */
    const getData = async () => {
      const pr = await dispatch(getOneProject(curProject.id));
      if (pr) {
        setProject(pr);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="Student Group"
        >
          <Tooltip title="Title">
            <Tab label="Title" {...a11yProps(0)} />
          </Tooltip>
          <Tooltip title="Description about the Project.">
            <Tab label="Description" {...a11yProps(1)} />
          </Tooltip>
          <Tooltip title="Software Methodology which will be used.">
            <Tab label="Methodology" {...a11yProps(2)} />
          </Tooltip>
          <Tooltip title="Which will be used in making and development of the Project.">
            <Tab label="Tools and Technologies" {...a11yProps(3)} />
          </Tooltip>
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <CustomTypography
            text={`${project?.title ? project?.title : ""}`}
            variant="subtitle1"
            component={"subtitle1"}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CustomTypography
            text={`${project?.description ? project?.description : ""}`}
            variant="subtitle1"
            component={"subtitle1"}
          />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <CustomTypography
            text={project?.methodology ? project?.methodology : "Not Found"}
            variant="subtitle1"
            component={"subtitle1"}
          />
        </TabPanel>

        <TabPanel value={value} index={3}>
          {project?.technology?.length > 0 &&
            project?.technology?.map((tech: any, key: React.Key | null | undefined) => (
              <Chip key={key} style={{ marginRight: "0.5em" }} label={tech} color="primary" />
            ))}
          {project?.tools?.length > 0 &&
            project?.tools?.map((tool: any, key: React.Key | null | undefined) => (
              <Chip key={key} style={{ marginRight: "0.5em" }} label={tool} color="primary" />
            ))}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
