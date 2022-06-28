import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridCellValue, GridColDef } from "@mui/x-data-grid";
import {
  acceptRequestStudentProject,
  getAllProjects,
  rejectRequestStudentProject,
} from "src/features/projects/projectActions";
import { projectSelector } from "src/features/projects/projectSlice";
import { sendGlobalNotification } from "src/sevices/notification";
import { CustomButton } from "../base/CustomButton";
import CustomFilterDataTable from "../base/CustomFilterDataTable";
import CustomSnackbar from "../base/CustomSnackbar";

export const ProjectRequestList = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [grpId, setGrpId] = useState<any>([]);
  const [opens, setOpenS] = useState<boolean>(false);

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
    projectReqAcceptSuccessful,
    projectReqAcceptFailed,
    projectReqRejectFailed,
    projectReqRejectSuccessful,
  } = useSelector(projectSelector);
  const getProjects = async () => {
    try {
      // pass the function in dispatch
      await dispatch(getAllProjects());
      // console.log(projectsSuccessful);
    } catch (er) {
      // console.log(projectsFailed);
    }
  };
  const getS = async () => {
    await getProjects();
  };
  useEffect(() => {
    getS();
    // list all projects with fac ID and map its requests
    const rws: any = [];
    if (projects) {
      projects.map((pr: any) => {
        // if (pr.facultyId === localStorage.getItem("id")) {
        //   console.log("hh");}

        pr?.requests.map((req: any) => {
          const id = pr._id;
          if (req.group) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setGrpId(req.group._id);
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const name = req.group ? req.group.name : "";
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const date = new Date(req.group.creationDate);
          // console.log(creationDate);

          rws.push({
            id,
            name,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            leaderId: req.group.leaderId,
            status: req.status,
            date,
          });
        });
      });
      setRows(rws);
    }
  }, [projectsSuccessful, projectReqAcceptSuccessful, projectReqRejectSuccessful]);
  const handleAccept = async (id: any, leaderId: any, name: any) => {
    await dispatch(acceptRequestStudentProject(id, grpId));
    // send notification
    sendGlobalNotification(leaderId, `Project requested accepted for your group ${name}!`);
    setOpenS(true);
    getS();
  };
  const handleReject = async (id: any, leaderId: any, name: any) => {
    await dispatch(rejectRequestStudentProject(id, grpId));
    // send notification
    sendGlobalNotification(leaderId, `Project requested rejected for your group ${name}!`);
    setOpenS(true);
    getS();
  };
  const columns: GridColDef[] = [
    // { field: "id", headerName: "SrNo", width: 200 },
    { field: "name", headerName: "Group Name", width: 250 },
    { field: "status", headerName: "Request Status", width: 280 },
    { field: "date", headerName: "Date", width: 300 },
    { field: "leaderId", headerName: "Leader", width: 300 },
    {
      field: "Accept",
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

          handleAccept(params.id, thisRow.leaderId, thisRow.name);
        };

        return <CustomButton loading={false} handleClick={onClick} text={"Accept"} />;
      },
    },
    {
      field: "Reject",
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

          handleReject(params.id, thisRow.leaderId, thisRow.name);
        };

        return <CustomButton loading={false} handleClick={onClick} text={"Reject"} />;
      },
    },
  ];

  return (
    <div>
      <CustomFilterDataTable columns={columns} rows={rows} />
      {projectReqAcceptSuccessful && (
        <CustomSnackbar
          message={"Group Request Accepted Successfully!"}
          open={opens}
          vertical="bottom"
          horizontal="center"
          handleClose={() => setOpenS(false)}
          type={"success"}
        />
      )}
      {projectReqRejectSuccessful && (
        <CustomSnackbar
          message={"Group Request Rejected Successfully!"}
          open={opens}
          vertical="bottom"
          horizontal="center"
          handleClose={() => setOpenS(false)}
          type={"success"}
        />
      )}
      {projectReqAcceptFailed ||
        (projectReqRejectFailed && (
          <CustomSnackbar
            message={"An Error Occurred!"}
            open={opens}
            vertical="bottom"
            horizontal="center"
            handleClose={() => setOpenS(false)}
            type={"error"}
          />
        ))}
    </div>
  );
};
