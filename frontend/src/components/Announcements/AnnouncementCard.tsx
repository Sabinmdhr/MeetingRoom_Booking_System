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
import React, { useState } from "react";
import AnnouncementModal from "./AnnouncementModal";
import useAnnouncementViewModel from "../../viewmodels/useAnnouncementViewModel";
import AnnouncementDetailModal from "./AnnouncementDetailModal";
import ConfirmDialog from "../ui/ConfirmDialog";

const AnnouncementCard = ({
  item,
  onDelete,
  onUpdate,
  onTogglePin,
  onMarkRead,
  click,
  selectedIds,
  setSelectedIds,
  setClick,
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

  const handleOpenDetail = async () => {
    setAnchorEl(null);
    setOpenDetailModal(true);
    if (!item.isRead) {
      await onMarkRead?.(item.id);
    }
  };

  const handleOpenEdit = () => {
    setOpenDetailModal(false);
    setEditingItem(item);
    setOpenEditModal(true);
    handleClose();
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
    setEditingItem(null);
  };

  const handleDeleteClick = () => {
    setConfirmAction("delete");
    setOpenConfirm(true);
    handleClose();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleConfirmAction = () => {
    if (confirmAction === "delete") {
      onDelete(item.id);
    }
    if (confirmAction === "pin" || confirmAction === "unpin") {
      const updated = { ...item, pinned: !item.pinned };
      onTogglePin(updated);
    }
    setOpenConfirm(false);
    setConfirmAction(null);
  };

  return (
    <>
      <Card
        className={`announcement__card ${
          item.isRead ? "card__read" : item.pinned ? "pinned" : "card__unread"
        }`}
        variant="outlined"
        onClick={(e) => {
          e.stopPropagation();
          if (!click) {
            handleOpenDetail();
          } else {
            setSelectedIds((prev: number[]) =>
              prev.includes(item.id)
                ? prev.filter((id) => id !== item.id)
                : [...prev, item.id],
            );
          }
        }}
      >
        {item.pinned && (
          <Pin
            onClick={(e) => {
              e.stopPropagation();
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
          <div className="announcement__card-left">
            <Typography
              className="announcement__author-date"
              variant="subtitle2"
            >
              {item.authorName} • {item.startDate}
            </Typography>
            <div className="announcement__card-left__bottom">
              <Typography
                className="announcement__card-title"
                variant="body1"
                fontWeight={item.isRead ? 400 : 700}
              >
                {item.title}
              </Typography>
              <Typography
                className="announcement__description"
                variant="subtitle2"
              >
                {item.message}
              </Typography>
            </div>
          </div>

          <div className="announcement__card-right">
            {!click && (
              <Button
                id={`announcement-button-${item.id}`}
                aria-controls={
                  open ? `announcement-menu-${item.id}` : undefined
                }
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleMenuClick}
                className="announcement__menu-btn"
              >
                <EllipsisVertical
                  color="black"
                  size={18}
                />
              </Button>
            )}

            {click ? (
              <div
                className="announcement__circle-btn"
                onClick={(e) => {
                  e.stopPropagation();
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
            ) : (
              <div className="announcement__circle-btn announcement__circle-btn--placeholder" />
            )}

            <Menu
              id={`announcement-menu-${item.id}`}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleOpenDetail}>
                <Eye size={16} />
                <Typography variant="body1">View Details</Typography>
              </MenuItem>
              <MenuItem onClick={handleOpenEdit}>
                <SquarePen size={16} />
                <Typography variant="body1">Edit</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setConfirmAction(item.pinned ? "unpin" : "pin");
                  setOpenConfirm(true);
                  handleClose();
                }}
              >
                {item.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                <Typography variant="body1">
                  {item.pinned ? "Unpin" : "Pin"}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleDeleteClick}>
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

      <AnnouncementDetailModal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        item={item}
        onEdit={handleOpenEdit}
        onDelete={onDelete}
        onPin={(id: number) => {
          const updated = { ...item, pinned: !item.pinned };
          onTogglePin(updated);
        }}
      />
      <AnnouncementModal
        open={openEditModal}
        handleClose={handleCloseEdit}
        initialData={editingItem}
        onUpdate={onUpdate}
      />
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
        onClose={() => {
          setOpenConfirm(false);
          setConfirmAction(null);
        }}
      />
    </>
  );
};

export default AnnouncementCard;
