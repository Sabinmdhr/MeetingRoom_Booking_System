import type {groupCardResponse } from "../models/groupCard.model";
import { fetchGroupCards } from "../services/groupCard.services";
import { useEffect, useState } from "react";

export const useGroupCardViewModel = () => {
  const [group, setGroup] = useState<groupCardResponse[]>([]);
  const numOfGroup = group.length
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchGroupCards();
        if (res) {
          setGroup(res);
        } else {
          console.warn("No group data found", res);
          setGroup([]); // fallback empty array
        }
      } catch (error) {
        console.error("Failed to fetch group cards:", error);
        setGroup([]); // fallback empty array
      }
    };
    fetchData();
  }, []);

  return {
    group,
    setGroup,
    numOfGroup,
  };
};
