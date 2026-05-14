// Shape of a single announcement returned from the API
export interface Announcement {
  id?: number;
  title: string;
  message: string;
  pinned: boolean;
  startDate: string;
  endDate: string;
  modifiedAt?: string;
  authorName?: string;
  read?: boolean;
}

// Params we send when fetching a paginated list of announcements
export interface AnnouncementListRequest {
  pageNo?: number;
  pageSize?: number;
  sortBy?: string;
  sortDir?: string;
  pinStatus?: boolean;
}
