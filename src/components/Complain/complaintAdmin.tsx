import * as React from "react";
import Select from "react-select";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { AlertColor, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { CustomDialog } from "src/components/base/CustomDialogForm";
import CustomSnackbar from "src/components/base/CustomSnackbar";

const ComplaintListAdmin = () => {
  const [userId, setUserId] = React.useState(0);
  const [opens, setOpens] = React.useState(false);
  const [updateopens, setupdateopens] = React.useState(false);
  const [saveType, setSaveType] = React.useState<AlertColor | undefined>("success");
  const [allData, setAllData] = React.useState([]);
  const [deleteData, setdeleteData] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [currentrow, setcurrentrow] = React.useState({
    row: { details: "", u_id: 0 },
  });
  const [openPopup, setOpenPopup] = React.useState(false);
  const [openup, setOpenup] = React.useState(false);
  const [Popup, setPopup] = React.useState(false);
  const [status, setstatus] = React.useState(0);
  const [details, setdetails] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleChangeevent = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const options = [
    { value: "Approved", label: "Approved" },
    { value: "Decline", label: "Decline" },
  ];

  ///////////////////// FETCH ALL COMPLAINTS ////////////////////////
  const fetchAllComplaints = async () => {
    const api = "http://127.0.0.1:8000/api/complaint/all?complainer=ALL";
    await axios
      .get(api)
      .then((res) => {
        setAllData(res.data.allData);
        console.log("The data is", res.data.allData);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };
  //////////////////// Get Complaint info ////////////////////////
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    const studentId = localStorage.getItem("studentId");

    const api = `http://127.0.0.1:8000/api/students/${studentId}`;

    await axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setFirstName(res.data.student.firstName);

        console.log("the incoming profile data is", res.data.student);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };
  //---------------------------------------------------------------------
  //////////////////Update status \\\\\\\\\\\\\\\\\\\\\\\\\
  const updatecomplaint = async (ID: any) => {
    const conststatus = currentrow.row.u_id;
    setstatus(conststatus);
    console.log(conststatus);
    const api = `http://127.0.0.1:8000/api/complaint/${conststatus}`;
    const userData = {
      status: status,
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
  //////////////////Delete complaint \\\\\\\\\\\\\\\\\\\\\\\\\

  const Deletecomplaint = (id: any) => {
    const constid = currentrow.row.u_id;
    setUserId(constid);
    console.log(constid);
    const api = `http://127.0.0.1:8000/api/complaint/${constid}`;
    axios
      .delete(api)
      .then((res) => {
        setdeleteData(res.data);
        console.log(deleteData);
        setOpens(true);
      })
      .catch((err) => {
        console.log("Error occured possible cause", err);
      });
  };

  React.useEffect(() => {
    fetchAllComplaints();
    getUserData();
    // Deletecomplaint(id);
  }, []);
  // const handleClick = () => {
  //   setOpenPopup(true);
  // };
  const dialogeClose = () => {
    setOpenPopup(false);
  };
  const handleChange = () => {
    const description = currentrow.row.details;
    setdetails(description);
    setPopup(true);
  };

  const handleedit = () => {
    setOpenPopup(true);
  };
  const handleselect = (e: any) => {
    setstatus(e.value);
    console.warn("the", status);
  };
  const handlebuttonChange = () => {
    setPopup(false);
  };
  const handledeleteChange = () => {
    setOpenup(false);
  };
  const columns: GridColDef[] = [
    { field: "id", headerName: "No", width: 250 },
    { field: "Category", headerName: "Category", width: 250 },
    { field: "SubCategory", headerName: "Sub-Category", width: 250 },
    { field: "SubCategory", headerName: "Sub-Category", width: 250 },
    { field: "SubCategory", headerName: "Sub-Category", width: 250 },
    {
      field: "Date",
      headerName: "Date & Time",
      width: 250,
    },
    {
      field: "email",
      headerName: "email",
      width: 250,
    },
    {
      field: "complainer",
      headerName: "from",
      width: 250,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 250,
    },
    {
      field: "options",
      headerName: "",
      sortable: true,
      width: 50,
      renderCell: (params) => {
        const onClick = (e: any) => {
          e.target.value;
        };
        return (
          <>
            <Tooltip title="See Options">
              <IconButton onClick={handleChangeevent}>
                <LinearScaleIcon />
                {/* {<MoreHorizSharpIcon />} */}
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
                <Tooltip title="Edit">
                  <IconButton onClick={handleedit}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </MenuItem>
              <MenuItem>
                <Tooltip title="Details">
                  <IconButton onClick={handleChange}>{<InfoIcon />}</IconButton>
                </Tooltip>
              </MenuItem>
              <MenuItem>
                <Tooltip title="Delete">
                  <IconButton onClick={(e) => setOpenup(true)}>{<DeleteIcon />}</IconButton>
                </Tooltip>
              </MenuItem>
            </Menu>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ width: 500 }}>
        <CustomDialog
          title="Resolve issue"
          open={openPopup}
          selectedValue={""}
          onClose={dialogeClose}
          closeText={"cancel"}
          onDone={updatecomplaint}
          doneText="Confirm"
        >
          <Select
            options={options}
            onChange={handleselect}
            className="basic-single"
            classNamePrefix="select"
            maxMenuHeight={190}
          ></Select>
        </CustomDialog>
      </div>
      <CustomDialog
        title={details}
        open={Popup}
        selectedValue={""}
        onClose={handlebuttonChange}
        closeText={"close"}
      >
        {<Typography>{firstName}</Typography>}
      </CustomDialog>
      <div>
        {" "}
        <CustomDialog
          title={""}
          open={openup}
          selectedValue={""}
          onClose={handledeleteChange}
          closeText={"close"}
          onDone={(e) => Deletecomplaint(userId)}
          doneText="Confirm"
        ></CustomDialog>
      </div>
      <div>
        <CustomSnackbar
          message={"success"}
          open={opens}
          vertical="bottom"
          horizontal="center"
          handleClose={() => setOpens(false)}
          type={saveType}
        />
      </div>
      <div style={{ height: 550, width: "90%" }}>
        <DataGrid
          onCellClick={(item: any) => setcurrentrow(item)}
          rows={allData}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </div>
    </>
  );
};
export default ComplaintListAdmin;
