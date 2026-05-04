// import { useEffect, useRef, useState, useCallback } from "react";
// import {
//   getPinnedAnnouncement,
//   getUnpinnedAnnouncement,
// } from "../services/announcements.service";
// import type { Announcements } from "../models/announcements.model";

// // const PINNED_LIMIT = 5;
// const UNPINNED_PAGE_SIZE = 10;

// const useAnnouncementCardViewModel = () => {
//   const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
//   const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
//   const [hasMore, setHasMore] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Tracks the NEXT page to load (0-indexed).
//   // After a reset fetch (page 0), this becomes 1.
//   // After Show More loads page 1, this becomes 2. Etc.
//   const nextPageRef = useRef(1); // starts at 1 because initial load fetches page 0
//   const loadingRef = useRef(false);

//   //  Pinned: always fresh, hard-capped at PINNED_LIMIT
//   const fetchPinnedAnnouncements = useCallback(async () => {
//     try {
//       const result = await getPinnedAnnouncement({
//         pageNo: 0,
//         pageSize: 5,
//         sortBy: "modifiedAt",
//         sortDir: "desc",
//         pinStatus: true,
//       });
//       setPinnedData(result.data.content ?? []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching pinned announcements", error);
//     }
//   }, []);

//   //  Unpinned: paginated
//   // mode "reset" → replace list, reset page counter to 1
//   // mode "more"  → append next page, increment counter
//   const fetchUnpinnedAnnouncements = useCallback(
//     async (mode: "reset" | "more") => {
//       if (loadingRef.current) return;
//       loadingRef.current = true;

//       const page = mode === "reset" ? 0 : nextPageRef.current;

//       try {
//         const result = await getUnpinnedAnnouncement({
//           pageNo: 0,
//           pageSize: 15,
//           sortBy: "modifiedAt",
//           sortDir: "desc",
//           pinStatus: false,
//         });

//         const content: Announcements[] = result.data.content ?? [];

//         if (mode === "reset") {
//           setUnpinnedData(content);
//           nextPageRef.current = 1; // next Show More will fetch page 1
//         } else {
//           setUnpinnedData((prev) => {
//             // Deduplicate in case the backend returned an item we already have
//             const existingIds = new Set(prev.map((x) => x.id));
//             const fresh = content.filter((x) => !existingIds.has(x.id));
//             return [...prev, ...fresh];
//           });
//           nextPageRef.current = page + 1;
//         }

//         // result.data.last === true means no more pages exist
//         setHasMore(!result.data.last);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching unpinned announcements", error);
//       } finally {
//         loadingRef.current = false;
//       }
//     },
//     [],
//   );

//   // Initial load
//   useEffect(() => {
//     fetchPinnedAnnouncements();
//     fetchUnpinnedAnnouncements("reset");
//   }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements]);

//   //  Public API

//   // Call after add / delete / bulk-delete to start back from page 0
//   const refreshUnpinned = useCallback(
//     () => fetchUnpinnedAnnouncements("reset"),
//     [fetchUnpinnedAnnouncements],
//   );

//   // Call from Show More button
//   const loadMoreUnpinned = useCallback(
//     () => fetchUnpinnedAnnouncements("more"),
//     [fetchUnpinnedAnnouncements],
//   );

//   return {
//     pinnedData,
//     setPinnedData,
//     unpinnedData,
//     setUnpinnedData,
//     hasMore,

//     fetchPinnedAnnouncements,
//     fetchUnpinnedAnnouncements: refreshUnpinned, // used by page for refresh
//     loadMoreUnpinned, // used by Show More button
//     loading,
//   };
// };

// export default useAnnouncementCardViewModel;

// import { useCallback, useEffect, useRef, useState } from "react";
// import {
//   getPinnedAnnouncement,
//   getUnpinnedAnnouncement,
// } from "../services/announcements.service";
// import type { Announcements } from "../models/announcements.model";

// const PINNED_PAGE_SIZE = 5;
// const UNPINNED_PAGE_SIZE = 10;

// const useAnnouncementCardViewModel = () => {
//   const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
//   const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
//   const [hasMore, setHasMore] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // nextPageRef tracks which page Show More should load next.
//   // Starts at 1 because the initial load already fetched page 0.
//   const nextPageRef = useRef(1);
//   const loadingRef = useRef(false);

//   const fetchPinnedAnnouncements = useCallback(async () => {
//     try {
//       const result = await getPinnedAnnouncement({
//         pageNo: 0,
//         pageSize: PINNED_PAGE_SIZE,
//         sortBy: "modifiedAt",
//         sortDir: "desc",
//         pinStatus: true,
//       });
//       setPinnedData(result.data.content ?? []);
//     } catch (error) {
//       console.error("Error fetching pinned announcements", error);
//     }
//   }, []);

