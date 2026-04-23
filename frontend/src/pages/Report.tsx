import { Typography } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import { useMeetingReportViewModel } from "../viewmodels/useMeetingReportViewModel";
import "../assets/scss/pages/Report.scss";
import { Download, Funnel, X } from "lucide-react";
import ReportFilters from "../components/Reports/ReportFilters";
import { useEffect, useState } from "react";
import MyButton from "../components/ui/Button";

function CustomToolbar() {
  return (
    <GridToolbarContainer className="meeting-table__toolbar">
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

export default function Report() {
  const [filterOpen, setFilterOpen] = useState(false);
  const {
    columns,
    rows,
    filterReports,
    exportReport,
    isFiltered,
    fetchReports,
    // users,
    rooms,
    meetingTypes,
  } = useMeetingReportViewModel();

  useEffect(() => {
    const timer = setTimeout(
      () => window.dispatchEvent(new Event("resize")),
      350,
    );
    return () => clearTimeout(timer);
  }, []);

  const gridColumns = columns.map((col) => ({
    field: col.id,
    headerName: col.label,
    flex: 1,
    minWidth: 130,
  }));

  const gridRows = rows.map((row, i) => ({ id: i, ...row }));

  return (
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
          {isFiltered && (
            <MyButton
              onClick={fetchReports}
              variant="outlined"
              text="Clear"
              startIcon={<X size={16} />}
              color="error"
              size="small"
            />
          )}
          <MyButton
            variant="outlined"
            onClick={() => setFilterOpen(true)}
            startIcon={<Funnel size={16} />}
            text="Filters"
            customVariant="ghost"
          />
          <MyButton
            variant="contained"
            onClick={exportReport}
            startIcon={<Download size={16} />}
            color="success"
            text="Export"
          />
        </div>
      </div>

      <ReportFilters
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={filterReports}
        meetingTypes={meetingTypes}
        rooms={rooms}
      />

      <div className="meeting-table">
        <div className="meeting-table__grid">
          <DataGrid
            rows={gridRows}
            columns={gridColumns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
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
