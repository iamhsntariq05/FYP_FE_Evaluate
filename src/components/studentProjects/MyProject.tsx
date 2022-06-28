import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Chip, CircularProgress, Grid, Paper } from "@mui/material";
import { getMyGroup } from "src/features/groups/groupActions";
import ProjectImage from "../../Assets/project/undraw_code_typing_re_p8b9.svg";
import { CustomTypography } from "../base/CustomTypography";
import { useStyles } from "./styles";

export default function MyProject() {
  const classes = useStyles();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(true);
  const dispatch = useDispatch();
  // get my group project
  useEffect(() => {
    // setLoading(true);
    const getGroupInfo = async () => {
      try {
        const stId = localStorage.getItem("id");
        const grp: any = await dispatch(getMyGroup(stId ? stId : "61e27b929b0629eab760ee7a"));

        if (grp && grp.projectId) {
          setProject(grp.projectId);
        } else {
          setError(true);
        }
      } catch (er) {}
    };
    getGroupInfo();
    setLoading(false);
  }, []);
  return (
    <Paper sx={{ width: "100%", height: "50vh" }}>
      <Grid container>
        <Grid item xs={12} sm={12} md={6} style={{ padding: "3rem" }}>
          {error && !project && !loading && (
            <CustomTypography
              text={"Currently you don't have any project!"}
              variant="h5"
              component="subtile1"
            />
          )}
          {project && !loading ? (
            <>
              <div className={classes.projectItem}>
                <CustomTypography
                  text={`Project Title: ${project?.title ? project?.title : ""}`}
                  variant="h6"
                  component="subtile1"
                />
              </div>
              <div className={classes.projectItem}>
                <CustomTypography
                  text={`Supervisor:  ${project?.description ? project?.title : ""}`}
                  variant="h6"
                  component="subtile1"
                />
              </div>
              <div className={classes.projectItem}>
                <CustomTypography
                  text={`Description:  ${project?.description ? project?.description : ""}`}
                  variant="h6"
                  component="subtile1"
                />
              </div>
              <div className={classes.projectItem}>
                <CustomTypography
                  text={`Methodology:  ${project?.methodology ? project?.methodology : ""}`}
                  variant="h6"
                  component="subtile1"
                />
              </div>
              <div className={classes.projectItem}>
                <CustomTypography
                  text={"Tools/ Technologies: "}
                  variant="h6"
                  component="subtile1"
                />
                {project?.technology?.length > 0 &&
                  project?.technology?.map((tech: any, key: React.Key | null | undefined) => (
                    <Chip key={key} style={{ marginRight: "0.5em" }} label={tech} color="primary" />
                  ))}
                {project?.tools?.length > 0 &&
                  project?.tools?.map((tool: any, key: React.Key | null | undefined) => (
                    <Chip key={key} style={{ marginRight: "0.5em" }} label={tool} color="primary" />
                  ))}
              </div>
            </>
          ) : !error && loading ? (
            <CircularProgress />
          ) : null}
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div style={{ textAlign: "center" }}>
            <img src={ProjectImage} height={310} width={350} alt={"Project"} loading="lazy" />
          </div>
        </Grid>
      </Grid>
    </Paper>
    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia component="img" height="140" image={ProjectImage} alt="green iguana" />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       Lizard
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
    //       across all continents except Antarctica
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     {/* <Button size="small">Share</Button>
    //     <Button size="small">Learn More</Button> */}
    //   </CardActions>
    // </Card>
  );
}
