import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import AddNewLog from "src/components/meetingLogger/AddNewLog";
import LogsList from "src/components/meetingLogger/LogsList";
import ApproveLogs from "src/components/meetingLogger/ApproveLogs";
import { AlertColor, Tooltip } from "@mui/material";
import { userType } from "src/types/user.enum";
import CustomSnackbar from "src/components/base/CustomSnackbar";

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
export default function MeetingLoggerContainer() {
  const theme = useTheme();
  const type: string | null = localStorage.getItem("type");
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    testvalue();
  }, []);
  const testvalue = () => {
    if (type == userType.STUDENT) {
      setValue(0);
    } else if (type == userType.FACULTY) {
      setValue(2);
    } else if (type == userType.COORDINATOR) {
      setValue(1);
    } else if (type == userType.ADMIN) {
      setValue(2);
    }
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const [status, setStatus] = React.useState<AlertColor | undefined>("success");
  const [opens, setOpens] = React.useState(false);
  const [message, setMessage] = React.useState("false");

  return (
    <Box sx={{ bgcolor: "background.paper", width: "auto", height: "120vh" }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="Student Group"
        >
          {type === userType.STUDENT && (
            <Tooltip title="Add new logs and View List of Recently Added Logs.">
              <Tab label="Add Logs" {...a11yProps(0)} />
            </Tooltip>
          )}
          {type === userType.STUDENT && (
            <Tooltip title="View the Recent Logs writted..">
              <Tab label="Log List" {...a11yProps(1)} />
            </Tooltip>
          )}
          Z
          {type === userType.FACULTY && (
            <Tooltip title="View and Approve Logs written by students.">
              <Tab label="Approve Logs" {...a11yProps(2)} />
            </Tooltip>
          )}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {type === userType.STUDENT && (
          <TabPanel value={value} index={0}>
            <AddNewLog />
          </TabPanel>
        )}

        {type === userType.STUDENT && (
          <TabPanel value={value} index={1}>
            <LogsList setStatus={setStatus} setMessage={setMessage} setOpens={setOpens} />
          </TabPanel>
        )}
        {type === userType.FACULTY && (
          <TabPanel value={2} index={2}>
            <ApproveLogs setStatus={setStatus} setMessage={setMessage} setOpens={setOpens} />
          </TabPanel>
        )}
      </SwipeableViews>
      <CustomSnackbar
        message={message}
        open={opens}
        vertical="bottom"
        horizontal="center"
        handleClose={() => setOpens(false)}
        type={status}
      />
    </Box>
  );
}

// import * as React from "react";
// import SwipeableViews from "react-swipeable-views";
// import { AlertColor, Tooltip } from "@mui/material";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import { useTheme } from "@mui/material/styles";
// import Tab from "@mui/material/Tab";
// import Tabs from "@mui/material/Tabs";
// import Typography from "@mui/material/Typography";
// import CustomSnackbar from "src/components/base/CustomSnackbar";
// import AddNewLog from "src/components/meetingLogger/AddNewLog";
// import ApproveLogs from "src/components/meetingLogger/ApproveLogs";
// import LogsList from "src/components/meetingLogger/LogsList";
// import { userType } from "src/types/user.enum";

// interface TabPanelProps {
//   children?: React.ReactNode;
//   dir?: string;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`full-width-tabpanel-${index}`}
//       aria-labelledby={`full-width-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `full-width-tab-${index}`,
//     "aria-controls": `full-width-tabpanel-${index}`,
//   };
// }
// export default function MeetingLoggerContainer() {
//   const theme = useTheme();
//   const type: string | null = localStorage.getItem("type");
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index: number) => {
//     setValue(index);
//   };
//   const [opens, setOpens] = React.useState(false);
//   const [message, setMessage] = React.useState("false");
//   const [status, setStatus] = React.useState<AlertColor | undefined>("success");

//   return (
//     <Box sx={{ bgcolor: "background.paper", width: "auto", height: "120vh" }}>
//       <AppBar position="static">
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="primary"
//           textColor="inherit"
//           variant="fullWidth"
//           aria-label="Student Group"
//         >
//           {type === userType.STUDENT && (
//             <Tooltip title="Add new logs and View List of Recently Added Logs.">
//               <Tab label="Add Logs" {...a11yProps(0)} />
//             </Tooltip>
//           )}
//           {type === userType.STUDENT && (
//             <Tooltip title="View the Recent Logs writted..">
//               <Tab label="Log List" {...a11yProps(1)} />
//             </Tooltip>
//           )}

//           {type === userType.FACULTY && (
//             <Tooltip title="View and Approve Logs written by students.">
//               <Tab label="Approve Logs" {...a11yProps(2)} />
//             </Tooltip>
//           )}
//         </Tabs>
//       </AppBar>
//       <SwipeableViews
//         axis={theme.direction === "rtl" ? "x-reverse" : "x"}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       >
//         {type === userType.STUDENT && (
//           <TabPanel value={value} index={0}>
//             <AddNewLog />
//           </TabPanel>
//         )}

//         {type === userType.STUDENT && (
//           <TabPanel value={value} index={1}>
//             <LogsList setStatus={setStatus} setMessage={setMessage} setOpens={setOpens} />
//           </TabPanel>
//         )}

//         {type === userType.FACULTY && (
//           <TabPanel value={value} index={2}>
//             {/* <ApproveLogs setStatus={setStatus} setMessage={setMessage} setOpens={setOpens} /> */}
//             <ApproveLogs />
//           </TabPanel>
//         )}
//       </SwipeableViews>
//       <CustomSnackbar
//         message={message}
//         open={opens}
//         vertical="bottom"
//         horizontal="center"
//         handleClose={() => setOpens(false)}
//         type={status}
//       />
//     </Box>
//   );
// }
