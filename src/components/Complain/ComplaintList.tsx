import * as React from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
// import rows from "./ComplaintData.json";

const columns: GridColDef[] = [
  { field: "id", headerName: "No", width: 300 },
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
    field: "Status",
    headerName: "Status",
    width: 300,
  },
];
export default function ComplaintList() {
  const [Fdata, setFData] = React.useState([]);
  const [Sdata, setSData] = React.useState([]);

  ///////////////////// FETCH COMPLAINTS ////////////////////////
  const fetchComplaints = async () => {
    // const id = "";
    const complainer = localStorage.getItem("type");
    if (complainer == "STUDENT") {
      const id = localStorage.getItem("studentId");
      console.log("the incoing student Id  value is", id);
      const api = `http://127.0.0.1:8000/api/complaint//person/${id}`;
      await axios
        .get(api)
        .then((res) => {
          // complaintsData();
          console.log("incoming data response", res.data.complaints);
          setFData(res.data.complaints);
        })
        .catch((err) => {
          console.log("Error occured possible cause", err);
        });
    } else if (complainer == "FACULTY") {
      const id = localStorage.getItem("facultyId");
      console.log("the incoing faculty Id  value is", id);
      const api = `http://127.0.0.1:8000/api/complaint/person/${id}`;
      await axios
        .get(api)
        .then((res) => {
          // complaintsData();
          console.log("incoming data response", res.data.complaints);
          setFData(res.data.complaints);
        })
        .catch((err) => {
          console.log("Error occured possible cause", err);
        });
    }
    // const api = `http://127.0.0.1:8000/api/complaint/${complainer}/${id}`;
    // await axios
    //   .get(api)
    //   .then((res) => {
    //     // complaintsData();
    //     console.log("incoming data response", res.data.complaints);
    //     setFData(res.data.complaints);
    //   })
    //   .catch((err) => {
    //     console.log("Error occured possible cause", err);
    //   });
  };
  //--------------------------------------------------------------

  //////////////////////// PROJECTING DATA ////////////////////////

  // const complaintsData = () => {
  //   console.warn("the required data is", Sdata);
  // };

  //---------------------------------------------------------------

  React.useEffect(() => {
    fetchComplaints();
  }, []);
  return (
    <div style={{ height: 550, width: "90%" }}>
      <DataGrid
        rows={Fdata}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}
