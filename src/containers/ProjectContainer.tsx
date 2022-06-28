import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SwipeableViews from "react-swipeable-views";
import { AlertColor } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import CustomSnackbar from "src/components/base/CustomSnackbar";
import CreateGroup from "src/components/studentGroup/CreateGroup";
import GroupList from "src/components/studentGroup/GroupList";
import JoinRequest from "src/components/studentGroup/JoinRequest";
import MyGroup from "src/components/studentGroup/MyGroup";
import SentRequest from "src/components/studentGroup/SentRequest";
import MyProject from "src/components/studentProjects/MyProject";
import { getOneStudent } from "src/features/student/studentActions";
import { studentSelector } from "src/features/student/studentSlice";
import { userType } from "src/types/user.enum";
import ProjectList from "./ProjectListContainer";

interface TabPanelProps {
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

export default function ProjectContainer() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [opens, setOpenS] = useState(false);
  const [applyMessage, setApplyMessage] = useState<string>("");
  const [applyType, setApplyType] = useState<AlertColor | undefined>("success");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const dispatch = useDispatch();
  const { studentOneSuccessful, student } = useSelector(studentSelector);

  React.useEffect(() => {
    const getStudentInfo = async () => {
      try {
        // pass the function in dispatch
        await dispatch(getOneStudent("61e27b929b0629eab760ee7a"));

        // console.log(facultySuccessful);
      } catch (er) {
        // console.log(facultyFailed);
      }
    };
    getStudentInfo();
  }, []);
  const currentuser = localStorage.getItem("type");
  return (
    <Box sx={{ bgcolor: "background.paper", width: "auto" }}>
      {currentuser === userType.STUDENT && (
        <>
          {" "}
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="Student Group"
            >
              <Tab label="My Project" {...a11yProps(0)} />
              <Tab label="All Projects" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0}>
              <MyProject />
            </TabPanel>

            <TabPanel value={value} index={1}>
              {/* <GroupList setOpenS={setOpenS} setType={setApplyType} setMessage={setApplyMessage} /> */}
              <ProjectList />
            </TabPanel>
          </SwipeableViews>
        </>
      )}
      {currentuser === userType.FACULTY || currentuser === userType.ADMIN ? (
        <>
          <ProjectList />
        </>
      ) : null}

      <CustomSnackbar
        message={applyMessage}
        open={opens}
        vertical="bottom"
        horizontal="center"
        handleClose={() => setOpenS(false)}
        type={applyType}
      />
    </Box>
  );
}
