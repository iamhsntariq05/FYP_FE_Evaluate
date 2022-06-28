import { verify } from "crypto";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { Tooltip, IconButton, Menu, MenuItem, Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridCellValue,
  GridColDef,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import axios from "axios";
import { getAllMeetings, verifyMeeting } from "src/features/meeting/meetingActions";
import { meetingSelector } from "src/features/meeting/meetingSlice";
import { CustomButton } from "../base/CustomButton";
import CustomFilterDataTable from "../base/CustomFilterDataTable";
import CustomSnackbar from "../base/CustomSnackbar";
import { CustomTypography } from "../base/CustomTypography";
import Rows from "./data.json";
import LogDetails from "./LogDetails";

export default function ApproveLogs({ setStatus, setMessage, setOpens }: any) {
  const [pageSize, setPageSize] = React.useState<number>(5);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [colour, setColour] = React.useState(false);
  const [verifey, setVerifey] = React.useState("Not Verified");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
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
    verifyingMeeting,
    meetingVerifyingFailed,
    meetingVerifyingSuccessful,
  } = useSelector(meetingSelector);
  const [rows, setRows] = React.useState<any>([]);
  const dispatch = useDispatch();
  const getMeetings = async () => {
    try {
      // pass the function in dispatch
      await dispatch(getAllMeetings());
      console.log(meetingsSuccessful);
    } catch (er) {
      console.log(meetingsFailed);
    }
  };
  useEffect(() => {
    getMeetings();
    if (meetings) {
      const st = meetings.map(
        ({ _id, title, studentId, meetingDate, verify, recordedTime, message }) => {
          const id = _id;
          const name = studentId.firstName + studentId.lastName;

          console.log(studentId);

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
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleVerifyMeeting = async (id: any) => {
    await dispatch(verifyMeeting(id));
    getMeetings();
    setOpens(true);
    setStatus("success");
    setMessage("Log Verified Successfully!");
  };
  const columns: GridColDef[] = [
    // { field: "id", headerName: "SrNo", width: 100 },
    { field: "title", headerName: "Log Title", width: 250 },
    { field: "name", headerName: "Logged by", width: 250 },

    {
      field: "meetingDate",
      headerName: "Dated",
      width: 300,
    },

    {
      field: "recordedTime",
      headerName: "Time",
      width: 150,
    },
    {
      field: "verify",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const onClick = async (e: any) => {
          e.stopPropagation(); // don0't select this row after clicking
          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};
          api
            .getAllColumns()
            .filter((c: any) => c.field !== "__check__" && Boolean(c))
            .forEach((c: any) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          handleVerifyMeeting(params.id);
        };
        return (
          <Button
            variant="contained"
            style={params.row.verify ? { backgroundColor: "green" } : { backgroundColor: "red" }}
            onClick={onClick}
          >
            {params.row.verify ? "Verified" : "Not Verified"}
          </Button>
        );
      },
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
          setDetails(thisRow);
          handleClickOpen();
          // console.log(thisRow);
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
  ];
  return (
    <div style={{ height: 550, width: "100%" }}>
      <CustomFilterDataTable rows={rows} columns={columns} />
      <LogDetails open={open} handleClose={handleClose} details={details} />
    </div>
  );
}
