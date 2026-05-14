import { Card, CardContent, Typography, Button, Menu, MenuItem } from "@mui/material";
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
import { usePermissions } from "../../hooks/usePermissions";
import type { Announcement } from "../../models/announcements.model";

// Props the parent (Announcements page) passes down to each card
interface AnnouncementCardProps {
  item: Announcement;
  onDelete: (id: number) => void;
  onUpdate: (updated: Announcement) => void;
  onTogglePin: (updated: Announcement) => void;
  onMarkRead: (id: number) => void;
  onPinChange: (id: number) => void;
  click: boolean; // true = selection mode is active
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

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
}: AnnouncementCardProps) => {
  const perms = usePermissions();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<"delete" | "pin" | "unpin" | null>(null);

  const isSelected = selectedIds?.includes(item.id!) ?? false;

  // Prevents the card's onClick from firing after a menu/modal interaction.
  // Without this, closing a menu or confirm dialog would also open the detail modal.
  const suppressCardClick = useRef(false);

  const suppress = () => {
    suppressCardClick.current = true;
    setTimeout(() => {
      suppressCardClick.current = false;
    }, 0);
  };

  const markReadIfNeeded = () => {
    if (!item.read) onMarkRead(item.id!);
  };

  //  Menu 

  const handleMenuOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    suppress();
    markReadIfNeeded();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    suppress();
    setAnchorEl(null);
  };

  //  Modals 

  const handleOpenDetail = () => {
    suppress();
    setAnchorEl(null);
    markReadIfNeeded();
    setOpenDetailModal(true);
  };

  const handleOpenEdit = () => {
    suppress();
    setOpenDetailModal(false);
    setOpenEditModal(true);
    setAnchorEl(null);
  };

  // Merge the updated fields back into the original item so display-only
  // fields like authorName are not lost
  const handleUpdate = (updatedItem: Announcement) => {
    onUpdate({ ...item, ...updatedItem });
  };

  //  Confirm actions ─

  const handleDeleteClick = () => {
    suppress();
    setConfirmAction("delete");
    setOpenConfirm(true);
    setAnchorEl(null);
  };

  const handlePinClick = () => {
    suppress();
    setConfirmAction(item.pinned ? "unpin" : "pin");
    setOpenConfirm(true);
    setAnchorEl(null);
  };

  const handleConfirmAction = () => {
    if (confirmAction === "delete") {
      onDelete(item.id!);
    } else if (confirmAction === "pin" || confirmAction === "unpin") {
      onTogglePin({ ...item, pinned: !item.pinned });
      onPinChange(item.id!);
    }
    setOpenConfirm(false);
    setConfirmAction(null);
  };

  const handleConfirmClose = () => {
    suppress();
    setOpenConfirm(false);
    setConfirmAction(null);
  };

  //  Card click 

  const handleCardClick = () => {
    if (suppressCardClick.current) return;

    if (click) {
      // Selection mode — toggle this card's selection
      setSelectedIds((prev) =>
        prev.includes(item.id!)
          ? prev.filter((id) => id !== item.id)
          : [...prev, item.id!],
      );
    } else {
      markReadIfNeeded();
      setOpenDetailModal(true);
    }
  };

  const cardClass = [
    "announcement__card",
    item.pinned ? "pinned" : "",
    item.read ? "card__read" : "card__unread",
  ]
    .filter(Boolean)
    .join(" ");

  // Labels and icons for the confirm dialog based on the current action
  const confirmConfig = {
    delete: { title: "Confirm Delete", text: "Delete", icon: <Trash size={17} />, content: `Are you sure you want to delete "${item.title}"?` },
    pin:    { title: "Confirm Pin",    text: "Pin",    icon: <Pin size={17} />,   content: `Do you want to pin "${item.title}"?` },
    unpin:  { title: "Confirm Unpin",  text: "Unpin",  icon: <PinOff size={17} />, content: `Do you want to unpin "${item.title}"?` },
  };
  const confirm = confirmAction ? confirmConfig[confirmAction] : null;

  return (
    <>
      <Card className={cardClass} variant="outlined" onClick={handleCardClick}>
        {/* Pin icon in the top corner — clicking it opens the unpin confirm */}
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
          {/* LEFT — author, date, title, message */}
          <div className="announcement__card-left">
            <Typography
              className={`announcement__author-date ${item.read ? "card__read" : "card__unread"}`}
              variant="subtitle2"
            >
              {item.authorName} • {item.startDate}
            </Typography>

            <div className="announcement__card-left__bottom">
              <Typography
                className={`announcement__card-title ${item.read ? "card__read" : "card__unread"}`}
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

          {/* RIGHT — menu button (normal mode) or circle selector (select mode) */}
          {perms.canMannageAnnouncements && (
            <div className="announcement__card-right">
              {/* visibility:hidden keeps the layout stable when toggling modes */}
              <Button
                id={`announcement-button-${item.id}`}
                aria-controls={menuOpen ? `announcement-menu-${item.id}` : undefined}
                aria-haspopup="true"
                aria-expanded={menuOpen ? "true" : undefined}
                onClick={handleMenuOpen}
                className="announcement__menu-btn"
                style={{ visibility: click ? "hidden" : "visible" }}
              >
                <EllipsisVertical color="black" size={18} />
              </Button>

              <div
                className="announcement__circle-btn"
                style={{ visibility: click ? "visible" : "hidden" }}
                onClick={(e) => {
                  e.stopPropagation();
                  suppress();
                  setSelectedIds((prev) =>
                    isSelected
                      ? prev.filter((id) => id !== item.id)
                      : [...prev, item.id!],
                  );
                }}
              >
                {isSelected ? (
                  <CircleCheck size={20} color="green" fill="#8cf1bd" />
                ) : (
                  <Circle size={20} color="#aaa" />
                )}
              </div>

              <Menu
                id={`announcement-menu-${item.id}`}
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{ paper: { className: "announcement-menu__button" } }}
                disableScrollLock
                disableAutoFocusItem
                disableEnforceFocus
              >
                <MenuItem className="announcement-menu__button" onClick={(e) => { e.stopPropagation(); handleOpenDetail(); }}>
                  <Eye size={16} />
                  <Typography variant="body1">View Details</Typography>
                </MenuItem>
                <MenuItem className="announcement-menu__button" onClick={(e) => { e.stopPropagation(); handleOpenEdit(); }}>
                  <SquarePen size={16} />
                  <Typography variant="body1">Edit</Typography>
                </MenuItem>
                <MenuItem className="announcement-menu__button" onClick={(e) => { e.stopPropagation(); handlePinClick(); }}>
                  {item.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                  <Typography variant="body1">{item.pinned ? "Unpin" : "Pin"}</Typography>
                </MenuItem>
                <MenuItem className="announcement-menu__button" onClick={(e) => { e.stopPropagation(); handleDeleteClick(); }}>
                  <Trash2 size={16} color="red" />
                  <Typography variant="body1" color="error">Delete</Typography>
                </MenuItem>
              </Menu>
            </div>
          )}
        </CardContent>
      </Card>

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
          onTogglePin({ ...item, pinned: !item.pinned });
          onPinChange(id);
        }}
      />

      <AnnouncementModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        initialData={item}
        onUpdate={handleUpdate}
      />

      {confirm && (
        <ConfirmDialog
          open={openConfirm}
          title={confirm.title}
          text={confirm.text}
          startIcon={confirm.icon}
          content={confirm.content}
          onConfirm={handleConfirmAction}
          onClose={handleConfirmClose}
        />
      )}
    </>
  );
};

export default AnnouncementCard;
