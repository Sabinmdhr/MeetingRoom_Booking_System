import { useEffect, useRef, useState, useCallback } from "react";
import type { Announcements } from "../models/announcements.model";
import { getAnnouncementsByPin } from "../services/announcements.service";

const PAGE_SIZE = 5; // keeping it consistent with backend pagination

const useAnnouncementCardViewModel = () => {
  const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
  const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  // keeps track of which page to fetch next (for "Show More")
  const nextPageRef = useRef(1);

  // prevents multiple API calls at the same time
  const loadingRef = useRef(false);

  // fetch pinned announcements (always page 0, max 5 items)
  const fetchPinnedAnnouncements = useCallback(async () => {
    try {
      const result = await getAnnouncementsByPin({
        pageNo: 0,
        pageSize: 5,
        sortBy: "modifiedAt",
        sortDir: "desc",
        pinStatus: true,
      });

      const pinned = result.data.content ?? [];
      setPinnedData(pinned);
    } catch (error) {
      console.error("Error fetching pinned announcements", error);
    }
  }, []);

  /**
   * Handles unpinned announcements
   * mode:
   *  - "reset" → fresh load (page 0)
   *  - "more"  → load next page and append
   */
  const fetchUnpinnedAnnouncements = useCallback(
    async (mode: "reset" | "more") => {
      if (loadingRef.current) return;
      loadingRef.current = true;

      const page = mode === "reset" ? 0 : nextPageRef.current;

      try {
        const result = await getAnnouncementsByPin({
          pageNo: page,
          pageSize: PAGE_SIZE,
          sortBy: "modifiedAt",
          sortDir: "desc",
          pinStatus: false,
        });

        const content = result.data.content ?? [];

        if (mode === "reset") {
          // replace existing list
          setUnpinnedData(content);
          nextPageRef.current = 1;
        } else {
          // append next page
          setUnpinnedData((prev) => [...prev, ...content]);
          nextPageRef.current += 1;
        }

        // backend tells us if more pages exist
        setHasMore(!result.data.last);
      } catch (error) {
        console.error("Error fetching unpinned announcements", error);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [],
  );

  // initial load
  useEffect(() => {
    const init = async () => {
      await fetchPinnedAnnouncements();
      await fetchUnpinnedAnnouncements("reset");
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
  };
};

export default useAnnouncementCardViewModel;
