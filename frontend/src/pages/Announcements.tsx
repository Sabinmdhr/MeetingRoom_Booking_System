// import { Card, CardContent, Typography } from "@mui/material";
// import { Megaphone, Plus, Trash } from "lucide-react";
// import "../assets/scss/pages/Announcements.scss";
// import { useState } from "react";
// import AnnouncementModal from "../components/Announcements/AnnouncementModal";
// import AnnouncementCard from "../components/Announcements/AnnouncementCard";
// import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";
// import {
//   deleteAnnouncement,
//   deleteBulk,
//   markAsRead,
//   updatePinStatus,
// } from "../services/announcements.service";
// import { toast } from "react-toastify";
// import MyButton from "../components/ui/Button";
// import type { Announcements } from "../models/announcements.model";
// import ConfirmDialog from "../components/ui/ConfirmDialog";
// import { Spinner } from "../components/ui/Spinner";

// const AnnouncementsPage = () => {
//   const [open, setOpen] = useState(false);
//   const [click, setClick] = useState(false);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [confirmAction, setConfirmAction] = useState<"deleteBulk" | null>(null);
//   const [openConfirm, setOpenConfirm] = useState(false);

//   const {
//     pinnedData,
//     setPinnedData,
//     setUnpinnedData,
//     unpinnedData,
//     hasMore,
//     loading,
//     fetchPinnedAnnouncements,
//     fetchUnpinnedAnnouncements,
//     loadMoreUnpinned,
//   } = useAnnouncementCardViewModel();

//   const handleMarkRead = async (id: number) => {
//     try {
//       await markAsRead(id);
//       const apply = (list: Announcements[]) =>
//         list.map((item) => (item.id === id ? { ...item, read: true } : item));
//       setPinnedData(apply);
//       setUnpinnedData(apply);
//     } catch (error) {
//       console.error("Failed to mark as read", error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await deleteAnnouncement(id);
//       toast.success("Announcement deleted successfully");
//       setPinnedData((prev) => prev.filter((x) => x.id !== id));
//       setUnpinnedData((prev) => prev.filter((x) => x.id !== id));
//       // Re-fetch to fill the gap left by deletion
//       fetchPinnedAnnouncements();
//       fetchUnpinnedAnnouncements();
//       setClick(false);
//     } catch (error) {
//       console.error("Delete failed", error);
//       toast.error("Failed to delete announcement");
//     }
//   };

//   const handleBulkDelete = async (ids: number[]) => {
//     try {
//       await deleteBulk(ids);
//       setSelectedIds([]);
//       setClick(false);
//       toast.success("Announcements deleted successfully");
//       fetchPinnedAnnouncements();
//       fetchUnpinnedAnnouncements();
//     } catch (error) {
//       console.error("Bulk delete failed", error);
//       toast.error("Failed to delete announcements");
//     }
//   };

//   const handleUpdate = (updatedItem: any) => {
//     const merge = (list: Announcements[]) =>
//       list.map((item) =>
//         item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
//       );
//     setPinnedData(merge);
//     setUnpinnedData(merge);
//   };

//   const handleTogglePin = (updatedItem: Announcements) => {
//     if (updatedItem.pinned) {
//       setPinnedData((prev) => {
//         if (prev.some((x) => x.id === updatedItem.id)) return prev;
//         return [updatedItem, ...prev].slice(0, 5);
//       });
//       setUnpinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
//     } else {
//       setUnpinnedData((prev) => {
//         if (prev.some((x) => x.id === updatedItem.id)) return prev;
//         return [updatedItem, ...prev];
//       });
//       setPinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
//     }
//   };

//   const handlePinChange = async (id: number) => {
//     try {
//       await updatePinStatus(id);
//       toast.success("Pin status updated");
//     } catch (error) {
//       console.error("Failed to update pin status", error);
//       toast.error("Failed to update pin status");
//       // Rollback on failure
//       fetchPinnedAnnouncements();
//       fetchUnpinnedAnnouncements();
//     }
//   };

//   const handleConfirmAction = () => {
//     if (confirmAction === "deleteBulk") handleBulkDelete(selectedIds);
//     setOpenConfirm(false);
//     setConfirmAction(null);
//   };

//   const sharedCardProps = {
//     selectedIds,
//     setSelectedIds,
//     onDelete: handleDelete,
//     onUpdate: handleUpdate,
//     onTogglePin: handleTogglePin,
//     onMarkRead: handleMarkRead,
//     onPinChange: handlePinChange,
//     pinnedCount: pinnedData.length,
//     click,
//     setClick,
//   };

