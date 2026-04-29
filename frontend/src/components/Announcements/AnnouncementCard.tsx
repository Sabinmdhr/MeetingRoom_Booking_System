// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import "../../assets/scss/pages/Announcements.scss";
// import {
//   Circle,
//   CircleCheck,
//   EllipsisVertical,
//   Eye,
//   Pin,
//   PinOff,
//   SquarePen,
//   Trash,
//   Trash2,
// } from "lucide-react";
// import React, { useState } from "react";
// import AnnouncementModal from "./AnnouncementModal";
// import AnnouncementDetailModal from "./AnnouncementDetailModal";
// import ConfirmDialog from "../ui/ConfirmDialog";

// const AnnouncementCard = ({
//   item,
//   onDelete,
//   onUpdate,
//   onTogglePin,
//   onMarkRead,
//   onPinChange,
//   click,
//   selectedIds,
//   setSelectedIds,
//   setClick,
//   pinnedCount,
// }: any) => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const isSelected = selectedIds?.includes(item.id) ?? false;
//   const [openDetailModal, setOpenDetailModal] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
//   const [editingItem, setEditingItem] = useState<any>(null);
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [confirmAction, setConfirmAction] = useState<
//     "delete" | "pin" | "unpin" | null
//   >(null);

//   //Mark as read whenever the card is interacted with (detail open or menu open)
//   const triggerMarkRead = () => {
//     if (!item.read) {
//       onMarkRead?.(item.id);
//     }
//   };

//   const handleOpenDetail = () => {
//     setAnchorEl(null);
//     triggerMarkRead(); //mark read on detail open
//     setOpenDetailModal(true);
//   };

//   const handleOpenEdit = () => {
//     setOpenDetailModal(false);
//     setEditingItem(item);
//     setOpenEditModal(true);
//     handleMenuClose();
//   };

//   const handleCloseEdit = () => {
//     setOpenEditModal(false);
//     setEditingItem(null);
//   };

//   const handleDeleteClick = () => {
//     setConfirmAction("delete");
//     setOpenConfirm(true);
//     handleMenuClose();
//   };

//   const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.stopPropagation();
//     triggerMarkRead(); //    mark read when menu is opened too
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => setAnchorEl(null);

//   const handleConfirmAction = () => {
//     if (confirmAction === "delete") {
//       onDelete(item.id);
//     }
//     if (confirmAction === "pin" || confirmAction === "unpin") {
//       const updated = { ...item, pinned: !item.pinned };
//       onTogglePin(updated); // optimistic UI
//       onPinChange(item.id); //    actually calls the API
//     }
//     setOpenConfirm(false);
//     setConfirmAction(null);
//   };

//   //    Correct class logic:
//   // - Always apply "pinned" class if pinned (for pin icon positioning)
//   // - Apply read/unread background separately
//   const cardClass = [
//     "announcement__card",
//     item.pinned ? "pinned" : "",
//     item.read ? "card__read" : "card__unread",
//   ]
//     .filter(Boolean)
//     .join(" ");

//   return (
//     <>
//       <Card
//         className={cardClass}
//         variant="outlined"
//         onClick={(e) => {
//           e.stopPropagation();
//           if (!click) {
//             handleOpenDetail();
//           } else {
//             setSelectedIds((prev: number[]) =>
//               prev.includes(item.id)
//                 ? prev.filter((id) => id !== item.id)
//                 : [...prev, item.id],
//             );
//           }
//         }}
//       >
//         {item.pinned && (
//           <Pin
//             onClick={(e) => {
//               e.stopPropagation();
//               setConfirmAction("unpin");
//               setOpenConfirm(true);
//             }}
//             size={33}
//             fill="#8646c3"
//             color="#8646c3"
//             className="announcement__pin-icon"
//           />
//         )}

//         <CardContent className="announcement__card-content">
//           <div className="announcement__card-left">
//             <Typography
//               className="announcement__author-date"
//               variant="subtitle2"
//             >
//               {item.authorName} • {item.startDate}
//             </Typography>
//             <div className="announcement__card-left__bottom">
//               {/*    Bold when unread */}
//               <Typography
//                 className="announcement__card-title"
//                 variant="body1"
//                 fontWeight={item.read ? 400 : 700}
//               >
//                 {item.title}
//               </Typography>
//               <Typography
//                 className="announcement__description"
//                 variant="subtitle2"
//               >
//                 {item.message}
//               </Typography>
//             </div>
//           </div>

