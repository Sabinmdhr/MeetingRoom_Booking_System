import { useEffect, useState } from "react";
import {
  getAnnouncements,
  getPinnedAnnouncements,
} from "../services/announcements.service";
import type { Announcements } from "../models/announcements.model";

const useAnnouncementCardViewModel = () => {
  const [pinnedData, setPinnedData] = useState<Announcements[]>([]);
  const [pinnedTotal, setPinnedTotal] = useState(0);

  const [unpinnedData, setUnpinnedData] = useState<Announcements[]>([]);
  const [unpinnedTotal, setUnpinnedTotal] = useState(0);

  const fetchPinned = async (page = 0) => {
    const result = await getPinnedAnnouncements(page, 5);
    setPinnedData(result.data.content);
    setPinnedTotal(result.data.totalElements);
  };

  const fetchUnpinned = async (page = 0) => {
    const result = await getAnnouncements(page, 5);
    setUnpinnedData(result.data.content);
    setUnpinnedTotal(result.data.totalElements);
  };

  const fetchAnnouncements = () => {
    fetchPinned();
    fetchUnpinned();
  };

  useEffect(() => {
    fetchPinned();
    fetchUnpinned();
  }, []);

  return {
    pinnedData,
    setPinnedData,
    pinnedTotal,
    setPinnedTotal,

    unpinnedData,
    setUnpinnedData,
    unpinnedTotal,
    setUnpinnedTotal,

    fetchPinned,
    fetchUnpinned,
    fetchAnnouncements,
  };
};

export default useAnnouncementCardViewModel;
