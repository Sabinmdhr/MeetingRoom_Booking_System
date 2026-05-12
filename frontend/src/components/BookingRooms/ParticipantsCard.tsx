import {
  Typography,
  Tab,
  TextField,
  InputAdornment,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import "../../assets/scss/components/ParticipantsCard.scss";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Search, ChevronDown, X } from "lucide-react";
import Accordion from "@mui/material/Accordion";
import { useparticipantsViewModel } from "../../viewmodels/useParticipantsViewModel";
import { useState } from "react";
import { useGroupCardViewModel } from "../../viewmodels/useGroupCardViewModel";
import type { groupCardRequest } from "../../models/groupCard.model";
import { useDepartmentListViewModel } from "../../viewmodels/useDepartmentListViewModel";

interface ParticipantsCardProps {
  type: "internal" | "external" | "";
  participants?: number[];
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
  const { departmentList } = useDepartmentListViewModel();
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

    onChange(updated);
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
        {/* <label htmlFor="description" className="label">
          Participants
        </label>
        <Typography>
          Add internal and external participants to your meeting.
        </Typography> */}
        {selectedParticipants.length > 0 && (
          <div>
              <Typography variant="subtitle2">
                Selected Participants:
              </Typography>
            <div className="selected-participants">
              {selectedParticipants.map((id) => {
                const participant = users.find((p) => p.id === id);
                return participant ? (
                  <div className="selected-chips">
                    <Chip
                      label={`${participant.firstname} ${participant.lastname}`}
                      key={id}
                      icon={
                        <X
                          size={18}
                          onClick={() => {
                            toggleParticipantSelection(id);
                          }}
                        />
                      }
                      className="selected-participant"
                    />
                  </div>
                ) : null;
              })}
            </div>
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
                  <Tab
                    label="People"
                    value="people"
                  />
                  <Tab
                    label="Teams"
                    value="teams"
                  />
                  <Tab
                    label="All"
                    value="all"
                  />
                </TabList>

                <TabPanel
                  value="people"
                  className="tab-panel"
                >
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search
                            size={18}
                            color="gray"
                          />
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
                          <Typography
                            variant="subtitle2"
                            className="name"
                          >
                            {p.firstname} {p.lastname}
                          </Typography>
                          <div className="participant-Subinfo">
                            <Typography className="department">
                              {p.department}
                            </Typography>
                            &bull;
                            <Typography className="role">
                              {p.position}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabPanel>

                <TabPanel value="teams">
                  {departmentList.map((d, index) => {
                    return (
                      <>
                        <Accordion
                          expanded={expandedGroup === d.departmentName}
                          onChange={() => {
                            setExpandedGroup(
                              expandedGroup === d.departmentName
                                ? false
                                : d.departmentName,
                            );
                          }}
                          key={d.id}
                          className="teams-list"
                        >
                          <AccordionSummary
                            expandIcon={<ChevronDown />}
                            aria-controls={`panel${index}-content`}
                          >
                            <div className="teams-list__header">
                              <input
                              size={25}
                                type="checkbox"
                                className="check"
                                checked={users
                                  .filter(
                                    (p) => p.department === d.departmentName,
                                  )
                                  .every((m) =>
                                    selectedParticipants.includes(m.id),
                                  )}
                                onClick={() =>
                                  toggleGroupSelection(
                                    users
                                      .filter(
                                        (p) =>
                                          p.department === d.departmentName,
                                      )
                                      .map((m) => m.id),
                                  )
                                }
                              />
                              <Typography variant="h5">
                                {d.departmentName}
                              </Typography>
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <div className={`participants-list `}>
                              {users.map((p) => {
                                if (p.department !== d.departmentName) return;
                                return (
                                  <div
                                    key={p.id}
                                    className={`participant-item   `}
                                  >
                                    <div className="participant-info">
                                      <Typography
                                        variant="subtitle2"
                                        className="name"
                                      >
                                        {p.firstname} {p.lastname}
                                      </Typography>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionDetails>
                        </Accordion>
                      </>
                    );
                  })}
                </TabPanel>

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
        </div>
      </>
    </>
  );
};

export default ParticipantsCard;
