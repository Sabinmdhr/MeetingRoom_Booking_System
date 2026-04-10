import { useState, useEffect } from "react";
import {
  addAnnouncement,
  updateAnnouncement,
  updatePinStatus,
} from "../services/announcements.service";
import type { Announcements } from "../models/announcements.model";
import { toast } from "react-toastify";

const initialFormData: Announcements = {
  title: "",
  message: "",
  priorityLevel: "NORMAL",
  pinned: false,
  roleId: 0,
  groupId: 1,
  allUser: true,
};

const useAnnouncementViewModel = (
  handleClose: () => void,
  refreshAnnouncements?: () => void,
  initialData?: Announcements & { id?: number },
  onUpdate?: (updatedItem: Announcements & { id: number }) => void,
) => {
  const [announcementFormData, setAnnouncementFormData] =
    useState<Announcements>(initialFormData);

  //  FIX: depend on initialData.id only, not the whole object
  // (object reference changes every render, causing infinite re-population)
  
  useEffect(() => {
    if (initialData?.id) {
      setAnnouncementFormData({
        title: initialData.title ?? "",
        message: initialData.message ?? "",
        priorityLevel: initialData.priorityLevel ?? "NORMAL",
        pinned: initialData.pinned ?? false,
        roleId: initialData.roleId ?? 0,
        groupId: initialData.groupId ?? 1,
        allUser: initialData.allUser ?? true,
      });
    } else {
      setAnnouncementFormData(initialFormData);
    }
  }, [initialData?.id]);

  const closeAnnouncementForm = () => {
    setAnnouncementFormData(initialFormData);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnnouncementFormData((prev) => ({ ...prev, [name]: value }));
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
    if (payload.allUser) delete payload.roleId;

    try {
      if (initialData?.id) {
        await updateAnnouncement(initialData.id, payload);
        onUpdate?.({ ...payload, id: initialData.id });
        toast.success("Announcement updated successfully");
      } else {
        await addAnnouncement(payload);
        toast.success("Announcement added successfully");
      }
      refreshAnnouncements?.();
      closeAnnouncementForm();
    } catch (error) {
      console.error("Error saving announcement:", error);
      toast.error(
        initialData?.id
          ? "Failed to update announcement"
          : "Failed to add announcement",
      );
    }
  };
  const handlePinChange = async (id: number) => {
    try {
      await updatePinStatus(id);
      toast.success("Pin status updated");
      refreshAnnouncements?.();
    } catch (error) {
      console.error("Error updating pin status:", error);
      toast.error("Failed to update pin status");
    }
  };

  return {
    handleSubmit,
    closeAnnouncementForm,
    handleChange,
    announcementFormData,
    setAnnouncementFormData,
    isEditing: !!initialData?.id,
    handlePinChange,
  };
};

export default useAnnouncementViewModel;
