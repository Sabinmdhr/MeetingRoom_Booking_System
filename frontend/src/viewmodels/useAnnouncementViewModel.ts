// import { useState, useEffect } from "react";
// import {
//   addAnnouncement,
//   markAsRead,
//   updateAnnouncement,
//   updatePinStatus,
// } from "../services/announcements.service";
// import type { Announcements } from "../models/announcements.model";
// import { toast } from "react-toastify";

// const initialFormData: Announcements = {
//   title: "",
//   message: "",
//   pinned: false,
//   startDate: "",
//   endDate: "",
// };

// const useAnnouncementViewModel = (
//   handleClose: () => void,
//   refreshAnnouncements?: () => void,
//   initialData?: Announcements & { id?: number },
//   onUpdate?: (updatedItem: Announcements & { id: number }) => void,
// ) => {
//   const [announcementFormData, setAnnouncementFormData] =
//     useState<Announcements>(initialFormData);

//   // Populate form when editing
//   useEffect(() => {
//     if (initialData?.id) {
//       setAnnouncementFormData({
//         title: initialData.title ?? "",
//         message: initialData.message ?? "",
//         pinned: initialData.pinned ?? false,
//         startDate: initialData.startDate ?? "",
//         endDate: initialData.endDate ?? "",
//       });
//     } else {
//       setAnnouncementFormData(initialFormData);
//     }
//   }, [initialData]);

//   const closeAnnouncementForm = () => {
//     setAnnouncementFormData(initialFormData);
//     handleClose();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setAnnouncementFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const { title, message, pinned, startDate, endDate } = announcementFormData;

//     if (!title.trim()) {
//       toast.error("Title is required");
//       return;
//     }

//     if (!message.trim()) {
//       toast.error("Message is required");
//       return;
//     }

//     const payload: Announcements = {
//       title,
//       message,
//       pinned,
//       startDate,
//       endDate,
//     };

//     try {
//       if (initialData?.id) {
//         await updateAnnouncement(initialData.id, payload);
//         onUpdate?.({ ...payload, id: initialData.id });
//         toast.success("Announcement updated successfully");
//       } else {
//         await addAnnouncement(payload);
//         toast.success("Announcement added successfully");
//       }

//       refreshAnnouncements?.();
//       closeAnnouncementForm();
//     } catch (error) {
//       console.error("Error saving announcement:", error);
//       toast.error(
//         initialData?.id
//           ? "Failed to update announcement"
//           : "Failed to add announcement",
//       );
//     }
//   };

//   const handlePinChange = async (id: number) => {
//     try {
//       await updatePinStatus(id);
//       toast.success("Pin status updated");
//     } catch (error) {
//       console.error("Error updating pin status:", error);
//       toast.error("Failed to update pin status");
//     }
//   };

//   const handleMarkRead = async (id: number) => {
//     try {
//       await markAsRead(id);
//       console.log(" item has been read.");

//       refreshAnnouncements?.();
//       // toast.success("Item has been marked read");
//     } catch (error) {
//       console.error("Item has been marked read", error);
//       // toast.error("Failed to update pin status");
//     }
//   };

//   return {
//     handleSubmit,
//     closeAnnouncementForm,
//     handleChange,
//     announcementFormData,
//     setAnnouncementFormData,
//     isEditing: Boolean(initialData?.id),
//     handlePinChange,
//     handleMarkRead,
//   };
// };

// export default useAnnouncementViewModel;

// import { useState, useEffect } from "react";
// import {
//   addAnnouncement,
//   updateAnnouncement,
//   updatePinStatus,
//   markAsRead,
// } from "../services/announcements.service";
// import type { Announcements } from "../models/announcements.model";
// import { toast } from "react-toastify";

// const initialFormData: Announcements = {
//   title: "",
//   message: "",
//   pinned: false,
//   startDate: "",
//   endDate: "",
// };

// const useAnnouncementViewModel = (
//   handleClose: () => void,
//   refreshAnnouncements?: () => void,
//   initialData?: Announcements & { id?: number },
//   onUpdate?: (updatedItem: Announcements & { id: number }) => void,
// ) => {
//   const [announcementFormData, setAnnouncementFormData] =
//     useState<Announcements>(initialFormData);

//   // Depend only on initialData.id — NOT the whole object.
//   // The object reference changes every render (new object literal),
//   // so using it directly causes an infinite re-population loop.
//   useEffect(() => {
//     if (initialData?.id) {
//       setAnnouncementFormData({
//         title: initialData.title ?? "",
//         message: initialData.message ?? "",
//         pinned: initialData.pinned ?? false,
//         startDate: initialData.startDate ?? "",
//         endDate: initialData.endDate ?? "",
//       });
//     } else {
//       setAnnouncementFormData(initialFormData);
//     }
//   }, [initialData?.id]);