//   const hasAny = pinnedData.length > 0 || unpinnedData.length > 0;

//   return (
//     <div className="announcement__main">
//       <Card className="announcement">
//         <CardContent className="announcement__header">
//           <div className="announcement__title-wrapper">
//             <div className="announcement__title">
//               <Megaphone size={23} />
//               <Typography variant="h1">Announcements</Typography>
//             </div>
//             <Typography
//               variant="subtitle1"
//               className="announcement__subtitle"
//             >
//               Stay updated with important notifications and updates
//             </Typography>
//           </div>

//           <div className="announcement__header-actions">
//             {click && (
//               <MyButton
//                 disabled={selectedIds.length === 0}
//                 onClick={() => {
//                   setConfirmAction("deleteBulk");
//                   setOpenConfirm(true);
//                 }}
//                 text="Delete"
//                 variant="outlined"
//                 customVariant="danger"
//                 color="error"
//               />
//             )}
//             {hasAny && (
//               <MyButton
//                 text={click ? "Cancel" : "Select"}
//                 customVariant="ghost"
//                 onClick={() => {
//                   setClick((prev) => !prev);
//                   if (click) setSelectedIds([]);
//                 }}
//               />
//             )}
//             <MyButton
//               variant="contained"
//               text="New Announcement"
//               startIcon={<Plus size={19} />}
//               customVariant="dark"
//               onClick={() => setOpen(true)}
//             />
//           </div>
//         </CardContent>

//         {loading ? (
//           <div className="announcement__empty">
//             <Spinner />
//           </div>
//         ) : !hasAny ? (
//           <div className="announcement__empty">
//             <Typography variant="h4">No announcements available</Typography>
//           </div>
//         ) : (
//           <div className="announcement__content">
//             {pinnedData.length > 0 && (
//               <div className="announcement__section">
//                 <CardContent className="announcement__list">
//                   {pinnedData.map((item) => (
//                     <AnnouncementCard
//                       key={item.id}
//                       item={item}
//                       {...sharedCardProps}
//                     />
//                   ))}
//                 </CardContent>
//               </div>
//             )}

//             {unpinnedData.length > 0 && (
//               <div className="announcement__section">
//                 <CardContent className="announcement__list">
//                   {unpinnedData.map((item) => (
//                     <AnnouncementCard
//                       key={item.id}
//                       item={item}
//                       {...sharedCardProps}
//                     />
//                   ))}
//                 </CardContent>
//               </div>
//             )}

//             <div className="announcement__bottom">
//               {hasMore && (
//                 <MyButton
//                   variant="outlined"
//                   onClick={loadMoreUnpinned}
//                   text="Show More"
//                   customVariant="dark"
//                 />
//               )}
//             </div>
//           </div>
//         )}
//       </Card>

//       <AnnouncementModal
//         open={open}
//         handleClose={() => setOpen(false)}
//         refreshAnnouncements={() => {
//           fetchPinnedAnnouncements();
//           fetchUnpinnedAnnouncements();
//         }}
//       />

//       <ConfirmDialog
//         open={openConfirm}
//         title="Confirm Delete"
//         text={`Delete (${selectedIds.length})`}
//         startIcon={<Trash size={17} />}
//         content={`Are you sure you want to delete ${selectedIds.length} announcement${selectedIds.length > 1 ? "s" : ""}?`}
//         onConfirm={handleConfirmAction}
//         onClose={() => {
//           setOpenConfirm(false);
//           setConfirmAction(null);
//         }}
//       />
//     </div>
//   );
// };

// export default AnnouncementsPage;

// import { Card, CardContent, Typography } from "@mui/material";
// import { Megaphone, Plus, Trash } from "lucide-react";
// import "../assets/scss/pages/Announcements.scss";
// import { useState } from "react";
// import AnnouncementModal from "../components/Announcements/AnnouncementModal";
// import AnnouncementCard from "../components/Announcements/AnnouncementCard";
// import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";
// import {
//   deleteAnnouncement,
//   deleteBulk,
//   markAsRead,
//   updatePinStatus,
// } from "../services/announcements.service";
// import { toast } from "react-toastify";
// import MyButton from "../components/ui/Button";
// import type { Announcements } from "../models/announcements.model";
// import ConfirmDialog from "../components/ui/ConfirmDialog";
// import { Spinner } from "../components/ui/Spinner";

// const AnnouncementsPage = () => {
//   const [open, setOpen] = useState(false);
//   const [click, setClick] = useState(false);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);
//   const [confirmAction, setConfirmAction] = useState<"deleteBulk" | null>(null);
//   const [openConfirm, setOpenConfirm] = useState(false);

