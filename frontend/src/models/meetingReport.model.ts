// export interface Meeting {
//   EndTime: string;
//   createdBy: string;
//   date: string;
//   meetingTitle: string;
//   roomName: string;
//   startTime: string;
// }

// export interface Column {
//   id:
//     | "EndTime"
//     | "createdBy"
//     | "date"
//     | "meetingTitle"
//     | "roomName"
//     | "startTime";
//   label: string;
// }

export interface Meeting {
  EndTime: string;
  createdBy: string;
  date: string;
  meetingTitle: string;
  meetingType: string;
  roomName: string;
  startTime: string;
}

export interface Column {
  id: keyof Meeting;
  label: string;
}

export interface DropdownItem {
  id: number;
  label: string;
}

export interface ReportFilters {
  department: number | "";
  room: number | "";
  user: number | "";
  meetingType: number | "";
  startDate: string;
  endDate: string;
}

export interface ReportPayload {
  pageNo: number;
  pageSize: number;
  sortBy: string;
  sortDir: string;
  startDate?: string;
  endDate?: string;
  meetingTypeId?: number;
  
  roomName?: string;
  createdBy?: string;
  department?: number;
}