//   // "reset" — replaces the list and resets pagination (after add/delete/refresh)
//   // "more"  — appends the next page (Show More button)
//   const fetchUnpinnedAnnouncements = useCallback(
//     async (mode: "reset" | "more") => {
//       if (loadingRef.current) return;
//       loadingRef.current = true;

//       // Key fix: use the correct page number based on mode
//       const page = mode === "reset" ? 0 : nextPageRef.current;

//       try {
//         const result = await getUnpinnedAnnouncement({
//           pageNo: page,
//           pageSize: UNPINNED_PAGE_SIZE,
//           sortBy: "modifiedAt",
//           sortDir: "desc",
//           pinStatus: false,
//         });

//         const content: Announcements[] = result.data.content ?? [];

//         if (mode === "reset") {
//           setUnpinnedData(content);
//           nextPageRef.current = 1;
//         } else {
//           setUnpinnedData((prev) => {
//             const existingIds = new Set(prev.map((x) => x.id));
//             const fresh = content.filter((x) => !existingIds.has(x.id));
//             return [...prev, ...fresh];
//           });
//           nextPageRef.current = page + 1;
//         }

//         setHasMore(!result.data.last);
//       } catch (error) {
//         console.error("Error fetching unpinned announcements", error);
//       } finally {
//         loadingRef.current = false;
//         setLoading(false);
//       }
//     },
//     [],
//   );

//   useEffect(() => {
//     Promise.all([
//       fetchPinnedAnnouncements(),
//       fetchUnpinnedAnnouncements("reset"),
//     ]);
//   }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements]);

//   const refreshUnpinned = useCallback(
//     () => fetchUnpinnedAnnouncements("reset"),
//     [fetchUnpinnedAnnouncements],
//   );

//   const loadMoreUnpinned = useCallback(
//     () => fetchUnpinnedAnnouncements("more"),
//     [fetchUnpinnedAnnouncements],
//   );

//   return {
//     pinnedData,
//     setPinnedData,
//     unpinnedData,
//     setUnpinnedData,
//     hasMore,
//     loading,
//     fetchPinnedAnnouncements,
//     fetchUnpinnedAnnouncements: refreshUnpinned,
//     loadMoreUnpinned,
//   };
// };

// export default useAnnouncementCardViewModel;

// import { useCallback, useEffect, useRef, useState } from "react";
// import {
//   getPinnedAnnouncement,
//   getUnpinnedAnnouncement,
// } from "../services/announcements.service";
// import type { Announcements } from "../models/announcements.model";

// const PINNED_PAGE_SIZE = 5;
// const UNPINNED_PAGE_SIZE = 10;
// export const MAX_VISIBLE_TOTAL = 10; // pinned + unpinned visible at once

// const useAnnouncementCardViewModel = () => {
//   const [pinnedData, setPinnedData] = useState<Announcements[]>([]);

//   // allUnpinned = everything fetched so far from the server (grows on Show More)
//   // The page slices this for display based on how many pinned items are showing.
//   const [allUnpinned, setAllUnpinned] = useState<Announcements[]>([]);

//   const [hasMore, setHasMore] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const nextPageRef = useRef(1);
//   const loadingRef = useRef(false);
//   // Total unpinned on the server — used to know if more pages exist
//   const serverTotalRef = useRef(0);

//   const fetchPinnedAnnouncements = useCallback(async () => {
//     try {
//       const result = await getPinnedAnnouncement({
//         pageNo: 0,
//         pageSize: PINNED_PAGE_SIZE,
//         sortBy: "modifiedAt",
//         sortDir: "desc",
//         pinStatus: true,
//       });
//       setPinnedData(result.data.content ?? []);
//     } catch (error) {
//       console.error("Error fetching pinned announcements", error);
//     }
//   }, []);

//   const fetchUnpinnedAnnouncements = useCallback(
//     async (mode: "reset" | "more") => {
//       if (loadingRef.current) return;
//       loadingRef.current = true;

//       const page = mode === "reset" ? 0 : nextPageRef.current;

//       try {
//         const result = await getUnpinnedAnnouncement({
//           pageNo: page,
//           pageSize: UNPINNED_PAGE_SIZE,
//           sortBy: "modifiedAt",
//           sortDir: "desc",
//           pinStatus: false,
//         });

//         const content: Announcements[] = result.data.content ?? [];
//         const totalElements: number = result.data.totalElements ?? 0;
//         serverTotalRef.current = totalElements;

//         let updatedAll: Announcements[];

//         if (mode === "reset") {
//           updatedAll = content;
//           setAllUnpinned(content);
//           nextPageRef.current = 1;
//         } else {
//           setAllUnpinned((prev) => {
//             const existingIds = new Set(prev.map((x) => x.id));
//             const fresh = content.filter((x) => !existingIds.has(x.id));
//             updatedAll = [...prev, ...fresh];
//             return updatedAll;
//           });
//           nextPageRef.current = page + 1;
//           // updatedAll not accessible outside setState callback — recompute below
//           updatedAll = []; // placeholder; hasMore computed after state settles
//         }

