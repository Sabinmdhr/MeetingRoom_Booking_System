// import {
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   // Chip,
//   Divider,
// } from "@mui/material";
// import { Megaphone, Pin } from "lucide-react";
// import "../assets/scss/pages/Announcements.scss";
// import { useState } from "react";
// import AnnouncementModal from "../components/Announcements/AnnouncementModal";
// import "../assets/scss/global.scss";
// import AnnouncementCard from "../components/Announcements/AnnouncementCard";
// import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";

// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";

// const Announcements = () => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const { announcementData, fetchAnnouncements } =
//     useAnnouncementCardViewModel();

//   console.log(announcementData);

//   const refreshAnnouncements = () => {
//     fetchAnnouncements();
//   };
//   const pinnedItems = announcementData.filter((item) => item.pinned);
//   const notPinned = announcementData.filter((item) => !item.pinned);

//   return (
//     <div className="announcement__main">
//       <Card className="announcement">
//         {/* Header */}
//         <CardContent className="announcement__header">
//           <div className="announcement__title-wrapper">
//             <div className="announcement__title">
//               <Megaphone size={20} />
//               <Typography variant="h1"> Announcements</Typography>
//             </div>
//             <Typography
//               variant="subtitle1"
//               className="announcement__subtitle"
//             >
//               Stay updated with company-wide communications and important
//               notices
//             </Typography>
//           </div>

//           <Button
//             variant="contained"
//             className="announcement__button"
//             onClick={handleOpen}
//           >
//             + New Announcement
//           </Button>
//         </CardContent>

//         {/* Content */}
//         <div className="announcement__content">
//           <div className="announcement__section">
//             <Typography
//               className="announcement__content-title"
//               variant="h3"
//             >
//               <span className="announcement__title-flex">
//                 <Pin size={18} />
//                 Pinned Announcements ({pinnedItems?.length || 0})
//               </span>
//             </Typography>

//             <Divider className="announcement__divider" />

//             <CardContent className="announcement__list">
//               {pinnedItems.length === 0 ? (
//                 <Typography>No Announcements here!!</Typography>
//               ) : (
//                 pinnedItems.map((item, index) => (
//                   <AnnouncementCard
//                     key={index}
//                     item={item}
//                   />
//                 ))
//               )}
//             </CardContent>

//             <Stack spacing={2}>
//               <Pagination count={10} />
//             </Stack>
//           </div>

//           <Divider className="announcement__divider" />

//           <div className="announcement__section">
//             <Typography
//               className="announcement__content-title"
//               variant="h3"
//             >
//               <span className="announcement__title-flex">
//                 <Megaphone size={18} />
//                 All Announcements ({notPinned?.length || 0})
//               </span>{" "}
//             </Typography>

//             <Divider className="announcement__divider" />

//             <CardContent className="announcement__list">
//               {
//               notPinned.keys
//               notPinned?.map((item, index) => (
//                 <AnnouncementCard
//                   key={index}
//                   item={item}
//                 />
//               ))}
//             </CardContent>
//           </div>
//         </div>
//         <Stack spacing={2}>
//           <Pagination count={10} />
//         </Stack>
//       </Card>

//       <AnnouncementModal
//         open={open}
//         handleClose={handleClose}
//         refreshAnnouncements={refreshAnnouncements}
//       />
//     </div>
//   );
// };

// export default Announcements;

import {
  Button,
  Card,
  CardContent,
  Typography,
  // Chip,
  Divider,
} from "@mui/material";
import { Megaphone, Pin } from "lucide-react";
import "../assets/scss/pages/Announcements.scss";
import { useState } from "react";
import AnnouncementModal from "../components/Announcements/AnnouncementModal";
import "../assets/scss/global.scss";
import AnnouncementCard from "../components/Announcements/AnnouncementCard";
import useAnnouncementCardViewModel from "../viewmodels/useAnnouncementCardViewModel";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { deleteAnnouncement } from "../services/announcements.service";
import { toast } from "react-toastify";