//   const {
//     pinnedData,
//     setPinnedData,
//     setUnpinnedData,
//     unpinnedData,
//     hasMore,
//     loading,
//     fetchPinnedAnnouncements,
//     fetchUnpinnedAnnouncements, // this is refreshAll — sequential pinned then unpinned
//     loadMoreUnpinned,
//   } = useAnnouncementCardViewModel();

//   const handleMarkRead = async (id: number) => {
//     try {
//       await markAsRead(id);
//       const apply = (list: Announcements[]) =>
//         list.map((item) => (item.id === id ? { ...item, read: true } : item));
//       setPinnedData(apply);
//       setUnpinnedData(apply);
//     } catch (error) {
//       console.error("Failed to mark as read", error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await deleteAnnouncement(id);
//       toast.success("Announcement deleted successfully");
//       // Optimistic remove, then full refresh to refill gaps correctly
//       setPinnedData((prev) => prev.filter((x) => x.id !== id));
//       setUnpinnedData((prev) => prev.filter((x) => x.id !== id));
//       fetchUnpinnedAnnouncements(); // refreshAll — re-fetches pinned then unpinned
//       setClick(false);
//     } catch (error) {
//       console.error("Delete failed", error);
//       toast.error("Failed to delete announcement");
//     }
//   };

//   const handleBulkDelete = async (ids: number[]) => {
//     try {
//       await deleteBulk(ids);
//       setSelectedIds([]);
//       setClick(false);
//       toast.success("Announcements deleted successfully");
//       fetchUnpinnedAnnouncements(); // refreshAll
//     } catch (error) {
//       console.error("Bulk delete failed", error);
//       toast.error("Failed to delete announcements");
//     }
//   };

//   const handleUpdate = (updatedItem: any) => {
//     const merge = (list: Announcements[]) =>
//       list.map((item) =>
//         item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
//       );
//     setPinnedData(merge);
//     setUnpinnedData(merge);
//   };

//   const handleTogglePin = (updatedItem: Announcements) => {
//     if (updatedItem.pinned) {
//       setPinnedData((prev) => {
//         if (prev.some((x) => x.id === updatedItem.id)) return prev;
//         return [updatedItem, ...prev].slice(0, 5);
//       });
//       setUnpinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
//     } else {
//       setUnpinnedData((prev) => {
//         if (prev.some((x) => x.id === updatedItem.id)) return prev;
//         return [updatedItem, ...prev];
//       });
//       setPinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
//     }
//   };

//   const handlePinChange = async (id: number) => {
//     try {
//       await updatePinStatus(id);
//       toast.success("Pin status updated");
//     } catch (error) {
//       console.error("Failed to update pin status", error);
//       toast.error("Failed to update pin status");
//       fetchUnpinnedAnnouncements(); // rollback via full refresh
//     }
//   };

//   const handleConfirmAction = () => {
//     if (confirmAction === "deleteBulk") handleBulkDelete(selectedIds);
//     setOpenConfirm(false);
//     setConfirmAction(null);
//   };

//   const sharedCardProps = {
//     selectedIds,
//     setSelectedIds,
//     onDelete: handleDelete,
//     onUpdate: handleUpdate,
//     onTogglePin: handleTogglePin,
//     onMarkRead: handleMarkRead,
//     onPinChange: handlePinChange,
//     pinnedCount: pinnedData.length,
//     click,
//     setClick,
//   };

//   const hasAny = pinnedData.length > 0 || unpinnedData.length > 0;

//   return (
//     <div className="announcement__main">
//       <Card className="announcement">
//         <CardContent className="announcement__header">
//           <div className="announcement__title-wrapper">
//             <div className="announcement__title">
//               <Megaphone size={23} />
//               <Typography variant="h1">Announcements</Typography>
//             </div>
//             <Typography
//               variant="subtitle1"
//               className="announcement__subtitle"
//             >
//               Stay updated with important notifications and updates
//             </Typography>
//           </div>

//           <div className="announcement__header-actions">
//             {click && (
//               <MyButton
//                 disabled={selectedIds.length === 0}
//                 onClick={() => {
//                   setConfirmAction("deleteBulk");
//                   setOpenConfirm(true);
//                 }}
//                 text="Delete"
//                 variant="outlined"
//                 customVariant="danger"
//                 color="error"
//               />
//             )}
//             {hasAny && (
//               <MyButton
//                 text={click ? "Cancel" : "Select"}
//                 customVariant="ghost"
//                 onClick={() => {
//                   setClick((prev) => !prev);
//                   if (click) setSelectedIds([]);
//                 }}
//               />
//             )}
//             <MyButton
//               variant="contained"
//               text="New Announcement"
//               startIcon={<Plus size={19} />}
//               customVariant="dark"
//               onClick={() => setOpen(true)}
//             />
//           </div>
//         </CardContent>

