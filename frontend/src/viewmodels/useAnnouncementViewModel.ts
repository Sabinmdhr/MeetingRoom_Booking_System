import { useState } from "react";
import { addAnnouncement } from "../services/announcements.service";
import type { Announcements } from "../models/announcements.model";
import { toast } from "react-toastify";

const useAnnouncementViewModel = (
  handleClose: () => void,
  refreshAnnouncements: () => void,
) => {
  const initialFormData: Announcements = {
    title: "",
    message: "",
    priorityLevel: "NORMAL",
    pinned: false,
    roleId: 0,
    groupId: 1,
    allUser: true,
  };

  const [announcementFormData, setAnnouncementFormData] =
    useState<Announcements>(initialFormData);

  const closeAnnouncementForm = () => {
    setAnnouncementFormData(initialFormData);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnnouncementFormData((prev) => ({
      ...prev,
      [name]: value,
      //   groupId: 1,
    }));
  };

  const handleSubmit = async () => {
    if (!announcementFormData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!announcementFormData.message.trim()) {
      toast.error("Message is required");
      return;
    }

    if (!announcementFormData.priorityLevel.trim()) {
      toast.error("Priority level is required");
      return;
    }
    const payload = { ...announcementFormData };

    // If allUser is true, you don’t need roleId.
    if (payload?.allUser) {
      delete payload.roleId;
    }
    try {
      const response = await addAnnouncement(payload);
      console.log("Announcement added successfully:", response);
      toast.success("Announcement added successfully");
      refreshAnnouncements();
      // console.log(announcementFormData);
      closeAnnouncementForm();
    } catch (error) {
      console.error("Error adding announcement:", error);
      toast.error("Failed to add announcement");
    }
  };

  return {
    handleSubmit,
    closeAnnouncementForm,
    handleChange,
    announcementFormData,
    setAnnouncementFormData,
  };
};

export default useAnnouncementViewModel;
