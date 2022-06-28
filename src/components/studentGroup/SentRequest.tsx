import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { CardActions, CircularProgress, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import { authSelector } from "src/features/auth/authSlice";
import { withdrawGroupRequest } from "src/features/groups/groupActions";
import { groupSelector } from "src/features/groups/groupSlice";
import { getOneStudent } from "src/features/student/studentActions";
import CustomSnackbar from "../base/CustomSnackbar";
import { CustomTypography } from "../base/CustomTypography";

export default function SentRequest({ setOpenS, setType, setMessage }: any) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    group,
    groupFailed,
    groupSuccessful,
    gettingGroup,
    groupReqWithdrawFailed,
    groupReqWithdrawSuccessful,
  } = useSelector(groupSelector);
  const { currentUser } = useSelector(authSelector);
  const [loading, setLoading] = useState<boolean>(false);
  // const [opens, setOpenS] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [student, setStudent] = useState<any>(null);
  const [req, setReq] = useState<any>(false);

  // get my group
  React.useMemo(() => {
    const getGroupInfo = async () => {
      try {
        const stId = localStorage.getItem("id");

        // pass the function in dispatch
        const st: any = await dispatch(getOneStudent(stId ? stId : "61e27b929b0629eab760ee7a"));
        // console.log("here", st);
        setStudent(st);
        setData(st.requestSent);
      } catch (er) {
        // console.log(er);
      }
    };
    setLoading(true);
    getGroupInfo();
    setLoading(false);
  }, []);
  const handleWithdraw = async (req: any) => {
    setReq(true);
    const stId = localStorage.getItem("id");
    await dispatch(withdrawGroupRequest(student.group, stId ? stId : "61e27b929b0629eab760ee7a"));
    setOpenS(true);
  };
  useMemo(() => {
    if (groupReqWithdrawSuccessful && req) {
      setType("success");
      setMessage("Group Request Withdrawn Successfully!");
      setOpenS(true);
    }
    if (groupReqWithdrawFailed && req) {
      setType("error");
      setMessage("Group Request Withdrawn Failed!");
      setOpenS(true);
    }
  }, [groupReqWithdrawSuccessful, groupReqWithdrawFailed]);
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2} style={{ margin: "auto" }}>
          {data && data.length <= 0 && (
            <CustomTypography text={"No Group Requests Sent!"} variant="h6" component="h6" />
          )}
          {data &&
            data.length > 0 &&
            data.map((req: any, key: number) => {
              return (
                <Grid item xs={12} sm={12} md={4} lg={4} key={key}>
                  <Card>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h6">
                        Group Request sent to :
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                        {req.name}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Tooltip TransitionComponent={Zoom} title="Withdraw Request">
                        <IconButton
                          aria-label="Withdraw Request"
                          onClick={() => handleWithdraw(req)}
                        >
                          <SettingsBackupRestoreIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      )}
      {/* {groupReqWithdrawSuccessful && (
        <CustomSnackbar
          message={"Group Request Withdrawn Successfully!"}
          open={opens}
          vertical="bottom"
          horizontal="center"
          handleClose={() => setOpenS(false)}
          type={"success"}
        />
      )}
      {groupReqWithdrawFailed && (
        <CustomSnackbar
          message={"Group Request Withdrawn Failed!"}
          open={opens}
          vertical="bottom"
          horizontal="center"
          handleClose={() => setOpenS(false)}
          type={"error"}
        />
      )} */}
    </>
  );
}