//         {loading ? (
//           <div className="announcement__empty">
//             <Spinner />
//           </div>
//         ) : !hasAny ? (
//           <div className="announcement__empty">
//             <Typography variant="h4">No announcements available</Typography>
//           </div>
//         ) : (
//           <div className="announcement__content">
//             {pinnedData.length > 0 && (
//               <div className="announcement__section">
//                 <CardContent className="announcement__list">
//                   {pinnedData.map((item) => (
//                     <AnnouncementCard
//                       key={item.id}
//                       item={item}
//                       {...sharedCardProps}
//                     />
//                   ))}
//                 </CardContent>
//               </div>
//             )}

//             {unpinnedData.length > 0 && (
//               <div className="announcement__section">
//                 <CardContent className="announcement__list">
//                   {unpinnedData.map((item) => (
//                     <AnnouncementCard
//                       key={item.id}
//                       item={item}
//                       {...sharedCardProps}
//                     />
//                   ))}
//                 </CardContent>
//               </div>
//             )}

//             <div className="announcement__bottom">
//               {hasMore && (
//                 <MyButton
//                   variant="outlined"
//                   onClick={loadMoreUnpinned}
//                   text="Show More"
//                   customVariant="dark"
//                 />
//               )}
//             </div>
//           </div>
//         )}
//       </Card>

//       <AnnouncementModal
//         open={open}
//         handleClose={() => setOpen(false)}
//         refreshAnnouncements={fetchUnpinnedAnnouncements}
//       />

//       <ConfirmDialog
//         open={openConfirm}
//         title="Confirm Delete"
//         text={`Delete (${selectedIds.length})`}
//         startIcon={<Trash size={17} />}
//         content={`Are you sure you want to delete ${selectedIds.length} announcement${selectedIds.length > 1 ? "s" : ""}?`}
//         onConfirm={handleConfirmAction}
//         onClose={() => {
//           setOpenConfirm(false);
//           setConfirmAction(null);
//         }}
//       />
//     </div>
//   );
// };

// export default AnnouncementsPage;

import { Card, CardContent, Typography } from "@mui/material";
import { Megaphone, Plus, Trash } from "lucide-react";
import "../assets/scss/pages/Announcements.scss";
import { useState } from "react";
import AnnouncementModal from "../components/Announcements/AnnouncementModal";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";
import {
  deleteAnnouncement,
  deleteBulk,
  markAsRead,
  updatePinStatus,
} from "../services/announcements.service";
import { toast } from "react-toastify";
import MyButton from "../components/ui/Button";
import type { Announcements } from "../models/announcements.model";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { Spinner } from "../components/ui/Spinner";

