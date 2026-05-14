import { useEffect, useRef, useState, useCallback } from "react";
import { toast } from "react-toastify";
import type { Announcement } from "../models/announcements.model";
import {
  getAnnouncement,
  getScheduledAnnouncement,
  markAsRead,
  deleteAnnouncement,
  deleteBulk,
  updatePinStatus,
} from "../services/announcements.service";

const PINNED_LIMIT = 5;
const PAGE_SIZE = 10;

const useAnnouncementCardViewModel = () => {
  const [pinnedData, setPinnedData] = useState<Announcement[]>([]);
  const [unpinnedData, setUnpinnedData] = useState<Announcement[]>([]);
  const [scheduledAnnouncements, setScheduledAnnouncements] = useState<Announcement[]>([]);
  const [hasMoreUnpinned, setHasMoreUnpinned] = useState(false);
  const [hasMoreScheduled, setHasMoreScheduled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Using refs for page numbers so incrementing them doesn't cause re-renders
  const unpinnedPageRef = useRef(1);
  const scheduledPageRef = useRef(1);

  // Busy flags prevent duplicate fetches if the user clicks "Show More" quickly
  const unpinnedBusyRef = useRef(false);
  const scheduledBusyRef = useRef(false);

  //  FETCH: PINNED 
  // Returns the number of pinned items loaded so the unpinned fetch can
  // adjust its page size to keep the combined first view at PAGE_SIZE items
  const fetchPinnedAnnouncements = useCallback(async (): Promise<number> => {
    try {
      const res = await getAnnouncement({
        pageNo: 0,
        pageSize: PINNED_LIMIT,
        sortBy: "modifiedAt",
        sortDir: "desc",
        pinStatus: true,
      });
      const content: Announcement[] = res.data?.content ?? [];
      setPinnedData(content);
      return content.length;
    } catch (err) {
      console.error("Failed to fetch pinned announcements", err);
      return 0;
    }
  }, []);

  //  FETCH: UNPINNED 
  // mode "reset" — reload from page 0 (initial load or after a refresh)
  // mode "more"  — append the next page (Show More button)
  const fetchUnpinnedAnnouncements = useCallback(
    async (mode: "reset" | "more", pinnedCount = 0) => {
      if (unpinnedBusyRef.current) return;
      unpinnedBusyRef.current = true;

      try {
        const pageNo = mode === "reset" ? 0 : unpinnedPageRef.current;

        // On the first load we want pinned + unpinned to total PAGE_SIZE,
        // so we shrink the unpinned page by however many pinned items loaded
        const pageSize = mode === "reset"
          ? Math.max(PAGE_SIZE - pinnedCount, 0)
          : PAGE_SIZE;

        const res = await getAnnouncement({
          pageNo,
          pageSize,
          sortBy: "modifiedAt",
          sortDir: "desc",
          pinStatus: false,
        });

        const content: Announcement[] = res.data?.content ?? [];
        const total: number = res.data?.totalElements ?? 0;

        if (mode === "reset") {
          setUnpinnedData(content);
          unpinnedPageRef.current = 1;
          setHasMoreUnpinned(content.length < total);
        } else {
          setUnpinnedData((prev) => {
            // Filter out duplicates in case the same item appears on two pages
            const existingIds = new Set(prev.map((x) => x.id));
            const fresh = content.filter((x) => !existingIds.has(x.id));
            const next = [...prev, ...fresh];
            setHasMoreUnpinned(next.length < total);
            return next;
          });
          unpinnedPageRef.current += 1;
        }
      } catch (err) {
        console.error("Failed to fetch unpinned announcements", err);
      } finally {
        unpinnedBusyRef.current = false;
      }
    },
    [],
  );

  //  FETCH: SCHEDULED 
  const fetchScheduledAnnouncements = useCallback(
    async (mode: "reset" | "more" = "reset") => {
      if (scheduledBusyRef.current) return;
      scheduledBusyRef.current = true;

      try {
        const pageNo = mode === "reset" ? 0 : scheduledPageRef.current;

        const res = await getScheduledAnnouncement({
          pageNo,
          pageSize: PAGE_SIZE,
          sortBy: "modifiedAt",
          sortDir: "desc",
        });

        const content: Announcement[] = res?.content ?? [];
        const total: number = res?.totalElements ?? 0;

        if (mode === "reset") {
          setScheduledAnnouncements(content);
          scheduledPageRef.current = 1;
          setHasMoreScheduled(content.length < total);
        } else {
          setScheduledAnnouncements((prev) => {
            const existingIds = new Set(prev.map((x) => x.id));
            const fresh = content.filter((x) => !existingIds.has(x.id));
            const next = [...prev, ...fresh];
            setHasMoreScheduled(next.length < total);
            return next;
          });
          scheduledPageRef.current += 1;
        }
      } catch (err) {
        console.error("Failed to fetch scheduled announcements", err);
      } finally {
        scheduledBusyRef.current = false;
      }
    },
    [],
  );

  //  INITIAL LOAD 
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const pinnedCount = await fetchPinnedAnnouncements();
      // Fetch unpinned and scheduled in parallel to save time
      await Promise.all([
        fetchUnpinnedAnnouncements("reset", pinnedCount),
        fetchScheduledAnnouncements("reset"),
      ]);
      setLoading(false);
    };
    init();
  }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements, fetchScheduledAnnouncements]);

  //  REFRESH HELPERS 

  // Full refresh — reloads all three lists from page 0
  const refreshAll = useCallback(async () => {
    // Release busy flags in case a previous fetch was interrupted mid-way
    unpinnedBusyRef.current = false;
    scheduledBusyRef.current = false;
    const pinnedCount = await fetchPinnedAnnouncements();
    await Promise.all([
      fetchUnpinnedAnnouncements("reset", pinnedCount),
      fetchScheduledAnnouncements("reset"),
    ]);
  }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements, fetchScheduledAnnouncements]);

  // Partial refresh — used when pin/unpin happens on the scheduled tab
  const refreshPinnedAndScheduled = useCallback(async () => {
    scheduledBusyRef.current = false;
    const pinnedCount = await fetchPinnedAnnouncements();
    await Promise.all([
      fetchUnpinnedAnnouncements("reset", pinnedCount),
      fetchScheduledAnnouncements("reset"),
    ]);
  }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements, fetchScheduledAnnouncements]);

  //  ACTIONS 
  // These used to live in the page — moved here so the View only handles UI

  const handleMarkRead = async (id: number) => {
    try {
      await markAsRead(id);
      // Optimistically update all lists so the unread indicator disappears right away
      const apply = (list: Announcement[]) =>
        list.map((item) => (item.id === id ? { ...item, read: true } : item));
      setPinnedData(apply);
      setUnpinnedData(apply);
      setScheduledAnnouncements(apply);
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);
      toast.success("Announcement deleted");
      await refreshAll();
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete announcement");
    }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await deleteBulk(ids);
      toast.success("Announcements deleted");
      await refreshAll();
    } catch (err) {
      console.error("Bulk delete failed", err);
      toast.error("Failed to delete announcements");
      throw err; // re-throw so the page can reset its UI state in the finally block
    }
  };

  // Merges the updated fields back into whichever list the item lives in
  const handleUpdate = (updatedItem: Announcement) => {
    const merge = (list: Announcement[]) =>
      list.map((item) => (item.id === updatedItem.id ? { ...item, ...updatedItem } : item));
    setPinnedData(merge);
    setUnpinnedData(merge);
    refreshAll();
  };

  // Optimistically moves the item between pinned and unpinned lists
  const handleTogglePin = (updatedItem: Announcement) => {
    if (updatedItem.pinned) {
      setPinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev].slice(0, PINNED_LIMIT);
      });
      setUnpinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
    } else {
      setUnpinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev];
      });
      setPinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
    }
  };

  // Calls the pin API and refreshes the relevant lists.
  // isScheduledTab tells us whether to also refresh the scheduled list.
  const handlePinChange = async (id: number, isScheduledTab = false) => {
    try {
      await updatePinStatus(id);
      toast.success("Pin status updated");
      if (isScheduledTab) {
        await refreshPinnedAndScheduled();
      } else {
        await fetchPinnedAnnouncements();
      }
    } catch (err) {
      console.error("Failed to update pin status", err);
      toast.error("Failed to update pin status");
      await refreshAll(); // roll back the optimistic update
    }
  };

  return {
    // Data
    pinnedData,
    unpinnedData,
    scheduledAnnouncements,
    hasMore: hasMoreUnpinned,
    hasMoreScheduled,
    loading,

    // Actions — the page calls these, no service imports needed there
    handleMarkRead,
    handleDelete,
    handleBulkDelete,
    handleUpdate,
    handleTogglePin,
    handlePinChange,

    // Pagination
    loadMoreUnpinned: () => fetchUnpinnedAnnouncements("more"),
    loadMoreScheduled: () => fetchScheduledAnnouncements("more"),
    resetScheduled: () => fetchScheduledAnnouncements("reset"),

    // Needed by AnnouncementModal's refreshAnnouncements callback
    refreshAll,
  };
};

export default useAnnouncementCardViewModel;
