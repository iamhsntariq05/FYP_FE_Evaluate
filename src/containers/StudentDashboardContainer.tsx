import {
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import moment from "moment";
import { CustomTypography } from "src/components/base/CustomTypography";
import MainClock from "src/components/NewDashboard/MainClock";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import PresentToAllIcon from "@mui/icons-material/PresentToAll";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const DashboardData = {
  name: "Seeeeeeeeeeebbbbbbbbbbbb",
  project: "Blink into Berseker's Call = Ti8 Win.",
  technology: ["The International 8", "7ckngmad"],
  submissionType: "40% implementation with SDD.",
};

const StudentDashboardContainer = () => {
  const dateString = "2022-6-6";
  const someday = moment(dateString);
  const fromattedDate = someday.format("ddd, DD MMM YYYY");
  const submissionDate = new Date("2022-1-1");
  const timeRemaining = new Date();
  return (
    <div>
      <CustomTypography text={`Welcome  ${DashboardData.name} !`} variant={"h3"} component={"h3"} />
      <Divider />

      <br />

      <div
        style={{
          textAlign: "center",
          padding: 6,

          paddingBlock: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={7} sm={4} md={4}>
            <div
              style={{
                paddingLeft: "2%",
                paddingBottom: "2%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <IntegrationInstructionsIcon fontSize="large" color="primary" />{" "}
              <CustomTypography text={"  Project:"} variant={"h4"} component={"h4"} />
            </div>
            <Card
              variant="outlined"
              sx={{ maxWidth: 600, height: 230 }}
              style={{ backgroundColor: "#7d98fa", borderRadius: "5%" }}
              elevation={6}
            >
              {/* <Grid container spacing={2}>
            <Grid item xs={6} sm={4} md={4}> */}
              <CardContent>
                <Typography variant="h4" component="div">
                  {DashboardData.project}
                </Typography>

                <br />
                <Typography variant="h6" component="div">
                  {"Technologies"}
                </Typography>
                <br />
                <Chip
                  style={{ marginRight: "0.5em", width: "100", backgroundColor: "whitesmoke" }}
                  size="small"
                  label={DashboardData.technology[0]}
                />
                <Chip
                  style={{ marginRight: "0.5em", width: "100", backgroundColor: "whitesmoke" }}
                  size="small"
                  label={DashboardData.technology[1]}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div style={{ paddingLeft: "30%", paddingBottom: "2%" }}>
              <Typography variant="h4" component="div">
                {"FYP-Calender"}
              </Typography>{" "}
              <Timeline>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    7th Semester
                    <br />
                    <br />
                    5th Week
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      {/* <CircularProgress color="success" variant="determinate" /> */}
                      <CheckCircleOutlineIcon fontSize="large" style={{ color: "green" }} />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <div style={{ paddingLeft: "3%", paddingBottom: "2%" }}>
                    <Paper elevation={6} style={{ backgroundColor: "#c4a4fc" }}>
                      <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <Typography variant="body1" component="span">
                          Scope and SRS Submission and Evalution.
                        </Typography>
                      </TimelineContent>
                    </Paper>
                  </div>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    13th Week
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <CircularProgress color="inherit" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <div style={{ paddingLeft: "3%", paddingBottom: "2%" }}>
                    <Paper elevation={6} style={{ backgroundColor: "#c4a4fc" }}>
                      <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <Typography variant="body1" component="span">
                          SDS and 40% Implementation Submission and Evalution.
                        </Typography>
                      </TimelineContent>
                    </Paper>
                  </div>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    8th Semester
                    <br />
                    <br />
                    5th Week
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <CircularProgress color="inherit" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <div style={{ paddingLeft: "3%", paddingBottom: "2%" }}>
                    <Paper elevation={6} style={{ backgroundColor: "#c4a4fc" }}>
                      <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <Typography variant="body1" component="span">
                          Testing Document and 60% Implementation Submission and Evalution.
                        </Typography>
                      </TimelineContent>
                    </Paper>
                  </div>
                </TimelineItem>
                <TimelineItem>
                  <TimelineOppositeContent
                    sx={{ m: "auto 0" }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    13th Week
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot>
                      <CircularProgress color="inherit" />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <div style={{ paddingLeft: "3%", paddingBottom: "2%" }}>
                    <Paper elevation={6} style={{ backgroundColor: "#c4a4fc" }}>
                      <TimelineContent sx={{ py: "12px", px: 2 }}>
                        <Typography variant="body1" component="span">
                          Final Report and 100% Implementation Submission and Evalution.
                        </Typography>
                      </TimelineContent>
                    </Paper>
                  </div>
                </TimelineItem>
              </Timeline>
            </div>
          </Grid>
        </Grid>
        {/* <CustomTypography
          text={`Project Title: ${DashboardData.project}`}
          variant="h5"
          component="subtile1"
        /> */}
      </div>
      <Divider />
      <div style={{ paddingLeft: "5%", paddingTop: "2%", display: "flex", flexDirection: "row" }}>
        <PresentToAllIcon fontSize="large" color="primary" />
        <CustomTypography text={`${" "}Deliverables:`} variant={"h4"} component={"h4"} />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", paddingTop: "2%", textAlign: "center" }}
      >
        <CustomTypography
          text={`Next submission : ${DashboardData.submissionType}`}
          variant="h5"
          component="subtile1"
        />
        <CustomTypography text={`Due Date: ${fromattedDate}`} variant="h5" component="subtile1" />{" "}
        <br />
        <MainClock />
      </div>
    </div>
  );
};
export default StudentDashboardContainer;
