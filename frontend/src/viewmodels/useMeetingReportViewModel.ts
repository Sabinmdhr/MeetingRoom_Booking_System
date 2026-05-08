import { useEffect, useState } from "react";
import type {
  Meeting,
  Column,
  DropdownItem,
  ReportPayload,
} from "../models/meetingReport.model";
import {
  exportReports,
  filterReport,
  getAllReports,
  fetchUser,
  fetchRoom,
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

export function useMeetingReportViewModel() {
  const [rows, setRows] = useState<Meeting[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  // const [users, setUsers] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [meetingTypes, setMeetingTypes] = useState<DropdownItem[]>([]);
  const [lastFilter, setLastFilter] = useState<ReportPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);

  const defaultPayload: ReportPayload = {
    pageNo: 0,
    pageSize: 10,
    sortBy: "startDate",
    sortDir: "asc",
  };
  // console.log(rows.length);

  // const fetchReports = async () => {
  //   try {
  //     const res = await getAllReports();
  //     setRows(res.data ?? []);
  //     // console.log(res);

  //     setIsFiltered(false);
  //     setLastFilter(null);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error("Error fetching reports", err);
  //   }
  // };

  const fetchReports = async (payload: ReportPayload) => {
    try {
      setLoading(true);

      const data = await filterReport(payload);

      setRows(data?.content ?? []);
      setTotalRows(data?.totalElements ?? 0);

      // setLastFilter(payload);
      setIsFiltered(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterReports = async (payload: ReportPayload) => {
    try {
      setLoading(true);
      const data = await filterReport(payload);
      setRows(data?.content ?? []);
      setTotalRows(data?.totalElements ?? 0);
      setIsFiltered(true);
      setLastFilter(payload);
    } catch (err) {
      console.error("Filter failed", err);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = async () => {
    try {
      const blob = await exportReports(lastFilter ?? defaultPayload);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "meeting-report.csv";

      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const [userRes, roomRes, typeRes] = await Promise.all([
          fetchUser(),
          fetchRoom(),

          getAllMeetingType(),
        ]);

        // setUsers(userRes.data.content?.map((u: any) => u.lastname) ?? []);
        // console.log("roomRes", roomRes);
        setRooms(roomRes.map((r: any) => r.roomName));
        setMeetingTypes(
          typeRes.data?.map((m: any) => ({ id: m.id, label: m.name })) ?? [],
        );
        setLoading(false);
      } catch (err) {
        console.error("Failed to load filter options", err);
      }
    };

    fetchReports(defaultPayload);
    load();
  }, []);

  return {
    columns: COLUMNS,
    rows,
    isFiltered,
    meetingTypes,
    // users,
    rooms,
    fetchReports,
    filterReports,
    exportReport,
    loading,

    totalRows,
    lastFilter,
  };
}
