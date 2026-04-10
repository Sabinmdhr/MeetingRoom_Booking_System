import { useEffect, useState } from "react";
import type { Meeting, Column } from "../models/meetingReport.model";
import {
  exportReports,
  filterReport,
  getAllReports,
  fetchUser,
  fetchRoom,
  fetchDepartment,
} from "../services/report.service";

export const columns: Column[] = [
  { id: "roomName", label: "Room" },
  { id: "meetingTitle", label: "Title" },
  { id: "startTime", label: "Start Time" },
  { id: "EndTime", label: "End Time" },
  { id: "createdBy", label: "Created By" },
  { id: "date", label: "Date" },
];

export function useMeetingReportViewModel() {
  const [rows, setRows] = useState<Meeting[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [users, setUsers] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);

  const fetchReports = async () => {
    try {
      const res = await getAllReports();
      setRows(res.data);
      setIsFiltered(false);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  const filterReports = async (filters: any) => {
    try {
      const res = await filterReport(filters);
      setRows(res ?? []);
      setIsFiltered(true);
    } catch (error) {
      console.error("Filter failed", error);
    }
  };

  const exportReport = async () => {
    try {
      const blob = await exportReports();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "meeting-report.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const [userRes, roomRes, deptRes] = await Promise.all([
        fetchUser(),
        fetchRoom(),
        fetchDepartment(),
      ]);

      setUsers(userRes.data.content?.map((u: any) => u.firstname) ?? []);
      setRooms(roomRes.data?.map((r: any) => r.roomName) ?? []);
      setDepartments(deptRes.data?.map((d: any) => d.departmentName) ?? []);
    } catch (error) {
      console.error("Failed to load filter options", error);
    }
  };
  useEffect(() => {
    fetchReports();
    loadFilterOptions();
  }, []);

  return {
    columns,
    rows,
    filterReports,
    exportReport,
    isFiltered,
    fetchReports,
    users,
    rooms,
    departments,
  };
}
