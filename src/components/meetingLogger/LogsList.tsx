import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { Tooltip, IconButton, Menu, MenuItem, Button } from "@mui/material";
import {
  DataGrid,
  GridCellValue,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { deleteMeeting, getAllMeetings, updateMeeting } from "src/features/meeting/meetingActions";
import { meetingSelector } from "src/features/meeting/meetingSlice";
import { CustomButton } from "../base/CustomButton";
import CustomFilterDataTable from "../base/CustomFilterDataTable";
import Rows from "./data.json";
import EditLog from "./EditLog";
import LogDetails from "./LogDetails";

export default function LogList({ setStatus, setMessage, setOpens }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [anchorElAction, setAnchorElAction] = React.useState<null | HTMLElement>(null);
  const openMenuAction = Boolean(anchorElAction);
  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElAction(event.currentTarget);
  };
  const handleCloseMenuAction = () => {
    setAnchorElAction(null);
  };

  const {
    meetingsFailed,
    meetingsSuccessful,
    meetings,
    gettingMeetings,
    meetingDeleteFailed,
    meetingDeleteSuccessful,
    meetingUpdateFailed,
    meetingUpdateSuccessful,
  } = useSelector(meetingSelector);
  const [rows, setRows] = React.useState<any>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMeetings = async () => {
      try {
        // pass the function in dispatch
        await dispatch(getAllMeetings());
        console.log(meetingsSuccessful);
      } catch (er) {
        console.log(meetingsFailed);
      }
    };
    getMeetings();
    if (meetings) {
      const st = meetings.map(
        ({ _id, title, studentId, meetingDate, verify, recordedTime, message }) => {
          const id = _id;
          const name = studentId.firstName + studentId.lastName;
          return {
            id,
            title,
            meetingDate,
            verify,
            name,
            message,
            recordedTime,
            // rubric,
          };
        }
      );
      // console.log(st);
      setRows(st);
    }
  }, []);
  const [details, setDetails] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const [open, setOpen] = React.useState(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [mid, setmId] = React.useState<any>(null);

  const [evalues, seteValues] = React.useState({
    title: "",
    // RecordedTime: "",
    message: "",
  });
  const handleChangeEdit = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    seteValues({ ...evalues, [prop]: event.target.value });
  };

  const handleUpdate = async () => {
    setStatus("success");
    setMessage("Log Updated Successfully!");
    await dispatch(updateMeeting(evalues, mid));
    setOpens(true);
  };
  const handleDelete = async (id: any) => {
    setStatus("success");
    setMessage("Log Deleted Successfully!");
    await dispatch(deleteMeeting(id));
    setOpens(true);
  };
  const columns: GridColDef[] = [
    // { field: "id", headerName: "Log Title", width: 200 },
    { field: "title", headerName: "Log Title", width: 200 },
    { field: "name", headerName: "Logged by", width: 250 },

    {
      field: "meetingDate",
      headerName: "Dated",
      width: 250,
    },

    {
      field: "recordedTime",
      headerName: "Recorded Time",
      width: 200,
    },
    {
      field: "verify",
      headerName: "Status",
      width: 150,
    },
    {
      field: "message",
      headerName: "",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c: any) => c.field !== "__check__" && Boolean(c))
            .forEach((c: any) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          console.log(thisRow.meetingDate);
          setDetails(thisRow);
          handleClickOpen();
        };
        return (
          <CustomButton
            fullWidth={true}
            text="View Details"
            loading={false}
            handleClick={onClick}
          />
        );
      },
    },
    {
      field: "options",
      headerName: "",
      width: 100,
      renderCell: (params) => {
        const onClick = (e: any, type: string) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c: any) => c.field !== "__check__" && Boolean(c))
            .forEach((c: any) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          setmId(params.id);
          setDetails(thisRow);
          if (type === "edit") {
            handleClickOpenEdit();
          }
          if (type === "delete") {
            handleDelete(params.id);
          }
        };
        return (
          <>
            <Tooltip title="Action">
              <IconButton onClick={handleClickAction}>
                <LinearScaleIcon />
              </IconButton>
            </Tooltip>

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorElAction}
              open={openMenuAction}
              onClose={handleCloseMenuAction}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleCloseMenuAction}>
                <Button variant="text" startIcon={<EditIcon />} onClick={(e) => onClick(e, "edit")}>
                  Edit
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseMenuAction}>
                <Button
                  variant="text"
                  startIcon={<DeleteIcon />}
                  onClick={(e) => onClick(e, "delete")}
                >
                  Delete
                </Button>
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
  return (
    <div style={{ height: 550, width: "100%" }}>
      <CustomFilterDataTable rows={rows} columns={columns} />
      <LogDetails open={open} handleClose={handleClose} details={details} />
      <EditLog
        open={openEdit}
        handleClose={handleCloseEdit}
        details={details}
        handleUpdate={handleUpdate}
        handleChangeEdit={handleChangeEdit}
        evalues={evalues}
      />
    </div>
  );
}
