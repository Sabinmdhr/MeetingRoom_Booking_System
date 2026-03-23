import { Typography, Button, Chip } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
// import { useGridApiRef } from "@mui/x-data-grid";

import { useMeetingTableViewModel } from "../viewmodels/useMeetingReportViewModel";
import "../assets/scss/pages/Report.scss";
import { Download, Funnel } from "lucide-react";
import ReportFilters from "../components/ReportFilters";
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
  const vm = useMeetingTableViewModel();

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
    ...(col.id === "status" && {
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          size="small"
          className="meeting-table__status"
        />
      ),
    }),
  }));

  const rows = vm.rows.map((row, index) => ({
    id: index,
    ...row,
  }));

  return (
    <div>
      <div>
        <div className="meeting-table__main">
          <div>
            <Typography variant="h5">Reports & Analytics</Typography>
            <Typography
              variant="body2"
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
              // onClick={() => apiRef?.current?.exportDataAsCsv()}
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
        {/* <CardContent>
          <div className="meeting-table__header">
            <div>
              <Typography variant="h6">Report Data</Typography>
              <Typography
                variant="body2"
                className="meeting-table__subtitle"
              >
                2026-01-01 to 2026-01-31 • {vm.rows.length} results
              </Typography>
            </div>
          </div>
        </CardContent> */}

        {/* <Divider /> */}

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

                  createdVia: false,
                  createdAt: false,
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
