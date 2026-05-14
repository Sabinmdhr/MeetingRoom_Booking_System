import { useState, useEffect } from "react";
import { addAnnouncement, updateAnnouncement, updatePinStatus } from "../services/announcements.service";
import type { Announcement } from "../models/announcements.model";
import { toast } from "react-toastify";

const emptyForm = {
  title: "",
  message: "",
  pinned: false,
  startDate: "",
  endDate: "",
};

const useAnnouncementViewModel = (
  handleClose: () => void,
  refreshAnnouncements?: () => void,
  initialData?: Announcement & { id?: number },
  onUpdate?: (updated: Announcement & { id: number }) => void,
) => {
  const [formData, setFormData] = useState(emptyForm);

  // Populate the form when editing an existing announcement
  useEffect(() => {
    if (initialData?.id) {
      setFormData({
        title: initialData.title ?? "",
        message: initialData.message ?? "",
        pinned: initialData.pinned ?? false,
        startDate: initialData.startDate ?? "",
        endDate: initialData.endDate ?? "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeForm = () => {
    setFormData(emptyForm);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { title, message, pinned, startDate, endDate } = formData;

    // Basic validation before hitting the API
    if (!title.trim()) return toast.error("Title is required");
    if (!message.trim()) return toast.error("Message is required");
    if (!startDate) return toast.error("Start date is required");
    if (!endDate) return toast.error("End date is required");

    try {
      if (initialData?.id) {
        // Edit mode — send the original pinned value in the main update because
        // the backend rejects it if 5 are already pinned. Pin changes go through
        // the dedicated updatePinStatus endpoint below.
        await updateAnnouncement(initialData.id, {
          title,
          message,
          pinned: initialData.pinned,
          startDate,
          endDate,
        });

        // If the user toggled the pin checkbox, call the separate pin endpoint
        if (pinned !== initialData.pinned) {
          try {
            await updatePinStatus(initialData.id);
          } catch {
            // Pin update failed (likely already 5 pinned) — save the rest anyway
            toast.warning("Saved, but pin status could not be changed (max 5 pinned).");
            onUpdate?.({ ...initialData, title, message, startDate, endDate, id: initialData.id });
            await refreshAnnouncements?.();
            closeForm();
            return;
          }
        }

        onUpdate?.({ ...initialData, title, message, pinned, startDate, endDate, id: initialData.id });
        toast.success("Announcement updated");
      } else {
        // Add mode
        await addAnnouncement({ title, message, pinned, startDate, endDate });
        toast.success("Announcement published");
      }

      await refreshAnnouncements?.();
      closeForm();
    } catch (err) {
      console.error("Error saving announcement:", err);
      toast.error(initialData?.id ? "Failed to update announcement" : "Failed to add announcement");
    }
  };

  return {
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    closeForm,
    isEditing: Boolean(initialData?.id),
  };
};

export default useAnnouncementViewModel;
