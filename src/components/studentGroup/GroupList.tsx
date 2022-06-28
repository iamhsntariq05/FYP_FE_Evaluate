import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import { Tooltip, IconButton, Menu, MenuItem, Button, AlertColor } from "@mui/material";
import { GridCellValue, GridColDef } from "@mui/x-data-grid";
import { getAllGroups, joinRequestGroup } from "src/features/groups/groupActions";
import { groupSelector } from "src/features/groups/groupSlice";
import { sendGlobalNotification } from "src/sevices/notification";
import { CustomButton } from "../base/CustomButton";
import CustomFilterDataTable from "../base/CustomFilterDataTable";

export default function GroupList({ setOpenS, setType, setMessage }: any) {
  const [rows, setRows] = useState<any[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [leaderId, setLeaderId] = React.useState<string>("");
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const { groups, groupsSuccessful, groupsFailed, groupApplyFailedMessage, groupApplySuccessful } =
    useSelector(groupSelector);

  React.useMemo(() => {
    if (rows.length > 0) return;
    const getData = async () => {
      await dispatch(getAllGroups());
    };
    getData();
    if (groups) {
      let index = 1;
      const st: any = groups.map(({ _id, name, leaderId, creationDate }) => {
        const id = _id;
        const sr = index;
        const date = creationDate.toString().split("T")[0];
        const leaderName = leaderId ? `${leaderId?.firstName} ${leaderId?.lastName}` : "";
        const leaderReg = leaderId ? `${leaderId?.regNo}` : "";
        index++;
        setLeaderId(leaderId._id);
        return {
          id,
          sr,
          name,
          leaderName,
          leaderReg,
          date,
        };
      });
      setRows(st);
    }
  }, [groups]);
  const handleApply = async (id: any) => {
    console.log(id);

    const stId = localStorage.getItem("id");
    await dispatch(joinRequestGroup(id, stId ? stId : "62341b1c3258c3a5cc4b3352"));
    // send notification to group leader
    sendGlobalNotification(
      leaderId, //userid
      `Group Request received from student ${stId ? stId : "62341b1c3258c3a5cc4b3352"}` //msg
    );
    if (groupApplySuccessful) {
      setMessage("Applied to project successfully!");
      setOpenS(true);
    } else {
      setType("error");
      setMessage(groupApplyFailedMessage || "You've already applied for this group!");
      setOpenS(true);
    }
  };
  const columns: GridColDef[] = [
    { field: "sr", headerName: "SrNo", width: 120 },
    { field: "name", headerName: "Group Name", width: 280 },
    { field: "leaderName", headerName: "Group Leader Name", width: 280 },
    { field: "leaderReg", headerName: "Group Leader Registration", width: 280 },
    {
      field: "date",
      headerName: "Proposed Date",
      width: 190,
    },
    {
      field: "apply",
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
          // history.push({ pathname: "/rubric-list", state: thisRow?.rubric });
          // if (str === "join") {
          // apply for a project
          // alert("Successfully applied for a project");
          console.log(thisRow, params.id);
          return;
          handleApply(params.id);
          handleCloseMenu();
        };
        return (
          <>
            <CustomButton handleClick={onClick} loading={false} text={"Join Group"} />
          </>
        );
      },
    },
    // {
    //   field: "apply",
    //   headerName: "",
    //   sortable: false,
    //   width: 100,
    //   renderCell: (params) => {
    //     const onClick = (e: any, str: string) => {
    //       e.stopPropagation(); // don't select this row after clicking

    //       const { api } = params;
    //       const thisRow: Record<string, GridCellValue> = {};

    //       api
    //         .getAllColumns()
    //         .filter((c) => c.field !== "__check__" && Boolean(c))
    //         .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));
    //       // history.push({ pathname: "/rubric-list", state: thisRow?.rubric });
    //       if (str === "join") {
    //         // apply for a project
    //         // alert("Successfully applied for a project");
    //         console.log(thisRow, params.id);
    //         return;
    //         handleApply(params.id);
    //         handleCloseMenu();
    //       }
    //     };
    //     return (
    //       <>
    //         <Tooltip title="Action">
    //           <IconButton onClick={handleClick}>
    //             <LinearScaleIcon />
    //           </IconButton>
    //         </Tooltip>

    //         <Menu
    //           id="demo-positioned-menu"
    //           aria-labelledby="demo-positioned-button"
    //           anchorEl={anchorEl}
    //           open={openMenu}
    //           onClose={handleCloseMenu}
    //           anchorOrigin={{
    //             vertical: "top",
    //             horizontal: "left",
    //           }}
    //           transformOrigin={{
    //             vertical: "top",
    //             horizontal: "left",
    //           }}
    //         >
    //           <MenuItem onClick={handleCloseMenu}>
    //             <Button
    //               variant="text"
    //               startIcon={<GroupAddIcon />}
    //               onClick={(e) => onClick(e, "join")}
    //             >
    //               Join Request
    //             </Button>
    //           </MenuItem>
    //         </Menu>
    //       </>
    //     );
    //   },
    // },
  ];
  return (
    <div style={{ width: "100%" }}>
      <CustomFilterDataTable
        rows={rows}
        columns={columns}
        // pageSize={pageSize}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        // rowsPerPageOptions={[5, 10, 20]}
        // components={{
        //   Toolbar: GridToolbar,
        // }}
      />{" "}
    </div>
  );
}
