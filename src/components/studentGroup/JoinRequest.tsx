import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { CardActions, CircularProgress, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import {
  acceptGroupRequest,
  getMyGroup,
  rejectGroupRequest,
} from "src/features/groups/groupActions";
import { groupSelector } from "src/features/groups/groupSlice";
import CustomSnackbar from "../base/CustomSnackbar";
import { CustomTypography } from "../base/CustomTypography";

export default function JoinRequest({ setOpenS, setType, setMessage }: any) {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const {
    group,
    groupFailed,
    groupSuccessful,
    gettingGroup,
    groupReqAcceptFailed,
    groupReqAcceptSuccessful,
    groupReqCancelSuccessful,
    groupReqCancelFailed,
  } = useSelector(groupSelector);
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<any[]>([]);
  const [req, setReq] = useState<any>(false);

  // get my group
  useEffect(() => {
    const getGroupInfo = async () => {
      try {
        const stId = localStorage.getItem("id");
        // pass the function in dispatch
        const grp: any = await dispatch(getMyGroup(stId ? stId : "61e27b929b0629eab760ee7a"));
        // console.log("here", grp);
        setRequests(grp?.requests);
      } catch (er) {
        // console.log(facultyFailed);
      }
    };
    setLoading(true);
    getGroupInfo();
    setLoading(false);
  }, []);

  const handleAcceptRequest = async (req: any) => {
    setReq(true);
    await dispatch(acceptGroupRequest(group._id, req.student._id, req._id));
    setOpenS(true);
  };
  const handleCancelRequest = async (req: any) => {
    setReq(true);
    await dispatch(rejectGroupRequest(group._id, req.student._id, req._id));
    setOpenS(true);
  };
  useMemo(() => {
    if (groupReqCancelSuccessful || (groupReqAcceptSuccessful && req)) {
      setType("success");
      setMessage("Group Request Updated Successfully!");
      setOpenS(true);
    }
    if (groupReqAcceptFailed || (groupReqCancelFailed && req)) {
      setType("error");
      setMessage("An Error Occured!");
      setOpenS(true);
    }
  }, [
    groupReqAcceptSuccessful,
    groupReqCancelSuccessful,
    groupReqAcceptFailed,
    groupReqCancelFailed,
  ]);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} style={{ margin: "auto" }}>
          {!group ? (
            <CustomTypography text={"No Group Found!"} variant="h6" component="h6" />
          ) : !group.requests || group?.requests?.length <= 0 ? (
            <CustomTypography text={"No Group Requests Found!"} variant="h6" component="h6" />
          ) : null}
          {requests?.length > 0 &&
            requests?.map((req: any, key: number) => {
              return (
                <Grid item xs={12} sm={12} md={4} lg={4} key={key}>
                  <Card>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h6">
                        Join Request sent by :
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {`${req.student.firstName} ${req.student.lastName}`}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" component="div">
                        {req.student.email}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Tooltip TransitionComponent={Zoom} title="Accept Request">
                        <IconButton
                          aria-label="Accept Request"
                          onClick={() => handleAcceptRequest(req)}
                        >
                          <CheckIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip TransitionComponent={Zoom} title="Cancel Request">
                        <IconButton
                          aria-label="Cancel Request"
                          onClick={() => handleCancelRequest(req)}
                        >
                          <CloseIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      )}
      {/* {groupReqAcceptSuccessful && (
        <CustomSnackbar
          message={"Group Request Accepted Successfully!"}
          open={opens}
          vertical="bottom"
          horizontal="center"
          handleClose={() => setOpenS(false)}
          type={"success"}
        />
      )}
      {groupReqCancelSuccessful && (
        <CustomSnackbar
          message={"Group Request Cancelled Successfully!"}
          open={opens}
          vertical="bottom"
          horizontal="center"
          handleClose={() => setOpenS(false)}
          type={"success"}
        />
      )}
      {groupReqAcceptFailed ||
        (groupReqCancelFailed && (
          <CustomSnackbar
            message={"An Error Occured!"}
            open={opens}
            vertical="bottom"
            horizontal="center"
            handleClose={() => setOpenS(false)}
            type={"error"}
          />
        ))} */}
    </>
  );
}
