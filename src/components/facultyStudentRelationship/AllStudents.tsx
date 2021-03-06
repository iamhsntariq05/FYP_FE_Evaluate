import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Grid, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { DataGrid, GridCellValue, GridColDef, GridMoreVertIcon } from "@mui/x-data-grid";
import { getAllFaculty } from "src/features/faculty/facultyActions";
import { facultySelector } from "src/features/faculty/facultySlice";
import {
  deleteStudents,
  getStudents,
} from "src/features/facultyStudentRelationship/templateActions";
import { getAllTemplates } from "src/features/template/templateActions";
import ConfirmationDialog from "../base/ConfirmationDialog";
import { CustomTypography } from "../base/CustomTypography";

export default function AllStudents() {
  const [students, setStudents] = React.useState([]);
  const [facId, setFac] = React.useState<any>("");
  const [fac, setFaculties] = React.useState<any[]>([]);
  const { faculties } = useSelector(facultySelector);

  React.useEffect(() => {
    const getFaculty = async () => {
      try {
        // pass the function in dispatch
        await dispatch(getAllFaculty());
      } catch (er) {}
    };
    getFaculty();
  }, []);

  React.useEffect(() => {
    if (faculties) {
      const st: any[] = faculties.map(({ _id, firstName, lastName }) => {
        const id = _id;
        return {
          id,
          title: `${firstName} ${lastName}`,
        };
      });
      console.log(st);
      setFaculties(st);
    }
  }, [faculties]);

  React.useEffect(() => {
    if (facId) getStudentsByFacultyId();
  }, [facId]);
  const getStudentsByFacultyId = async () => {
    const data = await getStudents(facId);
    console.log(data);
    if (data) {
      setStudents(
        data?.data.map((item: any) => {
          return {
            ...item.student,
            id: item.group._id,
          };
        })
      );
    }
    console.log(data);
  };
  // useDispatch in case of calling an API
  const dispatch = useDispatch();
  // useSelector to get any state in the store

  const getTemps = async () => {
    try {
      // pass the function in dispatch
      await dispatch(getAllTemplates());
      // console.log(templatesSuccessful);
    } catch (er) {
      // console.log(templatesFailed);
    }
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currRow, setCurrRow] = React.useState<any>(null);
  // form dialog for delete
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleClickOpenDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
  };
  const handleDelete = async () => {
    handleCloseDelete();
    // delete call
    try {
      await deleteStudents([currRow.id]);
      getStudentsByFacultyId();
    } catch (error) {}
  };
  const open = Boolean(anchorEl);

  // form dialog for update
  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false);

  const handleClickOpenUpdate = () => {
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdateDialog(false);
  };
  const [uvalues, setUValues] = React.useState<any>({
    title: "",
    // deadline: new Date(),
  });
  const handleChangeU = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUValues({ ...uvalues, [prop]: event.target.value });
  };
  const options = ["Delete"];

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 270 },

    {
      field: "firstName",
      headerName: "FirstName",
      width: 270,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 270,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 270,
      editable: true,
    },
    // {
    //   field: "deliverableName",
    //   headerName: "Deliverable",
    //   width: 270,
    //   editable: true,
    // },
    // {
    //   field: "deliverableDeadline",
    //   headerName: "Deadline",
    //   width: 300,
    //   editable: true,
    // },
    {
      field: "manage",
      // renderHeader: () => null,
      headerName: "Manage",
      sortable: false,
      width: 130,
      renderCell: (params) => {
        const handleClose = (e: any, val: string) => {
          e.stopPropagation(); // don't select this row after clicking

          const { api } = params;
          const thisRow: Record<string, GridCellValue> = {};

          api
            .getAllColumns()
            .filter((c: any) => c.field !== "__check__" && Boolean(c))
            .forEach((c: any) => (thisRow[c.field] = params.getValue(params.id, c.field)));
          setCurrRow(thisRow);
          // console.log(thisRow, val);
          setAnchorEl(null);
          if (val === "Delete") {
            handleClickOpenDelete();
          }
        };
        const handleClick = (event: React.MouseEvent<HTMLElement>) => {
          setAnchorEl(event.currentTarget);
        };
        return (
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <GridMoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 40 * 4.5,
                  width: "10ch",
                },
              }}
            >
              {options.map((option) => (
                <MenuItem key={option} onClick={(e: any) => handleClose(e, option)}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        );
      },
    },
  ];
  const handleChangeFac = (value: any, e: any) => {
    if (value) setFac(value.id);
  };
  return (
    <>
      <Grid sx={{ mb: "1rem" }} item xs={3} sm={3}>
        <Autocomplete
          id="free-solo-demo"
          options={fac}
          getOptionLabel={(option) => option.title}
          onChange={(e: any, value: any) => handleChangeFac(value, e)}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" label="Select Faculties" />
          )}
        />
      </Grid>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={students}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          // components={{
          //   Toolbar: GridToolbar,
          // }}
        />

        {/* Delete Popup */}
        <ConfirmationDialog
          title="Delete Template"
          handleClose={handleCloseDelete}
          open={openDeleteDialog}
          handleSubmit={handleDelete}
          closeText="Cancel"
          doneText="Confirm"
        >
          <div style={{ padding: "1rem" }}>
            <CustomTypography
              text="Are you sure you want to delete the student?"
              variant="h6"
              component="h6"
            />
          </div>
        </ConfirmationDialog>
      </div>
    </>
  );
}
