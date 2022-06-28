import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertColor, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";
import { GridCellValue, GridColDef } from "@mui/x-data-grid";
import { CustomButton } from "src/components/base/CustomButton";
import CustomFilterDataTable from "src/components/base/CustomFilterDataTable";
import CustomSnackbar from "src/components/base/CustomSnackbar";
import { CustomTypography } from "src/components/base/CustomTypography";
import AllProjectsPage from "src/components/studentProjects/AllProjectsPage";
import ProjectDetails from "src/components/studentProjects/ProjectDetails";
import { authSelector } from "src/features/auth/authSlice";
import { getMyGroup } from "src/features/groups/groupActions";
import {
  applyStudentProject,
  createProject,
  getAllProjects,
} from "src/features/projects/projectActions";
import { projectReducer, projectSelector } from "src/features/projects/projectSlice";
import { userType } from "src/types/user.enum";
import { CustomInput } from "../components/base/CustomInput";

interface State {
  title: string;
  methodology: string;
  status: string;
  description: string;
  tools: string;
  technology: string;
}

const ProjectList = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [curProject, setCurProject] = useState<any>(null);
  const [groupId, setGroupId] = useState<string>("");
  const [isLeader, setIsLeader] = useState<boolean>(false);
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store
  const {
    projectsSuccessful,
    projectsFailed,
    projects,
    projectSuccessful,
    projectFailed,
    project,
    projectCreateFailed,
    projectCreateSuccessful,
  } = useSelector(projectSelector);
  const { currentUser } = useSelector(authSelector);

  const getProjects = async () => {
    try {
      // pass the function in dispatch
      await dispatch(getAllProjects());
      console.log(projectsSuccessful);
    } catch (er) {
      console.log(projectsFailed);
    }
  };

  useEffect(() => {
    const checkLeader = async () => {
      const stId = localStorage.getItem("id");
      if (stId && localStorage.getItem("type") === userType.STUDENT) {
        const grp: any = await dispatch(getMyGroup(stId));
        if (grp) {
          setGroupId(grp._id);
          if (grp.leaderId === stId) setIsLeader(true);
        }
      }
    };

    checkLeader();
    const getS = async () => {
      await getProjects();
    };
    getS();
    if (projects) {
      const st = projects.map(({ _id, title, description, uploadDate, user, status }) => {
        const id = _id;
        return {
          id,
          title,
          description,
          uploadDate,
          user,
          status,
        };
      });
      // console.log(st);
      setRows(st);
    }
  }, [projectsSuccessful, projectCreateSuccessful]);
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    status: "available",
    methodology: "",
    tools: "",
    technology: "",
  });

  const [errors, setErrors] = React.useState<State>({
    title: "",
    description: "",
    status: "available",
    methodology: "",
    tools: "",
    technology: "",
  });
  const [open, setOpen] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
  };

  const handleClose = () => {
    setOpen(false);
    // comment
  };
  const handleClickOpenDetails = () => {
    setOpenDetails(true);
    console.log(curProject);

    setScroll("paper");
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    // comment
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const applyProject = async () => {
    try {
      // pass the function in dispatch
      await dispatch(createProject(values));
      alert("Project Proposed.");
      console.log(projectCreateSuccessful);
    } catch (er) {
      console.log(projectCreateFailed);
    }
  };
  const handleCreate = async () => {
    // console.log("here");
    setSaveMessage("Project created successfully!");
    setSaveType("success");
    const isStudent = localStorage.getItem("type") === userType.STUDENT;
    const obj = {
      ...values,
      user: isStudent ? "student" : "faculty",
      facultyId: isStudent ? "628bed178a780741cacd3056" : localStorage.getItem("id"),
      tools: values.tools.split(","),
      technology: values.technology.split(","),
    };
    await dispatch(createProject(obj));
    setOpenS(true);

    handleClose();
  };
  const [opens, setOpenS] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>(
    "Only group leader can send project request. Please ask your group leader to send request for this project."
  );
  const [saveType, setSaveType] = useState<AlertColor | undefined>("error");
  const handleApplyProject = async (id: any) => {
    // check if leader -> apply
    if (localStorage.getItem("type") === userType.STUDENT) {
      // console.log("here");
      setSaveMessage("Applied for project successfully!");
      setSaveType("success");
      await dispatch(applyStudentProject(id, groupId));
    }
    setOpenS(true);
  };
  const columns: GridColDef[] = [
    // { field: "id", headerName: "SrNo", width: 200 },
    { field: "title", headerName: "Project Title", width: 300 },
    { field: "user", headerName: "Proposed By", width: 250 },
    {
      field: "uploadDate",
      headerName: "Proposed During",
      width: 280,
    },
    {
      field: "status",
      headerName: "Availability",
      width: 190,
    },
    {
      field: "details",
      headerName: "",
      sortable: false,
      width: 180,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c: any) => c.field !== "__check__" && Boolean(c))
            .forEach((c: any) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          // history.push({ pathname: "/rubric-list", state: thisRow?.rubric });
          setCurProject({ ...thisRow, id: params.id });
          handleClickOpenDetails();
        };

        return <CustomButton loading={false} handleClick={onClick} text={"View Details"} />;
      },
    },
    {
      field: "apply",
      headerName: "",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c: any) => c.field !== "__check__" && Boolean(c))
            .forEach((c: any) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          handleApplyProject(params.id);
        };

        return isLeader && <CustomButton loading={false} handleClick={onClick} text={"Apply"} />;
      },
    },
  ];
  const helperText = (text: string) => (
    <Typography style={{ fontSize: "12px", color: "gray" }} variant="subtitle1" component="div">
      {text}
    </Typography>
  );
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          paddingRight: "1rem",
          paddingBottom: "1rem",
          marginLeft: "1rem",
        }}
      >
        <Tooltip title="Propose Your own project Idea.">
          <CustomButton handleClick={handleClickOpen} loading={false} text="Propose Project" />
        </Tooltip>
      </div>
      {projectsSuccessful && <CustomFilterDataTable columns={columns} rows={rows} />}{" "}
      <CustomSnackbar
        message={saveMessage}
        open={opens}
        vertical="bottom"
        horizontal="center"
        handleClose={() => setOpenS(false)}
        type={saveType}
      />
      {/* create project */}
      <Box sx={{ width: "50%" }}>
        <Box>
          <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Create Project for your FYP</DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <div style={{ marginBlockEnd: "2rem" }}>
                  <div style={{ marginBottom: "1em" }}>
                    <CustomInput
                      value={values.title}
                      handleChange={handleChange("title")}
                      field="Title"
                      type="title"
                      error={errors.title}
                      helperText={"e.g. cool project title"}
                      black={true}
                    />
                    {helperText("Name of the project")}
                  </div>
                  <div style={{ marginBottom: "1em" }}>
                    <CustomInput
                      value={values.description}
                      handleChange={handleChange("description")}
                      field="Description"
                      type="description"
                      error={errors.description}
                      helperText={"e.g. Breif details about your project. (3-5 lines)"}
                      black={true}
                    />
                    {helperText("Brief description of what project will do")}
                  </div>
                  <div style={{ marginBottom: "1em" }}>
                    <CustomInput
                      value={values.methodology}
                      handleChange={handleChange("methodology")}
                      field="Methodology"
                      type="name"
                      error={errors.methodology}
                      helperText={
                        "e.g. first you will do LMS then do the machine learning part......."
                      }
                      black={true}
                    />
                    {helperText("Methodology of the project( e.g. devops)")}
                  </div>
                  <div style={{ marginBottom: "1em" }}>
                    <CustomInput
                      value={values.tools}
                      handleChange={handleChange("tools")}
                      field="Tools"
                      type="name"
                      error={errors.tools}
                      helperText={"e.g. MERN, Machine Learning, React Native, DevOps"}
                      black={true}
                    />
                    {helperText("Add Comma separated tools( e.g. vscode,AWS)")}
                  </div>
                  <div style={{ marginBottom: "1em" }}>
                    <CustomInput
                      value={values.technology}
                      handleChange={handleChange("technology")}
                      field="Technologies"
                      type="name"
                      error={errors.technology}
                      helperText={"e.g. MERN, Machine Learning, React Native, DevOps"}
                      black={true}
                    />
                    {helperText("Add Comma separated technologies( e.g. Nodejs,React Native)")}
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleCreate}>Create Project</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      {/* project details */}
      <Box sx={{ width: "50%" }}>
        <Box>
          <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={openDetails}
            onClose={handleCloseDetails}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Project Details</DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <ProjectDetails curProject={curProject} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
};
export default ProjectList;