//   const closeAnnouncementForm = () => {
//     setAnnouncementFormData(initialFormData);
//     handleClose();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setAnnouncementFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     const { title, message, pinned, startDate, endDate } = announcementFormData;

//     if (!title.trim()) {
//       toast.error("Title is required");
//       return;
//     }
//     if (!message.trim()) {
//       toast.error("Message is required");
//       return;
//     }

//     const payload: Announcements = {
//       title,
//       message,
//       pinned,
//       startDate,
//       endDate,
//     };

//     try {
//       if (initialData?.id) {
//         await updateAnnouncement(initialData.id, payload);
//         // Merge with original item so display-only fields (authorName, read, etc.)
//         // are preserved — the edit form only knows about the fields it edits.
//         onUpdate?.({ ...initialData, ...payload, id: initialData.id });
//         toast.success("Announcement updated successfully");
//       } else {
//         await addAnnouncement(payload);
//         toast.success("Announcement added successfully");
//       }

//       refreshAnnouncements?.();
//       closeAnnouncementForm();
//     } catch (error) {
//       console.error("Error saving announcement:", error);
//       toast.error(
//         initialData?.id
//           ? "Failed to update announcement"
//           : "Failed to add announcement",
//       );
//     }
//   };

//   const handlePinChange = async (id: number) => {
//     try {
//       await updatePinStatus(id);
//       toast.success("Pin status updated");
//     } catch (error) {
//       console.error("Error updating pin status:", error);
//       toast.error("Failed to update pin status");
//     }
//   };

//   const handleMarkRead = async (id: number) => {
//     try {
//       await markAsRead(id);
//     } catch (error) {
//       console.error("Failed to mark as read", error);
//     }
//   };

//   return {
//     handleSubmit,
//     closeAnnouncementForm,
//     handleChange,
//     announcementFormData,
//     setAnnouncementFormData,
//     isEditing: Boolean(initialData?.id),
//     handlePinChange,
//     handleMarkRead,
//   };
// };

// export default useAnnouncementViewModel;

import { useState, useEffect } from "react";
import {
  addAnnouncement,
  updateAnnouncement,
} from "../services/announcements.service";
import type { Announcements } from "../models/announcements.model";
import { toast } from "react-toastify";

// Only the fields the form edits — pinned is intentionally excluded from
// updates because pin status has its own dedicated endpoint
// (PATCH /change-pin-status). Sending pinned:true on a PUT /update causes
// the backend to count it as a new pin request and reject it when 5 already exist.
type AnnouncementPayload = Omit<Announcements, "pinned" | "id" | "read">;

const initialFormData = {
  title: "",
  message: "",
  pinned: false,
  startDate: "",
  endDate: "",
};

const useAnnouncementViewModel = (
  handleClose: () => void,
  refreshAnnouncements?: () => void,
  initialData?: Announcements & { id?: number },
  onUpdate?: (updatedItem: Announcements & { id: number }) => void,
) => {
  const [announcementFormData, setAnnouncementFormData] =
    useState(initialFormData);

  // Only re-populate when the edited item's id changes.
  // Using the whole object as a dep causes an infinite loop
  // because each render creates a new object reference.
  useEffect(() => {
    if (initialData?.id) {
      setAnnouncementFormData({
        title: initialData.title ?? "",
        message: initialData.message ?? "",
        pinned: initialData.pinned ?? false,
        startDate: initialData.startDate ?? "",
        endDate: initialData.endDate ?? "",
      });
    } else {
      setAnnouncementFormData(initialFormData);
    }
  }, [initialData?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const closeAnnouncementForm = () => {
    setAnnouncementFormData(initialFormData);
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnnouncementFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { title, message, pinned, startDate, endDate } = announcementFormData;

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!message.trim()) {
      toast.error("Message is required");
      return;
    }

    try {
      if (initialData?.id) {
        // ── EDIT: do NOT send pinned — pin status is managed separately
        // via PATCH /change-pin-status. Sending pinned:true here makes the
        // backend treat it as a new pin request and reject if 5 already exist.
        const updatePayload: AnnouncementPayload = {
          title,
          message,
          startDate,
          endDate,
        };
        await updateAnnouncement(
          initialData.id,
          updatePayload as Announcements,
        );
        onUpdate?.({ ...initialData, ...updatePayload, id: initialData.id });
        toast.success("Announcement updated successfully");
      } else {
        // ── ADD: send pinned as-is (the user opted in via checkbox)
        const addPayload: Announcements = {
          title,
          message,
          pinned,
          startDate,
          endDate,
        };
        await addAnnouncement(addPayload);
        toast.success("Announcement added successfully");
      }

      await refreshAnnouncements?.();
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

  return {
    handleSubmit,
    closeAnnouncementForm,
    handleChange,
    announcementFormData,
    setAnnouncementFormData,
    isEditing: Boolean(initialData?.id),
  };
};

export default useAnnouncementViewModel;
