import { useState } from "react";
import type { Meeting, Column } from "../models/meetingReport.model";

export const columns: Column[] = [
  { id: "status", label: "Status" },
  { id: "room", label: "Room" },
  { id: "title", label: "Title" },
  { id: "start", label: "Start" },
  { id: "end", label: "End" },
  { id: "duration", label: "Duration" },
  { id: "user", label: "User" },
  { id: "department", label: "Department" },
  { id: "createdVia", label: "Created Via" },
  { id: "createdAt", label: "Created At" },
];

const initialRows: Meeting[] = [
  {
    status: "current",
    room: "Conference Room 2B",
    title: "Sprint Planning",
    start: "2026-01-23 12:45",
    end: "2026-01-23 13:45",
    duration: "01:00",
    user: "David Kim",
    department: "Engineering",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Conference Room 2B",
    title: "Client Presentation",
    start: "2026-01-23 10:45",
    end: "2026-01-23 11:17",
    duration: "00:32",
    user: "Michael Chen",
    department: "Sales",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Executive Room 3A",
    title: "Budget Review",
    start: "2026-01-23 11:18",
    end: "2026-01-23 11:30",
    duration: "00:12",
    user: "James Taylor",
    department: "Finance",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Executive Room 3A",
    title: "Q1 Planning Meeting",
    start: "2026-01-23 08:45",
    end: "2026-01-23 09:45",
    duration: "01:00",
    user: "Sarah Johnson",
    department: "Engineering",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Meeting Room 1C",
    title: "Marketing Strategy",
    start: "2026-01-23 14:45",
    end: "2026-01-23 15:45",
    duration: "01:00",
    user: "Amanda Wilson",
    department: "Marketing",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Meeting Room 1C",
    title: "Design Review",
    start: "2026-01-23 11:45",
    end: "2026-01-23 12:00",
    duration: "00:15",
    user: "Emily Rodriguez",
    department: "Engineering",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Meeting Room 1C",
    title: "Team Standup",
    start: "2026-01-23 11:18",
    end: "2026-01-23 11:30",
    duration: "00:12",
    user: "Jennifer Williams",
    department: "Product",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Meeting Room 1C",
    title: "Team Standup",
    start: "2026-01-23 11:18",
    end: "2026-01-23 11:30",
    duration: "00:12",
    user: "Jennifer Williams",
    department: "Product",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Meeting Room 1C",
    title: "Team Standup",
    start: "2026-01-23 11:18",
    end: "2026-01-23 11:30",
    duration: "00:12",
    user: "Jennifer Williams",
    department: "Product",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Meeting Room 1C",
    title: "Team Standup",
    start: "2026-01-23 11:18",
    end: "2026-01-23 11:30",
    duration: "00:12",
    user: "Jennifer Williams",
    department: "Product",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Meeting Room 1C",
    title: "Team Standup",
    start: "2026-01-23 11:18",
    end: "2026-01-23 11:30",
    duration: "00:12",
    user: "Jennifer Williams",
    department: "Product",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
  {
    status: "current",
    room: "Meeting Room 1C",
    title: "Team Standup",
    start: "2026-01-23 11:18",
    end: "2026-01-23 11:30",
    duration: "00:12",
    user: "Jennifer Williams",
    department: "Product",
    createdVia: "desktop",
    createdAt: "2026-01-23 11:08",
  },
];

export function useMeetingTableViewModel() {
  const [rows] = useState<Meeting[]>(initialRows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const paginatedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    columns,
    rows,
    paginatedRows,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}
