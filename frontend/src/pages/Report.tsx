import { Typography, Button } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
// import { useGridApiRef } from "@mui/x-data-grid";

import { useMeetingReportViewModel } from "../viewmodels/useMeetingReportViewModel";
import "../assets/scss/pages/Report.scss";
import { Download, Funnel } from "lucide-react";
import ReportFilters from "../components/Reports/ReportFilters";
import { useEffect, useState } from "react";

function CustomToolbar() {
  return (
    <GridToolbarContainer className="meeting-table__toolbar">
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

export default function MeetingTable() {
  const [filter, setFilter] = useState(false);
  const vm = useMeetingReportViewModel();

  // const apiRef = useGridApiRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 350); // match sidebar transition

    return () => clearTimeout(timer);
  }, []);

  const columns = vm.columns.map((col) => ({
    field: col.id,
    headerName: col.label,
    flex: 1,
    minWidth: 130,
  }));

  const rows = vm.rows.map((row, index) => ({
    id: index,
    ...row,
  }));

  return (
    <div>
      <div>
        <div className="meeting-table__main">
          <div className="titleDesc">
            <Typography variant="h1">Reports & Analytics</Typography>
            <Typography
              variant="subtitle1"
              className="meeting-table__subtitle"
            >
              View and export reservation data
            </Typography>
          </div>
          <div className="meeting-table__buttons">
            <Button
              onClick={() => setFilter(!filter)}
              variant="outlined"
              className={`meeting-table__buttons__filter ${filter ? "active" : ""}`}
            >
              <Funnel size={16} /> Filters
            </Button>
            <Button
              variant="outlined"
              className="meeting-table__buttons__export"
              onClick={() => vm.exportReport()}
            >
              <Download size={16} /> Export
            </Button>
          </div>
        </div>
        <ReportFilters
          open={filter}
          onClose={() => setFilter(false)}
        />
      </div>

      <div className="meeting-table">
        <div className="meeting-table__grid">
          <DataGrid
            rows={rows}
            columns={columns}
            // apiRef={apiRef}
            // columnHeaderHeight={40}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              columns: {
                columnVisibilityModel: {
                  // status: false,
                },
              },
            }}
            slots={{ toolbar: CustomToolbar }}
            disableRowSelectionOnClick
            disableColumnResize
            autoHeight
            disableColumnFilter
          />
        </div>
      </div>
    </div>
  );
}
