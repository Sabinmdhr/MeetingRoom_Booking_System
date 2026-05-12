import {
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  DialogActions,
  Tab,
  Avatar,
} from "@mui/material";
import {
  MapPin,
  Users,
  Clock,
  AlignLeft,
  CircleUser,
  X,
  SquarePen,
} from "lucide-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import type { CalendarEvent } from "../../models/calendar.model";
import type { BookedRoomDataResponse } from "../../models/bookRoom.model";
import "../../assets/scss/components/Calendar/CalendarModal.scss";
import { useNavigate } from "react-router-dom";
import MyButton from "../ui/Button";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setBookingRoomFormData } from "../../redux/bookRoomSlice";

import { mapEventToBookingFormData } from "../../models/mapper/CalendarToBookRoomMapper";
import { usePermissions } from "../../hooks/usePermissions";

interface CalendarModalProps {
  open: boolean;
  event: CalendarEvent | null;
  anchorEl?: HTMLElement | null;
  onClose: () => void;
  onEdit: () => void;
  eventData?: BookedRoomDataResponse;
  eventDataLoading?: boolean;
}


export const CalendarModal = ({
  open,
  event,
  onClose,
  eventData,
  eventDataLoading,
}: CalendarModalProps) => {
  const perms = usePermissions()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState("internal");

  const submitMode =
    eventData?.recurrenceType === "NONE" ? "editOnce" : "editAll";

  const colorCode = eventData?.meetingType?.colorCode;


  const internalParticipants = eventData?.internalParticipant ?? [];
  const externalParticipants = eventData?.externalParticipant ?? [];


  const booker = eventData?.roomBooker;
  const bookerName = booker
    ? `${booker.firstName} ${booker.lastName}`
    : event?.organizer || "—";
  const roomName = eventData?.room?.roomName || event?.location || "—";
  const description = eventData?.description || "";
  const title = event?.meetingTitle || "—";
  const startTime = event?.startTime || "—";
  const endTime = event?.endTime || "—";
  const formattedDate = event?.date
    ? dayjs(event.date).format("ddd, MMMM D, YYYY")
    : "—";


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionProps={{ timeout: 200 }}
      PaperProps={{ className: "calendar-modal" }}
    >
      {/* Header */}
      <div className="calendar-modal__header">
        <div className="calendar-modal__header__left">
          <Typography className="calendar-modal__header__title">
            {title.charAt(0)?.toUpperCase() + title.slice(1)}
          </Typography>
          <Chip
            label={eventData?.meetingType?.name || event?.category || "—"}
            size="small"
            className="calendar-modal__header__chip"
            style={{
              backgroundColor: `rgba(${eventData?.meetingType.colorCode.match(/\((.*?)\)/)?.[1]})`,
              color: "#fff",
            }}
          />
        </div>
        <IconButton
          size="small"
          onClick={onClose}
          className="calendar-modal__header__close"
        >
          <X size={18} />
        </IconButton>
      </div>

      <Divider />

      {/* Body */}
      <DialogContent className="calendar-modal__content">
        {eventDataLoading ? (
          <div className="calendar-modal__loading">
            <CircularProgress size={28} />
          </div>
        ) : (
          <div className="calendar-modal__body">
            {/* Date & Time */}
            <div className="calendar-modal__row">
              <div
                className="calendar-modal__icon-wrap"
                style={{ backgroundColor: "#eff6ff" }}
              >
                <Clock size={16} color="#2b7fff" />
              </div>
              <div className="calendar-modal__row__content">
                <Typography className="calendar-modal__row__label">
                  Date & Time
                </Typography>
                <Typography
                  variant="h4"
                  className="calendar-modal__row__primary"
                >
                  {formattedDate}
                </Typography>
                <Typography
                  variant="h4"
                  className="calendar-modal__row__secondary"
                >
                  {startTime} – {endTime}
                </Typography>
              </div>
            </div>

            {/* Room */}
            <div className="calendar-modal__row">
              <div
                className="calendar-modal__icon-wrap"
                style={{ backgroundColor: "#faf5ff" }}
              >
                <MapPin size={16} color="#9333ea" />
              </div>
              <div className="calendar-modal__row__content">
                <Typography className="calendar-modal__row__label">
                  Meeting Room
                </Typography>
                <Typography
                  variant="h4"
                  className="calendar-modal__row__primary"
                >
                  {roomName}
                </Typography>
              </div>
            </div>

            {/* Booked By */}
            <div className="calendar-modal__row">
              <div
                className="calendar-modal__icon-wrap"
                style={{ backgroundColor: "#eff6ff" }}
              >
                <CircleUser size={16} color="#2b7fff" />
              </div>
              <div className="calendar-modal__row__content">
                <Typography className="calendar-modal__row__label">
                  Booked By
                </Typography>
                <Typography
                  variant="h4"
                  className="calendar-modal__row__primary"
                >
                  {bookerName}
                </Typography>
              </div>
            </div>

            <div className="calendar-modal__row">
              <div
                className="calendar-modal__icon-wrap"
                // style={{ backgroundColor: "#f8fafc" }}
              >
                <AlignLeft size={16} color="#64748b" />
              </div>
              <div className="calendar-modal__row__content">
                <Typography className="calendar-modal__row__label">
                  Description
                </Typography>
                <Typography
                  variant="h4"
                  className="calendar-modal__row__primary"
                >
                  {description || "No description provided."}
                </Typography>
              </div>
            </div>

            {/* Participants */}
            <div className="calendar-modal__row">
              <Accordion
                className="calendar-modal__accordion"
                disableGutters
                elevation={0}
              >
                <AccordionSummary
                  expandIcon={<ArrowDropDownIcon />}
                  className="calendar-modal__accordion__summary"
                >
                  <div
                    className="calendar-modal__icon-wrap"
                    style={{ backgroundColor: "#f0fdf4" }}
                  >
                    <Users size={16} color="#16a34a" />
                  </div>
                  <div className="calendar-modal__row__content">
                    <Typography className="calendar-modal__row__label">
                      Participants
                    </Typography>
                    <Typography
                      variant="h4"
                      className="calendar-modal__row__secondary"
                    >
                      {internalParticipants.length +
                        externalParticipants.length}{" "}
                      Participants ({internalParticipants.length} Internal,{" "}
                      {externalParticipants.length} External)
                    </Typography>
                  </div>
                </AccordionSummary>

                <AccordionDetails className="calendar-modal__accordion__details">
                  <TabContext value={tabValue}>
                    <TabList
                      onChange={(_, v) => setTabValue(v)}
                      className="calendar-modal__tabs"
                    >
                      <Tab
                        label={`Internal (${internalParticipants.length})`}
                        value="internal"
                        className="calendar-modal__tab"
                      />
                      <Tab
                        label={`External (${externalParticipants.length})`}
                        value="external"
                        className="calendar-modal__tab"
                      />
                    </TabList>

                    <TabPanel
                      value="internal"
                      className="calendar-modal__tab-panel"
                    >
                      {internalParticipants.length ? (
                        <div className="calendar-modal__chips">
                          {internalParticipants.map((p) => (
                            <div
                              key={p.id}
                              className="calendar-modal__participant-chip"
                            >
                              <Avatar className="calendar-modal__chips__avatar">
                                {p.firstName[0]}
                                {p.lastName[0]}
                              </Avatar>
                              <div>
                                <Typography className="calendar-modal__empty">
                                  {p.firstName} {p.lastName}
                                </Typography>
                                <Typography className="calendar-modal__empty">
                                  {p.email}
                                </Typography>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Typography className="calendar-modal__empty">
                          No internal participants
                        </Typography>
                      )}
                    </TabPanel>

                    <TabPanel
                      value="external"
                      className="calendar-modal__tab-panel"
                    >
                      {externalParticipants.length ? (
                        <div className="calendar-modal__chips">
                          {externalParticipants.map((p) => (
                            <div
                              key={p.id}
                              className="calendar-modal__participant-chip"
                            >
                              <Avatar className="calendar-modal__chips__avatar">
                                {p.name
                                  .split(" ")
                                  .map((w) => w[0])
                                  .join("")}
                              </Avatar>
                              <div>
                                <Typography className="calendar-modal__empty">
                                  {p.name}
                                </Typography>
                                <Typography className="calendar-modal__empty">
                                  {p.email}
                                </Typography>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Typography className="calendar-modal__empty">
                          No external participants
                        </Typography>
                      )}
                    </TabPanel>
                  </TabContext>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        )}
      </DialogContent>

      <Divider />

      {/* Actions */}
      {perms.canManageRooms && (
        <DialogActions className="calendar-modal__actions">
          <MyButton
            variant="outlined"
            customVariant="ghost"
            onClick={onClose}
            text="Close"
          />
          {submitMode === "editOnce" && (
            <MyButton
              variant="contained"
              customVariant="dark"
              startIcon={<SquarePen size={16} />}
              onClick={() => {
                dispatch(
                  setBookingRoomFormData(mapEventToBookingFormData(eventData!)),
                );
                navigate("/book-room", {
                  state: {
                    submitMode: submitMode,
                    bookingId: eventData?.id,
                  },
                });
              }}
              text={"Edit Meeting"}
            />
          )}
          {submitMode === "editAll" && (
            <>
              <MyButton
                variant="contained"
                customVariant="dark"
                startIcon={<SquarePen size={16} />}
                onClick={() => {
                  dispatch(
                    setBookingRoomFormData(
                      mapEventToBookingFormData(eventData!),
                    ),
                  );
                  navigate("/book-room", {
                    state: {
                      submitMode: "editOnce",
                      bookingId: event?.id,
                    },
                  });
                }}
                text="Edit This Meeting"
              />
              <MyButton
                variant="contained"
                customVariant="dark"
                startIcon={<SquarePen size={16} />}
                onClick={() => {
                  dispatch(
                    setBookingRoomFormData(
                      mapEventToBookingFormData(eventData!),
                    ),
                  );
                  navigate("/book-room", {
                    state: {
                      submitMode: submitMode,
                      bookingId: eventData?.recurrenceId,
                    },
                  });
                }}
                text="Edit All"
              />
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};


export default CalendarModal;

