import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Tooltip,
  Zoom,
  Button,
  Box,
  Grid,
  ButtonBase,
  Paper,
  Typography,
  styled,
  CircularProgress,
} from "@mui/material";
import { authSelector } from "src/features/auth/authSlice";
import { getOneFaculty } from "src/features/faculty/facultyActions";
import { facultySelector } from "src/features/faculty/facultySlice";
import { getMyGroup } from "src/features/groups/groupActions";
import { groupSelector } from "src/features/groups/groupSlice";
import { getOneStudent } from "src/features/student/studentActions";
import ImageSrc from "../../imgs/broken-image.jpeg";
import { CustomTypography } from "../base/CustomTypography";
import { ProfileCard } from "../base/ProfileCard";
import CreateGroup from "./CreateGroup";
import GroupCard from "./GroupCard";
import StudentCard from "./StudentCard";

const Img = styled("img")({
  margin: "auto",
  display: "-ms-inline-grid",
  maxWidth: "100%",
  maxHeight: "100%",
});
const MyGroup = ({ setOpenS, setType, setMessage }: any) => {
  const dispatch = useDispatch();
  const { group, groupFailed, groupSuccessful, gettingGroup } = useSelector(groupSelector);
  const { currentUser } = useSelector(authSelector);
  // const { faculty } = useSelector(facultySelector);
  const [gstudents, setgStudents] = useState<any[]>([]);
  const [faculty, setFaculty] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // get my group
  useEffect(() => {
    const getGroupInfo = async () => {
      try {
        const stId = localStorage.getItem("id");

        // pass the function in dispatch
        const grp: any = await dispatch(getMyGroup(stId ? stId : "61e27b929b0629eab760ee7a"));

        if (grp) {
          setFaculty(grp.facultyId);
          setgStudents(grp.students);
        }

        console.log(faculty);
      } catch (er) {
        // console.log(facultyFailed);
      }
    };
    setLoading(true);
    getGroupInfo();
    setLoading(false);
  }, []);

  return (
    <div style={{ padding: "0.5rem", width: "100%" }}>
      {!group && (
        <div>
          {/* <CustomTypography text={"No Group Found!"} variant="h6" component="h6" /> */}
          <CreateGroup setOpenS={setOpenS} setType={setType} setMessage={setMessage} />
        </div>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        group && (
          <Grid
            container
            style={{ padding: "1rem", border: "1px solid ", borderRadius: "5px", margin: "1em 0" }}
          >
            {/* <CustomTypography text="My Group" variant="h4" component="h3" /> */}
            <Grid item xs={12} sm={12} md={12}>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <CustomTypography text="Group Details" variant="h5" component="h3" />
                <Tooltip TransitionComponent={Zoom} title="Make changes to your groups.">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      alert("Change Settings Prompt ..!");
                    }}
                    startIcon={<SettingsIcon />}
                  >
                    Manage Group
                  </Button>
                </Tooltip>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={12} style={{ margin: "1em 0" }}>
              <div style={{ justifyContent: "center" }}>
                <CustomTypography
                  text={`Group Name : ${group?.name}`}
                  variant="h6"
                  component="h5"
                />
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "0.5rem",
                }}
              >
                <CustomTypography text="Students" variant="h6" component="h6" />
                <div style={{ display: "flex", flexDirection: "column", padding: "0.5rem" }}>
                  {gstudents &&
                    gstudents.map((std: any) => {
                      return (
                        <div key={std._id} style={{ padding: "1rem" }}>
                          <ProfileCard
                            primaryText={`${std.firstName} ${std.lastName}`}
                            secondaryText={std.email}
                            imgSrc={ImageSrc}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem",
                }}
              >
                <CustomTypography text="Supervisor" variant="h6" component="h6" />
                <div style={{ padding: "1rem" }}>
                  <ProfileCard
                    primaryText={faculty ? `${faculty.firstName} ${faculty.lastName}` : ""}
                    secondaryText={faculty ? faculty.email : ""}
                    imgSrc={ImageSrc}
                  />
                </div>
                {/* <h4>Co-Supervisor</h4>
              <CustomTypography text="No Supervisor found!" variant="h6" component="h6" /> */}
              </div>
            </Grid>
          </Grid>
        )
      )}
    </div>
  );
};

export default MyGroup;