//         // hasMore is true if the server has pages we haven't fetched yet
//         const loadedCount =
//           mode === "reset"
//             ? content.length
//             : nextPageRef.current * UNPINNED_PAGE_SIZE;
//         setHasMore(loadedCount < totalElements);
//       } catch (error) {
//         console.error("Error fetching unpinned announcements", error);
//       } finally {
//         loadingRef.current = false;
//         setLoading(false);
//       }
//     },
//     [],
//   );

//   useEffect(() => {
//     Promise.all([
//       fetchPinnedAnnouncements(),
//       fetchUnpinnedAnnouncements("reset"),
//     ]);
//   }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements]);

//   const refreshAll = useCallback(async () => {
//     await Promise.all([
//       fetchPinnedAnnouncements(),
//       fetchUnpinnedAnnouncements("reset"),
//     ]);
//   }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements]);

//   const loadMoreUnpinned = useCallback(
//     () => fetchUnpinnedAnnouncements("more"),
//     [fetchUnpinnedAnnouncements],
//   );

//   return {
//     pinnedData,
//     setPinnedData,
//     allUnpinned,
//     setAllUnpinned,
//     hasMore,
//     loading,
//     fetchPinnedAnnouncements,
//     fetchUnpinnedAnnouncements: refreshAll,
//     loadMoreUnpinned,
//   };
// };

// export default useAnnouncementCardViewModel;

// brave one

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getPinnedAnnouncement,
  getUnpinnedAnnouncement,
} from "../services/announcements.service";
import type { Announcements } from "../models/announcements.model";

const PINNED_PAGE_SIZE = 5;
const UNPINNED_PAGE_SIZE = 10;

const useAnnouncementCardViewModel = () => {
  const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
  const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);

  // Tracks the NEXT page to fetch for "Show More"
  const nextPageRef = useRef(1);
  // Guard against concurrent fetches
  const loadingRef = useRef(false);

  //  Pinned: always page 0, max 5, latest first
  const fetchPinnedAnnouncements = useCallback(async () => {
    try {
      const result = await getPinnedAnnouncement({
        pageNo: 0,
        pageSize: PINNED_PAGE_SIZE,
        sortBy: "modifiedAt",
        sortDir: "desc",
        pinStatus: true,
      });
      setPinnedData(result.data?.content ?? []);
    } catch (error) {
      console.error("Error fetching pinned announcements", error);
    }
  }, []);

  //  Unpinned: paginated
  // mode "reset" → replaces the list, resets page counter (used on mount + after add/delete)
  // mode "more"  → appends next page (used by Show More button)
  const fetchUnpinnedAnnouncements = useCallback(
    async (mode: "reset" | "more") => {
      if (loadingRef.current) return;
      loadingRef.current = true;

      const page = mode === "reset" ? 0 : nextPageRef.current;

      try {
        const result = await getUnpinnedAnnouncement({
          pageNo: page,
          pageSize: UNPINNED_PAGE_SIZE,
          sortBy: "modifiedAt",
          sortDir: "desc",
          pinStatus: false,
        });

        const content: Announcements[] = result.data?.content ?? [];
        const totalElements: number = result.data?.totalElements ?? 0;
        const isLast: boolean = result.data?.last ?? true;

        if (mode === "reset") {
          setUnpinnedData(content);
          nextPageRef.current = 1; // next Show More will fetch page 1
        } else {
          setUnpinnedData((prev) => {
            // Deduplicate in case of overlapping pages
            const existingIds = new Set(prev.map((x) => x.id));
            const fresh = content.filter((x) => !existingIds.has(x.id));
            return [...prev, ...fresh];
          });
          nextPageRef.current = page + 1;
        }

        // If server says this is the last page, no more to load
        setHasMore(!isLast);
      } catch (error) {
        console.error("Error fetching unpinned announcements", error);
      } finally {
        loadingRef.current = false;
        setLoading(false);
      }
    },
    [],
  );

  //  Initial load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([
        fetchPinnedAnnouncements(),
        fetchUnpinnedAnnouncements("reset"),
      ]);
    };
    init();
  }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements]);

  //  Full refresh (after add / delete / bulk delete)
  const refreshAll = useCallback(async () => {
    await Promise.all([
      fetchPinnedAnnouncements(),
      fetchUnpinnedAnnouncements("reset"),
    ]);
  }, [fetchPinnedAnnouncements, fetchUnpinnedAnnouncements]);

  return {
    pinnedData,
    setPinnedData,
    unpinnedData,
    setUnpinnedData,
    hasMore,
    loading,
    fetchPinnedAnnouncements,
    refreshAll, // full reset-refresh
    loadMoreUnpinned: () => fetchUnpinnedAnnouncements("more"), // append next page
  };
};

export default useAnnouncementCardViewModel;
