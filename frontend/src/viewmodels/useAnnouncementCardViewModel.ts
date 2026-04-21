import { useEffect, useState } from "react";
import { getAnnouncements } from "../services/announcements.service";
import type { Announcements } from "../models/announcements.model";

const useAnnouncementCardViewModel = () => {
  const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
  const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const PAGE_SIZE = 10;

  const fetchAnnouncements = async (reset = false) => {
    try {
      const currentPage = reset ? 0 : pageNo;

      const result = await getAnnouncements({
        pageNo: currentPage,
        pageSize: PAGE_SIZE,
        sortBy: "modifiedAt",
        sortDir: "desc",
      });

      const all: Announcements[] = result.data.content;

      const pinned = all.filter((item) => item.pinned);
      const unpinned = all.filter((item) => !item.pinned);

      //  pinned always fresh (limit 5)
      if (reset) {
        setPinnedData(pinned.slice(0, 5));
        setUnpinnedData(unpinned);
      } else {
        setUnpinnedData((prev) => [...prev, ...unpinned]);
      }

      // pagination control
      setHasMore(!result.data.last);
      setPageNo((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching announcements", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements(true);
  }, []);

  return {
    pinnedData,
    setPinnedData,
    unpinnedData,
    setUnpinnedData,
    fetchAnnouncements,
    hasMore,
  };
};

export default useAnnouncementCardViewModel;
