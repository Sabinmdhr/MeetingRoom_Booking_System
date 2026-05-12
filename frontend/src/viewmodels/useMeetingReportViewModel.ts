import { useCallback, useEffect, useRef, useState } from "react";
import type {
  Meeting,
  Column,
  DropdownItem,
  ReportPayload,
} from "../models/meetingReport.model";
import {
  fetchReportData,
  fetchUsers,
  fetchRooms,
  getAllMeetingType,
} from "../services/report.service";

export const COLUMNS: Column[] = [
  { id: "date",        label: "Date" },
  { id: "roomName",    label: "Room" },
  { id: "meetingTitle",label: "Title" },
  { id: "startTime",   label: "Start Time" },
  { id: "EndTime",     label: "End Time" },
  { id: "meetingType", label: "Meeting Type" },
  { id: "createdBy",   label: "Created By" },
];

const DEFAULT_PAYLOAD: ReportPayload = {
  pageNo: 0,
  pageSize: 10,
  sortBy: "startDate",
  sortDir: "desc",
};

// Builds a CSV from JSON rows using COLUMNS as the schema.
// Column order and labels always mirror the DataGrid table.
function buildCsv(rows: Meeting[]): string {
  const escape = (val: string) =>
    val.includes(",") || val.includes("\n") || val.includes('"')
      ? `"${val.replace(/"/g, '""')}"`
      : val;

  const header = COLUMNS.map((c) => c.label).join(",");
  const body = rows
    .map((row) => COLUMNS.map((c) => escape(String(row[c.id] ?? ""))).join(","))
    .join("\n");

  return `${header}\n${body}`;
}

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function useMeetingReportViewModel() {
  const [rows, setRows] = useState<Meeting[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [meetingTypes, setMeetingTypes] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  const activeFilters = useRef<Omit<ReportPayload, "pageNo" | "pageSize">>({
    sortBy: DEFAULT_PAYLOAD.sortBy,
    sortDir: DEFAULT_PAYLOAD.sortDir,
  });

  const loadPage = useCallback(async (payload: ReportPayload) => {
    try {
      setLoading(true);
      const data = await fetchReportData(payload);
      setRows(data?.content ?? []);
      setTotalRows(data?.totalElements ?? 0);
    } catch (err) {
      console.error("Failed to load reports:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPage = useCallback(
    (pageNo: number, pageSize: number) => {
      loadPage({ ...activeFilters.current, pageNo, pageSize });
    },
    [loadPage],
  );

  const applyFilters = useCallback(
    (payload: ReportPayload) => {
      const { pageNo: _p, pageSize: _s, ...filters } = payload;
      activeFilters.current = filters;
      setIsFiltered(true);
      loadPage({ ...filters, pageNo: 0, pageSize: 10 });
    },
    [loadPage],
  );

  const clearFilters = useCallback(() => {
    activeFilters.current = {
      sortBy: DEFAULT_PAYLOAD.sortBy,
      sortDir: DEFAULT_PAYLOAD.sortDir,
    };
    setIsFiltered(false);
    loadPage(DEFAULT_PAYLOAD);
  }, [loadPage]);

  // Fetches all matching rows as JSON (reusing the same /reports endpoint),
  // then builds a CSV on the frontend so columns match the table exactly —
  // including Meeting Type, which the backend /export endpoint omits.
  const exportReport = useCallback(async () => {
    try {
      const data = await fetchReportData({
        ...activeFilters.current,
        pageNo: 0,
        pageSize: 100000,
      });

      const csv = buildCsv(data?.content ?? []);
      downloadCsv(csv, `meeting-report-${new Date().toISOString().slice(0, 10)}.csv`);
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const [userRes, roomRes, typeRes] = await Promise.all([
          fetchUsers(),
          fetchRooms(),
          getAllMeetingType(),
          loadPage(DEFAULT_PAYLOAD),
        ]);
        setRooms(roomRes.map((r: any) => r.roomName));
        setMeetingTypes(
          typeRes.data?.map((m: any) => ({ id: m.id, label: m.name })) ?? [],
        );
      } catch (err) {
        console.error("Failed to initialize report page:", err);
      }
    };
    init();
  }, []);

  return {
    columns: COLUMNS,
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
  };
}