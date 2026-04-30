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

// const Announcements = () => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [click, setClick] = useState(false);
//   const [confirmAction, setConfirmAction] = useState<"deleteBulk" | null>(null);
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [selectedIds, setSelectedIds] = useState<number[]>([]);

//   const {
//     pinnedData,
//     setPinnedData,
//     setUnpinnedData,
//     unpinnedData,
//     fetchPinnedAnnouncements,
//     fetchUnpinnedAnnouncements,
//     hasMore,
//   } = useAnnouncementCardViewModel();

//   //    Optimistically marks the item as read in both lists
//   const handleMarkRead = async (id: number) => {
//     try {
//       await markAsRead(id);
//       const markRead = (list: Announcements[]) =>
//         list.map((item) => (item.id === id ? { ...item, read: true } : item));
//       setPinnedData(markRead);
//       setUnpinnedData(markRead);
//     } catch (error) {
//       console.error("Failed to mark as read", error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await deleteAnnouncement(id);
//       toast.success("Announcement deleted successfully");
//       fetchPinnedAnnouncements();
//       fetchUnpinnedAnnouncements();
//       setClick(false);
//     } catch (error) {
//       console.error("Delete failed", error);
//     }
//   };

//   const handleBulkDelete = async (ids: number[]) => {
//     try {
//       await deleteBulk(ids);
//       setSelectedIds([]);
//       toast.success("Announcements deleted successfully");
//       fetchPinnedAnnouncements();
//       fetchUnpinnedAnnouncements();
//     } catch (error) {
//       console.error("Delete failed", error);
//     }
//   };

//   const handleUpdate = (updatedItem: any) => {
//     setPinnedData((prev) =>
//       prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
//     );
//     setUnpinnedData((prev) =>
//       prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
//     );
//   };

//   const handleTogglePin = (updatedItem: Announcements) => {
//     if (updatedItem.pinned) {
//       setPinnedData((prev) => [updatedItem, ...prev].slice(0, 5));
//       setUnpinnedData((prev) =>
//         prev.filter((item) => item.id !== updatedItem.id),
//       );
//     } else {
//       setUnpinnedData((prev) => [updatedItem, ...prev]);
//       setPinnedData((prev) =>
//         prev.filter((item) => item.id !== updatedItem.id),
//       );
//     }
//   };

//   const handleConfirmAction = () => {
//     if (confirmAction === "deleteBulk") {
//       handleBulkDelete(selectedIds);
//       setClick(false);
//     }
//     setOpenConfirm(false);
//     setConfirmAction(null);
//   };
//   const handlePinChange = async (id: number) => {
//     try {
//       await updatePinStatus(id); // import this from your service
//       toast.success("Pin status updated");
//       // no need to refetch — onTogglePin already updated the UI optimistically
//     } catch (error) {
//       console.error("Failed to update pin status", error);
//       toast.error("Failed to update pin status");
//       // on failure, refetch to restore correct state
//       fetchPinnedAnnouncements();
//       fetchUnpinnedAnnouncements();
//     }
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
//     handlePinChange,
//     click,
//     setClick,
//   };

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
//             {(pinnedData.length > 0 || unpinnedData.length > 0) && (
//               <MyButton
//                 text={click ? "Cancel" : "Select"}
//                 customVariant="ghost"
//                 onClick={() => {
//                   setClick(!click);
//                   if (click) setSelectedIds([]);
//                 }}
//               />
//             )}
//             <MyButton
//               variant="contained"
//               text="New Announcement"
//               startIcon={<Plus size={19} />}
//               customVariant="dark"
//               onClick={handleOpen}
//             />
//           </div>
//         </CardContent>

//         {pinnedData.length === 0 && unpinnedData.length === 0 ? (
//           <div className="announcement__empty">
//             <Typography variant="h4">No announcements available</Typography>
//           </div>
//         ) : (
//           <div className="announcement__content">
//             {pinnedData.length > 0 && (
//               <div className="announcement__section">
//                 <CardContent className="announcement__list">
//                   {pinnedData.map((item) => (
//                     <div
//                       key={item.id}
//                       className="checkbox__card"
//                     >
//                       <AnnouncementCard
//                         item={item}
//                         {...sharedCardProps}
//                       />
//                     </div>
//                   ))}
//                 </CardContent>
//               </div>
//             )}

//             <div className="announcement__section">
//               <CardContent className="announcement__list">
//                 {unpinnedData.map((item) => (
//                   <div
//                     key={item.id}
//                     className="checkbox__card"
//                   >
//                     <AnnouncementCard
//                       item={item}
//                       {...sharedCardProps}
//                     />
//                   </div>
//                 ))}
//               </CardContent>
//             </div>

