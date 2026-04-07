import {
  Card,
  CardContent,
  Typography,
  Chip,
  Checkbox,
  Button,
  Menu,
  MenuItem,
  FormControlLabel,
} from "@mui/material";
import "../../assets/scss/pages/Announcements.scss";
import { EllipsisVertical, Pin } from "lucide-react";
import React, { useState } from "react";
import AnnouncementModal from "./AnnouncementModal";

const AnnouncementCard = ({
  item,
  onDelete,
  selectionMode,
  selected,
  onSelect,
}: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [openModal, setOpenModal] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Card
        className="announcement__card"
        variant="outlined"
      >
        <CardContent>
          <div className="announcement__card-header">
            <FormControlLabel
              className={`announcement__checkbox ${
                selectionMode ? "show" : ""
              }`}
              control={
                <Checkbox
                  checked={selected}
                  onChange={(e) => onSelect(item.id, e.target.checked)}
                />
              }
              label={
                <Typography
                  className="announcement__card-title"
                  variant="h4"
                >
                  {item.title}
                  <Pin
                    size={18}
                    color="purple"
                  />
                </Typography>
              }
            />

            <div className="announcement__tags">
              {item.priorityLevel == "HIGH" && (
                <Chip
                  label={item.priorityLevel}
                  className="chip__one"
                  size="small"
                />
              )}

              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <EllipsisVertical
                    color="black"
                    size={20}
                  />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>View Details</MenuItem>

                  <MenuItem onClick={handleOpenModal}>
                    Edit Announcement
                  </MenuItem>

                  <MenuItem onClick={handleClose}>Pin Announcement</MenuItem>

                  <MenuItem onClick={() => onDelete(item.id)}>
                    Delete Announcement
                  </MenuItem>
                </Menu>
              </div>

              {/* {item.isNew && (
              <Chip
                label="New"
                className="chip__two"
                size="small"
              />
            )} */}
            </div>
          </div>

          <Typography
            variant="body2"
            className="announcement__description"
          >
            {item.message}
          </Typography>

          <Typography
            variant="caption"
            className="announcement__date"
          >
            {item.modifiedAt} • By {"Sushant"}
          </Typography>
        </CardContent>
      </Card>
      <AnnouncementModal
        open={openModal}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default AnnouncementCard;
