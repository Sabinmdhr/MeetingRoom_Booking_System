import { useEffect, useState } from "react";
import type { Meeting, Column } from "../models/meetingReport.model";
import { exportReports, getAllReports } from "../services/report.service";

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
  const [reportData, setReportData] = useState<Meeting[]>([]);

  const [exportReportData, setExportReportData] = useState([]);

  const fetchReports = async () => {
    const res = await getAllReports();
    setRows(res.data);
    // console.log(res);
  };

  const exportReport = async () => {
    const res = await exportReports();

    const data = res.data;
    console.log(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return {
    columns,
    rows,
    reportData,
    setReportData,
    exportReport,
    exportReportData,
    setExportReportData,
  };
}