const AnnouncementsPage = () => {
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [confirmAction, setConfirmAction] = useState<"deleteBulk" | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    pinnedData,
    setPinnedData,
    unpinnedData,
    setUnpinnedData,
    hasMore,
    loading,
    fetchPinnedAnnouncements,
    refreshAll,
    loadMoreUnpinned,
  } = useAnnouncementCardViewModel();

  //  Mark as read (optimistic)
  const handleMarkRead = async (id: number) => {
    try {
      await markAsRead(id);
      const apply = (list: Announcements[]) =>
        list.map((item) => (item.id === id ? { ...item, read: true } : item));
      setPinnedData(apply);
      setUnpinnedData(apply);
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  //  Delete single
  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);
      toast.success("Announcement deleted successfully");
      // Optimistic remove first so UI feels instant
      setPinnedData((prev) => prev.filter((x) => x.id !== id));
      setUnpinnedData((prev) => prev.filter((x) => x.id !== id));
      // Full refresh to correct pagination gaps
      refreshAll();
      setClick(false);
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete announcement");
    }
  };

  //  Bulk delete
  const handleBulkDelete = async (ids: number[]) => {
    try {
      await deleteBulk(ids);
      setSelectedIds([]);
      setClick(false);
      toast.success("Announcements deleted successfully");
      refreshAll();
    } catch (error) {
      console.error("Bulk delete failed", error);
      toast.error("Failed to delete announcements");
    }
  };

  //  Update (merge — preserves authorName and other display fields)
  const handleUpdate = (updatedItem: any) => {
    const merge = (list: Announcements[]) =>
      list.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
      );
    setPinnedData(merge);
    setUnpinnedData(merge);
  };

  //  Pin toggle (optimistic)
  const handleTogglePin = (updatedItem: Announcements) => {
    if (updatedItem.pinned) {
      // unpinned → pinned: move to top of pinned, cap at 5
      setPinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev].slice(0, 5);
      });
      setUnpinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
    } else {
      // pinned → unpinned: move to top of unpinned
      setUnpinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev];
      });
      setPinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
    }
  };

  //  Pin API call ─
  const handlePinChange = async (id: number) => {
    try {
      await updatePinStatus(id);
      toast.success("Pin status updated");
    } catch (error) {
      console.error("Failed to update pin status", error);
      toast.error("Failed to update pin status");
      // Rollback on failure
      refreshAll();
    }
  };

  //  Bulk confirm ─
  const handleConfirmAction = () => {
    if (confirmAction === "deleteBulk") handleBulkDelete(selectedIds);
    setOpenConfirm(false);
    setConfirmAction(null);
  };

  const sharedCardProps = {
    selectedIds,
    setSelectedIds,
    onDelete: handleDelete,
    onUpdate: handleUpdate,
    onTogglePin: handleTogglePin,
    onMarkRead: handleMarkRead,
    onPinChange: handlePinChange,
    pinnedCount: pinnedData.length,
    click,
    setClick,
  };

  const hasAny = pinnedData.length > 0 || unpinnedData.length > 0;

  return (
    <div className="announcement__main">
      <Card className="announcement">
        {/* Header */}
        <CardContent className="announcement__header">
          <div className="announcement__title-wrapper">
            <div className="announcement__title">
              <Megaphone size={23} />
              <Typography variant="h1">Announcements</Typography>
            </div>
            <Typography
              variant="subtitle1"
              className="announcement__subtitle"
            >
              Stay updated with important notifications and updates
            </Typography>
          </div>

          <div className="announcement__header-actions">
            {/* Delete button only visible in select mode with items selected */}
            {click && (
              <MyButton
                disabled={selectedIds.length === 0}
                onClick={() => {
                  setConfirmAction("deleteBulk");
                  setOpenConfirm(true);
                }}
                text={`Delete${selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}`}
                variant="outlined"
                customVariant="danger"
                color="error"
              />
            )}

            {hasAny && (
              <MyButton
                text={click ? "Cancel" : "Select"}
                customVariant="ghost"
                onClick={() => {
                  setClick((prev) => !prev);
                  if (click) setSelectedIds([]);
                }}
              />
            )}

            <MyButton
              variant="contained"
              text="New Announcement"
              startIcon={<Plus size={19} />}
              customVariant="dark"
              onClick={() => setOpen(true)}
            />
          </div>
        </CardContent>

        {/* Body */}
        {loading ? (
          <div className="announcement__empty">
            <Spinner />
          </div>
        ) : !hasAny ? (
          <div className="announcement__empty">
            <Typography variant="h4">No announcements available</Typography>
          </div>
        ) : (
          <div className="announcement__content">
            {/* Pinned section */}
            {pinnedData.length > 0 && (
              <div className="announcement__section">
                <CardContent className="announcement__list">
                  {pinnedData.map((item) => (
                    <AnnouncementCard
                      key={item.id}
                      item={item}
                      {...sharedCardProps}
                    />
                  ))}
                </CardContent>
              </div>
            )}

            {/* Unpinned section */}
            {unpinnedData.length > 0 && (
              <div className="announcement__section">
                <CardContent className="announcement__list">
                  {unpinnedData.map((item) => (
                    <AnnouncementCard
                      key={item.id}
                      item={item}
                      {...sharedCardProps}
                    />
                  ))}
                </CardContent>
              </div>
            )}

            {/* Show More */}
            {hasMore && (
              <div className="announcement__bottom">
                <MyButton
                  variant="outlined"
                  onClick={loadMoreUnpinned}
                  text="Show More"
                  customVariant="dark"
                />
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Add modal — refresh resets both lists so new item appears at top */}
      <AnnouncementModal
        open={open}
        handleClose={() => setOpen(false)}
        refreshAnnouncements={refreshAll}
      />

      {/* Bulk delete confirm */}
      <ConfirmDialog
        open={openConfirm}
        title="Confirm Delete"
        text={`Delete (${selectedIds.length})`}
        startIcon={<Trash size={17} />}
        content={`Are you sure you want to delete ${selectedIds.length} announcement${selectedIds.length > 1 ? "s" : ""}?`}
        onConfirm={handleConfirmAction}
        onClose={() => {
          setOpenConfirm(false);
          setConfirmAction(null);
        }}
      />
    </div>
  );
};

export default AnnouncementsPage;