//           <div className="announcement__card-right">
//             {!click && (
//               <Button
//                 id={`announcement-button-${item.id}`}
//                 aria-controls={
//                   open ? `announcement-menu-${item.id}` : undefined
//                 }
//                 aria-haspopup="true"
//                 aria-expanded={open ? "true" : undefined}
//                 onClick={handleMenuClick}
//                 className="announcement__menu-btn"
//               >
//                 <EllipsisVertical
//                   color="black"
//                   size={18}
//                 />
//               </Button>
//             )}

//             {click ? (
//               <div
//                 className="announcement__circle-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   setSelectedIds((prev: number[]) =>
//                     isSelected
//                       ? prev.filter((id) => id !== item.id)
//                       : [...prev, item.id],
//                   );
//                 }}
//               >
//                 {isSelected ? (
//                   <CircleCheck
//                     size={20}
//                     color="green"
//                     fill="#ede8f8"
//                   />
//                 ) : (
//                   <Circle
//                     size={20}
//                     color="#aaa"
//                   />
//                 )}
//               </div>
//             ) : (
//               <div className="announcement__circle-btn announcement__circle-btn--placeholder" />
//             )}

//             <Menu
//               id={`announcement-menu-${item.id}`}
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleMenuClose}
//               anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//               transformOrigin={{ vertical: "top", horizontal: "right" }}
//             >
//               <MenuItem onClick={handleOpenDetail}>
//                 <Eye size={16} />
//                 <Typography variant="body1">View Details</Typography>
//               </MenuItem>
//               <MenuItem onClick={handleOpenEdit}>
//                 <SquarePen size={16} />
//                 <Typography variant="body1">Edit</Typography>
//               </MenuItem>
//               <MenuItem
//                 onClick={() => {
//                   setConfirmAction(item.pinned ? "unpin" : "pin");
//                   setOpenConfirm(true);
//                   handleMenuClose();
//                 }}
//               >
//                 {item.pinned ? <PinOff size={16} /> : <Pin size={16} />}
//                 <Typography variant="body1">
//                   {item.pinned ? "Unpin" : "Pin"}
//                 </Typography>
//               </MenuItem>
//               <MenuItem onClick={handleDeleteClick}>
//                 <Trash2
//                   size={16}
//                   color="red"
//                 />
//                 <Typography
//                   variant="body1"
//                   color="error"
//                 >
//                   Delete
//                 </Typography>
//               </MenuItem>
//             </Menu>
//           </div>
//         </CardContent>
//       </Card>

//       <AnnouncementDetailModal
//         open={openDetailModal}
//         onClose={() => setOpenDetailModal(false)}
//         item={item}
//         onEdit={handleOpenEdit}
//         onDelete={onDelete}
//         onPin={(id: number) => {
//           const updated = { ...item, pinned: !item.pinned };
//           onTogglePin(updated);
//         }}
//       />
//       <AnnouncementModal
//         open={openEditModal}
//         handleClose={handleCloseEdit}
//         initialData={editingItem}
//         onUpdate={onUpdate}
//       />
//       <ConfirmDialog
//         open={openConfirm}
//         title={
//           confirmAction === "delete"
//             ? "Confirm Delete"
//             : confirmAction === "pin"
//               ? "Confirm Pin"
//               : "Confirm Unpin"
//         }
//         text={
//           confirmAction === "delete"
//             ? "Delete"
//             : confirmAction === "pin"
//               ? "Pin"
//               : "Unpin"
//         }
//         startIcon={
//           confirmAction === "delete" ? (
//             <Trash size={17} />
//           ) : confirmAction === "pin" ? (
//             <Pin size={17} />
//           ) : (
//             <PinOff size={17} />
//           )
//         }
//         content={
//           confirmAction === "delete"
//             ? `Are you sure you want to delete "${item.title}"?`
//             : confirmAction === "pin"
//               ? `Do you want to pin "${item.title}"?`
//               : `Do you want to unpin "${item.title}"?`
//         }
//         onConfirm={handleConfirmAction}
//         onClose={() => {
//           setOpenConfirm(false);
//           setConfirmAction(null);
//         }}
//       />
//     </>
//   );
// };

// export default AnnouncementCard;

