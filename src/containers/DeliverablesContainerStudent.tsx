import React from "react";
import { AppBar, Box, Tab, Tabs, Typography } from "@mui/material";
import AllDeliverables from "src/components/deliverables/AllDeliverables";
import Marksobtained from "src/components/submittedMarks/marksobtained";
import AllTemplates from "src/components/template/AllTemplates";
import SubmittedDeliverables from "../components/SubmittedDeliverables/SubmittedDeliverables";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const DeliverablesContainerStudent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleTab = (tab: number) => {
    setValue(tab);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="Deliverables section"
          >
            <Tab label="All Deliverables" {...a11yProps(0)} />
            <Tab label="Marks obtained" {...a11yProps(1)} />
            <Tab label="See Templates" {...a11yProps(2)} />
            <Tab label="Submitted Deliverables" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
      </Box>
      <TabPanel value={value} index={0}>
        <AllDeliverables changeTab={handleTab} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Marksobtained />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AllTemplates />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SubmittedDeliverables />
      </TabPanel>
    </Box>
  );
};
