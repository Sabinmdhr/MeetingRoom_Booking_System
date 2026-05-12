import { useEffect, useRef, useState, useCallback } from "react";
import type { Announcements } from "../models/announcements.model";
import {
  getAllAnnouncements,
  getAnnouncement,
  getScheduledAnnouncement,
} from "../services/announcements.service";

const useAnnouncementCardViewModel = () => {
  const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
  const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
  const [unreadData, setUnreadData] = useState<Announcements[]>([]);
  const [scheduledAnnouncements, setScheduledAnnouncements] = useState<
    Announcements[]
  >([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  // keeps track of which page to fetch next (for "Show More")
  const nextPageRef = useRef(1);

  // prevents multiple API calls at the same time
  const loadingRef = useRef(false);

  // fetch pinned announcements (always page 0, max 5 items)
  const fetchPinnedAnnouncements = useCallback(async () => {
    try {
      const result = await getAnnouncement({
        pageNo: 0,
        pageSize: 5,
        sortBy: "modifiedAt",
        sortDir: "desc",
        pinStatus: true,
      });

      const pinned = result.data.content ?? [];

      setPinnedData(pinned);

      return pinned.length;
    } catch (error) {
      console.error("Error fetching pinned announcements", error);
      return 0;
    }
  }, []);

  /**
   * Handles unpinned announcements
   * mode:
   *  - "reset" → fresh load (page 0)
   *  - "more"  → load next page and append
   */

  // console.log(PAGE_SIZE);
  const fetchUnpinnedAnnouncements = useCallback(
    async (mode: "reset" | "more", pinnedCount = pinnedData.length) => {
      if (loadingRef.current) return;
      loadingRef.current = true;

      const page = mode === "reset" ? 0 : nextPageRef.current;

      const pageSize = Math.max(10 - pinnedCount, 1);

      try {
        const result = await getAnnouncement({
          pageNo: page,
          pageSize,
          sortBy: "modifiedAt",
          sortDir: "desc",
          pinStatus: false,
        });
        console.log(result.data.content);

        const content = result.data.content ?? [];

        if (mode === "reset") {
          setUnpinnedData(content);
          nextPageRef.current = 1;
        } else {
          setUnpinnedData((prev) => [...prev, ...content]);
          nextPageRef.current += 1;
        }

        setHasMore(!result.data.last);
      } catch (error) {
        console.error("Error fetching unpinned announcements", error);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [pinnedData.length],
  );
  const fetchScheduledAnnouncement = async () => {
    try {
      const result = await getScheduledAnnouncement({
        pageNo: 0,
        pageSize: 15,
        sortBy: "modifiedAt",
        sortDir: "desc",
      });
      console.log(result);

      setScheduledAnnouncements(result);

      console.log(result);
    } catch (error) {
      console.error("Error fetching scheduled announcements", error);
    }
  };

  const fetchAllAnnouncementList = async () => {
    const res = await getAllAnnouncements({
      pageNo: 0,
      pageSize: 100,
      sortBy: "modifiedAt",
      sortDir: "desc",
    });
    console.log(res.data);

    const unread = res.data.content.filter((item: any) => !item.read);

    setUnreadData(unread);
    console.log(unread);
  };

  // initial load
  useEffect(() => {
    const init = async () => {
      const pinnedCount = await fetchPinnedAnnouncements();

      await fetchUnpinnedAnnouncements("reset", pinnedCount);

      await fetchAllAnnouncementList();
      await fetchScheduledAnnouncement();
    };

    init();
  }, []);

  // used after add / delete / update
  const refreshUnpinned = useCallback(async () => {
    await fetchPinnedAnnouncements();
    await fetchUnpinnedAnnouncements("reset");
  }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements]);

  // used by "Show More"
  const loadMoreUnpinned = useCallback(() => {
    fetchUnpinnedAnnouncements("more");
  }, [fetchUnpinnedAnnouncements]);

  return {
    pinnedData,
    setPinnedData,
    unpinnedData,
    setUnpinnedData,
    hasMore,
    fetchPinnedAnnouncements,
    fetchUnpinnedAnnouncements: refreshUnpinned,
    loadMoreUnpinned,
    loading,

    scheduledAnnouncements,
    fetchScheduledAnnouncement,

    unreadData,

    fetchAllAnnouncementList,
  };
};

export default useAnnouncementCardViewModel;
