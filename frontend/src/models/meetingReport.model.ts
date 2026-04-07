export interface Meeting {
  EndTime: string;
  createdBy: string;
  date: string;
  meetingTitle: string;
  roomName: string;
  startTime: string;
}

export interface Column {
  id:
    | "EndTime"
    | "createdBy"
    | "date"
    | "meetingTitle"
    | "roomName"
    | "startTime";
  label: string;
}
