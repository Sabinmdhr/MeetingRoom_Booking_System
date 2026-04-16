import {
  Typography,
  Tab,
  TextField,
  Button,
  InputAdornment,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import "../../assets/scss/components/ParticipantsCard.scss";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { UserPlus, Search, ChevronDown, X } from "lucide-react";
import Accordion from "@mui/material/Accordion";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import { useState } from "react";
import { useGroupCardViewModel } from "../../viewmodels/useGroupCardViewModel";
import type { groupCardRequest } from "../../models/groupCard.model";

interface ParticipantsCardProps {
  type: "internal" | "external" | "";
  participants: number[];
  onChange: (updated: number[]) => void;
}

const ParticipantsCard = ({
  type,
  participants,
  onChange,
}: ParticipantsCardProps) => {
  const [tabValue, setTabValue] = useState("people");
  const { users } = useparticipantsViewModel();
  const { group } = useGroupCardViewModel();
  // const [participants, setParticipants] = useState<participantsApi[]>([]);

  const [search, setSearch] = useState("");
  const [externalName, setExternalName] = useState("");
  const [externalEmail, setExternalEmail] = useState("");

  const [expandedGroup, setExpandedGroup] = useState<string | false>(false);
  // const { selectedParticipants, setSelectedParticipants } =
  //   useparticipantsViewModel();
  // const {selectedParticipants, setSelectedParticipants} = useparticipantsViewModel();
  // useEffect(() => {
  //   const data = getAllUser();
  //   setParticipants(data);
  // }, []);

  // const { handleToggle } = useparticipantsViewModel();
  // const { toggleMemberSelection, groupFormData } = useAddGroupViewModel();
  // const { selectedParticipants } = useAppSelector(
  //   (state) => state.participants,
  // );

  const filteredParticipants = users.filter(
    (p) =>
      p.firstname.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedParticipants = participants ?? [];

  const toggleParticipantSelection = (id: number) => {
    const updated = selectedParticipants?.includes(id)
      ? selectedParticipants.filter((pid) => pid !== id)
      : [...selectedParticipants, id];
    onChange(updated);
  };

  const toggleGroupSelection = (ids: number[]) => {
    const allSelected = ids.every((id) => selectedParticipants.includes(id));

    const updated = allSelected
      ? selectedParticipants.filter((id) => !ids.includes(id))
      : [...new Set([...selectedParticipants, ...ids])];

      onChange(updated)
  };
  // const handleSelectParticipant = (id: string) => {
  //   setSelectedParticipants((prev) =>
  //     prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
  //   )
  // };

  const handleAddExternal = () => {
    if (!externalName || !externalEmail) return;

    console.log({
      name: externalName,
      email: externalEmail,
    });

    setExternalName("");
    setExternalEmail("");
  };

  return (
    <>
      <>
        <label htmlFor="description" className="label">
          Participants
        </label>
        <Typography>
          Add internal and external participants to your meeting.
        </Typography>
        {selectedParticipants.length > 0 && (
          <div className="selected-participants">
            <Typography variant="subtitle2">Selected Participants:</Typography>
            {selectedParticipants.map((id) => {
              const participant = users.find((p) => p.id === id);
              return participant ? (
                <Chip
                  label={`${participant.firstname} ${participant.lastname}`}
                  key={id}
                  icon={
                    <X
                      size={18}
                      onClick={() => {toggleParticipantSelection(id)
                      }}
                    />
                  }
                  className="selected-participant"
                />
              ) : null;
            })}
          </div>
        )}
        <div className="participants-card">
          {type === "internal" && (
            <div className="internal-participants">
              <Typography className="group-title">Group by</Typography>
              <TabContext value={tabValue}>
                <TabList
                  onChange={(_e, value) => setTabValue(value)}
                  className="participants-tabs"
                >
                  <Tab label="People" value="people" />
                  <Tab label="Teams" value="teams" />
                  <Tab label="All" value="all" />
                </TabList>

                <TabPanel value="people" className="tab-panel">
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search size={18} color="gray" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <div className={`participants-list `}>
                    {filteredParticipants.map((p) => (
                      <div
                        key={p.id}
                        className={`participant-item ${
                          p.id && selectedParticipants.includes(p.id)
                            ? "selected"
                            : ""
                        }   `}
                        onClick={() => p.id && toggleParticipantSelection(p.id)}
                      >
                        <input
                          // color="red"
                          className="check"
                          type="checkbox"
                          checked={
                            p.id ? selectedParticipants.includes(p.id) : false
                          }
                          onChange={() =>
                            p.id && toggleParticipantSelection(p.id)
                          }
                        />

                        <div className="participant-info">
                          <Typography variant="subtitle2" className="name">
                            {p.firstname} {p.lastname}
                          </Typography>
                          <div className="participant-Subinfo">
                            <Typography className="department">
                              {p.department}
                            </Typography>
                            &bull;
                            <Typography className="role">{p.role}</Typography>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>

                <TabPanel value="teams">Teams view</TabPanel>

                <TabPanel value="all">
                  {group.map((g, index) => {
                    return (
                      <>
                        <Accordion
                          expanded={expandedGroup === g.groupName}
                          onChange={() => {
                            setExpandedGroup(
                              expandedGroup === g.groupName
                                ? false
                                : g.groupName,
                            );
                          }}
                          key={g.id}
                        >
                          <AccordionSummary
                            expandIcon={<ChevronDown />}
                            aria-controls={`panel${index}-content`}
                          >
                            <input
                              type="checkbox"
                              className="check"
                              checked={g.members.every((m) =>
                                selectedParticipants.includes(m.memberId),
                              )}
                              onClick={() =>
                                toggleGroupSelection(
                                  g.members.map((m) => m.memberId),
                                )
                              }
                            />
                            <Typography>{g.groupName}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className={`participants-list `}>
                              {g.members.map((p) => (
                                <div
                                  key={p.memberId}
                                  className={`participant-item   `}
                                >
                                  <div className="participant-info">
                                    <Typography
                                      variant="subtitle2"
                                      className="name"
                                    >
                                      {p.memberName}
                                    </Typography>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </>
                    );
                  })}
                </TabPanel>
              </TabContext>
            </div>
          )}

          {/* {type === "external" && (
            <div className="external-members">
              <div className="external-header">
                <UserPlus size={18} />
                <Typography>Add External Member</Typography>
              </div>

              <TextField
                label="Name *"
                fullWidth
                size="small"
                placeholder="Enter external member name"
                value={externalName}
                onChange={(e) => setExternalName(e.target.value)}
              />
              <TextField
                label="Email *"
                fullWidth
                size="small"
                placeholder="Enter external member email"
                value={externalEmail}
                onChange={(e) => setExternalEmail(e.target.value)}
              />

              <div className="external-note">
                <Typography>
                  <b>Note:</b> External members will be tracked separately in
                  reports and won't affect internal dashboard statistics.
                </Typography>
              </div>

              <div className="external-buttons">
                <Button
                  className="participants-btn"
                  fullWidth
                  onClick={handleAddExternal}
                  startIcon={<UserPlus size={18} />}
                >
                  Add External Member
                </Button>
                <Button
                  className="participants-btn"
                  onClick={() => {
                    setExternalName("");
                    setExternalEmail("");
                  }}
                >
                  Clear
                </Button>
              </div>
            </div>
          )} */}
        </div>
      </>
    </>
  );
};

export default ParticipantsCard;
