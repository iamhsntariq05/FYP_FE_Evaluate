import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import CustomDataTable from "../base/CustomDataTable";

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  changeTab?: Function;
}
export const VeiwEvaluatorTeams: React.FC<Props> = (props) => {
  const [rows, setRows] = useState<any>([]);
  const baseURL = "http://localhost:8000/api";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(`${baseURL}/scheduler/all-evaluator-teams`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const teams = data.teams.map((team: any) => {
        const id = team._id;
        return {
          id,
          name: team.name,
          faculty: team.faculty,
          group: team.group,
        };
      });
      setRows(teams);
    };
    getData();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 400 },
    { field: "name", headerName: "Team Name", width: 400 },
    {
      field: "faculty",
      headerName: "Members",
      width: 400,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {params?.value?.map((val: any, i: any) => {
              return (
                <div
                  style={{ lineHeight: "17px" }}
                  key={i}
                >{`${val.firstName} ${val.lastName}`}</div>
              );
            })}
          </div>
        );
      },
    },
    {
      field: "group",
      headerName: "Groups",
      width: 400,
      renderCell: (params) => {
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {params?.value?.map((val: any, i: any) => {
              return <div style={{ lineHeight: "17px" }} key={i}>{`${val.name}`}</div>;
            })}
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <CustomDataTable height={60} rows={rows} columns={columns} size={7} />
    </div>
  );
};