import {
  Card,
  CardContent,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import "../../assets/scss/pages/Announcements.scss";
import {
  Circle,
  CircleCheck,
  EllipsisVertical,
  Eye,
  Pin,
  PinOff,
  SquarePen,
  Trash,
  Trash2,
} from "lucide-react";
import React, { useRef, useState } from "react";
import AnnouncementModal from "./AnnouncementModal";
import AnnouncementDetailModal from "./AnnouncementDetailModal";
import ConfirmDialog from "../ui/ConfirmDialog";

const AnnouncementCard = ({
  item,
  onDelete,
  onUpdate,
  onTogglePin,
  onMarkRead,
  onPinChange,
  click,
  selectedIds,
  setSelectedIds,
  pinnedCount,
}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isSelected = selectedIds?.includes(item.id) ?? false;
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "delete" | "pin" | "unpin" | null
  >(null);

  // This ref prevents the card's onClick from firing after any
  // programmatic interaction (menu open, menu item click, confirm open).
  // We set it to true whenever we handle a click ourselves so the card-level
  // handler knows to skip its own logic.
  const suppressCardClick = useRef(false);

  const suppress = () => {
    suppressCardClick.current = true;
    // Reset after the event has fully bubbled
    setTimeout(() => {
      suppressCardClick.current = false;
    }, 0);
  };

  const triggerMarkRead = () => {
    if (!item.read) onMarkRead?.(item.id);
  };

  // ── Menu ──────────────────────────────────────────────────
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    suppress();
    triggerMarkRead();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    suppress(); // closing the menu must not open the detail modal
    setAnchorEl(null);
  };

  // ── Detail modal ──────────────────────────────────────────
  const handleOpenDetail = () => {
    suppress();
    setAnchorEl(null);
    triggerMarkRead();
    setOpenDetailModal(true);
  };

  // ── Edit modal ────────────────────────────────────────────
  const handleOpenEdit = () => {
    suppress();
    setOpenDetailModal(false);
    setEditingItem(item);
    setOpenEditModal(true);
    setAnchorEl(null);
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
    setEditingItem(null);
  };

  // Keep authorName (and other display-only fields) when saving edits.
  // The edit form only sends title/message/pinned/dates — merge the rest
  // from the original item so the card doesn't lose them.
  const handleUpdate = (updatedItem: any) => {
    onUpdate?.({ ...item, ...updatedItem });
  };

  // ── Delete ────────────────────────────────────────────────
  const handleDeleteClick = () => {
    suppress();
    setConfirmAction("delete");
    setOpenConfirm(true);
    setAnchorEl(null);
  };

  // ── Pin / Unpin ───────────────────────────────────────────
  const handlePinClick = () => {
    suppress();
    setConfirmAction(item.pinned ? "unpin" : "pin");
    setOpenConfirm(true);
    setAnchorEl(null);
  };

  // ── Confirm dialog ────────────────────────────────────────
  const handleConfirmAction = () => {
    if (confirmAction === "delete") {
      onDelete(item.id);
    }
    if (confirmAction === "pin" || confirmAction === "unpin") {
      const updated = { ...item, pinned: !item.pinned };
      onTogglePin(updated);
      onPinChange(item.id);
    }
    setOpenConfirm(false);
    setConfirmAction(null);
  };

  const handleConfirmClose = () => {
    suppress(); // closing the confirm must not trigger card click
    setOpenConfirm(false);
    setConfirmAction(null);
  };

  // ── Card click ────────────────────────────────────────────
  const handleCardClick = () => {
    if (suppressCardClick.current) return;

    if (click) {
      // Selection mode — toggle selection
      setSelectedIds((prev: number[]) =>
        prev.includes(item.id)
          ? prev.filter((id: number) => id !== item.id)
          : [...prev, item.id],
      );
    } else {
      // Normal mode — open detail
      triggerMarkRead();
      setOpenDetailModal(true);
    }
  };

  // ── CSS classes 
  const cardClass = [
    "announcement__card",
    item.pinned ? "pinned" : "",
    item.read ? "card__read" : "card__unread",
    isSelected ? "card__selected" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <Card
        className={cardClass}
        variant="outlined"
        onClick={handleCardClick}
      >
        {item.pinned && (
          <Pin
            onClick={(e) => {
              e.stopPropagation();
              suppress();
              setConfirmAction("unpin");
              setOpenConfirm(true);
            }}
            size={33}
            fill="#8646c3"
            color="#8646c3"
            className="announcement__pin-icon"
          />
        )}

        <CardContent className="announcement__card-content">
          {/* LEFT */}
          <div className="announcement__card-left">
            <Typography
              className={`announcement__author-date ${item.read ? "card__read" : "card__unread"}`}
              variant="subtitle2"
            >
              {item.authorName} • {item.startDate}
            </Typography>
            <div className="announcement__card-left__bottom">
              <Typography
                className={`announcement__card-title  ${item.read ? "card__read" : "card__unread"}`}
                variant="body1"
                fontWeight={item.read ? 400 : 700}
              >
                {item.title}
              </Typography>
              <Typography
                className={`announcement__description ${item.read ? "card__read" : "card__unread"}`}
                variant="subtitle2"
              >
                {item.message}
              </Typography>
            </div>
          </div>

          {/* RIGHT — fixed width, always same height */}
          <div className="announcement__card-right">
            {/* Ellipsis menu — hidden (visibility:hidden) in select mode so width is preserved */}
            <Button
              id={`announcement-button-${item.id}`}
              aria-controls={open ? `announcement-menu-${item.id}` : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleMenuClick}
              className="announcement__menu-btn"
              style={{ visibility: click ? "hidden" : "visible" }}
            >
              <EllipsisVertical
                color="black"
                size={18}
              />
            </Button>

            {/* Circle selector — hidden (visibility:hidden) when NOT in select mode */}
            <div
              className="announcement__circle-btn"
              style={{ visibility: click ? "visible" : "hidden" }}
              onClick={(e) => {
                e.stopPropagation();
                suppress();
                setSelectedIds((prev: number[]) =>
                  isSelected
                    ? prev.filter((id) => id !== item.id)
                    : [...prev, item.id],
                );
              }}
            >
              {isSelected ? (
                <CircleCheck
                  size={20}
                  color="green"
                  fill="#ede8f8"
                />
              ) : (
                <Circle
                  size={20}
                  color="#aaa"
                />
              )}
            </div>

            <Menu
              id={`announcement-menu-${item.id}`}
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenDetail();
                }}
              >
                <Eye size={16} />
                <Typography variant="body1">View Details</Typography>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenEdit();
                }}
              >
                <SquarePen size={16} />
                <Typography variant="body1">Edit</Typography>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handlePinClick();
                }}
              >
                {item.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                <Typography variant="body1">
                  {item.pinned ? "Unpin" : "Pin"}
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick();
                }}
              >
                <Trash2
                  size={16}
                  color="red"
                />
                <Typography
                  variant="body1"
                  color="error"
                >
                  Delete
                </Typography>
              </MenuItem>
            </Menu>
          </div>
        </CardContent>
      </Card>

      {/* Detail modal */}
      <AnnouncementDetailModal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        item={item}
        onEdit={handleOpenEdit}
        onDelete={(id: number) => {
          suppress();
          onDelete(id);
          setOpenDetailModal(false);
        }}
        onPin={(id: number) => {
          suppress();
          const updated = { ...item, pinned: !item.pinned };
          onTogglePin(updated);
          onPinChange(id);
        }}
      />

      {/* Edit modal */}
      <AnnouncementModal
        open={openEditModal}
        handleClose={handleCloseEdit}
        initialData={editingItem}
        onUpdate={handleUpdate}
      />

      {/* Confirm dialog */}
      <ConfirmDialog
        open={openConfirm}
        title={
          confirmAction === "delete"
            ? "Confirm Delete"
            : confirmAction === "pin"
              ? "Confirm Pin"
              : "Confirm Unpin"
        }
        text={
          confirmAction === "delete"
            ? "Delete"
            : confirmAction === "pin"
              ? "Pin"
              : "Unpin"
        }
        startIcon={
          confirmAction === "delete" ? (
            <Trash size={17} />
          ) : confirmAction === "pin" ? (
            <Pin size={17} />
          ) : (
            <PinOff size={17} />
          )
        }
        content={
          confirmAction === "delete"
            ? `Are you sure you want to delete "${item.title}"?`
            : confirmAction === "pin"
              ? `Do you want to pin "${item.title}"?`
              : `Do you want to unpin "${item.title}"?`
        }
        onConfirm={handleConfirmAction}
        onClose={handleConfirmClose}
      />
    </>
  );
};

export default AnnouncementCard;
