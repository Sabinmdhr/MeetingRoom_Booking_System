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
  refreshAnnouncements,
}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);

  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenDetail = () => {
    setAnchorEl(null);
    setOpenDetailModal(true);
  };

  const handleOpenEdit = () => {
    setOpenDetailModal(false);
    setEditingItem(item);
    setOpenEditModal(true);
  };

  const handleCloseEdit = () => {
    setOpenEditModal(false);
    setEditingItem(null);
  };

  const handleDeleteClick = () => {
    setOpenConfirm(true);
    handleClose();
  };

  const handleConfirmDelete = () => {
    onDelete(item.id);
    setOpenConfirm(false);
  };

  const { handlePinChange } = useAnnouncementViewModel(
    () => {},
    refreshAnnouncements,
    item,
    onUpdate,
  );

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleOpenModal = () => {
    setEditingItem(item);
    setOpenModal(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingItem(null);
  };

  return (
    <>
      <Card
        className={`announcement__card ${item.pinned ? "pinned" : ""}`}
        variant="outlined"
      >
        {item.pinned && (
          <Pin
            onClick={() => {
              handlePinChange(item.id);
              // handleClose();
            }}
            size={33}
            fill="#8646c3"
            color="#8646c3"
            className="announcement__pin-icon"
          />
        )}
        <CardContent className="announcement__card-content">
          <div className="announcement__card-top">
            <div className="announcement__card-top-left">
              <Typography
                className="announcement__author-date"
                variant="subtitle2"
              >
                {item.modifiedAt}
              </Typography>
            </div>

            <div className="announcement__card-top-right">
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
              <Menu
                id={`announcement-menu-${item.id}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
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
                    handlePinChange(item.id);
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
                    style={{ color: "red" }}
                  >
                    Delete
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
          </div>

          <Typography
            className="announcement__card-title"
            variant="h4"
          >
            {item.title}
          </Typography>

          <Typography
            variant="subtitle2"
            className="announcement__description"
          >
            {item.message}
          </Typography>
        </CardContent>
      </Card>

      <AnnouncementDetailModal
        open={openDetailModal}
        onClose={() => setOpenDetailModal(false)}
        item={item}
        onEdit={handleOpenEdit}
        onDelete={onDelete}
        onPin={(id: number) => {
          handlePinChange(id);
        }}
      />

      <AnnouncementModal
        open={openEditModal}
        handleClose={handleCloseEdit}
        initialData={editingItem}
        onUpdate={onUpdate}
        refreshAnnouncements={refreshAnnouncements}
      />
      <ConfirmDialog
        open={openConfirm}
        title="Confirm Delete"
        text="Delete"
        startIcon={
          <Trash
            size={17}
            style={{
              // display: "flex",
              // alignItems: "center",
              marginBottom: "4px",
            }}
          />
        }
        content={`Are you sure you want to delete "${item.title}"?`}
        onConfirm={handleConfirmDelete}
        onClose={() => setOpenConfirm(false)}
      />
    </>
  );
};

export default AnnouncementCard;
