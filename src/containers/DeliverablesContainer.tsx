import React from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { AddDeliverable } from "src/components/deliverables/AddDeliverable";
import AllDeliverablesfaculty from "src/components/deliverables/AllDeliverablesfaculty";
import SubmittedDeliverablesFaculity from "src/components/SubmittedDeliverables/SubmittedDeliverablesFaculity";

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

export const DeliverablesContainer = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const change_tab = (new_value: number) => {
    setValue(new_value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="All Deliverables" {...a11yProps(0)} />
          <Tab label="Add New Deliverable" {...a11yProps(1)} />
          <Tab label="Submitted Deliverables" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <AllDeliverablesfaculty />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AddDeliverable changeDeliverableTab={change_tab} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SubmittedDeliverablesFaculity />
      </TabPanel>
    </Box>
  );
};
