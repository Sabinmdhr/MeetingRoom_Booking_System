import { useCallback, useEffect, useRef, useState } from "react";
import type {
  Meeting,
  Column,
  DropdownItem,
  ReportPayload,
} from "../models/meetingReport.model";
import {
  fetchReportData,
  exportReports,
  fetchUsers,
  fetchRooms,
  getAllMeetingType,
} from "../services/report.service";

export const COLUMNS: Column[] = [
  { id: "date", label: "Date" },
  { id: "roomName", label: "Room" },
  { id: "meetingTitle", label: "Title" },
  { id: "startTime", label: "Start Time" },
  { id: "EndTime", label: "End Time" },
  { id: "meetingType", label: "Meeting Type" },
  { id: "createdBy", label: "Created By" },
];

const DEFAULT_PAYLOAD: ReportPayload = {
  pageNo: 0,
  pageSize: 10,
  sortBy: "startDate",
  sortDir: "desc",
};

export function useMeetingReportViewModel() {
  const [rows, setRows] = useState<Meeting[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [meetingTypes, setMeetingTypes] = useState<DropdownItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  // Tracks the current active filter params (excluding pagination).
  // This is the source of truth for export and pagination page changes.
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

  // Called when pagination changes — reuses active filters, updates page/size only
  const fetchPage = useCallback(
    (pageNo: number, pageSize: number) => {
      loadPage({ ...activeFilters.current, pageNo, pageSize });
    },
    [loadPage],
  );

  // Called when filters are applied — resets to page 0
  const applyFilters = useCallback(
    (payload: ReportPayload) => {
      const { pageNo, pageSize, ...filters } = payload;
      activeFilters.current = filters;
      setIsFiltered(true);
      loadPage({ ...filters, pageNo: 0, pageSize: pageSize ?? 10 });
    },
    [loadPage],
  );

  // Clears filters, resets to default
  const clearFilters = useCallback(() => {
    activeFilters.current = {
      sortBy: DEFAULT_PAYLOAD.sortBy,
      sortDir: DEFAULT_PAYLOAD.sortDir,
    };
    setIsFiltered(false);
    loadPage(DEFAULT_PAYLOAD);
  }, [loadPage]);

  const exportReport = useCallback(async () => {
    try {
      // Export with active filters but request all rows (large pageSize)
      const blob = await exportReports({
        ...activeFilters.current,
        pageNo: 0,
        pageSize: 10000,
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "meeting-report.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
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

    fetchPage, // for pagination changes
    applyFilters, // for filter drawer apply
    clearFilters, // for clear button
    exportReport,
  };
}
