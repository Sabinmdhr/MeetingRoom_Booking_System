import { useState, useEffect } from "react";
import type { Meeting_room } from "../models/Meeting_room.model";
import { getMeetingRoomById } from "../services/Meetinf_room.service";


export const useMeetingCardViewModel = (meetingId: string) => {
  const [meeting, setMeeting] = useState<Meeting_room | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        setLoading(true);
        const data = await getMeetingRoomById(meetingId);
        setMeeting(data);
      } catch (err: any) {
        setError(err.message || "Failed to load meeting room");
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [meetingId]);

  return { meeting, loading, error };
};
