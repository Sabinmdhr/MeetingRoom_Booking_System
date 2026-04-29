export interface Announcements {
  id?: number;
  title: string;
  message: string;
  pinned: boolean;
  startDate: string;
  endDate: string;
  read?: boolean;
}

export interface AnnouncementListRequest {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: string;
  pinStatus?: boolean;
}
