// import { Popover, Divider, IconButton, Typography } from "@mui/material";
// import { MapPin, Users, Pen, Clock, Menu, CircleUser, X } from "lucide-react";
// import type { CalendarEvent } from "../../models/calendar.model";
// import "../../assets/scss/components/Calendar/CalendarModal.scss";
// import { useNavigate } from "react-router-dom";

// interface CalendarModalProps {
//   open: boolean;
//   event: CalendarEvent | null;
//   anchorEl: HTMLElement | null;
//   onClose: () => void;
//   onEdit: () => void;
// }

// export const CalendarModal = ({
//   open,
//   event,
//   anchorEl,
//   onClose,
//   // onEdit,
// }: CalendarModalProps) => {
//   const navigate = useNavigate();
//   const accentColor = CATEGORY_COLORS[event?.category ?? ""] ?? "#1B73E8";
//   const navigate = useNavigate();
//   return (
//     <Popover
//       open={open}
//       anchorEl={anchorEl}
//       onClose={onClose}
//       anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       transformOrigin={{ vertical: "top", horizontal: "left" }}
//       slotProps={{
//         paper: {
//           sx: {
//             borderRadius: 2,
//             overflow: "hidden",
//             width: 320,
//             boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
//           },
//         },
//       }}
//     >
//       <div
//         className="calendar-modal__strip"
//         style={{ background: accentColor }}
//       />
//       {/* Header */}
//       <div className="calendar-modal__header">
//         <div className="calendar-modal__header__title">
//           <h2>{event?.title}</h2>
//           <span className="calendar-modal__header__badge">
//             {event?.category}
//           </span>
//         </div>
//         <div className="calendar-modal__header__actions">
//           <IconButton
//             size="small"
//             onClick={() => navigate("/book-room")}
//             title="Edit"
//           >
//             <Pen size={17} />
//           </IconButton>
//           <IconButton
//             size="small"
//             onClick={onClose}
//             title="Close"
//           >
//             <X size={20} />
//           </IconButton>
//         </div>
//       </div>

//       <Divider />

//       <div className="calendar-modal__body">
//         <Row icon={<Clock size={18} />}>
//           <strong className="calendar-modal__row__date">{event?.date}</strong>
//           <span className="calendar-modal__row__time">
//             {event?.startTime} – {event?.endTime}
//           </span>
//         </Row>

//         <Row icon={<Users size={18} />}>
//           <Typography
//             className="calendar-modal__row__label"
//             variant="subtitle1"
//           >
//             Participants
//           </Typography>
//           <span className="calendar-modal__row__value">Sushant</span>
//         </Row>

//         <Row icon={<Menu size={18} />}>
//           <Typography
//             className="calendar-modal__row__label"
//             variant="subtitle1"
//           >
//             Description
//           </Typography>
//           <span className="calendar-modal__row__value">
//             {event?.description}
//           </span>
//         </Row>

//         <Row icon={<MapPin size={18} />}>
//           <Typography
//             className="calendar-modal__row__label"
//             variant="subtitle1"
//           >
//             Meeting Room
//           </Typography>
//           <span className="calendar-modal__row__value">{event?.location}</span>
//         </Row>

//         <Row icon={<CircleUser size={18} />}>
//           <Typography
//             className="calendar-modal__row__label"
//             variant="subtitle1"
//           >
//             Created By
//           </Typography>
//           <span className="calendar-modal__row__value">{event?.organizer}</span>
//         </Row>
//       </div>
//     </Popover>
//   );
// };

// function Row({
//   icon,
//   children,
// }: {
//   icon: React.ReactNode;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="calendar-modal__row">
//       <span className="calendar-modal__row__icon">{icon}</span>
//       <div className="calendar-modal__row__content">{children}</div>
//     </div>
//   );
// }

// export default CalendarModal;

import {
  Popover,
  Divider,
  IconButton,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  MapPin,
  Users,
  Pen,
  Clock,
  Menu,
  CircleUser,
  X,
  Building2,
  Building2Icon,
} from "lucide-react";
import type { CalendarEvent } from "../../models/calendar.model";
import type { BookedRoomDataResponse } from "../../models/bookRoom.model";
import "../../assets/scss/components/Calendar/CalendarModal.scss";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
interface CalendarModalProps {
  open: boolean;
  event: CalendarEvent | null;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onEdit: () => void;
  eventData?: BookedRoomDataResponse | null;
  eventDataLoading?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  internal: "#2563EB",
  client: "#ff6900",
  executive: "#AD46FF",
  external: " #7e22ce",
};

