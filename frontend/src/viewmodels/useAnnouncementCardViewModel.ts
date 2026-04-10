import { useEffect, useState } from "react";
import { getAnnouncements } from "../services/announcements.service";
import type { Announcements } from "../models/announcements.model";

const useAnnouncementCardViewModel = () => {
  const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
  const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);

  const fetchAnnouncements = async () => {
    try {
      const result = await getAnnouncements(0, 50);
      const all: Announcements[] = result.data.content;

      setPinnedData(all.filter((item) => item.pinned));
      setUnpinnedData(all.filter((item) => !item.pinned));

    } catch (error) {
      console.error("Error fetching announcements", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    pinnedData,
    setPinnedData,
    unpinnedData,
    setUnpinnedData,
    fetchAnnouncements,
  };
};

export default useAnnouncementCardViewModel;
