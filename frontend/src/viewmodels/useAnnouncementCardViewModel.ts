import { useEffect, useState } from "react";
import {
  getAnnouncements,
  getPinnedAnnouncement,
  getUnpinnedAnnouncement,
} from "../services/announcements.service";
import type { Announcements } from "../models/announcements.model";

const useAnnouncementCardViewModel = () => {
  const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
  const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 20;

  // const fetchAnnouncements = async (reset = false) => {
  //   try {
  //     const currentPage = reset ? 0 : pageNo;

  //     const result = await getAnnouncements({
  //       pageNo: currentPage,
  //       pageSize: PAGE_SIZE,
  //       sortBy: "modifiedAt",
  //       sortDir: "desc",
  //     });

  //     const all: Announcements[] = result.data.content;

  //     const pinned = all.filter((item) => item.pinned);
  //     const unpinned = all.filter((item) => !item.pinned);

  //     //  pinned always fresh (limit 5)
  //     if (reset) {
  //       setPinnedData(pinned.slice(0, 5));
  //       setUnpinnedData(unpinned);
  //     } else {
  //       setUnpinnedData((prev) => [...prev, ...unpinned]);
  //     }

  //     // pagination control
  //     setHasMore(!result.data.last);
  //     setPageNo((prev) => prev + 1);
  //   } catch (error) {
  //     console.error("Error fetching announcements", error);
  //   }
  // };
  const fetchPinnedAnnouncements = async () => {
    try {
      // const currentPage = reset ? 0 : pageNo;

      const result = await getPinnedAnnouncement({
        pageNo: 0,
        pageSize: PAGE_SIZE,
        sortBy: "modifiedAt",
        sortDir: "desc",
        pinStatus: true,
      });

      // const all: Announcements[] = result.data.content;

      // const pinned = all.filter((item) => item.pinned);
      setPinnedData(result.data.content);
    } catch (error) {
      console.error("Error fetching announcements", error);
    }
  };
  const fetchUnpinnedAnnouncements = async () => {
    try {
      // const currentPage = reset ? 0 : pageNo;

      const result = await getUnpinnedAnnouncement({
        pageNo: 0,
        pageSize: PAGE_SIZE,
        sortBy: "modifiedAt",
        sortDir: "desc",
        pinStatus: false,
      });

      // const all: Announcements[] = result.data.content;

      // const pinned = all.filter((item) => item.pinned);
      setUnpinnedData(result.data.content);
    } catch (error) {
      console.error("Error fetching announcements", error);
    }
  };

  useEffect(() => {
    fetchPinnedAnnouncements();
    fetchUnpinnedAnnouncements();
  }, []);

  return {
    pinnedData,
    setPinnedData,
    unpinnedData,
    setUnpinnedData,
    fetchPinnedAnnouncements,
    fetchUnpinnedAnnouncements,
    hasMore,
  };
};

export default useAnnouncementCardViewModel;