export const CalendarModal = ({
  open,
  event,
  anchorEl,
  onClose,
  onEdit,
  eventData,
  eventDataLoading,
}: CalendarModalProps) => {
  const accentColor = CATEGORY_COLORS[event?.category ?? ""] ?? "#1B73E8";
  const navigate = useNavigate();

  const internalNames =
    eventData?.data?.internalParticipant?.map(
      (p) => `${p.firstName} ${p.lastName}`,
    ) ?? [];

  const externalNames =
    eventData?.data?.externalParticipant?.map((p) => p.name) ?? [];

  const booker = eventData?.data?.roomBooker;
  // console.log(booker);

  const bookerName = booker
    ? `${booker.firstName} ${booker.lastName}`
    : (event?.organizer ?? "—");

  const roomName = eventData?.data?.room?.roomName ?? "—";

  // console.log(eventData?.description);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            width: 450,
            // height: 800,
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          },
        },
      }}
    >
      <div
        className="calendar-modal__strip"
        style={{ background: accentColor }}
      />

      <div className="calendar-modal__header">
        <div className="calendar-modal__header__title">
          <h2>{eventData?.meetingTitle ?? event?.meetingTitle}</h2>
          <span
            className="calendar-modal__header__badge"
            style={{ background: `${accentColor}18`, color: accentColor }}
          >
            {event?.category}
          </span>
        </div>
        <div className="calendar-modal__header__actions">
          <IconButton
            size="small"
            onClick={() => navigate("/book-room")}
            title="Edit"
          >
            <Pen size={17} />
          </IconButton>
          <IconButton
            size="small"
            onClick={onClose}
            title="Close"
          >
            <X size={20} />
          </IconButton>
        </div>
      </div>

      <Divider />

      {/*  Show spinner while loading real data */}
      {eventDataLoading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 24 }}>
          <CircularProgress size={24} />
        </div>
      ) : (
        <div className="calendar-modal__body">
          <Row
            icon={
              <Clock
                color="blue"
                size={18}
              />
            }
          >
            <strong className="calendar-modal__row__date">
              {eventData?.date ?? event?.date}
            </strong>
            <span className="calendar-modal__row__time">
              {eventData?.startTime ?? event?.startTime} –{" "}
              {eventData?.endTime ?? event?.endTime}
            </span>
          </Row>

          <Row
            icon={
              <Users
                color="green"
                size={18}
              />
            }
          >
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography
                  className="calendar-modal__row__label"
                  variant="subtitle1"
                >
                  Participants
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography
                      className="calendar-modal__row__label"
                      variant="subtitle1"
                    >
                      <Building2 color="blue" />
                      Internal Participants
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <span className="calendar-modal__row__value">
                      {internalNames.length > 0
                        ? internalNames.join(", ")
                        : "—"}
                    </span>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDropDownIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                    <Typography
                      className="calendar-modal__row__label"
                      variant="subtitle1"
                    >
                      <Building2Icon color="red" />
                      External Participants
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <span className="calendar-modal__row__value">
                      {externalNames.length > 0
                        ? externalNames.join(", ")
                        : "—"}
                    </span>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
            </Accordion>
          </Row>

          <Row
            icon={
              <Menu
                color="red"
                size={18}
              />
            }
          >
            <Typography
              className="calendar-modal__row__label"
              variant="subtitle1"
            >
              Description
            </Typography>
            <span className="calendar-modal__row__value">
              {eventData?.data?.description ?? event?.data?.description ?? "—"}
            </span>
          </Row>

          <Row
            icon={
              <MapPin
                color="purple"
                size={18}
              />
            }
          >
            <Typography
              className="calendar-modal__row__label"
              variant="subtitle1"
            >
              Meeting Room
            </Typography>
            <span className="calendar-modal__row__value">{roomName}</span>
          </Row>

          <Row
            icon={
              <CircleUser
                color="blue"
                size={18}
              />
            }
          >
            <Typography
              className="calendar-modal__row__label"
              variant="subtitle1"
            >
              Booked By
            </Typography>
            <span className="calendar-modal__row__value">{bookerName}</span>
          </Row>
        </div>
      )}
    </Popover>
  );
};

function Row({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="calendar-modal__row">
      <span className="calendar-modal__row__icon">{icon}</span>
      <div className="calendar-modal__row__content">{children}</div>
    </div>
  );
}

export default CalendarModal;
