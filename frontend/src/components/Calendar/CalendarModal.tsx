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

interface CalendarModalProps {
  open: boolean;
  event: CalendarEvent | null;
  anchorEl?: HTMLElement | null;
  onClose: () => void;
  onEdit: () => void;
  eventData?: BookedRoomDataResponse | null;
  eventDataLoading?: boolean;
}

const CATEGORY_COLORS: Record<
  string,
  { bg: string; text: string; iconBg: string }
> = {
  internal: { bg: "#dbeafe", text: "#1d4ed8", iconBg: "#eff6ff" },
  client: { bg: "#ffedd5", text: "#c2410c", iconBg: "#fff7ed" },
  executive: { bg: "#f3e8ff", text: "#7e22ce", iconBg: "#faf5ff" },
  external: { bg: "#dcfce7", text: "#15803d", iconBg: "#f0fdf4" },
};

const DEFAULT_COLORS = { bg: "#f1f5f9", text: "#475569", iconBg: "#f8fafc" };

export const CalendarModal = ({
  open,
  event,
  onClose,
  eventData,
  eventDataLoading,
}: CalendarModalProps) => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState("internal");

  const category = event?.category?.toLowerCase() ?? "";
  const colors = CATEGORY_COLORS[category] ?? DEFAULT_COLORS;

  const internalNames =
    eventData?.internalParticipant?.map(
      (p) => `${p.firstName} ${p.lastName}`,
    ) ?? [];
  const externalNames =
    eventData?.externalParticipant?.map((p) => p.name) ?? [];

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
      {/*  Header  */}
      <div className="calendar-modal__header">
        <div className="calendar-modal__header__left">
          <Typography className="calendar-modal__header__title">
            {title}
          </Typography>
          <Chip
            label={event?.category || "—"}
            size="small"
            className="calendar-modal__header__chip"
            style={{ backgroundColor: colors.bg, color: colors.text }}
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

      {/*  Body  */}
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
                <Clock
                  size={16}
                  color="#2b7fff"
                />
              </div>
              <div className="calendar-modal__row__content">
                <Typography className="calendar-modal__row__label">
                  Date & Time
                </Typography>
                <Typography className="calendar-modal__row__primary">
                  {formattedDate}
                </Typography>
                <Typography className="calendar-modal__row__secondary">
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
                <MapPin
                  size={16}
                  color="#9333ea"
                />
              </div>
              <div className="calendar-modal__row__content">
                <Typography className="calendar-modal__row__label">
                  Meeting Room
                </Typography>
                <Typography className="calendar-modal__row__primary">
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
                <CircleUser
                  size={16}
                  color="#2b7fff"
                />
              </div>
              <div className="calendar-modal__row__content">
                <Typography className="calendar-modal__row__label">
                  Booked By
                </Typography>
                <Typography className="calendar-modal__row__primary">
                  {bookerName}
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
                    <Users
                      size={16}
                      color="#16a34a"
                    />
                  </div>
                  <div className="calendar-modal__row__content">
                    <Typography className="calendar-modal__row__label">
                      Participants
                    </Typography>
                    <Typography className="calendar-modal__row__secondary">
                      {internalNames.length + externalNames.length} Participants
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
                        label={`Internal (${internalNames.length})`}
                        value="internal"
                        className="calendar-modal__tab"
                      />
                      <Tab
                        label={`External (${externalNames.length})`}
                        value="external"
                        className="calendar-modal__tab"
                      />
                    </TabList>

                    <TabPanel
                      value="internal"
                      className="calendar-modal__tab-panel"
                    >
                      {internalNames.length ? (
                        <div className="calendar-modal__chips">
                          {internalNames.map((name, i) => (
                            <Chip
                              key={i}
                              label={name}
                              size="small"
                              className="calendar-modal__participant-chip"
                            />
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
                      {externalNames.length ? (
                        <div className="calendar-modal__chips">
                          {externalNames.map((name, i) => (
                            <Chip
                              key={i}
                              label={name}
                              size="small"
                              className="calendar-modal__participant-chip calendar-modal__participant-chip--external"
                            />
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

            {/* Description */}
            <div className="calendar-modal__row calendar-modal__row--full">
              <div className="calendar-modal__description-box">
                <div className="calendar-modal__description-header">
                  <div
                    className="calendar-modal__icon-wrap"
                    style={{ backgroundColor: "#f8fafc" }}
                  >
                    <AlignLeft
                      size={16}
                      color="#64748b"
                    />
                  </div>
                  <Typography className="calendar-modal__row__label">
                    Description
                  </Typography>
                </div>
                <Typography className="calendar-modal__description-text">
                  {description || "No description provided."}
                </Typography>
              </div>
            </div>
          </div>
        )}
      </DialogContent>

      {/*  Actions  */}
      <Divider />
      <DialogActions className="calendar-modal__actions">
        <MyButton
          variant="outlined"
          customVariant="ghost"
          onClick={onClose}
          text="Close"
        />
        <MyButton
          variant="contained"
          customVariant="dark"
          startIcon={<SquarePen size={16} />}
          onClick={() => navigate("/book-room")}
          text="Edit Meeting"
        />
      </DialogActions>
    </Dialog>
  );
};

export default CalendarModal;
