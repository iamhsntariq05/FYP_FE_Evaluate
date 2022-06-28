import React, { useState, useEffect } from "react";
import { Delete } from "@material-ui/icons";
import EditIcon from "@mui/icons-material/Edit";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { IconButton, Tooltip, Grid, Menu, MenuItem, AlertColor, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid, GridCellValue, GridColDef, GridMoreVertIcon } from "@mui/x-data-grid";
import axios from "axios";
import { CustomDialog } from "src/components/base/CustomDialogForm";
import CustomSnackbar from "src/components/base/CustomSnackbar";

const FileInput = styled("input")({
  display: "none",
});
interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  changeTab?: Function;
  // deadline: Date | null | any;
}
const AllDeliverablesfaculty: React.FC<Props> = (props) => {
  const [rows, setRows] = useState<any>([]);
  const [saveType, setSaveType] = React.useState<AlertColor | undefined>("success");
  const [opens, setOpens] = React.useState(false);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [userId, setUserId] = React.useState(0);
  const [deleteData, setdeleteData] = React.useState([]);
  const [deadline, setdeadline] = React.useState(0);

  // const [deliverableValues, setDeliverableValues] = React.useState<Props>({
  //   deadline: new Date(),
  // });
  const [rowID, setrowID] = React.useState([]);

  const [currentrow, setcurrentrow] = React.useState({
    row: { details: "", _id: 0 },
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [openup, setOpenup] = React.useState(false);
  const handleChangeevent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleedit = () => {
    setOpenPopup(true);
  };
  const handledeleteChange = () => {
    setOpenup(false);
  };
  // const SubmitDeliverable = async (e: any, row: any) => {
  //   const token = localStorage.getItem("token");
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   const fileData = new FormData();
  //   console.log(row);

  //   fileData.append("myfile", file);
  //   fileData.append("rubrics", JSON.stringify(row.row.totalRubrics));
  //   fileData.append("title", row.row.title);
  //   fileData.append("deadline", row.row.deadline);
  //   fileData.append("faculty_id", row.row.faculty_id);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/submitted_deliverable/add",
  //       fileData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (props.changeTab) props.changeTab(2);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 260 },
    { field: "title", headerName: "Title", width: 260 },
    { field: "deadline", headerName: "Deadline", width: 250 },
    {
      field: "options",
      headerName: "Manage",
      sortable: true,
      width: 250,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.target.value;
        };
        return (
          <>
            <Tooltip title="See Options">
              <IconButton onClick={handleChangeevent}>
                <GridMoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              onClick={onClick}
              open={openMenu}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem>{/* <ProjectDetails /> */}</MenuItem>
              <MenuItem>
                <Tooltip title="Delete">
                  <IconButton onClick={(e) => Deletecomplaint(userId)}>{<Delete />}</IconButton>
                </Tooltip>
              </MenuItem>
              <MenuItem>
                <Tooltip title="Edit">
                  <IconButton onClick={handleedit}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];
  const handleGetRowId = (e: any) => {
    setrowID(e._id);
    return e._id;
  };
  const dialogeClose = () => {
    setOpenPopup(false);
  };

  // ============================= useEffect ========================
  useEffect(() => {
    const fetchDeliverables = async () => {
      try {
        const token = localStorage.getItem("token");
        const fId = localStorage.getItem("facultyId");
        const type = localStorage.getItem("type");
        if (type === "FACULTY") {
          const response = await axios.get(
            `http://localhost:8000/api/deliverable/getByFacultyId/${fId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const res = response.data.filter((dt: any) => {
            const datee = new Date(dt.deadline);
            if (datee >= new Date()) {
              return dt;
            }
          });
          setRows(res);
        }
        // const res = response.data.filter((dt: any) => {
        //   // if (dt.deadline < Date.now()) {
        //   //   return dt;
        //   console.log("THEDEADLINE", dt.deadline);
        //   console.warn(res);
        // });
        //   setRows(response.data);
        //   // setdeadline(response.data.allData);
        // }
        if (type === "ADMIN") {
          const response = await axios.get("http://localhost:8000/api/deliverable/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setRows(response.data);
          console.log(response.data.allData);
          // setdeadline(response.data.allData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDeliverables();
  }, []);

  const Updatedoc = async (ID: any) => {
    const api = `http://127.0.0.1:8000/api/deliverable/${rowID}`;
    const userData = {
      deadline: deadline,
    };
    await axios
      .patch(api, userData)
      .then((res) => {
        setdeleteData(res.data);
        setOpens(true);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
    setOpenPopup(false);
  };

  const Deletecomplaint = (id: any) => {
    const constid = currentrow.row._id;
    setUserId(constid);
    console.log(constid);
    const api = `http://127.0.0.1:8000/api/deliverable/${constid}`;
    axios
      .delete(api)
      .then((res) => {
        setdeleteData(res.data);
        console.log(deleteData);
        setOpens(true);
        // setOpens(true);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };
  return (
    <div style={{ height: 730, width: "100%" }}>
      <DataGrid
        rows={rows}
        getRowId={handleGetRowId}
        columns={columns}
        onCellClick={(item: any) => setcurrentrow(item)}
      />
      <div>
        <CustomSnackbar
          message={"success"}
          open={opens}
          vertical="bottom"
          horizontal="center"
          handleClose={() => setOpens(false)}
          type={saveType}
        />
        <CustomDialog
          title="Change deadline."
          open={openPopup}
          selectedValue={""}
          onClose={dialogeClose}
          closeText={"cancel"}
          onDone={Updatedoc}
          doneText="Confirm"
        >
          <Grid item xs={12} sm={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props: any) => <TextField fullWidth {...props} />}
                label="Deadline"
                value={"deliverableValues.deadline"}
                onChange={(e: any) => setdeadline(e.value)}
              />
            </LocalizationProvider>
          </Grid>
        </CustomDialog>
      </div>
    </div>
  );
};

export default AllDeliverablesfaculty;
