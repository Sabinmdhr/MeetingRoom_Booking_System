export interface Meeting {
  status: string;
  room: string;
  title: string;
  start: string;
  end: string;
  duration: string;
  user: string;
  department: string;
}

export interface Column {
  id:
    | "status"
    | "room"
    | "title"
    | "start"
    | "end"
    | "duration"
    | "user"
    | "department";
  label: string;
}