const Announcements = () => {
  const [open, setOpen] = useState(false);
  const [pinnedPage, setPinnedPage] = useState(1);
  const [unpinnedPage, setUnpinnedPage] = useState(1);
  const rowsPerPage = 5;
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    pinnedData,
    pinnedTotal,
    fetchPinned,
    setPinnedData,
    setUnpinnedData,
    setPinnedTotal,
    setUnpinnedTotal,
    unpinnedData,
    unpinnedTotal,
    fetchUnpinned,
    fetchAnnouncements,
  } = useAnnouncementCardViewModel();

  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id);

      const isPinned = pinnedData.some((item) => item.id === id);

      if (isPinned) {
        setPinnedData((prev) => prev.filter((item) => item.id !== id));
        setPinnedTotal((prev) => Math.max(0, prev - 1));
      } else {
        setUnpinnedData((prev) => prev.filter((item) => item.id !== id));
        setUnpinnedTotal((prev) => Math.max(0, prev - 1));
      }
      toast.error("Announcement deleted successfully");
    } catch (error) {
      console.error("Delete failed", error);
    }
    handleClose();
  };

  const refreshAnnouncements = () => fetchAnnouncements();

  const handleSelect = (id: number, checked: boolean) => {
    let updated = checked
      ? [...selectedIds, id]
      : selectedIds.filter((item) => item !== id);

    setSelectedIds(updated);
    setSelectionMode(updated.length > 0);
  };

  const handlePinnedPageChange = (_: any, value: number) => {
    setPinnedPage(value);
    fetchPinned(value - 1);
  };

  const handleUnpinnedPageChange = (_: any, value: number) => {
    setUnpinnedPage(value);
    fetchUnpinned(value - 1);
  };

  const totalPinnedPages = Math.ceil(pinnedTotal / rowsPerPage);
  const totalUnpinnedPages = Math.ceil(unpinnedTotal / rowsPerPage);

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
              Stay updated with company-wide communications and important
              notices
            </Typography>
          </div>
          <Button
            variant="contained"
            className="announcement__button"
            onClick={handleOpen}
          >
            + New Announcement
          </Button>
        </CardContent>

        {/* Content */}
        <div className="announcement__content">
          {/* Pinned Section */}
          <div className="announcement__section">
            <Typography
              className="announcement__content-title"
              variant="h3"
            >
              <span className="announcement__title-flex">
                <Pin size={18} />
                Pinned Announcements ({pinnedTotal})
              </span>
            </Typography>
            <Divider className="announcement__divider" />
            <CardContent className="announcement__list">
              {pinnedData.length === 0 ? (
                <Typography className="announcement__empty">
                  No pinned announcements.
                </Typography>
              ) : (
                pinnedData.map((item, index) => (
                  <AnnouncementCard
                    item={item}
                    onDelete={handleDelete}
                    selectionMode={selectionMode}
                    selected={selectedIds.includes(item.id)}
                    onSelect={handleSelect}
                  />
                ))
              )}
            </CardContent>
            {totalPinnedPages > 1 && (
              <Stack
                spacing={2}
                className="announcement__pagination"
              >
                <Pagination
                  count={totalPinnedPages}
                  page={pinnedPage}
                  onChange={handlePinnedPageChange}
                />
              </Stack>
            )}
          </div>

          {/* All Announcements Section */}
          <div className="announcement__section">
            <Typography
              className="announcement__content-title"
              variant="h3"
            >
              <span className="announcement__title-flex">
                <Megaphone size={18} />
                All Announcements ({unpinnedTotal})
              </span>
            </Typography>
            <Divider className="announcement__divider" />
            <CardContent className="announcement__list">
              {unpinnedData.length === 0 ? (
                <Typography className="announcement__empty">
                  No announcements here.
                </Typography>
              ) : (
                unpinnedData.map((item, index) => (
                  <AnnouncementCard
                    item={item}
                    onDelete={handleDelete}
                    selectionMode={selectionMode}
                    selected={selectedIds.includes(item.id)}
                    onSelect={handleSelect}
                  />
                ))
              )}
            </CardContent>
            {totalUnpinnedPages > 1 && (
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
            )}
          </div>
        </div>
      </Card>

      <AnnouncementModal
        open={open}
        handleClose={handleClose}
        refreshAnnouncements={refreshAnnouncements}
      />
    </div>
  );
};

export default Announcements;
