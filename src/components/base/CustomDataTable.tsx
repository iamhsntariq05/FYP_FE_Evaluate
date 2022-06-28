import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

interface TableProps {
  rows: any;
  columns: any;
  height?: any;
  size?: number | undefined;
}
export default function DataTable(props: TableProps) {
  // destructing table props
  const { rows, columns } = props;
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rowHeight={props.height ? props.height : 50}
        rows={rows}
        columns={columns}
        pageSize={props.size ? props.size : 5}
        rowsPerPageOptions={[props.size ? props.size : 5]}
        disableSelectionOnClick
        // getRowHeight={() => "auto"}
        // onCellClick={currentlySelected}
      />
    </div>
  );
}
