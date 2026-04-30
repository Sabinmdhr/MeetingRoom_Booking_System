// import { useEffect, useRef, useState } from "react";
// import {
//   getPinnedAnnouncement,
//   getUnpinnedAnnouncement,
// } from "../services/announcements.service";
// import type { Announcements } from "../models/announcements.model";

// const PINNED_LIMIT = 5;
// const UNPINNED_PAGE_SIZE = 10;

// const useAnnouncementCardViewModel = () => {
//   const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
//   const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
//   const [hasMore, setHasMore] = useState(false);

//   const unpinnedPageRef = useRef(0);
//   const loadingRef = useRef(false);

//   // ── Pinned: always fresh, max 5 ───────────────────────────
//   const fetchPinnedAnnouncements = async () => {
//     try {
//       const result = await getPinnedAnnouncement({
//         pageNo: 0,
//         pageSize: PINNED_LIMIT,
//         sortBy: "modifiedAt",
//         sortDir: "desc",
//         pinStatus: true,
//       });
//       setPinnedData(result.data.content ?? []);
//     } catch (error) {
//       console.error("Error fetching pinned announcements", error);
//     }
//   };

//   // ── Unpinned: paginated ───────────────────────────────────
//   // reset=true  → replaces the list (used after add/delete/refresh)
//   // reset=false → appends next page (used by Show More button)
//   const fetchUnpinnedAnnouncements = async (reset = false) => {
//     if (loadingRef.current) return;
//     loadingRef.current = true;

//     const page = reset ? 0 : unpinnedPageRef.current;

//     try {
//       const result = await getUnpinnedAnnouncement({
//         pageNo: page,
//         pageSize: UNPINNED_PAGE_SIZE,
//         sortBy: "modifiedAt",
//         sortDir: "desc",
//         pinStatus: false,
//       });

//       const content: Announcements[] = result.data.content ?? [];

//       if (reset) {
//         setUnpinnedData(content);
//         unpinnedPageRef.current = 1;
//       } else {
//         setUnpinnedData((prev) => [...prev, ...content]);
//         unpinnedPageRef.current = page + 1;
//       }

//       // result.data.last is true when there are no more pages
//       setHasMore(!result.data.last);
//     } catch (error) {
//       console.error("Error fetching unpinned announcements", error);
//     } finally {
//       loadingRef.current = false;
//     }
//   };

//   useEffect(() => {
//     fetchPinnedAnnouncements();
//     fetchUnpinnedAnnouncements(true);
//   }, []);

//   return {
//     pinnedData,
//     setPinnedData,
//     unpinnedData,
//     setUnpinnedData,
//     hasMore,
//     fetchPinnedAnnouncements,
//     // for refresh after add/delete — resets to page 0
//     fetchUnpinnedAnnouncements: () => fetchUnpinnedAnnouncements(true),
//     // for Show More button — appends next page
//     loadMoreUnpinned: () => fetchUnpinnedAnnouncements(false),
//   };
// };

// export default useAnnouncementCardViewModel;

import { useEffect, useRef, useState, useCallback } from "react";
import {
  getPinnedAnnouncement,
  getUnpinnedAnnouncement,
} from "../services/announcements.service";
import type { Announcements } from "../models/announcements.model";

// const PINNED_LIMIT = 5;
const UNPINNED_PAGE_SIZE = 10;

const useAnnouncementCardViewModel = () => {
  const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
  const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  // Tracks the NEXT page to load (0-indexed).
  // After a reset fetch (page 0), this becomes 1.
  // After Show More loads page 1, this becomes 2. Etc.
  const nextPageRef = useRef(1); // starts at 1 because initial load fetches page 0
  const loadingRef = useRef(false);

  // ── Pinned: always fresh, hard-capped at PINNED_LIMIT ────
  const fetchPinnedAnnouncements = useCallback(async () => {
    try {
      const result = await getPinnedAnnouncement({
        pageNo: 0,
        pageSize: 5,
        sortBy: "modifiedAt",
        sortDir: "desc",
        pinStatus: true,
      });
      setPinnedData(result.data.content ?? []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pinned announcements", error);
    }
  }, []);

  // ── Unpinned: paginated ───────────────────────────────────
  // mode "reset" → replace list, reset page counter to 1
  // mode "more"  → append next page, increment counter
  const fetchUnpinnedAnnouncements = useCallback(
    async (mode: "reset" | "more") => {
      if (loadingRef.current) return;
      loadingRef.current = true;

      const page = mode === "reset" ? 0 : nextPageRef.current;

      try {
        const result = await getUnpinnedAnnouncement({
          pageNo: 0,
          pageSize: 15,
          sortBy: "modifiedAt",
          sortDir: "desc",
          pinStatus: false,
        });

        const content: Announcements[] = result.data.content ?? [];

        if (mode === "reset") {
          setUnpinnedData(content);
          nextPageRef.current = 1; // next Show More will fetch page 1
        } else {
          setUnpinnedData((prev) => {
            // Deduplicate in case the backend returned an item we already have
            const existingIds = new Set(prev.map((x) => x.id));
            const fresh = content.filter((x) => !existingIds.has(x.id));
            return [...prev, ...fresh];
          });
          nextPageRef.current = page + 1;
        }

        // result.data.last === true means no more pages exist
        setHasMore(!result.data.last);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching unpinned announcements", error);
      } finally {
        loadingRef.current = false;
      }
    },
    [],
  );

  // Initial load
  useEffect(() => {
    fetchPinnedAnnouncements();
    fetchUnpinnedAnnouncements("reset");
  }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements]);

  // ── Public API

  // Call after add / delete / bulk-delete to start back from page 0
  const refreshUnpinned = useCallback(
    () => fetchUnpinnedAnnouncements("reset"),
    [fetchUnpinnedAnnouncements],
  );

  // Call from Show More button
  const loadMoreUnpinned = useCallback(
    () => fetchUnpinnedAnnouncements("more"),
    [fetchUnpinnedAnnouncements],
  );

  return {
    pinnedData,
    setPinnedData,
    unpinnedData,
    setUnpinnedData,
    hasMore,

    fetchPinnedAnnouncements,
    fetchUnpinnedAnnouncements: refreshUnpinned, // used by page for refresh
    loadMoreUnpinned, // used by Show More button
    loading,
  };
};

export default useAnnouncementCardViewModel;