//             <div className="announcement__bottom">
//               {click && (
//                 <MyButton
//                   disabled={selectedIds.length === 0}
//                   onClick={() => {
//                     if (selectedIds.length === 0) {
//                       toast.warning("Please select at least one announcement");
//                       return;
//                     }
//                     setConfirmAction("deleteBulk");
//                     setOpenConfirm(true);
//                   }}
//                   text="Delete"
//                   variant="outlined"
//                   customVariant="danger"
//                   color="error"
//                 />
//               )}
//               <MyButton
//                 variant="outlined"
//                 onClick={() => fetchUnpinnedAnnouncements()}
//                 text="Show More"
//                 customVariant={hasMore ? "dark" : "ghost"}
//                 disabled={!hasMore}
//               />
//             </div>
//           </div>
//         )}
//       </Card>

//       <AnnouncementModal
//         open={open}
//         handleClose={handleClose}
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

// export default Announcements;
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

const Announcements = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [click, setClick] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [confirmAction, setConfirmAction] = useState<"deleteBulk" | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const {
    pinnedData,
    setPinnedData,
    setUnpinnedData,
    unpinnedData,
    hasMore,
    fetchPinnedAnnouncements,
    fetchUnpinnedAnnouncements, // always a "reset" refresh
    loadMoreUnpinned, // Show More — appends next page
    loading,
  } = useAnnouncementCardViewModel();

  // ── Mark read (optimistic in both lists)
  const handleMarkRead = async (id: number) => {
    try {
      await markAsRead(id);
      const markRead = (list: Announcements[]) =>
        list.map((item) => (item.id === id ? { ...item, read: true } : item));
      setPinnedData(markRead);
      setUnpinnedData(markRead);
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  // ── Delete single
  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);
      toast.success("Announcement deleted successfully");
      // Remove optimistically so the UI is instant,
      // then re-fetch both lists to get correct server state.
      setPinnedData((prev) => prev.filter((x) => x.id !== id));
      setUnpinnedData((prev) => prev.filter((x) => x.id !== id));
      fetchPinnedAnnouncements();
      fetchUnpinnedAnnouncements();
      setClick(false);
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete announcement");
    }
  };

  // ── Bulk delete
  const handleBulkDelete = async (ids: number[]) => {
    try {
      await deleteBulk(ids);
      setSelectedIds([]);
      toast.success("Announcements deleted successfully");
      fetchPinnedAnnouncements();
      fetchUnpinnedAnnouncements();
      setClick(false);
    } catch (error) {
      console.error("Bulk delete failed", error);
      toast.error("Failed to delete announcements");
    }
  };

  const handleUpdate = (updatedItem: any) => {
    const merge = (list: Announcements[]) =>
      list.map((item) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
      );
    setPinnedData(merge);
    setUnpinnedData(merge);
    fetchPinnedAnnouncements();
    fetchUnpinnedAnnouncements();
  };

  // ── Pin toggle (optimistic) ───────────────────────────────
  // Called from AnnouncementCard BEFORE the API call succeeds.
  // If the API fails, handlePinChange rolls back by re-fetching.
  const handleTogglePin = (updatedItem: Announcements) => {
    if (updatedItem.pinned) {
      // Moving unpinned → pinned
      // Guard: don't add if already in pinned list (double-click protection)
      setPinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev].slice(0, 5);
      });
      setUnpinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
    } else {
      // Moving pinned  unpinned
      // Insert at top of unpinned list so it's visible immediately
      setUnpinnedData((prev) => {
        if (prev.some((x) => x.id === updatedItem.id)) return prev;
        return [updatedItem, ...prev];
      });
      setPinnedData((prev) => prev.filter((x) => x.id !== updatedItem.id));
    }
  };

  // ── Pin API call (with rollback on failure) ───────────────
  const handlePinChange = async (id: number) => {
    try {
      await updatePinStatus(id);
      toast.success("Pin status updated");
    } catch (error) {
      console.error("Failed to update pin status", error);
      toast.error("Failed to update pin status");
      // Rollback: re-fetch both lists to restore correct server state
      fetchPinnedAnnouncements();
      fetchUnpinnedAnnouncements();
    }
  };

  // ── Bulk confirm
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
        {/* ── Header ── */}
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
            {click && (
              <MyButton
                disabled={selectedIds.length === 0}
                onClick={() => {
                  if (selectedIds.length === 0) {
                    toast.warning("Please select at least one announcement");
                    return;
                  }
                  setConfirmAction("deleteBulk");
                  setOpenConfirm(true);
                }}
                text="Delete"
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
              onClick={handleOpen}
            />
          </div>
        </CardContent>
        {/* {loading && <Spinner />} */}
        {/* ── Body ── */}
        {!hasAny ? (
          <div className="announcement__empty">
            {hasAny ? <Spinner /> : ""}
            {!loading && (
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: 24,
                }}
                variant="h4"
              >
                No announcements available
              </Typography>
            )}
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

            {/* Bottom bar */}
            <div className="announcement__bottom">
              {/* Only render Show More when there are actually more pages */}
              {hasMore && (
                <MyButton
                  variant="outlined"
                  onClick={loadMoreUnpinned}
                  text="Show More"
                  customVariant="dark"
                />
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Add modal */}
      <AnnouncementModal
        open={open}
        handleClose={handleClose}
        refreshAnnouncements={() => {
          fetchPinnedAnnouncements();
          fetchUnpinnedAnnouncements();
        }}
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

export default Announcements;
