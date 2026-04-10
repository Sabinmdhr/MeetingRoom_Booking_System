import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import { CircleCheckBig, Funnel, Megaphone, Pin } from "lucide-react";
import "../assets/scss/pages/Announcements.scss";
import { useState } from "react";
import AnnouncementModal from "../components/Announcements/AnnouncementModal";
import "../assets/scss/global.scss";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
import { deleteAnnouncement } from "../services/announcements.service";
import { toast } from "react-toastify";

const Announcements = () => {
  const [open, setOpen] = useState(false);
  // const [unpinnedPage, setUnpinnedPage] = useState(1);
  // const rowsPerPage = 5;
  // const [selectionMode, setSelectionMode] = useState(false);
  // const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openFilter = Boolean(anchorEl);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseFilter = () => setAnchorEl(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    pinnedData,
    setPinnedData,
    setUnpinnedData,
    // setUnpinnedTotal,
    unpinnedData,
    // unpinnedTotal,
    // fetchUnpinned,
    fetchAnnouncements,
  } = useAnnouncementCardViewModel();

  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);

      
      toast.error("Announcement deleted successfully");
      fetchAnnouncements();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const handleUpdate = (updatedItem: any) => {
    setPinnedData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
    setUnpinnedData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    );
  };

  // const handleUnpinnedPageChange = (_: any, value: number) => {
  //   setUnpinnedPage(value);
  //   fetchUnpinned(value - 1);
  // };

  // const totalUnpinnedPages = Math.ceil(unpinnedTotal / rowsPerPage);

  return (
    <div className="announcement__main">
      <Card className="announcement">
        {/* Header */}
        <CardContent className="announcement__header">
          <div className="announcement__title-wrapper">
            <div className="announcement__title">
              <Megaphone size={20} />
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
            <Button
              variant="outlined"
              className="announcement__filter-btn"
              id="filter-button"
              aria-controls={openFilter ? "filter-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openFilter ? "true" : undefined}
              onClick={handleFilterClick}
              startIcon={<Funnel size={15} />}
            >
              All
            </Button>
            <Menu
              id="filter-menu"
              aria-labelledby="filter-button"
              anchorEl={anchorEl}
              open={openFilter}
              onClose={handleCloseFilter}
            >
              <MenuItem onClick={handleCloseFilter}>
                <CircleCheckBig size={16} />
                <Typography>All</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseFilter}>
                <Pin size={16} />
                <Typography>Pinned</Typography>
              </MenuItem>
            </Menu>

            <Button
              variant="contained"
              className="announcement__button"
              onClick={handleOpen}
            >
              + New Announcement
            </Button>
          </div>
        </CardContent>

        {/* Content */}
        <div className="announcement__content">
          {pinnedData.length > 0 && (
            <div className="announcement__section">
              <Divider className="announcement__divider" />
              <CardContent className="announcement__list">
                {pinnedData.map((item) => (
                  <AnnouncementCard
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
              </CardContent>
            </div>
          )}

          <div className="announcement__section">
            <CardContent className="announcement__list">
              {unpinnedData.map((item) => (
                <AnnouncementCard
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                  // selectionMode={selectionMode}
                  // selected={selectedIds.includes(item.id!)}
                />
              ))}
            </CardContent>
            {/* {totalUnpinnedPages > 1 && (
              <Stack
                spacing={2}
                className="announcement__pagination"
              >
                <Pagination
                  count={totalUnpinnedPages}
                  page={unpinnedPage}
                  onChange={handleUnpinnedPageChange}
                />
              </Stack>
            )} */}
          </div>
        </div>
      </Card>

      <AnnouncementModal
        open={open}
        handleClose={handleClose}
        refreshAnnouncements={fetchAnnouncements}
      />
    </div>
  );
};

export default Announcements;
