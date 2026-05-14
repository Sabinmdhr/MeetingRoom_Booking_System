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
import { useState } from "react";
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
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [sortModel, setSortModel] = useState([
    {
      field: "date",
      sort: "desc" as "asc" | "desc",
    },
  ]);

  const SORT_FIELD_MAP: Record<string, string> = {
    date: "startDate",
    // roomName: "roomName",
    meetingTitle: "meetingTitle",
    startTime: "startTime",
    EndTime: "EndTime",
    meetingType: "meetingType",
    createdBy: "createdBy",
  };

  const {
    columns,
    rows,
    rooms,
    meetingTypes,
    loading,
    totalRows,
    isFiltered,
    fetchPage,
    applyFilters,
    clearFilters,
    exportReport,
  } = useMeetingReportViewModel();

  const disabledSortingColumns = ["roomName", "createdBy", "meetingType"];

  const gridColumns = columns.map((col) => ({
    field: col.id,
    headerName: col.label,
    flex: 1,
    minWidth: 130,
    sortable: !disabledSortingColumns.includes(col.id),
  }));

  const gridRows = rows.map((row, i) => ({ id: i, ...row }));

  const handlePaginationChange = (model: {
    page: number;
    pageSize: number;
  }) => {
    setPaginationModel(model);
    fetchPage(model.page, model.pageSize);
  };

  const handleClear = () => {
    setPaginationModel({ page: 0, pageSize: 10 });
    clearFilters();
  };

  const handleApplyFilters = (payload: any) => {
    setPaginationModel({ page: 0, pageSize: 10 });
    applyFilters(payload);
  };

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
              onClick={handleClear}
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
        onApply={handleApplyFilters}
        meetingTypes={meetingTypes}
        rooms={rooms}
      />

      <div className="meeting-table">
        <div className="meeting-table__grid">
          <DataGrid
            rows={gridRows}
            columns={gridColumns}
            rowCount={totalRows}
            loading={loading}
            pagination
            filterMode="server"
            paginationMode="server"
            sortingMode="server"
            pageSizeOptions={[5, 10, 25]}
            paginationModel={paginationModel}
            sortModel={sortModel}
            onPaginationModelChange={handlePaginationChange}
            onSortModelChange={(model) => {
              // @ts-ignore
              setSortModel(model);

              const sortItem = model[0];

              if (sortItem) {
                const backendField = SORT_FIELD_MAP[sortItem.field];

                fetchPage(
                  paginationModel.page,
                  paginationModel.pageSize,
                  backendField,
                  sortItem.sort || "asc",
                );
              } else {
                fetchPage(
                  paginationModel.page,
                  paginationModel.pageSize,
                  "startDate",
                  "desc",
                );
              }
            }}
            slots={{ toolbar: CustomToolbar }}
            disableRowSelectionOnClick
            disableColumnResize
            autoHeight
            slotProps={{
              loadingOverlay: { noRowsVariant: "skeleton" },
            }}
          />
        </div>
      </div>
    </div>
  );
}
